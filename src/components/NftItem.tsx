export interface IInfo {
  contractAddress: string;
  contractName: string;
  imageUrl: string;
  tokenId: string;
}

interface INftItem {
  onClick: (info: IInfo) => void;
  info: IInfo
}

const NftItem = ({onClick, info}: INftItem) => {
  return (
    <div className="md:w-1/3 mt-2 flex flex-col group">
      <div className="flex flex-row">
        <img src={info.imageUrl} className="rounded w-24 h-24 bg-blue-600"></img>
        <div className="pl-4 pr-8 flex flex flex-col">
          <div> {info.tokenId} </div>
          <div className="text-gray-400 text-sm"> {info.contractName} </div>
        </div>
      </div>
      <button onClick={()=>onClick(info)} className="m-4 rounded text-sm bg-blue-700 p-2 px-4 h-10 text-white hidden group-hover:block"> Choose </button>
    </div>
  );
}

export default NftItem;
