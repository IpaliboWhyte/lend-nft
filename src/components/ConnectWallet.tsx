import {
  Link
} from "react-router-dom";

const ConnectWallet = () => {
  return (
    <div className="w-full h-full flex flex-col justify-center items-center">
      <Link className="bg-blue-700 w-60 text-white p-4 rounded-lg font-medium text-center" to="/app">
        Connect Wallet
      </Link>
    </div>
  );
}

export default ConnectWallet;
