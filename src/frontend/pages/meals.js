function handleMealRequest(params){
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
        <form action="/api/reviews" class="reviewForm" method="POST">
            <h3 class="formHead">Fill in The Review Form </h3>
            <label for="name">Review Form</label>
            <section class = "mealLists"></section>
            <input type="text" class="titleInput" required placeholder="Title" name='title'>
            <input type="text" class="descriptionInput" required placeholder="Description" name='description'>
            <input type="number"class="starInput" required placeholder="Star in number" name='stars'>
            <button class="reviewFormBtn" submit>Submit</button>
        </form>
    </aside>
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
      <div class=" col-lg-8">
          <div class="row">
              <div class="col">
                  <h1 class="display-1"> ${data[0].title}</h1>
              </div>
              <div class="row">
                  <div class="col-lg-5">
                      <img src="../../../assets/${data[0].title}.jpg" alt="${data[0].title}" />
                  </div>
                  <div class="col-lg-4 meal-desciption">
                      <h2>ABOUT THIS MEAL</h2>
                      <p>
                          <span></span>${data[0].description}
                      </p>
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
      </div>
      <div id="accordion" class="col p-4 mt-12" >
          <div class="card">
              <div class="card-header">
                  <button class="reviewHideBtn" data-toggle="collapse">
                      <h4 class="reservationTitle">Add a review for ${data[0].title} meals </h4>
                  </button>
              </div>


          </div>

          <div class="card">

              <div class="card-header">

                  <button class="reservation-button" data-toggle="collapse" href="#collapseThree">

                      <h4 class="reservationTitle">Place an order for a ${data[0].title} meal </h4>

                  </button>

              </div>



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
  });
  });



     //router.updatePageLinks();

  };
  async function reviewFormBtnEventHandler(id, e){
    const form = e.target;
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

  export default handleMealRequest;
