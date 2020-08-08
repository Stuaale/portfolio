
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

fetch(quoteURL)
.then(response => response.json())
.then(data => displayQuotes(data))
.then(data => footerQuotes(data))
.catch(err => console .log(err))



    function slice () {
        document.getElementsByClassName("navbar")[0].style.opacity = "0"
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
                button.style.display = "none";

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

            // // window.onbeforeunload = function () {
            // //     window.scrollTo(0, 0);
            //   }      

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

function displayQuotes (data){
    quotes = data;
    let quoteHTML = " ";
    let randomIndex = quotes[Math.floor(Math.random() * quotes.length)];
    let quoteDay = randomIndex.text;
    let author = randomIndex.author;
    if (author === null){
        quoteHTML += `
        <div id="quote">
        <q>${quoteDay}</q>
        <p> - Anonymous</p>
        </div>
        </div>
        `
    } else { 
        quoteHTML += `
        <div id="quote">
        <q>${quoteDay}</q>
        <p> - ${author}</p>
        </div>
        </div>
        `
        }
dailyQuotes.innerHTML = quoteHTML;
}

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
        <div id="quote">
        <p>"${quoteDay}"</p>
        <p>"Anonymous"</p>
        </div>
        </div>
        `
    } else { 
        quoteHTML += `
        <div id="quote">
        <q>${quoteDay}</q>
        <p> - ${author}</p>
        </div>
        </div>
        `
        }

        footerQuote.innerHTML = quoteHTML;  

    },7000)           
  
}

