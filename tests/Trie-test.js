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

      let endNode = trie.findEndNode('ab');

      expect(trie.root.children.a.wordEnd).to.equal(false);
      expect(endNode.wordEnd).to.equal(true);
    })

    it('expect to have wordEnd property set to false when a word is not a word', () => {
      trie.populate(dictionary);

      let endNode = trie.findEndNode('pizz');

      expect(endNode.wordEnd).to.equal(false);
    })

    it('expect to increase count property when a new word is inserted', () => {
      trie.insert('hello');

      expect(trie.count).to.equal(1);

      trie.insert('bye');

      expect(trie.count).to.equal(2);
    });

    it('expect to not increase count property when a repeat word is inserted', () => {
      trie.insert('hello');

      expect(trie.count).to.equal(1);

      trie.insert('hello');

      expect(trie.count).to.equal(1);
    });

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
    });

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
    });

    it('expect to find words in the dictionary when running suggest', () => {
      let suggestions = trie.suggest("piz");

      expect(suggestions).to.deep.equal(["pize", "pizza", "pizzeria", "pizzicato", "pizzle"]);
    });
  });

  describe('select', () => {
    beforeEach(() => {
      trie.populate(dictionary);
    });

    it('expect to increase rating property of end node when selected', () => {
      trie.insert('pizza');
      let endNode = trie.findEndNode('pizza');

      expect(endNode.rating).to.equal(0);

      trie.select('pizza');

      endNode = trie.findEndNode('pizza');

      expect(endNode.rating).to.equal(1);
    });

    it('expect to increase rating property of end node when selected multiple times', () => {
      let endNode = trie.findEndNode('pizza');

      expect(endNode.rating).to.equal(0);

      trie.select('pizza');
      trie.select('pizza');
      trie.select('pizza');
      trie.select('pizza');

      endNode = trie.findEndNode('pizza');

      expect(endNode.rating).to.equal(4);
    });

    it('expect to return an array with the most selected word first', () => {
      trie.select('pizzeria')

      let suggestions = trie.suggest('pizz');

      expect(suggestions).to.deep.equal(['pizzeria', 'pizza', 'pizzicato', 'pizzle']);
    });

    it('expect to return an array with the highest rated words in order of their ratings', () => {
      let suggestions = trie.suggest('pizz');

      expect(suggestions).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);

      trie.select('pizzle');
      trie.select('pizzle');
      trie.select('pizzle');
      trie.select('pizzle');

      trie.select('pizzicato');
      trie.select('pizzicato');

      suggestions = trie.suggest('pizz');

      expect(suggestions).to.deep.equal(['pizzle', 'pizzicato', 'pizza', 'pizzeria']);
    });
  })

  describe('delete', () => {
    beforeEach(() => {
      trie.populate(dictionary);
    })

    it('expect to not return word in suggested array when it is deleted', () => {
      let suggestions = trie.suggest('pizz');

      expect(suggestions).to.deep.equal(['pizza', 'pizzeria', 'pizzicato', 'pizzle']);

      trie.delete('pizza');

      suggestions = trie.suggest('pizz');

      expect(suggestions).to.deep.equal(['pizzeria', 'pizzicato', 'pizzle']);
    });

    it('expect to change wordEnd property on last node of word when it is deleted', () => {
      let endNodePizza = trie.findEndNode('pizza');

      expect(endNodePizza.wordEnd).to.equal(true);

      trie.delete('pizza');

      endNodePizza = trie.findEndNode('pizza');

      expect(endNodePizza.wordEnd).to.equal(false);
    })
  });  
})