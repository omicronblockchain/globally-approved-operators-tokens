// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../GloballyApprovedOperatorsERC721.sol";

contract GloballyApprovedOperatorsERC721Mock is GloballyApprovedOperatorsERC721 {
  constructor(address[] memory _globallyApprovedOperators) GloballyApprovedOperatorsERC721("Mock", "MCK", _globallyApprovedOperators) {}

  function mint(uint256 _tokenId) external {
    _mint(msg.sender, _tokenId);
  }

  function burn(uint256 _tokenId) external {
    _burn(_tokenId);
  }
}
