class Tree {
  constructor(arr) {
    const sorted = [...new Set(arr)].sort((a,b) => a - b); // unpack elements (...) and removes duplicates 
    this.root = this.buildTree(sorted)
  }

  buildTree(arr, start=0, end=arr.length-1) {
    if (start > end) return null;

    let mid = Math.floor((start + end) / 2)
    let node = new Node(arr[mid]);

    node.leftChild = this.buildTree(arr, start, mid-1)
    node.rightChild = this.buildTree(arr, mid+1, end)

    return node;
  }

  insert(value, root=this.root) {
    if (root === null) {
      root = new Node(value)
    }

    if (root.value === value) {
      return root;
    }

    if (value < root.value) {
      root.leftChild = this.insert(value, root.leftChild);
    } else if (value > root.value) {
      root.rightChild = this.insert(value, root.rightChild)
    }

    return root;
  }

  delete(value, root=this.root) {
    if (root === null) return root;

    // Recursively traverses the BST to find the node
    if (value < root.value) {
      root.leftChild = this.delete(value, root.leftChild);
    } else if (value > root.value) {
      root.rightChild = this.delete(value, root.rightChild)
    } 

    // Value matches
    else {
      // option 1: Node has only one child
      if (root.leftChild === null) {
        return root.rightChild;
      } else if (root.rightChild === null) {
        return root.leftChild;
      }

      root.value = this.minValue(root.rightChild); // option 2: Node has two children
      root.rightChild = this.delete(root.value, root.rightChild) // deletes the copy 
    }
    return root;
  }

  find(value, root=this.root) {
    if (root === null || root.value === value) return root;

    if (value < root.value) {
      return this.find(value, root.leftChild);
    } 
    return this.find(value, root.rightChild);
  } 

  // TODO
  levelOrder(callback) {}

  prettyPrint(node = this.root, prefix = '', isLeft = true) {
    if (node === null) return;

    if (node.rightChild !== null) {
      this.prettyPrint(node.rightChild, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
      this.prettyPrint(node.leftChild, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
  };


  log(root = this.root) {
    console.log('Current root:', root.leftChild.value)
  };

  // helper methods
  minValue(root) {
    let min = root.value;

    while (root.leftChild !== null) {
      min = root.leftChild.value;
      root = root.leftChild;
    }
    return min;
  }
}

class Node {
  constructor(value) {
    this.value = value;
    this.leftChild = null; 
    this.rightChild = null;
  }
}

let arr = [27,10,23,2,18,5,9]


let test = new Tree(arr);
test.prettyPrint()
console.log(test.find(9))
