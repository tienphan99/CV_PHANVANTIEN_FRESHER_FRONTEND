// ---------------MENU-SHOW------------------
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
        nav = document.getElementById(navId)

    if (toggle && nav) {
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle', 'nav-menu')
// -------------REMOVE-MENU------------------
const navLink = document.querySelectorAll('.nav__link')

function linkAction() {
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))
// -------------------SCROLL-SECTION-ACTIVE-LINK------------
const sections = document.querySelectorAll('section[id]')

window.addEventListener('scroll', scrollActive)

function scrollActive() {
    const scrollY = window.pageYOffset

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight
        const sectionTop = current.offsetTop - 50;
        sectionId = current.getAttribute('id')
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.add('active')
        }
        else {
            document.querySelector('.nav__menu a[href*=' + sectionId + ']').classList.remove('active')
        }
    })
}
// ----------------------SCROLL REVEAL ANIMATION---------------
const sr = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
})
// -------------------------SCROLL-HOME-----------------------  
sr.reveal('.home__title', {})
sr.reveal('.home__scroll', { delay: 200 })
sr.reveal('.home__img', { origin: 'right', delay: 400 })
// -----------------------------SCROLL-ABOUT-----------------
sr.reveal('.about__img', { delay: 500 })
sr.reveal('.about__subtitle', { delay: 300 })
sr.reveal('.about__profession', { delay: 400 })
sr.reveal('.about__text', { delay: 500 })
sr.reveal('.about__social-icon', { delay: 600, interval: 200 })
// -----------------------SCROOL-SKILLS--------------------
sr.reveal('.skills__subtitle', {})
sr.reveal('.skills__name', { distance: '20px', interval: 100, delay: 50 })
sr.reveal('.skills__img', { delay: 400 })
// -----------------------SCROOL-PORTFOLIO--------------------
sr.reveal('.portfolio__img', { interval: 200 })
// -----------------------SCROOL-CONTACT--------------------
sr.reveal('.contact__subtitle', {})
sr.reveal('.contact__text', { interval: 200 })
sr.reveal('.contact__input', { delay: 400 })
sr.reveal('.contact__button', { delay: 600 })
// -------------------CONTACT-FIREBASE-----------------------
var firebaseConfig = {
    apiKey: "AIzaSyCvXTnvbHedJFpl8o0WXbRK2SKB9pCC68U",
    authDomain: "cv-contacts-firebase.firebaseapp.com",
    databaseURL: "https://cv-contacts-firebase.firebaseio.com",
    projectId: "cv-contacts-firebase",
    storageBucket: "cv-contacts-firebase.appspot.com",
    messagingSenderId: "838894151011",
    appId: "1:838894151011:web:11d782a17eef709d071f56"
};
//-------------------------INIT-FIREBASE-----------------------
firebase.initializeApp(firebaseConfig);
var firestore = firebase.firestore();

// ---------------Start grabbing our Dom Element------------------
const submitBtn = document.querySelector('#submit');

let userName = document.querySelector('#userFullName');
let userEmail = document.querySelector('#userEmail');
let userMessage = document.querySelector('#userMessage');

const db = firestore.collection("contactData");

submitBtn.addEventListener('click', () => {
    let userNameInput = userName.value;
    let userEmailInput = userEmail.value;
    let userMessageInput = userMessage.value;


    db.doc()
        .set({
            name: userNameInput,
            email: userEmailInput,
            message: userMessageInput
        })
        .then(() => {
            console.log("Data Saved")
        })
        .catch(() => {
            console.log()
        })
    document.querySelector('.alert').style.display = 'none'
    setTimeout(function () {
        document.querySelector('.alert').style.display = 'block'
    }, 3000)
    document.getElementById("contact-form").reset()
});
