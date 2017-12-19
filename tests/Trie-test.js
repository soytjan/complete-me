import { expect } from 'chai';
import Trie from '../lib/Trie';
import Node from '../lib/Node';


describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie()
  })

  it('expect to exist', () => {
    expect(trie).to.exist;
  });

  // it('expect to create a node when the root doesn\'t have a child', () => {
  //   let letter = 'a';
  //   let node = new Node(letter);

  //   expect(trie.root.children).to.deep.equal({});

  //   trie.insert(letter);

  //   expect(trie.root.children.a).to.deep.equal(node);
  //   expect(trie.root.children).to.not.deep.equal({});
  // });

  it('expect to insert a word when passed in', () => {
    let word1 = 'hello';
    let word2 = 'bye';

    trie.insert(word1);

    expect(trie.count).to.equal(1);

    trie.insert(word2);

    expect(trie.count).to.equal(2);
  })

  it.only('expect to no insert more than one of the same words', () => {
    let word1 = 'hello';
    let word2 = 'hell';
    let word3 = 'hello';

    trie.insert(word1);

    expect(trie.count).to.equal(1);

    trie.insert(word2);

    expect(trie.count).to.equal(2);

    trie.insert(word3);

    expect(trie.count).to.equal(2);
  }) 
})