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
    if (string.length === 0) {
      return null;
    }

    this.insertHelper(string, this.root);

  }

  insertHelper(string, node) { 
    let currNode = node;
    let newString;

    if (string.length === 0) {
      if (!currNode.wordEnd) {
        currNode.wordEnd = true;
        this._count++;
        // console.log(JSON.stringify(this.root, null, '\t'));
        // console.log('-------')
      }
      return;
    }

    if (!currNode.children[string[0]]) {
      let newNode = new Node(string[0]);
      currNode.children[string[0]] = newNode;  
    } 

    newString = string.slice(1);
    currNode = currNode.children[string[0]];

    this.insertHelper(newString, currNode); 
  }

  suggest(string) {
    if (!string.length) {
      return null;
    }

    let currNode = this.root;
    let ogString = string;
    let newString = string;

    while (newString.length) {
      if(currNode.children[newString[0]]) {
        currNode = currNode.children[newString[0]];
        newString = newString.slice(1);
      } else {
        console.log('it is null')
        return null;
      }
    } 

    console.log(newString);  
    return this.suggestHelper(ogString, currNode, []);
  }

  suggestHelper(string, node, suggestions) {
    let childLetters = Object.keys(node.children);

    childLetters.forEach(letter => {
      let letterNode = node.children[letter];
      let newPhrase = string + letter;

      if (letterNode.wordEnd) {
        suggestions.push(newPhrase)
      }

      this.suggestHelper(newPhrase, letterNode, suggestions);
    });
  
    return suggestions;

  }

  populate(array) {
    array.forEach(word => this.insert(word));
  }


}