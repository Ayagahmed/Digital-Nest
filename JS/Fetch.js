
function setProducts(){
  const xhttp = new XMLHttpRequest();
  xhttp.open("GET", "/Json/products.json", true);
  xhttp.send()

  xhttp.onreadystatechange = function () {
    if (xhttp.readyState === 4 && xhttp.status === 200) {
      const products = JSON.parse(xhttp.responseText);
      localStorage.setItem('products',JSON.stringify(products))
    }
  };

}

if (localStorage.getItem('products') == null)
   setProducts();
  //const products = JSON.parse(localStorage.getItem('products')) || []; 

  
function fetchProducts(callback) {
  const products = JSON.parse(localStorage.getItem('products')) || []; 

  callback(products);
  }