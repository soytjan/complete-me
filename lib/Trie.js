import Node from '../lib/Node';

export default class Trie {
  constructor() {
    this._count = 0;
    this.root = new Node();
  }

  get count() {
    return this._count;
  }

  insert(string) {
    if (!string.length) {
      return null;
    }

    this.insertHelper(string, this.root);
  }

  insertHelper(string, node) {
    let newString;
    let currNode = node;

    if (!string.length) {
      if (!currNode.wordEnd) {
        currNode.wordEnd = true;
        this._count++;
      }
      return;
    }

    if (!currNode.children[string[0]]) {
      let newNode = new Node(string[0]);

      currNode.children[string[0]] = newNode;
    }

    currNode = currNode.children[string[0]];
    newString = string.slice(1);

    this.insertHelper(newString, currNode);
  }

  suggest(string) {
    if (!string.length) {
      return null;
    }

    let currNode = this.findEndNode(string);

    if (!currNode) {
      return currNode;
    } else {
      return this.suggestHelper(string, currNode, []); 
    }
  }

  suggestHelper(string, node, suggestions) {
    let childLetters = Object.keys(node.children);

    childLetters.forEach(letter => {
      let letterNode = node.children[letter];
      let newWord = string + letter;

      if (letterNode.wordEnd) {
        let wordObj = {word: newWord, rating: letterNode.rating};

        suggestions.push(wordObj);
      }

      this.suggestHelper(newWord, letterNode, suggestions);
    });

    return this.sort(suggestions);
  }
 
  findEndNode(string) {
    let currNode = this.root;
    let word = string;

    while (word.length) {
      if (currNode.children[word[0]]) {
        currNode = currNode.children[word[0]];
        word = word.slice(1);
      } else {
        return null;
      }
    }

    return currNode;
  }

  sort(suggestArray) {
    let objArray = suggestArray.sort((a, b) => {
      return b.rating - a.rating;
    });

    let sortedArray = objArray.map((obj) => {
      return obj.word;
    });

    return sortedArray;
  }

  populate(array) {
    array.forEach(word => this.insert(word));
  }

  select(string) {
    let endNode = this.findEndNode(string);

    endNode.rating++;
  }



  delete(string) {
    let endNode = this.findEndNode(string);

    endNode.wordEnd = false;
  }

}