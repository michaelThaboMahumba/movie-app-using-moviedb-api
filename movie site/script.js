//navigation setup
let header = document.querySelector('header');

window.addEventListener('scroll', () =>{
  header.classList.toggle('shadow', window.scrollY > 0);
});

// responsive 
let menu = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menu.onclick = ()  =>{
  menu.classList.toggle('bx-x');
  navbar.classList.toggle('active');
}
window.onscroll = () =>{
  menu.classList.remove('bx-x');
  navbar.classList.remove('active');
}

//login setup.
     const iconclose=document.querySelector('.icon-close');
    const wrapper=document.querySelector('.wrapper');
    const loginlink=document.querySelector('.login-link');
    const signup=document.querySelector('.register-link');
    const btnpopup=document.querySelector('.popup-btn');

    signup.addEventListener('click',()=>{
        wrapper.classList.add('active');
    });
    loginlink.addEventListener('click',()=>{
        wrapper.classList.remove('active');
    });
    btnpopup.addEventListener('click',()=>{
        wrapper.classList.add('active-popup');
    });
    iconclose.addEventListener('click',()=>{
        wrapper.classList.remove('active-popup');
    });

    const setup = document.querySelector(".user_setup");
setup.style.display = "none";
if (localStorage.getItem("user_setup") === null) {
  setup.style.display = "flex";
  setup.querySelector("button").addEventListener("click", userInfo);
}
function userInfo() {
  let setupInfo = {
    name: setup.querySelectorAll("#name").value,
    password: setup.querySelectorAll("#password").value,
    email: setup.querySelector("#email").value
  };
  localStorage.clear();
  localStorage.setItem("user_setup", JSON.stringify(setupInfo));
  setup.style.display = "none";
}   
let testArr = [];
  setup.querySelectorAll("input").forEach((e) => {
    testArr.push(e.value);
  });
document.addEventListener('DOMContentLoaded', function () {
  const userForm = document.getElementById('userForm');
  userForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevent the form from submitting normally
    // Retrieve form data
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Perform form validation (add more checks as needed)
    if (!email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    // Secure the password (e.g., hash it)
    const securedPassword = hashPassword(password);

    // Send data to the server (you need to implement this)
    sendDataToServer(email, securedPassword);
  });

  // Function to hash the password (you can use a library like bcrypt)
  function hashPassword(password) {
    // Implement password hashing logic here (e.g., bcrypt or a custom function)
    return password; // Replace with the actual hashed password
  }

  // Function to send data to the server (you need to implement this)
  function sendDataToServer(email, password) {
  }
});
//swiper setup.
var swiper = new Swiper(".home", {
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
  });
var swiper = new Swiper(".coming-container", {
    loop:true,
    spaceBetween: 20,
    centeredSlides: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
   breakpoints: {
    0: {
      slidesPerView: 2,
    },
    568: {
      slidesPerView: 3,
    },
    768: {
      slidesPerView: 4,
    },
    968: {
      slidesPerView: 5,
    }
   }
  });
  // var swiper = new Swiper(".coming-container", {
  //   slidesPerView: 5,
  //   spaceBetween: 30,
  //   autoplay: {
  //     delay: 4000,
  //     disableOnInteraction: false,
  //   },
  //   pagination: {
  //     el: ".swiper-pagination",
  //     clickable: true,
  //   },
  // });

//get the movie imgs,title,overview from api
const APIURL = 'https://api.themoviedb.org/3/discover/movie?api_key=04c35731a5ee918f014970082a0088b1';
const IMGPATH = 'https://image.tmdb.org/t/p/w1280';
const SEARCHAPI = 'https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=';
const main = document.getElementById('content');
const form = document.getElementById('form');
const search = document.getElementById('search');

getMovies(APIURL);

async function getMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    showMovies(data.results);
}

function showMovies(movies) {
    main.innerHTML = '';

    movies.forEach(movie => {
        const { poster_path, title, overview, vote_average } = movie;
        const movieE1 = document.createElement('div');
        movieE1.classList.add('movie');

        movieE1.innerHTML = `
            <img src="${IMGPATH}${poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview:</h3>
                ${overview}
            </div>
        `;
        main.appendChild(movieE1);
    });
}
function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

form.addEventListener('submit', e => {
    e.preventDefault();
    const searchTerm = search.value;

    if (searchTerm) {
        getMovies(SEARCHAPI + searchTerm);
        search.value = '';
    }
});
