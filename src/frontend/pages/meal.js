
let id;
async function mealsId(req, router) {
  getBodyContainer();
  //id = req.param.id;
  //h2.innerHTML += id;
  const data = await fetchServer();
  await renderHTML(data);
  const formBtn = document.querySelector('button.formBtn');
  const phoneInput = document.querySelector('input.phoneInput');
  const nameInput = document.querySelector('input.nameInput');
  const emailInput = document.querySelector('input.emailInput');
  const guestInput = document.querySelector('input.guestInput');
  const searchInput = document.querySelector('input.searchInput');
  const listSelect = document.querySelector('list.listSelect');
  const h2 = document.querySelector('h2.mealId');
  const h3 = document.querySelector('h3.formH3');

  formBtn.addEventListener('click', formBtnEventHandler);
  searchInput.addEventListener('keyup',()=>searchMealList(searchInput.value, data));

}
async function fetchServer(){
  const res = await fetch(`/api/meals/`);
  const jsonData = await res.json();
  console.log(jsonData[0]);
  console.log(jsonData);
  return jsonData;
}
function renderHTML(data){
  const ulList = document.querySelector('ul.mealUl');
  ulList.innerHTML='';
  data.forEach((element) => {
              const div = document.createElement('figure');
              div.innerHTML = ` <div class="card" style="width: 20rem;" col={6}>
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
    <a href="/home">Home</a>
    <a href="/meals">Menu</a>
    <a href="/review">Review</a>
    </nav>
    <nav class = "container-menu-button">
      <button type="button" className="buttonClassName" onClick={onClickHandle}>
        <div className="line-top" />
        <div className="line-middle" />
        <div className="line-bottom" />
      </button>
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
    <!-- Footer main -->
    <section class="ft-main">
      <div class="ft-main-item">
        <h2 class="ft-title">Contact</h2>
        <ul>
          <li>Email: zolla-cop@gmail.dk</li>
          <li>Tlf: 40906030</li>
          <li></li>
        </ul>
      </div>
    </section>
    <!-- Footer social -->
    <section class="ft-social">
      <ul class="ft-social-list">
        <li><a href="#"><i class="fab fa-facebook"></i></a></li>
        <li><a href="#"><i class="fab fa-twitter"></i></a></li>
        <li><a href="#"><i class="fab fa-instagram"></i></a></li>
        <li><a href="#"><i class="fab fa-github"></i></a></li>
        <li><a href="#"><i class="fab fa-linkedin"></i></a></li>
        <li><a href="#"><i class="fab fa-youtube"></i></a></li>
      </ul>
    </section>
    <!-- Footer legal -->
    <section class="ft-legal">
      <ul class="ft-legal-list">
        <li><a href="#">Terms &amp; Conditions</a></li>
        <li><a href="#">Privacy Policy</a></li>
        <li>&copy; 2020 Copyright Nowrap Inc.</li>
      </ul>
    </section>
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
function searchMealList(searchKey, mealLists){
  console.log("searchKey= "+searchKey);
  console.log(mealLists);
  const searchedList = mealLists.filter((meal) =>{
    const mealSearched=meal.title.toLowerCase();
    return mealSearched.includes(searchKey.toLowerCase());
  });
  console.log(searchedList);
  renderHTML(searchedList);
}
export default mealsId;
