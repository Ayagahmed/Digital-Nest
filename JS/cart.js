
var selectedItems =  JSON.parse(localStorage.getItem("CurrentUser"))  
var  allUsers = JSON.parse(localStorage.getItem("Users")) || [];
var selectedItemsWithNouser = JSON.parse(localStorage.getItem("productsInCart")) 


function refreshCart() {

    var count;
    var idsToFind ;
    var  numberArray ;
    var checkOut = document.getElementById('checkOut-button');
     selectedItems =  JSON.parse(localStorage.getItem("CurrentUser"))  
     selectedItemsWithNouser = JSON.parse(localStorage.getItem("productsInCart")) 
    const productsContainer = document.getElementById('productsContainer');
    // Clear the current product list
    productsContainer.innerHTML = '';

    fetchProducts((products) => {
        
        //the next code is to transfer from object to array //{'1','2'} => ["1","2"] => [1,2]
        // why array ? because the foreach and mapping working on arrays 
        //map : using to transfer from array with strings to array with numbers ["1","2"] to [1 , 2]
        //new set : remover the duplicated of the items ids ['1','1','2'] to {'1','2'} then
        //Array.from : to transfer from object to array
        
        if(Object.values(selectedItems).length > 0){
         idsToFind = Array.from(new Set(selectedItems.Orders))  
         numberArray =  idsToFind.map(Number);
        
             count = selectedItems?.Orders?.reduce((acc, num) => { //reducer method : working on array of numbers and needs to study
                acc[num] = (acc[num] || 0) + 1;
                return acc;
             }, {});
        //condition if the cart where empty
        
        if(numberArray.length <=0){
          checkOut.setAttribute("disabled" , true)
        
        }else{
            checkOut.removeAttribute("disabled")
        }
        
        }else {
            idsToFind = Array.from(new Set(selectedItemsWithNouser))
            numberArray =  idsToFind.map(Number);
        
             count = selectedItemsWithNouser.reduce((acc, num) => {
                acc[num] = (acc[num] || 0) + 1;
                return acc;
             }, {});
             if(numberArray.length <=0){
                checkOut.setAttribute("disabled" , true)
              
              }else{
                  checkOut.removeAttribute("disabled")
              }
        }
        
        //the next code is to be sure if the array have the product or not
        //foreach on the products and looping on each one of them and asking if the id in numberarray exit or not
        products.forEach(product => {
           if (numberArray.includes(product.id)) {
               
               const productDiv = document.createElement('div');
               productDiv.className = 'product';
               productDiv.innerHTML = `
               <div class="product-image">
                   <img src="${product.image}" alt="${product.name}">
               </div>
               <div class="product-details">
                   <div class="product-title">${product.name}</div>
                   <p class="product-description">${product.description}</p>
               </div>
               <div class="product-price">${product.price}</div>
               <div class="product-quantity">
                  <span>${count[product.id]}</span>
               </div>
               <div class="product-removal">
                   <button class="btn btn-danger" onclick="RemoveProductsFromCart(${product.id})">Remove</button>
               </div>
               <div class="product-line-price">${count[product.id] * product.price}</div>
           `;
        // pushing the productdiv in productcontainer
           productsContainer.appendChild(productDiv);
           }
        });
        // If you want to calculate the total price for all products in the cart
        const totalCartPrice = products.reduce((total, product) => {
            if (numberArray.includes(product.id)) {
                return total + count[product.id] * product.price;
            }
            return total;
         }, 0);
         
         //using math.ceil to change the value from 323.0000000000 to 323 integr value
         var Tax= Math.ceil(totalCartPrice * 0.14)
         var shipping = 15;
        
         document.getElementById("cart-subtotal").innerHTML=totalCartPrice;
         document.getElementById("cart-total").innerHTML=totalCartPrice + Tax + shipping;
         document.getElementById("cart-tax").innerHTML= Tax;
         document.getElementById("cart-shipping").innerHTML= shipping;
        
        
        });
}







function RemoveProductsFromCart(id){
    if(Object.values(selectedItems).length > 0){
        
       var userorders = selectedItems.Orders
       var filteredValues = userorders.filter((ordersItem)=>ordersItem != id)
      var CurrentUserAfterfilter = {
        ...selectedItems,         //copy of currentuser Object
        Orders:filteredValues   //exception the orders put the filtered values instead the previous
       }
       const updatedusers = allUsers.map(user => {
  
        if(user.Id == selectedItems.Id){
          return(
           {
            ...user,
            Orders:filteredValues
           }
          )
        }
        return user;
       });
      
  
       localStorage.setItem("Users",JSON.stringify(updatedusers))
      localStorage.setItem('CurrentUser',JSON.stringify(CurrentUserAfterfilter))

       }
           
else {
    var noUserOrder = selectedItemsWithNouser 
    var filteredValues = noUserOrder.filter((ordersItem)=>ordersItem != id)
      
localStorage.setItem("productsInCart",JSON.stringify(filteredValues))
}[]

  // Refresh the cart to reflect the changes
  refreshCart();
}


function checkOut() {
    if (localStorage.getItem('CurrentUser') === null || Object.values(JSON.parse(localStorage.getItem('CurrentUser'))).length <= 0) {
        alert("You must have an account in order to checkout");
        window.location.href = "register.html";
        return;
    } else {
        window.location.href = "checkout.html";
        
    }
}




refreshCart() 