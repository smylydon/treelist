
var treeContentsLevelOrder = function (treeList,array){
    var enumerator = treeList.elementsLevelOrder();
    ok(enumerator instanceof TreeEnumerator, "check that TreeEnumerator is returned by elementsLevelOrder.");
    equal( enumerator.hasMoreElements(), true, "check hasMoreElements is true." );
    
    for(var i in array){
        equal( enumerator.nextElement(), array[i], "check nextElement is "+array[i]+"." );
    }
    equal( enumerator.hasMoreElements(), false, "check hasMoreElements is false." );
};

module('Module A');  
test( "Test TreeNode all functions.", function() {
    var treeNode = new TreeNode(9);
    ok(treeNode instanceof TreeNode, "check treeNode is an instance of TreeNode.");
    ok(treeNode.getValue() === 9, "check constructor set value of node to 9.");
    treeNode.setValue(7);
    ok(treeNode.getValue() === 7, "check setValue set node to 7.");
    equal( treeNode.getLeftNode(), null, "check getLeftNode returns null." );
    equal( treeNode.getRightNode(), null, "check getRightNode returns null." );
    treeNode.setLeftNode(new TreeNode(6));
    treeNode.setRightNode(new TreeNode(8));
    ok( treeNode.getLeftNode() instanceof TreeNode, "check leftNode is not null." );
    ok( treeNode.getRightNode() instanceof TreeNode, "check rightNode is not null." );
    equal( treeNode.getLeftNode().getValue(), 6, "check leftNode was set to a value of 6." );
    equal( treeNode.getRightNode().getValue(), 8, "check rightNode was set to a value of 8." );
});

module('Module B');  
test( "Test TreeList insert and contains", function() {
    var treeList = TreeListFactory.getTreeList();
    ok(treeList instanceof TreeList, "check typeof treeList is TreeList.");
    treeList.insert(9);
    equal( treeList.contains(5), false, "check if tree contains 5." );
    equal( treeList.contains(9), true, "check if tree contains 9." );
    treeList.insert(7);
    treeList.insert(8);
    treeList.insert(6);
    
    treeList.insert(11);
    treeList.insert(10);
    treeList.insert(12);	
    
    for(var i=6; i<13; i++){
        equal( treeList.contains(i), true, "check if tree contains "+i+"." );
    }	 
});

module('Module C');  
test( "Test TreeList level order traversal", function() {
    var treeList = TreeListFactory.getTreeList();
    ok(treeList instanceof TreeList, "check typeof treeList is TreeList.");
    treeList.insert(9);
    treeList.insert(7);
    treeList.insert(8);
    treeList.insert(6);
    
    treeList.insert(11);
    treeList.insert(10);
    treeList.insert(12);	
    
    var array = [9,7,11,6,8,10,12];
    
    treeContentsLevelOrder(treeList,array);
});

module('Module D');  
test( "Test TreeList inorder traversal", function() {
    var treeList = TreeListFactory.getTreeList();
    ok(treeList instanceof TreeList, "check typeof treeList is TreeList.");
    treeList.insert(9);
    treeList.insert(7);
    treeList.insert(8);
    treeList.insert(6);
    
    treeList.insert(11);
    treeList.insert(10);
    treeList.insert(12);	
    
    var enumerator = treeList.elementsLevelInOrder();
    ok(enumerator instanceof TreeEnumerator, "check that TreeEnumerator is returned by elementsLevelOrder.");
    equal( enumerator.hasMoreElements(), true, "check hasMoreElements is true." );
    
    equal( enumerator.nextElement(), 6, "check nextElement is 6." );
    equal( enumerator.nextElement(), 7, "check nextElement is 7." );
    equal( enumerator.nextElement(), 8, "check nextElement is 8." );
    
    equal( enumerator.nextElement(), 9, "check nextElement is 9." );
    equal( enumerator.nextElement(), 10, "check nextElement is 10." );
    equal( enumerator.nextElement(), 11, "check nextElement is 11." );
    equal( enumerator.nextElement(), 12, "check nextElement is 12." );
});

module('Module E');  
test( "Test TreeList remove node.", function() {
    var treeList = TreeListFactory.getTreeList();
    ok(treeList instanceof TreeList, "check typeof treeList is TreeList.");
    equal( treeList.remove(), false, "try removing nothing from tree." );
    equal( treeList.remove(1000), false, "try removing a value (1000) not in the tree." );
    equal( treeList.remove(9), false, "try removing a value (9) not in the tree." );
    
    treeList.insert(30);
    treeList.insert(20);
    treeList.insert(40);
    
    treeList.insert(22);
    treeList.insert(10);
    
    treeList.insert(9);
    treeList.insert(12);	
    
    treeList.insert(21);
    treeList.insert(23);
    
    
    treeList.insert(35);
    treeList.insert(42);
    
    treeList.insert(34);
    treeList.insert(36);	
    
    treeList.insert(41);
    treeList.insert(43);
    
    equal( treeList.remove(), false, "try removing nothing.." );
    equal( treeList.remove(1000), false, "try removing a value (1000) not in the tree." );
    equal( treeList.remove(1), false, "try removing a value (1) not in the tree." );
    equal( treeList.remove(30), true, "try removing 30." );
    
    var array = [34,20,40,10,22,35,42,9,12,21,23,36,41,43];
                 
    treeContentsLevelOrder(treeList,array);
                     
    equal( treeList.remove(36), true, "try removing 36." );
                     
    array = [34,20,40,10,22,35,42,9,12,21,23,41,43];
    treeContentsLevelOrder(treeList,array);
        
    equal( treeList.remove(22), true, "try removing 22." );
        
    array = [34,20,40,10,23,35,42,9,12,21,41,43];
    treeContentsLevelOrder(treeList,array);
});
    
    
    
