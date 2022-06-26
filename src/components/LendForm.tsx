import { useState, useEffect } from 'react'
import axios from 'axios';
import { ClipLoader } from 'react-spinners'

import NftItem, { IInfo } from './NftItem';

interface ILendForm {
  walletInfo: {
    address: string;
    ensAddress: string;
  }
}

const LendForm = (params: ILendForm) => {
  const [selectedNft, setSelectedNft] = useState<IInfo>();
  const [destinationAddress, setDestinationAddress] = useState<string>();
  const [deadline, setDeadline] = useState<string>();
  const [success, setSuccess] = useState(false);
  const [nfts, setNfts] = useState<any[] | null>(null);
  const canSubmit = selectedNft && destinationAddress && deadline;

  useEffect(()=>{
    const requestBalances = async ()=> {
      if(!params.walletInfo.address) return;
      const {data: {data}} = await axios.get(`https://api.covalenthq.com/v1/1/address/${params.walletInfo.address}/balances_v2/?key=ckey_7cf4313ee1834e62b9d36167ad1&nft=true`);
      const allNfts = data.items.reduce((acc: [], nft: any) => {
        if(!nft.nft_data) return acc;
        return acc.concat(...nft.nft_data.map((item: any) => ({...item, contract_address: nft.contract_address, contract_name: nft.contract_name}) ));
      }, [])
      setNfts(allNfts);
    }
    requestBalances();
  }, [params.walletInfo.address])

  const chooseNftContent = selectedNft ?
    <section className="w-full mt-2 mb-8 flex flex-col justify-center items-center">
      <img className="rounded w-32 h-32 bg-pink-600" src={selectedNft.imageUrl}></img>
      <div className="flex flex flex-col text-center">
        <div className="font-medium"> {selectedNft.tokenId} </div>
        <div className="font-medium"> {selectedNft.contractName} </div>
        <div className="text-gray-400 text-sm"> {selectedNft.contractAddress} </div>
      </div>
    </section>
  :
  <section className="mb-10 w-full">
    <label className="font-medium"> Choose NFT </label>
    <div className="overflow-scroll h-64 w-full flex flex-row flex-wrap">
      {nfts ?
        nfts.map((nft, i) => <NftItem key={i} info={{contractAddress: nft.contract_address, contractName: nft.contract_name, imageUrl: nft.external_data.image, tokenId: nft.external_data.name }} onClick={(info)=> setSelectedNft(info)}/>)
        :
        <ClipLoader />
      }
    </div>
  </section>

  const formContent = <div className="w-full">
    <section className="mb-10 flex flex-col">
      <label className="font-medium mb-2"> Destination Address </label>
      <input className="border rounded border-gray-200 w-2/3 p-2" placeholder="0xf74FB379..." onBlur={(e)=> {setDestinationAddress(e.target.value)}}/>
    </section>

    <section className="mb-10 flex flex-col">
      <label className="font-medium mb-2"> Lending Timeframe </label>
      <input className="border rounded border-gray-200 w-16 p-2" placeholder="20 D" onBlur={(e)=> {setDeadline(e.target.value)}}/>
    </section>

    <div className="w-full flex justify-center p-20">
      <button onClick={()=> { setSuccess(true) }} disabled={!canSubmit} className="rounded-lg bg-blue-700 disabled:bg-blue-200 ml-4 p-3 px-10 text-white font-medium"> Confirm </button>
    </div>
  </div>

  const successContent = <div className="w-full text-center">
    <p className="text-2xl">NFT Sent! 🎉</p>
  </div>

  return (
    <div className="w-2/4 bg-white rounded-lg px-10 py-8 my-12 drop-shadow-md">
      <header className="w-full flex flex-row justify-between mb-10">
        <h3 className="self-end font-medium text-xl"> Lend NFT </h3>
        <div> {params.walletInfo.ensAddress} ({params.walletInfo.address.slice(0, 8)}...)</div>
      </header>

      {chooseNftContent}
      {success? successContent : formContent}

    </div>
  );
}

export default LendForm;
