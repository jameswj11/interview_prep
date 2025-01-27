// JS DATA STRUCTURES AND ALGORITHMS TO KNOW 

/ ******** BASIC FRONTEND ********/

/*
inline-block: flows along with other elements and allows other elements beside, size depends on content
    - used for buttons and images that need custom sizes but stay inline with text
inline: flows along with other elements and allows other elements beside, size depends on content
    - will ignore height and width settings
    - will ignore vertical margins and paddings
    - with float, becomnes a block-like element
    - use for links, text formatting, bold, italics
block: starts on a new line, tolerates no elements next to it, size fills up width of parent container
    - cannot be aligned with vertical-align
    - use for <div>, <p>, <section>

- mouseover bubbles, mouseenter does not bubble
*/

// es6 maps
const newPerson = new Map([
    ['name', 'John'],
    ['age', 30],
    ['occupation', 'Developer'],
  ]);

  // iterable, key-value pairs, can be any type of data


/ ******** REACT *********/

/*
- state is data storage that local to a component that can be changed over time
    - initialized in constructor or 'useState' hook in a functional component
    - state changes are asynchronous and should be done with 'setState' method in class components, or the updater function returned by useState in functional components
- props are immutable attributes passed from a parent component to a child component
    - passed to the child as an argument of child function, or using "this" object in class components
    - allows components to be reusable by passing different data to them
    - can pass functions as well
*/

// state in functional component
import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
    </div>
  );
}

// state in class component
class MyComponent extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        count: 0,
      };
    }
  
    increment = () => {
      this.setState({ count: this.state.count + 1 });
    };
  
    render() {
      return (
        <div>
          <p>Count: {this.state.count}</p>
          <button onClick={this.increment}>Increment</button>
        </div>
      );
    }
  }

  // props in class component
  class ParentComponent extends React.Component {
    render() {
      return <ChildComponent message="Hello, World!" />;
    }
  }
  
  class ChildComponent extends React.Component {
    render() {
      return <p>{this.props.message}</p>;
    }
  }

  // props in functional component
  function ParentComponent() {
    return <ChildComponent message="Hello, World!" />;
  }
  
  function ChildComponent(props) {
    return <p>{props.message}</p>;
  }

  /* call and apply */
  // call and apply invoke a function with the first parameter specifying the context "this" for the invoked function
  // call passes comma-separated arguments, apply passes an array after the initial argument
  const person = {
    name: 'John',
    greet() {
      console.log(`Hello, my name is ${this.name}`);
    },
  };
  
  const anotherPerson = { name: 'Alice' };
  
  person.greet.call(anotherPerson); // Hello, my name is Alice
  person.greet.apply(anotherPerson); // Hello, my name is Alice

  /********** PROXIES */
  
  // common use cases include property assignment validation, logging/debugging, creating reactive systems, data transformation, dynamic property creation
  const myObject = {
    name: 'John',
    age: 42,
  };
  
  const handler = {
    get: function (target, prop, receiver) {
      console.log(`Someone accessed property "${prop}"`);
      return target[prop];
    },
  };
  
  const proxiedObject = new Proxy(myObject, handler);
  
  console.log(proxiedObject.name); // 'John'
  // Someone accessed property "name"
  
  console.log(proxiedObject.value); // 42
  // Someone accessed property "value"

  // example of property access interception
  const target = {
    message: 'Hello, world!',
  };
  
  const handler2 = {
    get: function (target, property) {
      if (property in target) {
        return target[property];
      }
  
      return `Property ${property} does not exist.`;
    },
  };
  
  const proxy = new Proxy(target, handler2);
  
  console.log(proxy.message); // Hello, world!
  console.log(proxy.nonExistentProperty); // Property nonExistentProperty does not exist.


/******* SERVICE WORKER */
// used to cache data
self.addEventListener('install', (event) => {
    event.waitUntil(
      caches.open('v1').then((cache) => {
        return cache.addAll(['/index.html', '/styles.css', '/app.js']); // whatever files in here
      }),
    );
  });
  
  self.addEventListener('fetch', (event) => {
    event.respondWith(
      caches.match(event.request).then((response) => {
        return response || fetch(event.request);
      }),
    );
  });

/********* ARRAY METHODS ********/

////// SPLICE - Use for removing and inserting items //////
/*
    Notes:
        1. negative index count from end of array with -1 being the last index of the array
        2. splice method preserves a sparse array's sparseness 
*/
const arr = [1, 2, 3, 4, 5];

arr.splice(1, 1, 'x'); // remove 1 item at index 1 and insert 'x'
arr.splice(0, 1, 'x', 'y'); // remove 1 item at index 0 and insert 'x' and 'y'
arr.splice(arr.length, 0, 'last'); // remove 0 items at last index and insert 'last'
arr.splice(2); // remove all items starting from index 2

////// SLICE - Returns a shallow copy of a portion of an array //////
/*
    Notes:
        1. end index is not included in the slice
*/
arr.slice(2); // expected output: [3,4,5]
arr.slice(0, 2); // expected output: [1,2]
arr.slice(-2); // expected output: [4,5]
arr.slice(1, -1); // expected output: [2, 4];

////// INDEX OF //////
arr.indexOf(3); // expected output: 2
arr.indexOf(4, 1); // start from index 1

///// CONCAT //////
/*
    Notes: 
        1. concat returns a new array and doesn't modify originals
*/
const arr2 = [6, 7, 8, 9, 10];
arr1.concat(arr2); // expected output: [1,2,3,4,5,6,7,8,9,10]
arr1.concat(10, ['x', 'y']); // expected output: [1,2,3,4,5,10,'x','y']

/********** MAPS *********/
/*
    Notes:
        1. can iterate over a map using for...of and forEach() but not an object
*/

// building a hash map using Map()
const map1 = new Map();
map1.set('name', 'Ming');
map1.set('age', 33);
map1.set('country', 'USA');
console.log(map1) // expected output: {'name' => 'Ming', 'age' => 33, 'country:' => 'USA'}

map1.get('name'); // expected output: 'Ming'
map1.has('age') // true
map1.size; // expected output: 3
map1.delete('age'); // removes key value pair map1['age']

// building a hash map using a plain object, assign key value pairs or iterate over data
const map2 = {};
const data1 = ['a', 'b', 'c', 'a', 'd', 'c', 'b', 'a'];

for (let char of data1) {
    map2[char] = ((map2[char] || 0) + 1);
};
console.log(map2) // expected output: {'a': 3, 'b': 2, 'c': 2, 'd': 1}

// iterating using for...of
for (let [key, value] of map1) {
    console.log(`${key} = ${value})`); // outputs key value pairs in the format 'name' = 'Ming'
};

for (const key of map1.keys()) {
    console.log(key) // outputs all keys
};

for (const value of map1.values()) {
    console.log(value) // outputs all values
};

// iterating with forEach()
map1.forEach((value, key) => {
    console.log(key, value) // outputs all keys and values
})

const kvArray = [
    ["key1", "value1"],
    ["key2", "value2"],
];

// Use the regular Map constructor to transform a 2D key-value Array into a map
const myMap = new Map(kvArray);

console.log(myMap.get("key1")); // "value1"

// Use Array.from() to transform a map into a 2D key-value Array
console.log(Array.from(myMap)); // Will show you exactly the same Array as kvArray

// A succinct way to do the same, using the spread syntax
console.log([...myMap]);

// Or use the keys() or values() iterators, and convert them to an array
console.log(Array.from(myMap.keys())); // ["key1", "key2"]

const first = new Map([
    [1, "one"],
    [2, "two"],
    [3, "three"],
]);

const second = new Map([
    [1, "uno"],
    [2, "dos"],
]);

// Merge two maps. The last repeated key wins.
// Spread syntax essentially converts a Map to an Array
let merged = new Map([...first, ...second]);

console.log(merged.get(1)); // uno
console.log(merged.get(2)); // dos
console.log(merged.get(3)); // three

// Merge maps with an array. The last repeated key wins.
let mergedWithArray = new Map([...first, ...second, [1, "eins"]]);

console.log(margedWithArray.get(1)); // eins
console.log(margedWithArray.get(2)); // dos
console.log(margedWithArray.get(3)); // three

/*********** STACKS ***********/

// data structure that allows for LIFO storage
// creating a stack class below and adding methods 
class Stack {
    constructor() {
        this.items = [];
    };

    push(element) {
        this.items.push(element);
    };

    pop() {  // this method returns and removes the topmost element. if no more items, return an underflow
        if (this.items.length === 0) {
            return 'Underflow';
        } else {
            return this.items.pop(element);
        };
    };

    peek() { // returns the topmost element but does not delete it
        return this.items[this.items.length - 1];
    };

    // HELPER FUNCTIONS
    isEmpty() { // check if empty
        this.items.length === 0 ? true : false;
    };

    printStack() { // returns a concatenated string of all stack elements
        let str = "";
        for (let i = 0; i < this.items.length; i++) {
            str += this.items[i] + " ";
        };
        return str;
    };
};

const newStack = new Stack(); // instantiate a new stack
newStack.push(1); // adds 1
newStack.push(2); // adds 2
newStack.pop(); // returns 2 and removes it from stack
newStack.peek(); // returns 1

console.log(newStack.isEmpty()) // returns false 
console.log(newStack.printStack()) // expected output: [1]

/** SEE LINKED LIST EXAMPLE at https://www.geeksforgeeks.org/javascript-program-for-implementation-of-stack-using-linked-list/ */

/******** QUEUE ********/
/** 
 *  Notes:
 *      1. works on a FIFO basis
 *      2. can add elements to end or remove from front 
 */

// implement a queue class below, keep track of front and back index
// peek and dequeue functions can also be written using array methods
class Queue {
    constructor() {
        this.items = [];
        this.frontIndex = 0;
        this.backIndex = 0;
    };

    enqueue(element) {
        this.items[this.backIndex] = element;
        this.backIndex++;
        return element + ' inserted';
    };

    dequeue() {
        const element = this.items[this.frontIndex];
        delete this.items[this.frontIndex];
        this.frontIndex++;
        return element;
    };

    peek() {
        return this.items[this.frontIndex];
    };

    isEmpty() {
        this.items.length === 0 ? true : false;
    };

    printQueue() {
        return this.items;
    };
};

/** see implementation to generate binary numbers here: https://www.geeksforgeeks.org/interesting-method-generate-binary-numbers-1-n/ */

/********** SET  **********/
// allows you to store UNIQUE values of any types, including primitives or object references
// values may occur only once
// sets have the methods .size(), .has(), and .keys() as well as other built-in methods

// constructor
const newSet = new Set();
Set[Symbol.species]; // constructor function used to create derived objects

// instance properties
Set.prototype.constructor; // constructor function, default value is the Set constructor
Set.prototype.size; // returns number of values in Set object

// isntance methods
Set.prototype.has(value) // check if contains value
Set.prototype.add(value) // inserts new value if there isn't one already with the same value
Set.prototype.clear() // removes all values
Set.prototype.delete(value) // removes element and returns boolean if successfully removed
Set.prototype.entries() // returns an array [value, value] of all entries
Set.prototype.forEach()
Set.prototype.intersection(set2) // returns a new set with overlapping values of Set and set2
Set.prototype.isSubsetOf();
Set.prototype.isSuperSetOf();
Set.prototype.keys(); 
Set.prototype.values();

/******** TREES AND GRAPHS *******/
// graphs are non-linear data structures, they have a pairwise relation of edges(arcs) and vertices(nodes)
// use cases in social networks, as each user is represented as a vertice(node)
//      - each node has details like name, age
//      - relationship between two users is represented as the edge
// other use cases include precedence constraints and road networks

// directed graphs (di-graph) have pairs of ordered (important!) vertices...information flows one direction
// undirected graphs have pairs of vertices where the edges are not directional

// use in adjacency matrix, a 2D Array representing connections between nodes and edges
// https://medium.com/sessionstack-blog/how-javascript-works-introduction-to-graphs-and-trees-708da0020cf8

// use in adjacency lists, an array of linked lists stores data. the index of the array is the vertex and the
// values in the linked list of each array is a vertext as well

// TREES //

// binary search tree 
//      - the left child of each node must have a value less than that of the parent's, and the right child of the same
//        parent node must have a value greater than parent. subtrees of each node are also binary search trees
//      - use binary search algorithm below to search
//      - opeartions in binary search are insertion, deletion, searching

//      - INSERTION:
//          - create a new node, set left and right subtree to null
//          - search the tree, if the tree is empty, add node as root
//          - If the tree is not empty, check if the new node is less than the parent root and if it is, adds it to the left. 
//              - If it is not, check if it is greater than and if it is, add it to the right.

//      - DELETION:
//          - remove the node if no children
//          - removing a node with one child: remove the node and replace it with its child
//          - removing a node with two children: find in-order node of actual node to be removed.
//        
// use cases for binary search tree:
//      - indexing databases
//      - search applications where data is always being inserted and removed

// IMPLEMENTATION OF BINARY SEARCH TREE USING NEW CLASSES

class Node {
    constructor(data) {
        this.data = data;
        this.leftChild = null;
        this.rightChild = null;
    };
};

class BinarySearchTree {
    constructor() {
        // root of a binary search tree
        this.root = null;
    };

    // add to binary search tree
    add(data) {
        if (node === null) {
            this.root = new Node(data); // if no node at root, new node becomes the root
            return;
        } else {
            // check where to put node using recursion
            const searchTree = (node) => {
                if (data < node.data) {
                    if (node.left === null) {
                        node.left = new Node(data);
                        return;
                    } else if (node.left !== null) {
                        // recursion
                        return searchTree(node.left);
                    } else if (data > node.data) {
                        if (node.right === null) {
                            node.right = new Node(data);
                            return;
                        } else if (node.right !== null) {
                            // recursion
                            return searchTree(node.right);
                        };
                    } else {
                        return null;
                    };
                };
                return searchTree(node);
            };
        };
    };

    // remove from binary search tree
    remove(data) {
        const removeNode = function(node, data) {
            if (node === null) return null;

            if (data === node.data) {
                // check if both left and right node have no child, return null
                if (node.left === null && node.right === null) return null;

                // check if left node has child
                if (node.left === null) return node.right;

                // check if right node has child
                if (node.right === null) return node.left;

                let tempNode = node.right;
                while(tempNode.left !== null) {
                    tempNode = node.left;
                };

                node.data = tempNode.data;
                node.right = removeNode(node.right, tempNode.data);
                return node;
            } else if (data < node.data) {
                node.left = removeNode(node.left, data);
                return node;
            } else {
                node.right = removeNode(node.right, data);
                return node;
            };
        };
        this.root = removeNode(this.root, data);
    };

    search(data) {
        let current = this.root;
        while(current.data != data) {
            if (data < current.data) {
                current = current.left;
            } else {
                current = current.right;
            };

            if (current === null) return null;
        };
        return current;
    };
};

/*********** TRIE or PREFIX TREE ***********/
// a tree-like data structure that stores data in a way that makes retrieving and searching efficient
// consists of nodes and edges like a graph or tree
// root node of a trie represents an empty string. each node is a character or set of characters.
// each node below root represents a prefix of one or more words.
// leaf nodes represent complete words.
// tries often used to store strings or other words.

// trie implementation
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndofWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    };

    insert(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];
            if (!node.children[char]) {
                node.children[char] = new TrieNode(); // each child gets its own trie node
            };
            node = node.children[char]; // assign the value to each node
        };
        node.isEndofWord = true; 
    };

    search(word) {
        let node = this.root;
        for (let i = 0; i < word.length; i++) {
            let char = word[i];

            if (!node.children[char]) return false;

            node = node.children[char];
        };
        return node.isEndofWord;
    };

    startsWith(prefix) {
        let node = this.root;
        for (let i = 0; i < prefix.length; i++) {
            let char = prefix[i];
            if (!node.children[char]) return false;

            node = node.children[char];
        };
        return true;
    };
};

// tries are useful for things like autocomplete features, spell checkers, and word search
// AUTOCOMPLETE TRIE IMPLEMENTATION BELOW

const Trie = require("index.js"); // optional import file
const trie = new Trie();

// insert all article titles into the trie
const articleTitles = [
    "JavaScript Basics",
    "Advanced JavaScript Techniques",
    "Introduction to React",
    "Getting Started with Node.js"
];

articleTitles.forEach((title) => trie.insert(title.toLocaleLowerCase()));

// search article titles using the user's query
const userInput = "jav";
const suggestions = [];
let node = trie.root;

for (let i = 0; i < userInput.length; i++) {
    const char = userInput[i];
    if (!node.children[i]) break;
    node = node.children[char];
};

if (node.isEndofWord) {
    suggestions.push(userInput);
};

function findSuggestions(node, prefix) {
    if (node.isEndofWord) {
        suggestions.push(prefix);
    };

    // use recursion here to traverse all of the trie from the starting node
    // to find all complete words that start with that prefix
    for (const [char, child] of Object.entries(node.children)) {
        findSuggestions(child, prefix + char);
    };
};

findSuggestions(node, userInput);
console.log(suggestions) // ['javascript basics', 'advanced javascript techniques']

 /******** GREEDY ALGORITHMS ********/
 // make optimal local decisions until a full solution is found (task scheduling)
 // useful for when minimization or maximization leads to the required solution
 // they work best when the problem exhibits: 
        // - greedy choice property: the optimal solution can be constructed by making the
        //   best local choice at each step.  
        // - optimal substructure: The optimal solution to the problem contains the optimal 
        //   solutions to its subproblems.
        // - well-known greedy algorithms:
        //      - Dijkstra's Algorithm: finds the shortest path between two nodes in a graph.
        //        It works by repeatedly choosing the shortest edge available from the current node.
        //      - Kruskal's Algorithm: finds mimimum spanning tree of a graph. Repeatedly chooses the
        //        edge with the mininum weight that does not create a cycle.
        //      - Fractional Knapsack: involves selecting items with highest value-to-weight ratio to fill
        //        a knapsack with limited capacity. 
        //      - Scheduling and Resource Allocation: schedule jobs or allocate resources efficiently
        //      - Coin change problem: make change for an amount wiht minimal number of coins.
        //      - Huffman Coding: generate a prefix-free code for data compression
        // - greedy algorithms are sensitive to input order
        //
        //
        //
        //