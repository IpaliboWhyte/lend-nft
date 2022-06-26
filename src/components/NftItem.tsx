const NftItem = ({onClick}: {onClick: ()=>void}) => {
  return (
    <div className="w-full mt-2 flex flex-row group">
      <div className="rounded w-14 h-14 bg-pink-600"></div>
      <div className="pl-4 flex flex flex-col">
        <div> #322 </div>
        <div className="text-gray-400 text-sm"> 0xBC4CA0EdA7647A8aB7C2061c2E118A18a936f13D </div>
      </div>
      <button onClick={onClick} className="rounded bg-blue-700 ml-4 p-2 text-white hidden group-hover:block"> Choose </button>
    </div>
  );
}

export default NftItem;
