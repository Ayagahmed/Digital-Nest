
var selectedItems =  JSON.parse(localStorage.getItem("CurrentUser"))  
var selectedItemsWithNouser = JSON.parse(localStorage.getItem("productsInCart"))
var  allUsers = JSON.parse(localStorage.getItem("Users")) || [];

function refreshCart() {

    var count;
    var idsToFind ;
    var  numberArray ;
      selectedItems =  JSON.parse(localStorage.getItem("CurrentUser"))  
      selectedItemsWithNouser = JSON.parse(localStorage.getItem("productsInCart")) 
   

    fetchProducts((products) => {
        
        
        
        if(Object.values(selectedItems).length > 0){
         idsToFind = Array.from(new Set(selectedItems.Orders))  
         numberArray =  idsToFind.map(Number);
        
             count = selectedItems?.Orders?.reduce((acc, num) => { 
                acc[num] = (acc[num] || 0) + 1;
                return acc;
             }, {});

        }else {
            idsToFind = Array.from(new Set(selectedItemsWithNouser))
            numberArray =  idsToFind.map(Number);
        
             count = selectedItemsWithNouser.reduce((acc, num) => {
                acc[num] = (acc[num] || 0) + 1;
                return acc;
             }, {});

        }
        
      
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





const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
const appendAlert = (message, type) => {
  const wrapper = document.createElement('div')
  wrapper.innerHTML = [
    `<div class="alert alert-${type} alert-dismissible mt-5 alertstyle" role="alert">`,
    `   <div>${message}</div>`,
    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
    '</div>'
  ].join('')

  alertPlaceholder.append(wrapper)
}






function placeOrder(event){
    event.preventDefault()

    appendAlert('Your Order has been placed successfully ,Thank you.', 'success')
   
    //Remove Ordered Quantity From DB
  
  let userOrder = JSON.parse(localStorage.getItem("CurrentUser"));

 
  fetchProducts(products => {
    for(i = 0; i < userOrder.Orders.length ; i++)
    {
      console.log(products);
      console.log(parseInt(userOrder.Orders[i]));
      let productId = parseInt(userOrder.Orders[i]);
   
      let product =  products.find(p => p.id == productId);
     console.log(product);
      product.quantity --;
    }
    localStorage.setItem("products", JSON.stringify(products));
  })

    var resetOrders = {
      ...selectedItems,         //copy of currentuser Object
      Orders:[]   //exception the orders put the filtered values instead the previous
     } 
     const updatedusers = allUsers.map(user => {
  
      if(user.Id == selectedItems.Id){
        return(
         {
          ...user,
          Orders:[]
         }
        )
      }
      return user;
     }); 
     localStorage.setItem('CurrentUser',JSON.stringify(resetOrders))
     localStorage.setItem("Users",JSON.stringify(updatedusers))
localStorage.removeItem("productsInCart")

setTimeout(function redirectHome() {
    window.location.href = 'index.html'
}, 2000);

    

}










refreshCart()