let quotes = [];
const dailyQuotes = document.getElementById("daily-quotes");
const footerQuote = document.getElementById("footer-quotes")
const body = document.getElementById("body");
const quoteURL = "https://type.fit/api/quotes";
const sliceDiv = document.getElementById('slice');
const gridX = 2;
const w = sliceDiv.offsetWidth;
const h = sliceDiv.offsetHeight;
const img = document.querySelectorAll('#slice img')[0].src;
const delay = 0.1;
const button = document.getElementById("slice-button");
const mediaQuery = window.matchMedia("(min-width: 768px)")
const backToTop = document.getElementById("backToTop")


//These functions hand the overlay page on original load on first session page load


    function slice () {
        document.getElementsByClassName("navbar")[0].style.opacity = "0";
        backToTop.style.opacity = 0;
        for (x = 0; x < gridX; x++) {
            if (mediaQuery.matches){
            const width = x * w / gridX + "px";
            const div = document.createElement("div");
            document.getElementById('slice').appendChild(div);
            div.style.left = width;
            div.style.top = 0; 
            div.style.width = w / gridX + "px";
            div.style.height = h + "px";
            div.style.backgroundImage = "url(" + img + ")";
            div.style.backgroundPosition = "-" + width;
            div.style.backgroundSize = w + "px";
            div.style.transitionDelay = x * delay + "s";
            sliceDiv.classList.add('active'); 
 
            
             } else{
                sliceDiv.classList.remove('active');
                sliceDiv.style.display = "none"
                button.style.display = "none";
                dailyQuotes.style.display = "none";
                document.getElementsByClassName("navbar")[0].style.opacity = ".7"
                body.style.overflow = "visible";
            }

        } 
       
    }
    slice(); 
   
button.addEventListener("click", () => {
    delayNavBar();
    sliceDiv.classList.remove('active');
    button.style.display = "none"
    body.style.overflow = "visible";
    document.getElementById("daily-quotes").style.display = "none"

    reset();
    sessionStorage.setItem("show", "true")
    footerQuote();

})

  window.onload = function () {
    const show = sessionStorage.getItem("show");
        if (show === "true"){    
            document.getElementsByClassName("navbar")[0].style.opacity = .7
            sliceDiv.style.display = "none";
            button.style.display = "none"
            body.style.overflow = "visible";
            document.getElementById("daily-quotes").style.display = "none"

        }
} 

function reset (){
    setTimeout( ( () => sliceDiv.style.display = "none" ), 2000);
} 

function delayNavBar (){
    let navbar = document.getElementsByClassName("navbar")[0];
    setTimeout( ( () => navbar.style.opacity = .7 ), 500);
    navbar.style.transition = "opacity ease-in 0.5s";
} 

// This function selects a random quote from the API and displays it on the overlay

fetch(quoteURL)
.then(response => response.json())
.then(data => displayQuotes(data))
.then(data => footerQuotes(data))
.catch(err => console .log(err))

function displayQuotes (data){
    quotes = data;
    let quoteHTML = " ";
    let randomIndex = quotes[Math.floor(Math.random() * quotes.length)];
    let quoteDay = randomIndex.text;
    let author = randomIndex.author;
    if (author === null){
        quoteHTML += `
        <q>${quoteDay}</q>
        <p> - Anonymous</p>
        `
    } else { 
        quoteHTML += `
        <q>${quoteDay}</q>
        <p> - ${author}</p>
        `
        }
dailyQuotes.innerHTML = quoteHTML;
}

//This function insert quotes into the bottom of the main and about pages

function footerQuotes (){
    if (footerQuote.innerHTML = " "){
        footerQuote.innerText === "Test"
   }
    setInterval(() => { 
    let quoteHTML = " ";
    let randomIndex = quotes[Math.floor(Math.random() * quotes.length)];
    let quoteDay = randomIndex.text;
    let author = randomIndex.author;

    if (author === null){
        quoteHTML += `
        <p>"${quoteDay}"</p>
        <p>"Anonymous"</p>
        `
    } else { 
        quoteHTML += `
        <q>${quoteDay}</q>
        <p> - ${author}</p>
        `
        }

        footerQuote.innerHTML = quoteHTML;  

    },5000)           
  
}

//end of quote functions


//This function supports the back to top scroll functionality

window.onscroll = function () {scroll()};

function scroll (){
  if (document.body.scrollTop > 160 ||
     document.documentElement.scrollTop > 160) {
        backToTop.style.opacity = ".8";
     } else {
        backToTop.style.opacity = "0"
     }
  }

backToTop.addEventListener("click", () => {
    window.scrollTo({top: 0, behavior: 'smooth'})
})  

//end


const fade = document.querySelector(".fade-in");
const slide = document.querySelectorAll(".slide-in")
const icons = document.querySelectorAll(".icon")
const appearOptions ={
    root: null, //identifies the parent element that the obeserver is tied to, usually the viewport by default
    threshold: 0.1, //indicates how much of the target needs to be in view for trigger
    rootMargin: "0px 0px 0px 0px" // allows you to control the area size(bounding box) that the target elemtn scrolls
};

const appearOnScroll = new IntersectionObserver (function(entries, appearOnScroll) {
    entries.forEach(entry => {
      if (!entry.isIntersecting){
          return;
      }  else {
         entry.target.classList.add("appear");
         appearOnScroll.unobserve(entry.target)
      }
    });
}, appearOptions)

// fade.forEach( fader => {
//     appearOnScroll.observe(fader);
// })


appearOnScroll.observe(fade)

slide.forEach(slider => {
    appearOnScroll.observe(slider)
})

icons.forEach(icon  => {
    appearOnScroll.observe(icon)
})