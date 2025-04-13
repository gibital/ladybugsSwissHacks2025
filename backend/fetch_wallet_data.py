import requests
import csv
from datetime import datetime, timedelta

NODE_URL = "https://s2.ripple.com:51234/"
WALLET = "rw9Pvqf292gNnwP4QXESH52dhTeYNaBDhE"
LIMIT = 100
MAX_PAGES = 10

def ripple_time_to_datetime(ripple_time):
    return datetime(2000, 1, 1) + timedelta(seconds=ripple_time)

### 1. XRP Transactions ###
def fetch_transactions(wallet, max_pages=MAX_PAGES):
    all_txs = []
    marker = None
    page = 0

    while True:
        body = {
            "method": "account_tx",
            "params": [{
                "account": wallet,
                "limit": LIMIT,
                "forward": False
            }]
        }
        if marker:
            body["params"][0]["marker"] = marker

        response = requests.post(NODE_URL, json=body)
        result = response.json().get("result", {})
        txs = result.get("transactions", [])
        all_txs.extend(txs)

        marker = result.get("marker")
        page += 1
        print(f"Fetched transaction page {page}")

        if not marker or page >= max_pages:
            break

    return all_txs

def save_xrp_transactions(wallet):
    txs = fetch_transactions(wallet)
    rows = []

    for tx in txs:
        tx_data = tx["tx"]
        meta = tx.get("meta", {})
        if tx_data.get("TransactionType") != "Payment":
            continue

        amount = tx_data.get("Amount")
        if isinstance(amount, dict):  # Non-XRP payments
            continue

        rows.append({
            "tx_hash": tx_data.get("hash"),
            "type": tx_data.get("TransactionType"),
            "date": ripple_time_to_datetime(tx_data.get("date")).isoformat(),
            "sender": tx_data.get("Account"),
            "receiver": tx_data.get("Destination"),
            "amount_xrp": float(amount) / 1_000_000,
            "direction": "outgoing" if tx_data.get("Account") == wallet else "incoming"
        })

    with open(f"{wallet}_xrp_transactions.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=rows[0].keys())
        writer.writeheader()
        writer.writerows(rows)
    print(f" Saved {len(rows)} XRP payment transactions to {wallet}_xrp_transactions.csv")

### 2. Token Balances (Trust Lines) ###
def fetch_account_lines(wallet):
    body = {
        "method": "account_lines",
        "params": [{"account": wallet, "limit": 400}]
    }
    response = requests.post(NODE_URL, json=body)
    return response.json().get("result", {}).get("lines", [])

def save_assets(wallet):
    assets = fetch_account_lines(wallet)
    with open(f"{wallet}_token_balances.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=assets[0].keys())
        writer.writeheader()
        writer.writerows(assets)
    print(f" Saved {len(assets)} token balances to token_balances.csv")

### 3. NFTs ###
def fetch_nfts(wallet):
    body = {
        "method": "account_nfts",
        "params": [{"account": wallet}]
    }
    response = requests.post(NODE_URL, json=body)
    return response.json().get("result", {}).get("account_nfts", [])

def save_nfts(wallet):
    nfts = fetch_nfts(wallet)
    if not nfts:
        print("No NFTs found.")
        return
    with open(f"{wallet}_nfts.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=nfts[0].keys())
        writer.writeheader()
        writer.writerows(nfts)
    print(f" Saved {len(nfts)} NFTs to {wallet}_nfts.csv")

### 4. General Ledger Objects ###
def fetch_account_objects(wallet):
    body = {
        "method": "account_objects",
        "params": [{"account": wallet, "limit": 400}]
    }
    response = requests.post(NODE_URL, json=body)
    return response.json().get("result", {}).get("account_objects", [])

def save_objects(wallet):
    objects = fetch_account_objects(wallet)
    if not objects:
        print("No ledger objects found.")
        return

    # Dynamically collect all unique keys from all objects
    all_keys = set()
    for obj in objects:
        all_keys.update(obj.keys())

    with open(f"{wallet}_ledger_objects.csv", "w", newline="") as f:
        writer = csv.DictWriter(f, fieldnames=sorted(all_keys))
        writer.writeheader()
        for obj in objects:
            writer.writerow(obj)
    print(f" Saved {len(objects)} ledger objects to {wallet}_ledger_objects.csv")


def run_full_report(wallet):
    print("Starting full XRP Ledger wallet extraction...\n")
    save_xrp_transactions(wallet)
    save_assets(wallet)
    save_nfts(wallet)
    save_objects(wallet)
    print("\n All wallet data exported successfully.")

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(description="Fetch XRP wallet data")
    parser.add_argument("wallet", help="XRP wallet address")
    args = parser.parse_args()

    run_full_report(args.wallet)

