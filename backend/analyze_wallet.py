import json
import csv
import os
from datetime import datetime

def hex_to_string(hex_str):
    try:
        decoded = bytes.fromhex(hex_str).decode("utf-8").strip("\x00")
        return decoded if decoded.isprintable() else None
    except Exception:
        return None

def calculate_credit_score(wallet_age_days, freq_monthly, avg_holding_days, total_unique_addresses, received, token_dict):
    # Token subscore
    non_zero_tokens = [v for v in token_dict.values() if v > 0.01]
    high_value_tokens = [v for v in non_zero_tokens if v > 100000]

    token_score = (
        min(len(non_zero_tokens) / 10, 1.0) * 0.6 +
        min(len(high_value_tokens) / 2, 1.0) * 0.4
    )

    if total_unique_addresses <= 50:
        address_score = total_unique_addresses / 50
    elif total_unique_addresses <= 150:
        address_score = 1.0
    else:
        # Gradual penalty after 150 addresses
        penalty = min((total_unique_addresses - 150) / 200, 1.0) * 0.5
        address_score = max(1.0 - penalty, 0.0)

    score = (
        0.20 * min(wallet_age_days / 730, 1.0) +
        0.20 * min(freq_monthly / 10, 1.0) +
        0.15 * min(avg_holding_days / 90, 1.0) +
        0.15 * address_score +  
        0.10 * min(received / 10000, 1.0) +
        0.20 * token_score
    )

    credit_score = 300 + (score * 550)
    return round(credit_score, 2)

def analyze_wallet_from_csv(tx_csv, tokens_csv):
    inflows = []
    outflows = []
    tx_dates = []
    counterparties = set()
    senders = set()
    receivers = set()
    sent = 0.0
    received = 0.0
    token_balances = {}

    with open(tx_csv, newline='') as f:
        reader = csv.DictReader(f)
        for row in reader:
            try:
                date = datetime.fromisoformat(row["date"])
                amount = float(row["amount_xrp"])
                direction = row["direction"]
                sender = row["sender"]
                receiver = row["receiver"]

                tx_dates.append(date)
                if direction == "outgoing":
                    sent += amount
                    outflows.append((date, amount))
                    counterparties.add(receiver)
                    receivers.add(receiver)
                else:
                    received += amount
                    inflows.append((date, amount))
                    counterparties.add(sender)
                    senders.add(sender)
            except Exception:
                continue

    tx_dates.sort()
    wallet_age_days = (datetime.utcnow() - tx_dates[0]).days if tx_dates else 0
    freq_monthly = len(tx_dates) / (wallet_age_days / 30.0 + 0.01)
    total_unique_addresses = len(senders.union(receivers))

    # Holding time calculation
    inflows.sort()
    outflows.sort()
    holding_times = []

    while inflows and outflows:
        in_time, in_amount = inflows[0]
        out_time, out_amount = outflows[0]

        used_amount = min(in_amount, out_amount)
        holding_duration = (out_time - in_time).total_seconds()
        if holding_duration >= 0:
            holding_times.append(holding_duration)

        if in_amount > out_amount:
            inflows[0] = (in_time, in_amount - used_amount)
            outflows.pop(0)
        elif in_amount < out_amount:
            outflows[0] = (out_time, out_amount - used_amount)
            inflows.pop(0)
        else:
            inflows.pop(0)
            outflows.pop(0)

    avg_holding_seconds = sum(holding_times) / len(holding_times) if holding_times else 0
    avg_holding_days = avg_holding_seconds / 86400

    #print("wallet_total_transactions", len(tx_dates))
    #print("wallet_age_days", wallet_age_days)
    #print("monthly_transaction_frequency", round(freq_monthly, 4))
    #print("total_xrp_sent", round(sent, 8))
    #print("total_xrp_received", round(received, 8))
    #print("unique_senders", len(senders))
    #print("unique_receivers", len(receivers))
    #print("unique_addresses_interacted", total_unique_addresses)
    #print("average_holding_days", round(avg_holding_days, 6))

    if os.path.exists(tokens_csv):
        with open(tokens_csv, newline='') as f:
            reader = csv.DictReader(f)
            assets = list(reader)
            for asset in assets:
                try:
                    balance = float(asset.get("balance", "0"))
                    if balance == 0:
                        continue
                    currency = asset.get("currency", "Unknown")
                    decoded = hex_to_string(currency)
                    token_name = decoded if decoded else currency
                    token_balances[token_name] = balance
                    #print(f"token_{token_name}", balance)
                except Exception:
                    continue

    credit_score = calculate_credit_score(
        wallet_age_days,
        freq_monthly,
        avg_holding_days,
        total_unique_addresses,
        received,
        token_balances
    )

    report = {
        "wallet_total_transactions": len(tx_dates),
        "wallet_age_days": wallet_age_days,
        "monthly_transaction_frequency": round(freq_monthly, 4),
        "total_xrp_sent": round(sent, 8),
        "total_xrp_received": round(received, 8),
        "unique_senders": len(senders),
        "unique_receivers": len(receivers),
        "unique_addresses_interacted": total_unique_addresses,
        "average_holding_days": round(avg_holding_days, 6),
        "token_balances": token_balances,
        "estimated_credit_score": credit_score
    }
    print(json.dumps(report))
    return report

if __name__ == "__main__":
    import argparse
    parser = argparse.ArgumentParser(description="Fetch XRP wallet data")
    parser.add_argument("wallet", help="XRP wallet address")
    args = parser.parse_args()
    analyze_wallet_from_csv(f"{args.wallet}_xrp_transactions.csv", f"{args.wallet}_token_balances.csv")
