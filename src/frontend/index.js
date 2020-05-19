import _ from 'lodash';
import "./index.css";
import page from "page";
import mealRouter from "./pages/meal";
import homeRouter from "./pages/home";
import reviewRouter from "./pages/review";

const options = {
  historyMode: true // set this to true if you use the HTML5 history mode API
};
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
          <img src="../../../assets/vegan.jpg" alt="background picture">
          <img src="../../../assets/mixed.jpg" alt="background picture">
          <img src="../../../assets/kitfo.jpg" alt="background picture">
        </div>
      </div>
    </section>
  <footer>
      <p>© 2019 Copenhagen</p>
      <p> Email: zolla-cop@gmail.dk</p>
      <p> Tlf: 40906030</p>
  </footer>`;
const searchInput = document.querySelector('input.searchInput');
searchInput.addEventListener('keyup',searchMealList(searchInput.value));
page("/", homeRouter);
page("/meals", mealRouter);
page("/review", reviewRouter);
page.start();
//router.init();
//search product lists with searchkey
async function searchMealList(searchKey){
  console.log(searchKey);
  const mealLists = await fetchServer();
  const searchedList = mealLists.filter((meal) =>{
    return meal.name.toLowerCase().includes(searchKey.toLowerCase())});
  console.log(searchedList);
  return searchedList;
}
async function fetchServer(){
  const res = await fetch(`/api/meals/`);
  const jsonData = await res.json();
  return jsonData;
}
