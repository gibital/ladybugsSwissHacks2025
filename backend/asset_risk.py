import requests
import pandas as pd
import numpy as np
import logging
from datetime import datetime

# Setup basic logging
logging.basicConfig(level=logging.INFO, format='%(levelname)s: %(message)s')

class CryptoRiskAssessor:
    def __init__(self, coin_id, currency='usd'):
        self.coin_id = coin_id
        self.currency = currency
        self.data = None

    def fetch_price_history(self, days=365):
        """
        Fetch daily price data for the past given number of days.
        """
        url = f"https://api.coingecko.com/api/v3/coins/{self.coin_id}/market_chart"
        params = {
            'vs_currency': self.currency,
            'days': days,
            'interval': 'daily'
        }

        try:
            response = requests.get(url, params=params)
            response.raise_for_status()
            prices = response.json().get('prices', [])
        except Exception as e:
            logging.error(f"Error fetching data: {e}")
            return None

        df = pd.DataFrame(prices, columns=['timestamp', 'price'])
        df['date'] = pd.to_datetime(df['timestamp'], unit='ms').dt.date
        df = df[['date', 'price']]
        self.data = df
        logging.info(f"Fetched {len(df)} daily prices for '{self.coin_id}'.")
        return df

    def calculate_log_returns(self):
        prices = self.data['price'].values
        return np.log(prices[1:] / prices[:-1])

    def calculate_volatility(self):
        """
        Realized historical volatility over provided time window 
        """
        log_returns = self.calculate_log_returns()
        return np.std(log_returns)

    def calculate_max_drawdown(self):
        """
        Max drawdown from historical price data.
        """
        prices = self.data['price']
        cumulative_max = prices.cummax()
        drawdowns = prices / cumulative_max - 1
        return drawdowns.min()

    def calculate_atr(self, period=14):
        """
        Average True Range (simple price diff for now, no high/low/candle info).
        """
        prices = self.data['price']
        tr = prices.diff().abs()
        atr = tr.rolling(window=period).mean().iloc[-1]
        return atr

    def assess_risk(self):
        """
        Generate a risk report based on 1-year realized volatility, ATR, and max drawdown.
        """
        if self.data is None or len(self.data) < 15:
            raise ValueError("Not enough price data to calculate risk metrics.")

        volatility = self.calculate_volatility()
        max_dd = self.calculate_max_drawdown()
        atr = self.calculate_atr()

        if volatility < 0.01:
            risk_level = "Low"
        elif volatility < 0.03:
            risk_level = "Medium"
        else:
            risk_level = "High"

        return {
            'coin_id': self.coin_id,
            'volatility': round(volatility, 6),
            'volatility_risk_level': risk_level,
            'max_drawdown': round(max_dd, 4),
            'average_true_range': round(atr, 4),
            'period_days': len(self.data)
        }

# ------------------------------
# Example usage
# ------------------------------
if __name__ == '__main__':
    coin_id = 'usd-coin'  # CoinGecko API ID solo-coin for Sologenic
    assessor = CryptoRiskAssessor(coin_id)

    data = assessor.fetch_price_history(days=365)
    if data is not None and not data.empty:
        try:
            report = assessor.assess_risk()
            print("\n 1-Year Crypto Asset Risk Report")
            print("-" * 40)
            for k, v in report.items():
                print(f"{k.replace('_', ' ').capitalize()}: {v}")
        except Exception as e:
            logging.error(f"Risk assessment failed: {e}")
    else:
        logging.error("No price data available. Check coin ID or network.")

