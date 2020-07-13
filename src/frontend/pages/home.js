
async function homeRouter(req, router) {
  getBodyContainer();
  const data = await fetchServer();
  //renderHTML(data);
  //console.log(`Welcome to my home page! The request url is ${req.url}`);
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
  formBtn.addEventListener('click', searchMealList(searchInput.value, data));
  searchInput.addEventListener('keyup',()=>searchMealList(searchInput.value, data));

}
//mealsId();

async function fetchServer(){
  const res = await fetch(`/api/meals`);
  const jsonData = await res.json();
  await console.log(jsonData);
  return jsonData;
}
//renders lists of data
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
      <nav class = "container-menu-button">
        <button type="button" className="button-toggle" onClick={onClickHandle}>
          <div className="line-top" />
          <div className="line-middle" />
          <div className="line-bottom" />
        </button>
      </nav>
      <nav class="navbar">
        <a href="/">Home</a>
        <a href="/meals">Menu</a>
        <a href="/review">Review</a>
      </nav>
    </header>
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
        <div class="backgroudPic">
          <figure>
            <img  src="../../../assets/vegan.jpg" alt="background picture">
            <img src="../../../assets/mixed.jpg" alt="background picture">
            <img  src="../../../assets/kitfo.jpg" alt="background picture">
          </figure>
        </div>
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

export default homeRouter;
