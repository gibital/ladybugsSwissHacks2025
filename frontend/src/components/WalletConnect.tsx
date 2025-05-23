
import React, { useState } from 'react';
import sdk from "@crossmarkio/sdk";
import { useWallet } from '../context/WalletContext';

interface WalletConnectProps {
  onConnectionChange: (connected: boolean) => void;
}

const WalletConnect: React.FC<WalletConnectProps> = ({ onConnectionChange }) => {
  const [isInstalled, setIsInstalled] = useState<boolean | null>(null);
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const { setAddress } = useWallet();

  const checkWalletInstallation = () => {
    const installed = sdk.sync.isInstalled();
    setIsInstalled(installed ?? false);
    return installed;
  };

  const handleClick = () => {
    if (isInstalled === null) {
      const installed = checkWalletInstallation();
      if (installed) {
        connectWallet();
      }
    } else if (isInstalled === false) {
      window.open('https://chromewebstore.google.com/detail/crossmark-wallet/canipghmckojpianfgiklhbgpfmhjkjg', '_blank');
    } else {
      connectWallet();
    }
  };

  const connectWallet = async () => {
    try {
      let response = await sdk.async.signInAndWait();
      if (response.response.data.address) {
        setIsConnected(true);
        onConnectionChange(true);
        setAddress(response.response.data.address);
        console.log("Connected with address:", response.response.data.address);
      } else {
        setIsConnected(false);
        onConnectionChange(false);
      }
    } catch (error) {
      console.error("Failed to connect wallet:", error);
      setIsConnected(false);
      onConnectionChange(false);
    }
  };

  const getButtonText = () => {
    if (isInstalled === false) return 'Install Wallet First';
    if (isConnected === true) return 'Wallet Connected';
    return 'Connect Wallet';
  };

  const getButtonClass = () => {
    if (isInstalled === false) return 'connect-button install-needed';
    if (isConnected === true) return 'connect-button connected';
    return 'connect-button';
  };

  return (
    <div className="wallet-connect">
      <button 
        onClick={handleClick} 
        className={getButtonClass()}
        disabled={isConnected === true}
      >
        {getButtonText()}
      </button>
    </div>
  );
};

export default WalletConnect;
