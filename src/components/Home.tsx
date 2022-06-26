import LendForm from './LendForm';

interface IHome {
  walletInfo: {
    address: string;
    ensAddress: string;
  }
}
const Home = (params: IHome) => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <LendForm walletInfo={params.walletInfo}/>
    </div>
  );
}

export default Home;
