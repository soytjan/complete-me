import { expect } from 'chai';
import Trie from '../lib/Trie';
import Node from '../lib/Node';
import fs from 'fs';

const text = "/usr/share/dict/words";
const dictionary = fs.readFileSync(text).toString().trim().split('\n');


describe('TRIE', () => {
  let trie;

  beforeEach(() => {
    trie = new Trie()
  })

  it('expect to exist', () => {
    expect(trie).to.exist;
  });

  it('expect to have a root node defaulted to a node', () => {
    let node = new Node();

    expect(trie.root).to.deep.equal(node);
  });

  it('expect to have a count property defaulted to zero', () => {
    expect(trie.count).to.equal(0);
  });

  describe('insert', () => {

    it('expect to add a node to the children object of the root', () => {
      trie.insert('a');

      expect(trie.root.children.a).to.exist;
    });

    it('expect to increase count with each word passed in', () => {
      trie.insert('a');

      expect(trie.root.children.a).to.exist;
      expect(trie.count).to.equal(1);
    });

    it('expect to change node wordEnd property to true at the end of a word', () => {
      trie.insert('ab');

      expect(trie.root.children.a.wordEnd).to.equal(false);
      expect(trie.root.children.a.children.b.wordEnd).to.equal(true);
    })

    it('expect to insert multiple nodes to the children object of the root', () => {
      expect(trie.root.children).to.deep.equal({});

      trie.insert('a');
      trie.insert('b');
      trie.insert('c');

      expect(trie.root.children.a.data).to.equal('a');
      expect(trie.root.children.b.data).to.equal('b');
      expect(trie.root.children.c.data).to.equal('c');
    });

    it('expect to insert a nested nodes of a word string', () => {
      let word = 'ace';

      trie.insert(word);

      expect(trie.count).to.equal(1);
      expect(trie.root.children.a.data).to.equal('a');
      expect(trie.root.children.a.children.c.data).to.equal('c');
      expect(trie.root.children.a.children.c.children.e.data).to.equal('e');
    });

    it('expect to not insert more than one of the same words', () => {
      let word1 = 'hello';
      let word2 = 'hell';
      let word3 = 'hello';

      trie.insert(word1);

      expect(trie.count).to.equal(1);

      trie.insert(word2);

      expect(trie.count).to.equal(2);

      trie.insert(word3);

      expect(trie.count).to.equal(2);
    });
  });

  describe('suggest', () => {
    it('expect to return null if no children nodes exist in root', () => {
      expect(trie.suggest('hi')).to.equal(null);
    })

    it('expect to return null if an empty string is suggested', () => {
      expect(trie.suggest('')).to.equal(null);
    })

    it('expect to return null if suggestion doesn\'t exist in the trie', () => {
      let suggestion = trie.suggest('ace');

      expect(suggestion).to.equal(null);      
    });

    // it('expect to return word if suggestion exists', () => {

    // });

    it('expect to return full word based off suggestion', () => {
      trie.insert('ace');

      expect(trie.count).to.equal(1);

      // let suggestion = trie.suggest('a');

      expect(trie.suggest('a')).to.deep.equal(['ace']);
    })

    it('expect to return null if suggestion does not exist', () => {
      trie.insert('ace');

      expect(trie.count).to.equal(1);

      let suggestion = trie.suggest('b');

      expect(suggestion).to.equal(null);
    })

    it('expcet to return all words matching suggestion', () => {
      trie.insert('ace');
      trie.insert('ab');
      trie.insert('baby');

      expect(trie.count).to.equal(3);

      let suggestion = trie.suggest('a');

      expect(suggestion).to.deep.equal(['ace', 'ab']);
    })

    it('expect to return all words matching suggestion when given more complex words', () => {
      trie.insert('pizza');
      trie.insert('pizzeria');
      trie.insert('pizzas');
      trie.insert('pizzazy');
      trie.insert('pillow');
      trie.insert('pi');

      expect(trie.count).to.equal(6);

      let suggestion = trie.suggest('pizz');

      expect(suggestion).to.deep.equal(['pizza', 'pizzas', 'pizzazy', 'pizzeria']);
    })

  });

  describe('populate', () => {
    beforeEach(() => {
      trie.populate(dictionary);
    })

    it('expect to populate trie with 235886 words', () => {
      expect(trie.count).to.equal(235886);
    })
  });

  
})