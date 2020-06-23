import _ from 'lodash';
import "./index.css";
import "./glider.min.css";
import page from "page";
import mealRouter from "./pages/meal";
import homeRouter from "./pages/home";
import reviewRouter from "./pages/review";
import handleMealRequest from "./pages/meals";

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
    <nav class = "container-menu-button">
      <button type="button" className="buttonClassName" onClick={onClickHandle}>
        <div className="line-top" />
        <div className="line-middle" />
        <div className="line-bottom" />
      </button>
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
          <div col ={6}>
          <img  src="../../../assets/vegan.jpg" alt="background picture">
          </div>
          <div col ={6}>
          <img col = {6} src="../../../assets/mixed.jpg" alt="background picture">
          </div>
          <div col ={6}>
          <img col={6} src="../../../assets/kitfo.jpg" alt="background picture">
        </div>
        </div>
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
   loadReviews();
const searchInput = document.querySelector('input.searchInput');
searchInput.addEventListener('keyup',searchMealList(searchInput.value));
page("/", homeRouter);
page("/meals", mealRouter);
page("/review", reviewRouter);
page("/meal/:id",handleMealRequest);
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
function loadReviews() {
      fetch('/api/reviews')
         .then((res) => res.json())
         .then((data) => {
            const carouselReviews = document.querySelector('.carousel-inner');
            data.forEach((element) => {
               // const div = document.createElement('figure');
               const carouselRev = document.querySelector('.carousel-item');
               carouselRev.innerHTML = `
               <div class="media"><img class="rounded-circle img-thumbnail" src="https://source.unsplash.com/400x400?${element.id}" alt="" width="75">
               <div class="media-body ml-3">
               <div><h4>${element.name}</h4></div>
                                        <blockquote class="blockquote border-0 p-0">
                                            <p class="font-italic lead"> <i class="fa fa-quote-left mr-3 text-success"></i>${element.description}</p>
                                            <footer class="blockquote-footer">Someone famous in
                                                <cite title="Source Title"> ${element.name}</cite>
                                            </footer>
                                        </blockquote>
                                    </div>
                                </div>
                              `;
               carouselReviews.appendChild(carouselRev);
            });
         });
      //carouselReviews.innerHTML = '';
   }
   //loadMeals();
   const onClickHandle = () => {
     this.classList.toggle('change');
   };
