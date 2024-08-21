

// const sqKey = "sq-";
// const maxIdProduct = 20;
// const minQ = 50;
// const maxQ = 100;

// const getRandomInt = (min, max) =>
//   Math.floor(Math.random() * (max - min + 1)) + min;

// function setSQ_for_each_Product() {

//   if (!(localStorage.getItem("maxIdProduct") !== null) ||
//      parseInt(localStorage.getItem("maxIdProduct")) !== maxIdProduct) {
    
//       fetchProducts((products) => {
//         localStorage.setItem("maxIdProduct",maxIdProduct);
//         for (var product of products) {
//           if (localStorage.getItem(sqKey + product.id) === null) {
//             localStorage.setItem(sqKey + product.id, getRandomInt(minQ, maxQ));
//             console.log(product.name)
//           }
//         }
//       });
//     }
//     else
//     {console.log(localStorage.getItem("maxIdProduct"))}
// }

// // Cheak it for once when running
// //document.addEventListener("DOMContentLoaded", setSQ_for_each_Product);
// setSQ_for_each_Product();

// function Delete_setSQ() {
//   fetchProducts((products) => {
//     for (product of products) {
//       localStorage.removeItem(sqKey + product.id);
//     }
//   });
// }

// function addToStock(productId, num) {
//   fetchProducts((products) => {
//     let product = products.find((product) => product.id == productId);
//     if (product) {
//       let QP = parseInt(localStorage.getItem(sqKey + product.id)) || 0;
//       localStorage.setItem(sqKey + product.id, QP + num);
//       console.log("Add Sucsses QP = "(QP + num));
//     } else {
//       console.log("No Product with this ID = " + productId);
//     }
//   });
// }

// function subtractToStock(productId, num) {
//   fetchProducts((products) => {
//     let product = products.find((product) => product.id == productId);
//     if (product) {
//       let QP = parseInt(localStorage.getItem(sqKey + product.id)) || 0;
//       if (QP >= num) {
//         localStorage.setItem(sqKey + product.id, QP - num);
//         console.log("subtract sucusses : QP = " + (QP - num));
//       } else {
//         console.log("Not enough stock of product");
//       }
//     } else {
//       console.log("No Product with this ID = " + productId);
//     }
//   });
// }

// const GetNuminStock = (productId) =>
//        parseInt(localStorage.getItem(sqKey + productId)) || 0 ;
    
