/**
*	TreeNode
*
*/
function TreeNode(number){
	var value;
	var leftNode = null;
	var rightNode = null;
	var height = 0;

	if ((typeof number === 'number') && (number % 1 === 0)) {
		value = number;
	}
	
	/**
	* getValue
	* 
	* returns the value of this TreeNode.
	* 
	* @returns {Number}
	*/
	this.getValue = function(){
		return value;
	};
	
	/**
	* setValue
	* 
	* Sets the value of this node to an integer number. The argument is
	* checked to make sure that it is a number and that it is an integer.
	*
	* @param {Number} value must be an integer.
	* @throws {'Node value must be an Integer.'}
	*/
	this.setValue = function(number){
		if ((typeof number === 'number') && (number % 1 === 0)) {
			value = number;
		} else {
			throw new Error('Node value must be an Integer.');
		}
	};
	
	/**
	* getLeftNode
	* 
	* @returns {TreeNode} 
	*/
	this.getLeftNode = function(){
		return leftNode;
	};
	
	/**
	* getRightNode
	* 
	* @returns {TreeNode}
	*/
	this.getRightNode = function(){
		return rightNode;
	};
	
	/**
	* 
	*/
	this.getHeight=function(){
		return height;
	};
	
	/**
	* 
	*/
	this.setHeight=function(value){
		height = value;
	};
	
	/**
	* setNode
	* 
	* Housekeeping function that checks a node is an instance of TreeNode
	* or that is null otherwise throw an error. If the node is ok then
	* it passes to the callback function for assignment.
	*
	* @param {TreeNode} aNode
	* @param {Function} callback
	* @throws {'An instance of TreeNode Required!'}
	*/
	function setNode(aNode,callback){
		if((aNode instanceof TreeNode)||(aNode === null)){
			if(callback) {
				callback(aNode);
			}
		} else {
			throw Error("An instance of TreeNode Required!");
		}
	}
	
	/**
	* setLeftNode
	* Sets the left node. Uses setNode function to make sure the node is an
	* actually instance of TreeNode or null. 
	*
	* @param {TreeNode} aNode
	*/
	this.setLeftNode = function(aNode){
		setNode(aNode,function(node){
			leftNode = node;
		});
	};
	
	/**
	* setRightNode
	* Sets the right node. Uses setNode function to make sure the node is an
	* actually instance of TreeNode or null. 
	*
	* @param {TreeNode} aNode
	*/
	this.setRightNode = function(aNode){
		setNode(aNode,function(node){
			rightNode = node;
		});
	};
}

/**
* TreeEnumerator
* 
*  
*/
function TreeEnumerator(){};

/**
* hasMoreElements
* 
* @return {Boolean} 
*/
TreeEnumerator.prototype.hasMoreElements=function(){};

/**
* nextElement
* 
* @return {Object} 
*/
TreeEnumerator.prototype.nextElement=function(){};

/**
* TreeList
* Create TreeList prototype object, only expose public functions.
*/
function TreeList(){}
TreeList.prototype.contains=function(object){};
TreeList.prototype.insert = function(object){};
TreeList.prototype.findMin=function(node){};
TreeList.prototype.findMax=function(){};
TreeList.prototype.remove = function(object){};
TreeList.prototype.elementsLevelOrder=function(){};
TreeList.prototype.elementsLevelInOrder=function(){};

/**
 * TreeListFactory
 * 
 * has one producer method "getTreeList"
 * 
 * @return {TreeList}  
 */
var TreeListFactory = (function() {

	var height = function(node) {
		if (node === null) {
			return 0;
		}
		var leftHeight = height(node.getLeftNode());
		var rightHeight = height(node.getRightNode());
		return Math.max(leftHeight,rightHeight)+1;
	};
	
	var checkHeight = function(node,parent) {
		var leftNode = node.getLeftNode();
		var rightNode = node.getRightNode();
		
		var testHeight = height(leftNode)-height(rightNode);
		
		if (testHeight > 1) {
			rightNode = leftNode.getRightNode();
			leftNode = leftNode.getLeftNode();
			testHeight = height(leftNode)-height(rightNode);
			if (testHeight > 0) {
				//left-left
				node = rightRotation(node);
			} else {
				//left-right
				leftNode = leftRotation(rightNode);
				node = leftRotation(leftNode);
			}
			if (parent === null ) {
				top = node;
			}else{
				parent.setLeftNode(node);
			}
		}else if (testHeight < -1) {
			leftNode = rightNode.getLeftNode();
			rightNode = rightNode.getRightNode();
			testHeight = height(leftNode)-height(rightNode);
			
			if (testHeight < 0) {
				//right-right
				node = leftRotation(node);
			} else {
				//right-left
				rightNode=rightRotation(leftNode);
				node=leftRotation(rightNode);
			}
			
			if (parent === null) {
				top = node;
			} else {
				parent.setRightNode(node);
			}
		}
	};
	
	var leftRotation = function(node) {
		if (node === null) {
			return;
		}
		var leftNode = node.getLeftNode();
		var rightNode = node.getRightNode();
		if (rightNode === null) {
			return;
		}
		node.setRightNode(rightNode.getLeftNode());
		rightNode.setLeftNode(node);
		return rightNode;
	};
	
	var rightRotation = function(node) {
		if (node === null) {
			return;
		}
		var leftNode = node.getLeftNode();
		var rightNode = node.getRightNode();
		var temp = null;
		if (leftNode === null) {
			return;
		}
		node.setLeftNode(leftNode.getRightNode());
		leftNode.setRigtNode(node);
		return leftNode;
	};
    
    var find = function(object) {
	
		var findNode = function(node) {
			if (node === null) {
				return null;
			}
			
			var value = node.getValue();
			
			if (value === object) {
				return node;
			}else if(object < value) {
				node = node.getLeftNode();
			}else if (object > value) {
				node = node.getRightNode();
			}
			return findNode(node);
		};

		return findNode(this.top);
	};
////////////////////////////////////////////////////////////////////
    
    function TreeObject() {
        this.top = null;
    }
    
	TreeObject.prototype = new TreeList();
    
	TreeObject.prototype.contains = function(object) {
		return find.call(this,object) === null ? false:true;
	};
	
	TreeObject.prototype.insert = function(object) {
		var insertNode = function(current){
			var node;
			if (object <= current.getValue()) {
				node = current.getLeftNode();
				if (node === null) {
					current.setLeftNode(new TreeNode(object,current));
					//checkHeight(current,parent);
				} else {
					insertNode(node);
				}
			} else {
				node = current.getRightNode();
				if (node === null) {
					current.setRightNode(new TreeNode(object,current));
					//checkHeight(current,parent);
				} else {
					insertNode(node);
				}
			}
		};
		
		if (this.top === null) {
			this.top = new TreeNode(object);
		} else {
			insertNode(this.top);
		}
	};
	
    var searchLeft = function(current) {
        return current.getLeftNode() === null ? current : searchLeft(current.getLeftNode());
    };
    
	TreeObject.prototype.findMin = function(node) {
		return node === null ? null : searchLeft(node);
	};
    
    var searchRight = function(node) {
        return node.getRightNode() === null ? node: searchRight(node.getRightNode());
    };
    
	TreeObject.prototype.findMax = function() {
		return top === null ? null: searchRight(this.top);
	};
    
	/**
	*
	*
	*/
	TreeObject.prototype.remove = function(object) {
		var findMinimum = this.findMin;
		
		var removeNode = function(node, parent) {
			if (node === null) return false;
			
			var value = node.getValue();
			var leftNode = node.getLeftNode();
			var rightNode = node.getRightNode();
			
			if (object < value) {
				return removeNode(leftNode,node);
			} else if (object > value) {
				return removeNode(rightNode,node);
			} else {
				if ((leftNode !== null) && (rightNode !== null)) {
					node.setValue(findMinimum(node.getRightNode()).getValue());	
					object = node.getValue();
					removeNode(rightNode,node);						
				}else if (parent.getLeftNode() === node) {
					parent.setLeftNode(leftNode !== null ? leftNode : rightNode );
				}else if (parent.getRightNode() === node) {
					parent.setRightNode(leftNode !== null ? leftNode : rightNode );
				}
				return true;
			}
		};

		if ((this.top === null) || (typeof object === 'undefined')) {
			return false;
		} else {
			var aParent = new TreeNode(0);
			aParent.setLeftNode(this.top);
			var result = removeNode(this.top, aParent);
			this.top = aParent.getLeftNode();
			return result;
		}
	};
//////////////////////////////////////////////////////	
    function levelOrder(top) {
        var queue = [];
        
        if (top !== null) {
            queue.unshift(top);
        }
        
        this.hasMoreElements = function() {
            return queue.length === 0 ? false : true;
        };
        
        this.nextElement = function() {
            var node = queue.pop();
            if (node.getLeftNode() !== null) {
                queue.unshift(node.getLeftNode());
            }
            if (node.getRightNode() !== null) {
                queue.unshift(node.getRightNode());
            }
            return node.getValue();
        };
    }
    levelOrder.prototype = new TreeEnumerator();
    
	TreeObject.prototype.elementsLevelOrder = function() {		
		return new levelOrder(this.top);
	};
	
/////////////////////////////////////////////////////////////////    
    var StackItem = function(node, ready) {
        this.root = node;
        this.isReady = ready;
    };
    
    function inOrder(top) {
        var stack = [];
        
        if (top !== null) {
            stack.push(new StackItem(top, false));
        }
        
        this.hasMoreElements = function() {
            return stack.length === 0 ? false : true;
        };
        
        this.nextElement = function() {
            var stackItem = stack.pop();
            
            while(!stackItem.isReady) {
                var node = stackItem.root;
                if (node.getRightNode() !== null) {
                    stack.push(new StackItem(node.getRightNode(), false));
                }
                stack.push(new StackItem(node,true));
                if (node.getLeftNode() !== null) {
                    stack.push(new StackItem(node.getLeftNode(), false));
                }
                stackItem = stack.pop();
            }
            return stackItem.root.getValue();
        };
    }
    inOrder.prototype = new TreeEnumerator();
    
	TreeObject.prototype.elementsLevelInOrder = function() {
		return new inOrder(this.top);
	};
    
    return  {
        getTreeList: function() {
            return new TreeObject();
        }
    };
    
})();
