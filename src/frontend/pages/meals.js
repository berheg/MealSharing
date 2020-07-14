function handleMealRequest(params){
  moveScrollTop();
   fetch(`/api/meals/meal/${params.id}`)
      .then((res) => res.json())
      .then((data) => {
         document.body.innerHTML = `
         <header>
            <div class="menu">
            <img class="logo" src="favicon.ico" alt="Logo of the company"
            />
                <div class="logo">
                    <a href="/" data-navigo>
                    <h1 class="logo-h1">ZOLLA RESTURANT</h1>
                    </a>
                  </div>
                  <div>
                      <ul>
                          <a href="/home" data-navigo>Home</a>
                          <a href="/meals" data-navigo>Meals</a>
                      </ul>
                  </div>
              </div>
          </header>
          <div class='container'>
          <aside>
            <div class="button-container">
              <button class="reviewHideBtn" data-toggle="collapse">
                  <h4 class="reservationTitle">Add a review for ${data[0].title} meals </h4>
              </button>
              <button class="reservation-button" data-toggle="collapse" href="#collapseThree">
                  <h4 class="reservationTitle">Place an order for a ${data[0].title} meal </h4>
              </button>
            </div>
                <form action="/api/reviews" class="reviewForm" method="POST">
                    <h3 class="formHead">Fill in The Review Form </h3>
                    <label for="name">For ${data[0].title}</label>
                    <section class = "mealLists"></section>
                    <input type="text"id="titleInput" class="titleInput" required placeholder="Title" name='title'>
                    <input type="text" class="descriptionInput" required placeholder="Description" name='description'>
                    <input type="number"class="starInput" required placeholder="Star in number" name='stars'>
                    <button class="reviewFormBtn" submit>Submit</button>
                </form>

                <form action="/api/reservations" class="reservationForm" method="post">
                  <h3 class="formH3">Avialable Reservations:</h3>
                  <label for="name">For ${data[0].title}</label>
                  <input type="number"class="phoneInput" required placeholder="Phone Number">
                  <input type="text" class="nameInput" required placeholder="Name" name =>
                  <input type="email" class="emailInput" required placeholder="Email" name = "email">
                  <input type="number"class="guestInput" required placeholder="Guest Number" name="number_of_guests">
                  <button class="formBtn" submit>Book Seat</button>
                </form>
            </aside>
              <div class="card" style="width: 25rem;" col={8}>
               <div class="card-body">
                 <img class="card-img-top" src="../../../assets/${data[0].title}.jpg" alt="${data[0].title}" />
                 <h5 class="card-title">${data[0].title}</h5>
                 <p class="card-text">${data[0].description}</p>
                 <p>
                   <span>
                     <i class="fa fa-map-marker"></i>
                   </span> ${data[0].location}
                 </p>
                 <p>
                   <span>
                     Price:
                     </span> ${data[0].price} Kr
                 </p>
               </div>
             </div>
            </div>
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
          const reviewFormBtn = document.querySelector('button.reviewFormBtn');
          const reviewHideBtn=document.querySelector('button.reviewHideBtn');
          const reviewForm = document.querySelector('.reviewForm');
          const reservationForm = document.querySelector('.reservationForm');
          reviewHideBtn.addEventListener('click', ()=>{
            reservationForm.style.display='none';
            reviewForm.style.display='flex';
            moveScrollTop();
          })
          reviewFormBtn.addEventListener('click', (e)=>{
            e.preventDefault();
            reviewFormBtnEventHandler(data[0].id, e);
          } );
          const reservationButton = document.querySelector('button.reservation-button');
            reservationButton.addEventListener('click',(e)=>{
            e.preventDefault();
            reviewForm.style.display='none';
            reservationForm.style.display='flex';
            moveScrollTop();
            reservationFormBtnEventHandler(data[0].id,e);
            });
          });
        };
  async function reviewFormBtnEventHandler(id){
    const titleInput = document.querySelector('input.titleInput');
    const descriptionInput = document.querySelector('input.descriptionInput');
    const starInput = document.querySelector('input.starInput');
    const review = {
      title: titleInput.value,
      description: descriptionInput.value,
      review_meal_id: id,
      stars: starInput.value
      //phone_number: phoneInput.value
    }
    fetch('/api/reviews', {
      method: 'post',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(review)
    })
      .then(function (res) {
        console.log(res);
      })
      .catch(function (err) {
        console.log(err);
      });
    };
    async function reservationFormBtnEventHandler(id){
      const guestInput = document.querySelector('input.guestInput');
      const reservation = {
        number_of_guests: guestInput.value,
        meal_id: id
      }
      fetch('/api/reservations', {
        method: 'post',
        headers: {
          'Content-type': 'application/json'
        },
        body: JSON.stringify(reservation)
      })
        .then(function (res) {
          console.log(res);
        })
        .catch(function (err) {
          console.log(err);
        });
      };
 function moveScrollTop(){
   document.body.scrollTop = 0;
   document.documentElement.scrollTop = 0;
 }
  export default handleMealRequest;
