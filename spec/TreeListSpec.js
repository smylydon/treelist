describe('Testing TreeNode and TreeList', function() {
	var treeNode;
	var treeList;
	
	var treeContentsLevelOrder = function (treeList,array){
	    var enumerator = treeList.elementsLevelOrder();
	    expect(enumerator instanceof TreeEnumerator).toBe(true);
	    expect(enumerator.hasMoreElements()).toBe(true);
	    
	    while(enumerator.hasMoreElements()){
	        expect(enumerator.nextElement()).toEqual(array.shift());
	    }
	    expect(enumerator.hasMoreElements()).toBe(false);
	};
	
	describe('Test TreeNode', function() {
		
		beforeEach(function() {
			treeNode = new TreeNode();
		});
		
		it('should be an instance of TreeNode.', function() {
			expect(treeNode instanceof TreeNode).toBe(true);
		});
		
		it('should have a value of undefined.', function() {
			expect(treeNode.getValue()).toBe(undefined);
		});
		
		it('should be possible to set value via constuctor.', function() {
			treeNode = new TreeNode(9);
			expect(treeNode.getValue()).toEqual(9);
		});
		
		it('should be possible to use setValue to set the value.', function() {
			treeNode.setValue(7);
			expect(treeNode.getValue()).toEqual(7);
		});
		
		it('should be possible to set leftNode and retrieve it\'s value.', function() {
			expect(treeNode.getLeftNode()).toBe(null);
			treeNode.setLeftNode(new TreeNode(6));
			expect(treeNode.getLeftNode() instanceof TreeNode).toBe(true);
			expect(treeNode.getLeftNode().getValue()).toEqual(6);
		});
		
		it('should be possible to set rightNode and retrieve it\'s value.', function() {
			expect(treeNode.getRightNode()).toBe(null);
			treeNode.setRightNode(new TreeNode(8));
			expect(treeNode.getRightNode() instanceof TreeNode).toBe(true);
			expect(treeNode.getRightNode().getValue()).toEqual(8);
		});
	});
	
	describe('Test empty TreeList', function() {
		beforeEach(function() {
			treeList = TreeListFactory.getTreeList();
		});

		it('should be an instance of TreeList', function() {
	    	expect(treeList instanceof TreeList).toBe(true);
		});
		
		it('should be possible to insert a value and retrieve it.', function() {
		    treeList.insert(9);
			expect( treeList.contains(9)).toBe(true);
			expect( treeList.contains(5)).toBe(false);
		});
	});
	
	describe('Test TreeList', function() {
		beforeEach(function() {
			treeList = TreeListFactory.getTreeList();
		    treeList.insert(9);
		    treeList.insert(7);
		    treeList.insert(8);
		    treeList.insert(6);
		    treeList.insert(11);
		    treeList.insert(10);
		    treeList.insert(12);
		});
		
		it('returns true if a value is present in the tree.', function() {
			for(var i=6; i<13; i++){
			    expect( treeList.contains(i)).toBe(true);
			}
		});
		
		it('returns false if a value is not present in the tree.', function() {
			for(var i=-1; i<5; i++){
			    expect( treeList.contains(i)).toBe(false);
			}
		});
		
		it('should return contents in level order.', function() {
		    var array = [9,7,11,6,8,10,12];
		    treeContentsLevelOrder(treeList,array);
		});
		
		it('should return contents in level order.', function() {
		    var array = [9,7,11,6,8,10,12];
		    treeContentsLevelOrder(treeList,array);
		});	
		
		it('should return contents in numberical  order.', function() {
			var array = [6,7,8,9,10,11,12];
		    var enumerator = treeList.elementsLevelInOrder();
		    
		    expect(enumerator instanceof TreeEnumerator).toBe(true);
		    expect(enumerator.hasMoreElements()).toBe(true);
		    
		    while(enumerator.hasMoreElements()){
		        expect(enumerator.nextElement()).toEqual(array.shift());
		    }
		    expect(enumerator.hasMoreElements()).toBe(false);
		});		
	});
});
