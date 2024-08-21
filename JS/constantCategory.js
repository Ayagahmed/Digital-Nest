const categories = [
    { id: 1, value: "Smartphones" },
    { id: 2, value: "Accessories" },
    { id: 3,  value: "Computers" },
    { id: 4,  value: "Tablets" },
    { id: 5,  value: "Wearables" },
    { id: 6,  value: "Monitors" },
    { id: 8, value: "Audio" },
    { id: 9,  value: "Home Appliances" },
    { id: 12, value: "Kitchen Appliances" },
  ];




  // menu dropdown
  const categoriesList = document.getElementById("CategoriesList")
  categories.forEach(category => {
    const li = document.createElement('li');
    const a = document.createElement('a')
    a.classList = 'dropdown-item'
    a.href = `./products.html?category=${category.value}`
    a.innerHTML = category.value
    li.appendChild(a)
    categoriesList.appendChild(li);
  });

 