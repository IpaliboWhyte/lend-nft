async function createSafe() {
  const provider = getDefaultProvider(process.env.RINKEBY_URL);
  const signer = new Wallet (
    process.env.PRIVATE_KEY || '',
    provider
  )

  const ethAdapter = new EthersAdapter({
    ethers,
    signer
  })

  const safeFactory = await SafeFactory.create({ethAdapter})

  const owners = [signer.address];
  const threshold = 1
  const safeAccountConfig: SafeAccountConfig = {
    owners,
    threshold,
    fallbackHandler : "0xf48f2B2d2a534e402487b3ee7C18c33Aec0Fe5e4",
  }

  const safeSdk: Safe = await safeFactory.deploySafe({ safeAccountConfig })
  const safeAddress = safeSdk.getAddress();

  console.log("safe deployed:", safeAddress);
}

async function deployModulesAndGuardConracts() {
  const BrentGuard = await ethers.getContractFactory("BrentGuard");
  const guard = await BrentGuard.deploy("0xFf1df8f17aC935087592120A0E2C7c45f1CeE483", "0xFf1df8f17aC935087592120A0E2C7c45f1CeE483");

  await guard.deployed();

  const BrentModule = await ethers.getContractFactory("BrentModule");
  const module = await BrentModule.deploy("0xFf1df8f17aC935087592120A0E2C7c45f1CeE483", "0xFf1df8f17aC935087592120A0E2C7c45f1CeE483", "0xFf1df8f17aC935087592120A0E2C7c45f1CeE483", "115");

  await module.deployed();
}

// This will add the Module to ensure that only the lender can withdraw the NFT
async function addModuleToSafe() {

  const provider = getDefaultProvider(process.env.RINKEBY_URL);
  const signer = new Wallet (
    process.env.PRIVATE_KEY || '',
    provider
  )

  const ethAdapter = new EthersAdapter({
    ethers,
    signer
  })

  const safeSdk: Safe = await Safe.create({ ethAdapter: ethAdapter, safeAddress })

  const safeTransaction = await safeSdk.getEnableModuleTx(moduleAddress)
  const txResponse = await safeSdk.executeTransaction(safeTransaction)
  const tx = await txResponse.transactionResponse?.wait()
}

async function addGuardToSafe() {
  
}

//borrower must be added after modules and guards are added
async function addBorrowerToSafe(borrowerAddress: string) {
  const params: AddOwnerTxParams = {
   borrowerAddress,
   2 
  }
  const safeTransaction = await safeSdk.getAddOwnerTx(params)
  const txResponse = await safeSdk.executeTransaction(safeTransaction)
  await txResponse.transactionResponse?.wait()
}

async function sendNFTsToSafe(tokenAddress: string, tokenId: number) {
  const nft = new ethers.Contract(
    tokenAddress,
    ER721ABI,
    signer
  );

  nft.safeTransferFrom(lender, smartContractAddress, tokenId)
}

//lender can call module function to retireve NFTs from Safe
async function withdrawNFTsFromSafe(tokenAddress: string, tokenId: string) {
  const module = new ethers.Contract(
    tokenAddress,
    ER721ABI,
    signer
  );
  
  module.returnNFT()
}
