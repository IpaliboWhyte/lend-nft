import './App.css'
import { ethers } from "ethers";

import {useState, useEffect} from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ConnectWallet, {IOnConnectWallet} from './components/ConnectWallet';
import Home from './components/Home';

const provider = new ethers.providers.Web3Provider(window.ethereum)

const App = ()=> {
  const [walletInfo, setWalletInfo] = useState({address: '', ensAddress: ''});
  const onConnectWallet: IOnConnectWallet = (result) => {
    setWalletInfo(result)
  }

   useEffect(()=> {
     const findAddress = async()=>{
       const [address] = await provider.send("eth_requestAccounts", []);
       const ensAddress = await provider.lookupAddress(address);
       onConnectWallet({address, ensAddress: ensAddress || ''})
     }

     findAddress();
   }, [provider])

  return (
    <div className="App">
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ConnectWallet onConnectWallet={onConnectWallet} />} />
        <Route path="/app" element={<Home walletInfo={walletInfo} />} />
      </Routes>
    </BrowserRouter>
    </div>
  );
}

export default App;
