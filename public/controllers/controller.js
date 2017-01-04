var myApp=angular.module('myApp',['angular.filter']);




myApp.controller('AppCtrl',['$scope','$http',function(a,b){
    console.log("Hello from controller");
 


a.view=function(prodname){
    var productname=[];
productname.push(prodname);
    console.log(productname[0].name);
    a.name=productname[0].name;
    a.price=productname[0].price;
    a.category=productname[0].category;
    a.description=productname[0].description;
};
    
  
    
    
 /*droplist*/
      
   a.showDrop=function(actualItem){ 
        a.actualItem="men";
        a.droplist=[];
       var templist=[];
       var templist1=[];
       a.actualItem=actualItem;
    b.post('/ecommerce',({dept: actualItem})).then(function(response)		{
          	console.log("i got the data i requested");
        templist.push(response.data);
        var j=0;
       for(var i=0;i<response.data.length;i++){
           templist1.push(templist[0][i].category);
          
       }
       // a.droplist = angular.fromJson(templist1).data;
        a.droplist=templist1;
            //console.log(a.droplist);
           
      
		});
   }
    
 /*category search on click*/   
a.viewProducts=function(cat,dep){
        var responsedata=[];
       
        var appareldata=[];
      
 b.post('/ecommerce',({'dept':dep})).then(function(response){
   
     responsedata.push(response.data);
     
     for(var i=0;i<response.data.length;i++)
     {
 if(responsedata[0][i].category == cat){
      appareldata.push(responsedata[0][i]);
     }
      
     }
    
a.search=appareldata;

});
        
    };
 
/*dept search on click */ 
a.deptProducts=function(dep){
var responsedata=[];
b.post('/ecommerce',({'dept':dep})).then(function(response){
responsedata.push(response.data);
a.search=responsedata[0];
});
};
    
 /*seach box functionality*/
    
var list1=[];
var list2=[];
var list3=[];
a.searchItem=function(){
     var responsedata=[];
console.log(a.nameItem);
 
b.post('/ecommerce',({'name':{'$regex': a.nameItem}})).then(function(response){
        
console.log("Inside post name from database from controller");
console.log(response);
console.log("AFter post in controller");
console.log(response.data.length);
if(response.data.length==0)
{
console.log("No match found in product name");
categoryFunction();
}
else{
 
responsedata.push(response.data);
console.log(responsedata);
//a.seacrh=responsedata[0];
for(var i=0;i<responsedata[0].length;i++){
list1.push(responsedata[0][i]);
}
    categoryFunction();
}

});
};
 
 
var categoryFunction=function(){
 var responsedata=[];
console.log(a.nameItem);

b.post('/ecommerce',({'category':{'$regex': a.nameItem}})).then(function(response){
console.log("from category search");
if(response.data.length==0)
{
console.log("no match found in product category");
deptFunction();
}
else{
responsedata.push(response.data);
console.log(responsedata);
//a.seacrh=responsedata[0];
for(var i=0;i<responsedata[0].length;i++){
list2.push(responsedata[0][i]);
}
  deptFunction();  
}
 
 
});
};
 
var deptFunction=function(){
var responsedata=[];
console.log(a.nameItem);

b.post('/ecommerce',({'dept':{'$regex': a.nameItem}})).then(function(response){
console.log("from dept search");
if(response.data.length==0)
{
console.log("No products found");
   listDetails();
}
else{
responsedata.push(response.data);
console.log(responsedata);
//a.seacrh=responsedata[0];
for(var i=0;i<responsedata[0].length;i++){
list3.push(responsedata[0][i]);
}
 listDetails();   
}
    
});
    
};
var listDetails=function(){
var list=[];
list=list1.concat(list2.concat(list3));
var newArray = removeDuplicate(list, 'name');
console.log(newArray);
if(newArray.length==0)
{
alert("No products found");
}
a.search=newArray;
refresh();
 
};
function removeDuplicate(arr, prop) {
var new_arr = [];
var lookup = {};
for (var i in arr) {
    lookup[arr[i][prop]] = arr[i];
}
for (i in lookup) {
    new_arr.push(lookup[i]);
}
return new_arr;};

var refresh=function(){
list1=[];
list2=[];
list3=[];
list=[];
} ;   

 
}]);