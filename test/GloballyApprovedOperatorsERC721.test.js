const { expectRevert } = require('@openzeppelin/test-helpers')

const { artifacts, web3, expect } = require('hardhat')

const GloballyApprovedOperatorsERC721Mock = artifacts.require('GloballyApprovedOperatorsERC721Mock')
const TransferERC721OnBehalf = artifacts.require('TransferERC721OnBehalf')

contract('GloballyApprovedOperatorsERC721', ([a0, a1]) => {
  it('should be able to transfer tokens on behalf of user if globally approved contract', async function () {
    const transferERC721OnBehalf = await TransferERC721OnBehalf.new()
    const erc721 = await GloballyApprovedOperatorsERC721Mock.new([transferERC721OnBehalf.address])

    const tokenId = web3.utils.randomHex(32)

    await erc721.mint(tokenId)

    await transferERC721OnBehalf.transferOnBehalf(
      erc721.address,
      tokenId,
      a1
    )

    expect(
      await erc721.ownerOf(tokenId)
    ).to.equal(a1)
  })

  it('should not be able to set approval for all for self', async function () {
    const erc721 = await GloballyApprovedOperatorsERC721Mock.new([])

    await expectRevert(
      erc721.setApprovalForAll(
        a0,
        true
      ),
      'ERC721: approve to caller'
    )
  })

  it('should not be able to transfer tokens on behalf of user if not globally approved contract', async function () {
    const transferERC721OnBehalf = await TransferERC721OnBehalf.new()
    const erc721 = await GloballyApprovedOperatorsERC721Mock.new([])

    const tokenId = web3.utils.randomHex(32)

    await erc721.mint(tokenId)

    await expectRevert(
      transferERC721OnBehalf.transferOnBehalf(
        erc721.address,
        tokenId,
        a1
      ),
      'ERC721: transfer caller is not owner nor approved'
    )
  })

  it('should be able to transfer tokens on behalf of user if manually approved contract', async function () {
    const transferERC721OnBehalf = await TransferERC721OnBehalf.new()
    const erc721 = await GloballyApprovedOperatorsERC721Mock.new([])

    await erc721.setApprovalForAll(transferERC721OnBehalf.address, true)

    const tokenId = web3.utils.randomHex(32)

    await erc721.mint(tokenId)

    await transferERC721OnBehalf.transferOnBehalf(
      erc721.address,
      tokenId,
      a1
    )

    expect(
      await erc721.ownerOf(tokenId)
    ).to.equal(a1)
  })
});
