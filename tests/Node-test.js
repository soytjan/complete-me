import { expect } from 'chai';
import Node from '../lib/Node'

describe('NODE', () => {
  let node;

  beforeEach(() => {
    node = new Node('a')
  })

  it('expect to be a thing', () => {
    expect(node).to.exist
  });

  it('expect to have default children to empty object', () => {
    expect(node.children).to.deep.equal({});
  });

  it('expect to take data and assign it to data prop', () => {
    expect(node.data).to.equal('a')
  });

  it('expect to have a property of wordEnd that defaults to false', () => {
    expect(node.wordEnd).to.equal(false);
  })

  it('expect to have a property of rating that defaults to zero', () => {
    expect(node.rating).to.equal(0);
  })

})