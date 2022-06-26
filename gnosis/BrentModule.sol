//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@gnosis.pm/safe-contracts/contracts/GnosisSafe.sol";

contract BrentModule {
    address payable private safeAddress;

    address private tokenAddress;
    uint256 private tokenId;
    address lenderAddress;

    constructor(address _target, address _tokenAddress, address _lenderAddress, uint256 _tokenId) {
      bytes memory initializeParams = abi.encode(_tokenAddress, _tokenId, _lenderAddress);
      setUp(initializeParams);

      tokenAddress = _tokenAddress;
      lenderAddress = _lenderAddress;
      tokenId = _tokenId;
      safeAddress = payable(_target);
    }

    function setUp(bytes memory initializeParams) public virtual {
      (address _tokenAddress, string memory _tokenId, address _lenderAddress) = abi.decode(initializeParams, (address, string, address));

      tokenAddress = _tokenAddress;
      lenderAddress = _lenderAddress;
      tokenId = _tokenId;
    }


    function returnNFT(bytes memory data) public returns (bool success) {
        require(msg.sender == lenderAddress);


        success = GnosisSafe(safeAddress).execTransactionFromModule(
            lenderAddress,
            0,
            data,
            Enum.Operation.Call
        );
        return success;
    }
  }
