import { expect } from 'chai';
import Node from '../lib/Node'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('a')
  })

  it('should be a thing', () => {
    expect(node).to.exist
  })

  it('should default children to empty object', () => {
    expect(node.children).to.deep.equal({});
  })

  it('should take data and assign it to data prop', () => {
    expect(node.data).to.equal('a')
  })

})