// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract TransferERC721OnBehalf {
  function transferOnBehalf(address _erc721Token, uint256 _tokenId, address _to) external {
    ERC721(_erc721Token).transferFrom(msg.sender, _to, _tokenId);
  }
}
