// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract TransferERC1155OnBehalf {
  function transferOnBehalf(address _erc1155Token, uint256 _tokenId, address _to) external {
    ERC1155(_erc1155Token).safeTransferFrom(msg.sender, _to, _tokenId, 1, "");
  }
}
