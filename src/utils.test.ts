import { expect } from 'chai'
import { arweaveUrl } from './utils'

describe('arweave url', () => {
  it('should replace with the proper arweave url', () => {
    expect(arweaveUrl('ar://test/1.png')).to.equal('https://arweave.net/test/1.png');
  })
})