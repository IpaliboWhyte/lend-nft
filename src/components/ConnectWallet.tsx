import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export interface IOnConnectWallet {
  ({address, ensAddress}: {address: string, ensAddress: string}): void
}

const provider = new ethers.providers.Web3Provider(window.ethereum)
const ConnectWallet = ({onConnectWallet}: {onConnectWallet: IOnConnectWallet}) => {

  const navigate = useNavigate();
  const onClick = async()=> {
    const [address] = await provider.send("eth_requestAccounts", []);
    const ensAddress = await provider.lookupAddress(address);
    onConnectWallet({address, ensAddress: ensAddress || ''})
    navigate('/app');
  }

  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <button className="bg-blue-700 w-60 text-white p-4 rounded-lg font-medium text-center" onClick={onClick}>
        Connect Wallet
      </button>
    </div>
  );
}

export default ConnectWallet;
