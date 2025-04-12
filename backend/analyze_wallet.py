#analysis
def analyze_wallet(wallet):
    """
    Analyzes the given wallet and returns a summary of its contents.

    Args:
        wallet (dict): A dictionary representing the wallet, where keys are asset names and values are their quantities.

    Returns:
        dict: A summary of the wallet's contents.
    """
    total_value = sum(wallet.values())
    num_assets = len(wallet)
    average_value = total_value / num_assets if num_assets > 0 else 0

    return {
        "total_value": total_value,
        "num_assets": num_assets,
        "average_value": average_value
    }