import { useState } from 'react'
import NftItem from './NftItem';

const LendForm = () => {
  const [selectedNft, setSelectedNft] = useState('');
  const [destinationAddress] = useState();
  const [deadline] = useState();
  const [success, setSuccess] = useState(false);
  const canSubmit = selectedNft && destinationAddress && deadline;

  const chooseNftContent = selectedNft ?
    <section className="w-full mt-2 mb-8 flex flex-col justify-center items-center">
      <div className="rounded w-32 h-32 bg-pink-600"></div>
      <div className="flex flex flex-col text-center">
        <div className="font-medium"> #322 </div>
        <div className="text-gray-400 text-sm"> 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D </div>
      </div>
    </section>
  :
  <section className="mb-10">
    <label className="font-medium"> Choose NFT </label>
    <div>
      <NftItem onClick={()=> setSelectedNft('mynft')}/>
      <NftItem onClick={()=> setSelectedNft('mynft')}/>
      <NftItem onClick={()=> setSelectedNft('mynft')}/>
    </div>
  </section>

  const formContent = <div className="w-full">


    <section className="mb-10 flex flex-col">
      <label className="font-medium mb-2"> Destination Address </label>
      <input className="border rounded border-gray-200 w-2/3 p-2" placeholder="0xf74FB379..."/>
    </section>

    <section className="mb-10 flex flex-col">
      <label className="font-medium mb-2"> Lending Timeframe </label>
      <input className="border rounded border-gray-200 w-16 p-2" placeholder="20 D"/>
    </section>

    <div className="w-full flex justify-center p-20">
      <button onClick={()=> { setSuccess(true) }} className={`rounded-lg bg-blue-700 disabled:bg-blue-200 ml-4 p-3 px-10 text-white font-medium ${canSubmit ? '' : 'disabled'}`}> Confirm </button>
    </div>
  </div>

  const successContent = <div className="w-full text-center">
    <p className="text-2xl">NFT Sent! 🎉</p>
  </div>

  return (
    <div className="w-2/4 bg-white rounded-lg px-10 py-8 my-12">
      <header className="w-full flex flex-row justify-between mb-10">
        <h3 className="self-end font-medium text-xl"> Lend NFT </h3>
        <div> Dipo.eth (0x434...)</div>
      </header>

      {chooseNftContent}
      {success? successContent : formContent}

    </div>
  );
}

export default LendForm;
