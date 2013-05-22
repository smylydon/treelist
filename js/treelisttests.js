
var treeContentsLevelOrder = function (mytree,array){
    var enumerator = mytree.elementsLevelOrder();
    ok(enumerator instanceof TreeEnumerator, "check that TreeEnumerator is returned by elementsLevelOrder.");
    equal( enumerator.hasMoreElements(), true, "check hasMoreElements is true." );
    
    for(var i in array){
        equal( enumerator.nextElement(), array[i], "check nextElement is "+array[i]+"." );
    }
    equal( enumerator.hasMoreElements(), false, "check hasMoreElements is false." );
};

module('Module A');  
test( "Test TreeNode all functions.", function() {
    var mynode = new TreeNode(9);
    ok(mynode instanceof TreeNode, "check typeof mynode is TreeNode.");
    ok(mynode.getValue() === 9, "value of first node should be 9.");
    mynode.setValue(7);
    ok(mynode.getValue() === 7, "value of first node should be 7.");
    equal( mynode.getLeftNode(), null, "check leftNode is null." );
    equal( mynode.getRightNode(), null, "check rightNode is null." );
    mynode.setLeftNode(new TreeNode(6));
    mynode.setRightNode(new TreeNode(8));
    ok( mynode.getLeftNode() instanceof TreeNode, "check leftNode is not null." );
    ok( mynode.getRightNode() instanceof TreeNode, "check rightNode is not null." );
    equal( mynode.getLeftNode().getValue(), 6, "check leftNode is value is 6." );
    equal( mynode.getRightNode().getValue(), 8, "check rightNode is value is 8." );
});

module('Module B');  
test( "Test TreeList insert and contains", function() {
    var mytree = TreeListFactory.getTreeList();
    ok(mytree instanceof TreeList, "check typeof mytree is TreeList.");
    mytree.insert(9);
    equal( mytree.contains(5), false, "check if tree contains 5." );
    equal( mytree.contains(9), true, "check if tree contains 9." );
    mytree.insert(7);
    mytree.insert(8);
    mytree.insert(6);
    
    mytree.insert(11);
    mytree.insert(10);
    mytree.insert(12);	
    
    for(var i=6; i<13;i++){
        equal( mytree.contains(i), true, "check if tree contains "+i+"." );
    }	 
});

module('Module C');  
test( "Test TreeList level order traversal", function() {
    var mytree = TreeListFactory.getTreeList();
    ok(mytree instanceof TreeList, "check typeof mytree is TreeList.");
    mytree.insert(9);
    mytree.insert(7);
    mytree.insert(8);
    mytree.insert(6);
    
    mytree.insert(11);
    mytree.insert(10);
    mytree.insert(12);	
    
    var array = [9,7,11,6,8,10,12];
    
    treeContentsLevelOrder(mytree,array);
});

module('Module D');  
test( "Test TreeList inorder traversal", function() {
    var mytree = TreeListFactory.getTreeList();
    ok(mytree instanceof TreeList, "check typeof mytree is TreeList.");
    mytree.insert(9);
    mytree.insert(7);
    mytree.insert(8);
    mytree.insert(6);
    
    mytree.insert(11);
    mytree.insert(10);
    mytree.insert(12);	
    
    var enumerator = mytree.elementsLevelInOrder();
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
    var mytree = TreeListFactory.getTreeList();
    ok(mytree instanceof TreeList, "check typeof mytree is TreeList.");
    equal( mytree.remove(), false, "try removing nothing.." );
    equal( mytree.remove(1000), false, "try removing a value not in the tree." );
    equal( mytree.remove(9), false, "try removing 9." );
    
    mytree.insert(30);
    mytree.insert(20);
    mytree.insert(40);
    
    mytree.insert(22);
    mytree.insert(10);
    
    mytree.insert(9);
    mytree.insert(12);	
    
    mytree.insert(21);
    mytree.insert(23);
    
    
    mytree.insert(35);
    mytree.insert(42);
    
    mytree.insert(34);
    mytree.insert(36);	
    
    mytree.insert(41);
    mytree.insert(43);
    
    equal( mytree.remove(), false, "try removing nothing.." );
    equal( mytree.remove(1000), false, "try removing a value (1000) not in the tree." );
    equal( mytree.remove(1), false, "try removing a value (1) not in the tree." );
    equal( mytree.remove(30), true, "try removing 30." );
    
    var array = [34,20,40,10,22,35,42,9,12,21,23,36,41,43];
                 
    treeContentsLevelOrder(mytree,array);
                     
    equal( mytree.remove(36), true, "try removing 36." );
                     
    array = [34,20,40,10,22,35,42,9,12,21,23,41,43];
    treeContentsLevelOrder(mytree,array);
        
    equal( mytree.remove(22), true, "try removing 22." );
        
    array = [34,20,40,10,23,35,42,9,12,21,41,43];
    treeContentsLevelOrder(mytree,array);
});
    
    
    
