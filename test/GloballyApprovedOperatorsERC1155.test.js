const { expectRevert } = require('@openzeppelin/test-helpers')

const { artifacts, web3, expect } = require('hardhat')

const GloballyApprovedOperatorsERC1155Mock = artifacts.require('GloballyApprovedOperatorsERC1155Mock')
const TransferERC1155OnBehalf = artifacts.require('TransferERC1155OnBehalf')

contract('GloballyApprovedOperatorsERC1155', ([a0, a1]) => {
  it('should be able to transfer tokens on behalf of user if globally approved contract', async function () {
    const transferERC1155OnBehalf = await TransferERC1155OnBehalf.new()
    const erc1155 = await GloballyApprovedOperatorsERC1155Mock.new([transferERC1155OnBehalf.address])

    const tokenId = web3.utils.randomHex(32)

    await erc1155.mint(tokenId)

    await transferERC1155OnBehalf.transferOnBehalf(
      erc1155.address,
      tokenId,
      a1
    )

    expect(
      await erc1155.balanceOf(a1, tokenId)
    ).to.bignumber.equal('1')
  })

  it('should not be able to set approval for all for self', async function () {
    const erc1155 = await GloballyApprovedOperatorsERC1155Mock.new([])

    await expectRevert(
      erc1155.setApprovalForAll(
        a0,
        true
      ),
      'ERC1155: setting approval status for self'
    )
  })

  it('should not be able to transfer tokens on behalf of user if not globally approved contract', async function () {
    const transferERC1155OnBehalf = await TransferERC1155OnBehalf.new()
    const erc1155 = await GloballyApprovedOperatorsERC1155Mock.new([])

    const tokenId = web3.utils.randomHex(32)

    await erc1155.mint(tokenId)

    await expectRevert(
      transferERC1155OnBehalf.transferOnBehalf(
        erc1155.address,
        tokenId,
        a1
      ),
      'ERC1155: caller is not owner nor approved'
    )
  })

  it('should be able to transfer tokens on behalf of user if manually approved contract', async function () {
    const transferERC1155OnBehalf = await TransferERC1155OnBehalf.new()
    const erc1155 = await GloballyApprovedOperatorsERC1155Mock.new([])

    await erc1155.setApprovalForAll(transferERC1155OnBehalf.address, true)

    const tokenId = web3.utils.randomHex(32)

    await erc1155.mint(tokenId)

    await transferERC1155OnBehalf.transferOnBehalf(
      erc1155.address,
      tokenId,
      a1
    )

    expect(
      await erc1155.balanceOf(a1, tokenId)
    ).to.bignumber.equal('1')
  })
});
