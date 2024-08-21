
const urlParams = new URLSearchParams(window.location.search);
const category = urlParams.get('category')
var idUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
var productsInCart = JSON.parse(localStorage.getItem("productsInCart")) || [];
var numberOfproducts = document.getElementById('cardCounter') || 0;
let products = JSON.parse(localStorage.getItem("products")) || [];


let filteredBycat = products.filter(product => product.category == category);



document.addEventListener("DOMContentLoaded", () => {

  showProducts(category)




  function updateButtonCounts() {

    var cart;
    if (idUser !== null && Object.values(idUser).length > 0) {
      cart = idUser?.Orders
    } else {
      cart = productsInCart
    }

    const countMap = cart.reduce((acc, num) => {
      acc[num] = (acc[num] || 0) + 1;
      return acc;
    }, {});

    const result = Object.entries(countMap).map(([key, value]) => ({
      number: key,
      count: value
    }));

    document.querySelectorAll('.ButtonCart').forEach(button => {
      const productId = button.getAttribute('productid');
      const countObj = result.find(item => item.number === productId);
      const count = countObj ? countObj.count : '';
      button.innerHTML = count || 'Add To Cart';

      if (count > 0) {
        button.innerHTML = count;
        button.disabled = true;
        button.closest('.buttons').querySelector('.minusButton').style.display = 'inline-block';
        button.closest('.buttons').querySelector('.plusButton').style.display = 'inline-block';
        //#region quantity
        if (products.find((p) => p.id == parseInt(productId)).quantity == count)
          button.closest(".buttons").querySelector(".plusButton").disabled = true;
        //#endregion
      } else {
        button.innerHTML = 'Add To Cart';
        button.closest('.buttons').querySelector('.minusButton').style.display = 'none';
        button.closest('.buttons').querySelector('.plusButton').style.display = 'none';
      }

    });



  }



  numberOfproducts.innerHTML = Object.values(idUser).length == 0 ? productsInCart.length : idUser.Orders.length;


  function showProducts(category) {
    const productsContainer = document.getElementById('products');
    const productshead = document.getElementById('heading');




    fetchProducts((products) => {
      const filteredProducts = products.filter(product => product.category == category);

      if (filteredProducts.length <= 0) {
        productsContainer.innerHTML = `<h2 class="mt-5 text-center"> No products Found in  ${category} category</h2>`;
        return;
      }
      productshead.innerHTML = `Products in ${category}`;
      filteredProducts.forEach(product => {
        var productDiv = document.createElement('div');
        productDiv.classList = 'col-md-3 py-3 py-md-0'
        productDiv.innerHTML += ` 
            <div class="card">
                  <a href="details.html?id=${product.id}" style="text-decoration: none;">
                <img src="${product.image}" />
              </a>
              <div class="card-body">
                <h3 class="text-center">${product.name}</h3>
                <h3 class="text-center">$${product.price}</h3>
                <div class="star text-center">
                  <i class="fa-solid fa-star checked"></i>
                  <i class="fa-solid fa-star checked"></i>
                  <i class="fa-solid fa-star checked"></i>
                  <i class="fa-solid fa-star checked"></i>
                  <i class="fa-solid fa-star checked"></i>
                </div>
                <div class="mainButtons">
                  <h2 class="buttons">
                    <button class="minusButton" productid="${product.id}" type="button">-</button>
                    <button class="ButtonCart" productid="${product.id}" type="button"  ${product.quantity == 0 ? "disabled" : ""}>Add To Cart</button>
                    <button class="plusButton" productid="${product.id}" type="button">+</button>
                  </h2>
                </div>
              </div>
          
          </div>`
        productsContainer.appendChild(productDiv);
      });

      updateButtonCounts();
    });
  }





  document.addEventListener("click", (event) => {
    // Add To Cart button
    var productId = event.target.getAttribute("productid");
    var Itemqty = localStorage.getItem(`sq-${productId}`);
    if (event.target.classList.contains("ButtonCart")) {
      const buttonCart = event.target;

      var productsInCart =
        JSON.parse(localStorage.getItem("productsInCart")) || [];
      var idUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
      var allUsers = JSON.parse(localStorage.getItem("Users")) || [];

      idUser?.Orders?.push(productId);

      const updatedusers = allUsers.map((user) => {
        if (user.Id == idUser.Id) {
          return {
            ...user,
            Orders: idUser.Orders,
          };
        }
        return user;
      });

      localStorage.setItem("Users", JSON.stringify(updatedusers));
      localStorage.setItem("CurrentUser", JSON.stringify(idUser));
      productsInCart.push(productId);
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

      const buttonMinus = buttonCart
        .closest(".buttons")
        .querySelector(".minusButton");
      const buttonPlus = buttonCart
        .closest(".buttons")
        .querySelector(".plusButton");
      buttonCart.innerHTML = 1;

      buttonCart.disabled = true;
      buttonMinus.style.display = "inline-block";
      buttonPlus.style.display = "inline-block";
      //#region quantity
      if (products.find((p) => p.id == parseInt(productId)).quantity == 1)
        buttonPlus.disabled = true;
      //#endregion
      numberOfproducts.innerHTML =
        Object.values(idUser).length == 0
          ? productsInCart.length
          : idUser.Orders.length;
    }

    // Handle the Minus button click
    if (event.target.classList.contains("minusButton")) {
      const buttonMinus = event.target;
      const buttonCart = buttonMinus
        .closest(".buttons")
        .querySelector(".ButtonCart");
      let quantity = parseInt(buttonCart.innerHTML);
      var productsInCart =
        JSON.parse(localStorage.getItem("productsInCart")) || [];
      var idUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
      var allUsers = JSON.parse(localStorage.getItem("Users")) || [];

      if (idUser !== null && Object.values(idUser).length > 0) {
        var index = idUser?.Orders?.indexOf(productId);
        idUser?.Orders?.splice(index, 1);
      } else {
        var index = productsInCart.indexOf(productId);

        productsInCart.splice(index, 1);
      }
      const updatedusers = allUsers.map((user) => {
        if (user.Id == idUser.Id) {
          return {
            ...user,
            Orders: idUser.Orders,
          };
        }
        return user;
      });

      localStorage.setItem("Users", JSON.stringify(updatedusers));
      localStorage.setItem("CurrentUser", JSON.stringify(idUser));
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

      var selectedPlus = document.querySelector(".plusButton");
      if (quantity > 1) {
        buttonCart.innerHTML = quantity - 1;
      } else {
        buttonCart.innerHTML = "Add To Cart";
        buttonCart.disabled = false;
        buttonMinus.style.display = "none";
        var buttonPlus = buttonMinus
          .closest(".buttons")
          .querySelector(".plusButton");
        buttonPlus.style.display = "none";
      }

      numberOfproducts.innerHTML =
        Object.values(idUser).length == 0
          ? productsInCart.length
          : idUser.Orders.length;

       //#region quantity
       
      let indexp = filteredBycat.findIndex((p) => p.id === parseInt(productId));
      let activeplus = document.querySelectorAll(".plusButton");
      activeplus[indexp].disabled = false;
      //#endregion
    }

    // Handle the Plus button click
    if (event.target.classList.contains("plusButton")) {
      const buttonPlus = event.target;
      const buttonCart = buttonPlus
        .closest(".buttons")
        .querySelector(".ButtonCart");

      let quantity = parseInt(buttonCart.innerHTML);
      buttonCart.innerHTML = quantity + 1;
      if (Itemqty == buttonCart.innerHTML) {
        buttonPlus.setAttribute("disabled", true);
      } else {
        if (buttonPlus.hasAttribute("disabled")) {
          buttonPlus.removeAttribute("disabled");
        }
      }

      var productsInCart =
        JSON.parse(localStorage.getItem("productsInCart")) || [];
      var idUser = JSON.parse(localStorage.getItem("CurrentUser")) || {};
      var allUsers = JSON.parse(localStorage.getItem("Users")) || [];

      idUser?.Orders?.push(productId);

      const updatedusers = allUsers.map((user) => {
        if (user.Id == idUser.Id) {
          return {
            ...user,
            Orders: idUser.Orders,
          };
        }
        return user;
      });

      localStorage.setItem("Users", JSON.stringify(updatedusers));
      localStorage.setItem("CurrentUser", JSON.stringify(idUser));
      productsInCart.push(productId);
      localStorage.setItem("productsInCart", JSON.stringify(productsInCart));

      numberOfproducts.innerHTML =
        Object.values(idUser).length == 0
          ? productsInCart.length
          : idUser.Orders.length;

       //#region quantity
      if (
        products.find((p) => p.id == parseInt(productId)).quantity ==
        quantity + 1
      )
        buttonPlus.disabled = true;
        //#endregion
    }
  });

});




















