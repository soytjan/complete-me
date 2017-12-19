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
    // let currNode = this.root;
    // let newString = string;

    this.insertCheck(string, this.root);

  }

  insertCheck(string, node) { 
    let currNode = node;
    let newString;

    if (string.length === 0) {
      if (currNode.children.wordEnd) {
        console.log('REPEAT WORD');
        console.log(JSON.stringify(this.root, null, '\t'));
        return;
      } 
        
      let wordEndNode = new Node('#');
      node.children.wordEnd = wordEndNode;
      this._count++;
      console.log(JSON.stringify(this.root, null, '\t'));
      console.log('-------')
      return;
    }

    if (!currNode.children[string[0]]) {
      let newNode = new Node(string[0]);
      currNode.children[string[0]] = newNode;  
    } 

    newString = string.slice(1);
    currNode = currNode.children[string[0]];



    this.insertCheck(newString, currNode); 
  }

  // WORKING FUNCTION
  // insert(string) {
  //   let currNode = this.root;
  //   let wordEnd = new Node('#');
    
  //   for (let i = 0; i < string.length; i++) {
  //     let newNode = new Node(string[i]);
  //     currNode.children[string[i]] = newNode;
  //     currNode = currNode.children[string[i]];
  //   }

  //   currNode.children.wordEnd = wordEnd; 
  //   this._count++;

  // }

}