
// let tbody = document.getElementById("tbody")



// // fetch function
// fetch("http://localhost:3000/user")
//     .then(res => res.json())
//     .then(json => {
//         json.map(data => {
//             console.log(data)
//             tbody.append(td_fun(data));
//         })
//     })

// // create td
// function td_fun({ profile, name, email, status, role}){
//     let td = document.createElement('tr');
//     td.innerHTML = `
//     <td class="px-6 py-4 whitespace-nowrap">
//         <div class="flex items-center">
//                 <div class="flex-shrink-0 h-10 w-10">
//                     <img src="${profile}" class="h-10 w-10 rounded-full" alt="">
//                 </div>
//                 <div class="ml-4">
//                     <div class="text-sm font-medium text-gray-900">
//                         ${name}
//                     </div>
//                     <div class="text-sm text-gray-500">
//                         ${email}
//                     </div>
//                 </div>
//             </div>
//     </td>
//     <td class="px-6 py-4 whitespace-nowrap">
//         <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
//            ${status}
//         </span>
//     </td>
//     <td class="px-6 py-4 whitespace-nowrap">
//         <span class="text-sm text-gray-500">${role}</span>
//     </td>
//     `;
//     return td;
// }

// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:3000`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const pitchURL = `${baseServerURL}/pitches`;
let mainSection = document.getElementById("data-list-wrapper");

// pitch
let pitchTitleInput = document.getElementById("pitch-title");
let pitchImageInput = document.getElementById("pitch-image");
let pitchCategoryInput = document.getElementById("pitch-category");
let pitchfounderInput = document.getElementById("pitch-founder");
let pitchPriceInput = document.getElementById("pitch-price");
let pitchCreateBtn = document.getElementById("add-pitch");

// Update pitch
let updatePitchIdInput = document.getElementById("update-pitch-id");
let updatePitchTitleInput = document.getElementById("update-pitch-title");
let updatePitchImageInput = document.getElementById("update-pitch-image");
let updatePitchfounderInput = document.getElementById("update-pitch-founder");
let updatePitchCategoryInput = document.getElementById("update-pitch-category");
let updatePitchPriceInput = document.getElementById("update-pitch-price");
let updatePitchBtn = document.getElementById("update-pitch");

//Update price
let updatePricePitchId = document.getElementById("update-price-pitch-id");
let updatePricePitchPrice = document.getElementById("update-price-pitch-price");
let updatePricePitchPriceButton = document.getElementById("update-price-pitch");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterFood = document.getElementById("filter-Food");
let filterElectronics = document.getElementById("filter-Electronics");
let filterPersonalCare = document.getElementById("filter-Personal-Care");

//Search by title/founder
let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");


let arr = [];
function get_Data() {
  fetch(`http://localhost:3000/pitches`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      arr.push(data);
      display(data);
    })
    .catch((err) => console.log(err));
}

window.addEventListener("load", () => {
  get_Data();
});

function display(data) {
  mainSection.innerHTML = "";
  data.forEach((ele, i) => {
    let card_List = document.createElement("div");
    card_List.setAttribute("class", "card-list");
    let card = document.createElement("div");
    card.setAttribute("class", "card");
    let card_Img = document.createElement("div");
    card_Img.setAttribute("class", "card-img");
    let img = document.createElement("img");
    img.src = ele.image;
    let card_Body = document.createElement("div");
    let card_Title = document.createElement("h4");
    card_Title.setAttribute("class", "card-title");
    card_Title.innerHTML = ele.title;
    let card_Founder = document.createElement("p");
    card_Founder.setAttribute("class", "card-founder");
    card_Founder.innerHTML = ele.founder;
    let card_Category = document.createElement("p");
    card_Category.setAttribute("class", "card-category");
    card_Category.innerHTML = ele.category;
    let card_Price = document.createElement("p");
    card_Price.setAttribute("class", "card-price");
    card_Price.innerHTML = ele.price;
    let Edit_link = document.createElement("a");
    Edit_link.setAttribute("class", "card-link");
    Edit_link.innerHTML = "Edit";
    let Delete = document.createElement("button");
    Delete.innerHTML = "Delete";
    Delete.setAttribute("class", "card-button");
    card_Img.append(img);
    card_Body.append(
      card_Title,
      card_Founder,
      card_Category,
      card_Price,
      Edit_link,
      Delete
    );
    card.append(card_Img, card_Body);
    card_List.append(card);
    mainSection.append(card_List);
    Delete.addEventListener("click", () => {
      deletepitch(ele.id);
    });
    Edit_link.addEventListener("click", (e) => {
      e.preventDefault();
      updataLinkData(ele);
    });
  });
}



const sortLowToHighButton = document.querySelector('#sort-low-to-high');
const sortHighToLowButton = document.querySelector('#sort-high-to-low');

sortLowToHighButton.addEventListener('click', () => {
  sortPitchesByPrice('asc');
});

sortHighToLowButton.addEventListener('click', () => {
  sortPitchesByPrice('desc');
});


function sortPitchesByPrice(order) {
  const cardList = document.querySelectorAll('.card-list');

  // Convert cardList NodeList to an array
  const pitches = Array.from(cardList);

  pitches.sort((a, b) => {
    const priceA = parseFloat(a.querySelector('.card-price').textContent);
    const priceB = parseFloat(b.querySelector('.card-price').textContent);

    if (order === 'asc') {
      return priceA - priceB;
    } else {
      return priceB - priceA;
    }
  });

  // Remove existing pitch cards from the DOM
  cardList.forEach((card) => {
    card.remove();
  });

  // Append sorted pitch cards back to the main section
  pitches.forEach((pitch) => {
    mainSection.appendChild(pitch);
  });
}


function updataLinkData(obj) {
  updatePitchIdInput.value = obj.id;
  updatePitchTitleInput.value = obj.title;
  updatePitchImageInput.value = obj.image;
  updatePitchfounderInput.value = obj.founder;
  updatePitchCategoryInput.value = obj.category;
  updatePitchPriceInput.value = obj.price;
  updatePricePitchId.value = obj.id;
  updatePricePitchPrice.value = obj.price;
}

let deletepitch = (id) => {
  fetch(`${pitchURL}/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      get_Data();
    })
    .catch((err) => {
      console.log(err);
    });
};

function addpitch(obj) {
  fetch(pitchURL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      get_Data();
    })
    .catch((err) => {
      console.log(err);
    });
}

pitchCreateBtn.addEventListener("click", () => {
  let obj = {
    title: pitchTitleInput.value,
    price: pitchPriceInput.value,
    image: pitchImageInput.value,
    category: pitchCategoryInput.value,
    founder: pitchfounderInput.value,
  };
  addpitch(obj);
});
updatePitchBtn.addEventListener("click", () => {
  let obj = {
    title: updatePitchTitleInput.value,
    price: updatePitchPriceInput.value,
    image: updatePitchImageInput.value,
    category: updatePitchCategoryInput.value,
    founder: updatePitchfounderInput.value,
  };
  let id = updatePitchIdInput.value;
  updataPitch(obj, id);
});

function updataPitch(obj, id) {
  fetch(`${pitchURL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(obj),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      get_Data();
    })
    .catch((err) => console.log(err));
}

searchByButton.addEventListener("click", () => {
  console.log(searchBySelect.value, searchByInput.value);
  searchBy(searchBySelect.value, searchByInput.value);
});
function searchBy(whom, input) {
  if (whom) {
    fetch(`${pitchURL}?${whom}=${input}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        display(data);
      })
      .catch((err) => console.log(err));
  } else {
    get_Data();
  }
}

sortAtoZBtn.addEventListener("click", () => {
  fetch(`${pitchURL}?_sort=price&_order=asc`)
    .then((res) => res.json())
    .then((data) => {
      display(data);
    });
});
sortZtoABtn.addEventListener("click", () => {
  fetch(`${pitchURL}?_sort=price&_order=desc`)
    .then((res) => res.json())
    .then((data) => {
      display(data);
    });
});

filterFood.addEventListener("click", () => {
  let food = "Food";
  fetch(`${pitchURL}?category=${food}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display(data);
    });
});
filterElectronics.addEventListener("click", () => {
  let food = "Electronics";
  fetch(`${pitchURL}?category=${food}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display(data);
    });
});


filterPersonalCare.addEventListener("click", () => {
  let food = "Personal Care";
  fetch(`${pitchURL}?category=${food}`)
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      display(data);
   });
});