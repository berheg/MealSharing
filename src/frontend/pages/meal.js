const formBtn = document.querySelector('button.formBtn');
const phoneInput = document.querySelector('input.phoneInput');
const nameInput = document.querySelector('input.nameInput');
const emailInput = document.querySelector('input.emailInput');
const guestInput = document.querySelector('input.guestInput');
const searchInput = document.querySelector('input.searchInput');
const listSelect = document.querySelector('list.listSelect');
const h2 = document.querySelector('h2.mealId');
const h3 = document.querySelector('h3.formH3');
let id;
async function mealsId(req, router) {
  getBodyContainer();
  //id = req.param.id;
  //h2.innerHTML += id;
  const data = await fetchServer();
  await renderHTML(data);
  formBtn.addEventListener('click', formBtnEventHandler)
  searchBtn.addEventListener('keyup',inputEventHandler);
  searchInput.addEventListener('keyup',searchMealList(searchInput.value));
  listSelect.addEventListener('click', () =>searchInput.innerHTML = listSelect.value);
  //search input blur event handler
  searchInput.addEventListener('blur', () =>{
  searchInput.value = '';
  selectListDiv.style.display = none;
});
}
async function fetchServer(){
  const res = await fetch(`/api/meals/`);
  const jsonData = await res.json();
  console.log(jsonData[0]);
  console.log(jsonData);
  return jsonData;
}
function renderHTML(data){
  data.forEach((element) => {
              const ulTitle = document.querySelector('ul.mealTitle');
              const ulList = document.querySelector('ul.mealUl');
              const div = document.createElement('figure');
              div.innerHTML = ` <div class="card" style="width: 20rem;">
                                 <div class="card-body">
                                 <img class="card-img-top" src="../../../assets/${element.title}.jpg" alt="${element.title}" />
                                 <h5 class="card-title">${element.title}</h5>
                                 <p class="card-text">${element.description}</p>
                                 <a href="meal/${element.id}" class="btn btn-primary">Read More</a>
                                 </div>
                                 </div>`;
              ulList.appendChild(div);
           });
  }

function getBodyContainer(){
  document.body.innerHTML = `
  <div id="background" class="">
  <!--header start-->
  <header>
    <img class="logo" src="favicon.ico" alt="Logo of the company"
    />
    <h1 class="logo-h1">ZOLLA RESTURANT</h1>
    <nav class="navbar">
      <a href="/">Home</a>
      <a href="/meals">Menu</a>
      <a href="/review">Review</a>
    </nav>
  </header>  <!--header end-->
  <aside>
  <form action="/api/reservations" class="reservationForm">
  <h3 class="formH3">Avialable Reservations:</h3>
  <label for="name">Reservation Form</label>
  <input type="number"class="phoneInput" required placeholder="Phone Number">
  <input type="text" class="nameInput" required placeholder="Name">
  <input type="email" class="emailInput" required placeholder="Email">
  <input type="number"class="guestInput" required placeholder="Guest Number">
  <button class="formBtn">Book Seat</button>
</form>
  </aside>
  <section class="bigContainer">
    <div class="search">
      <input type="text" placeholder="Enter meal title" class="searchInput">
      <button class="searchBtn">Search</button>
    </div>
    <div>
    <div class="searchList">
      <ul class="searchMealList"></ul>
    </div>

    </div>
    <div class="mealBox">
      <ul  class="mealTitle">        
      </ul>
      <ul id="mealList" class="mealUl"></ul>
    </div>

  </section>
  <footer>
      <p>© 2019 Copenhagen</p>
      <p> Email: zolla-cop@gmail.dk</p>
      <p> Tlf: 40906030</p>
  </footer>`;
}
async function formBtnEventHandler(){
  const reservation = {
    number_of_guests: guestInput.value,
    meal_id: id,
    created_date: new Date()
    //phone_number: phoneInput.value
  }
  fetch('/api/reservations', {
    method: 'post',
    headers: {
      'Content-type': 'application/json'
    },
    body: reservation
  })
    .then(function (res) {
      console.log(res);
    })
    .catch(function (err) {
      console.log(err);
    });
  };

//search product lists with searchkey
function searchMealList(searchKey){
  console.log(mealLists);
  const searchedList = mealLists.filter((meal) =>{
    return meal.name.toLowerCase().includes(searchKey.toLowerCase())});
  console.log(searchedList);
  return searchedList;
}
export default mealsId;
