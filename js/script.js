// check if there is local storage color option : 
let mainColor = localStorage.getItem("color_option");

if (mainColor != null) {
    document.documentElement.style.setProperty("--main-color", localStorage.getItem("color_option"));
    // Remove Active classes from All Colors List Item
    document.querySelectorAll(".colors-list li").forEach(element => {
        element.classList.remove("active");
        // Add Active class on Element with data color === local storage item
        if (element.dataset.color == mainColor) {
            element.classList.add("active");
        }
    })


}
//

// toggle spin Class On Icon
document.querySelector(".toggle-settings").onclick = function () {

    'use strict';
    //this.classList.toggle("fa-spin");
    document.querySelector(".settings-box").classList.toggle("open");
};


// Switch colors 
const colorsLi = document.querySelectorAll(".colors-list li");
colorsLi.forEach(li => {
    li.addEventListener("click", (e) => { // ay wahd mn lis clickit 3lih

        // Set color on Root
        document.documentElement.style.setProperty("--main-color", e.target.dataset.color);
        // Set Color on Local Storage
        localStorage.setItem("color_option", e.target.dataset.color);
        // remove active class from all childrens
        // add active class on Target
        handleActive(e);
    });
})

// Switch backgrounds 

const randomBackEl = document.querySelectorAll(".random-backgrounds span");
randomBackEl.forEach(span => {
    span.addEventListener("click", (e) => { // 
        // remove active class from all childrens
        // add active class on Target
        handleActive(e);
        if (e.target.dataset.background === "yes") {

            backgroundOption = true;
            randomizeImages();
            localStorage.setItem("background_option", true);
        } else {
            backgroundOption = false;
            clearInterval(backgroundInterval);
            localStorage.setItem("background_option", false);
        }
    })
})


// select landing page element : 
let landingPage = document.querySelector(".landing-page");
// Get Array of images
let imagesArray = ["url('images/a.jpg')", "url('images/309439.jpg')", "url('images/309441.jpg')", "url('images/309489.jpg')", "url('images/309491.jpg')"];

let backgroundOption = true;
// Variable to control interval 
let backgroundInterval;
// random background item
let backgroundLocalitem = localStorage.getItem("background_option");
//check if random background local storage is not empty
if (backgroundLocalitem !== null) {
    if (backgroundLocalitem === "true") {
        backgroundOption = true;
    } else {
        backgroundOption = false;
    }
    // Remove all Active classes
    document.querySelectorAll(".random-backgrounds span").forEach(element => {
        element.classList.remove("active");
    });
    if (backgroundLocalitem === "true") {
        document.querySelector(".random-backgrounds .yes").classList.add("active");
    } else {
        document.querySelector(".random-backgrounds .no").classList.add("active");
    }
}
// function to randomize images 
function randomizeImages() {
    if (backgroundOption == true) {

        backgroundInterval = setInterval(function () {
            let randomNumber = Math.floor(Math.random() * imagesArray.length);

            landingPage.style.backgroundImage = imagesArray[randomNumber];
        }, 10000);
    }

}
randomizeImages();

// select skills selector
let ourSkills = document.querySelector(".skills");
window.onscroll = function () {
    // Height li fo9o chhal !
    let skillsOffsetTop = ourSkills.offsetTop;

    // Height of Our Skills
    let skillsOuterHeight = ourSkills.offsetHeight;

    //window height :
    let windowHeight = this.innerHeight;

    //window currently scroll Top 
    let windowScrollTop = this.pageYOffset;


    if (windowScrollTop >= (skillsOffsetTop + skillsOuterHeight - windowHeight)) {

        let Allskills = document.querySelectorAll(".skill-box .skill-progress span");
        Allskills.forEach(skill => {
            skill.style.width = skill.dataset.progress;
        });
    }
}
// Create Popup With Images ;
let ourGallery = document.querySelectorAll(".gallery img");
ourGallery.forEach(img => {
    img.addEventListener("click", (e) => {
        // create Overlay Element 
        let overlay = document.createElement("div");
        // add class to overlay 
        overlay.className = 'popup-overlay';
        // append overlay to body
        document.body.appendChild(overlay);
        // create the popup box
        let popupBox = document.createElement("div");
        // add Class to popup box
        popupBox.className = 'popup-box';
        // alt

        if (img.alt !== null) {
            // Create Element 
            let heading = document.createElement("h3");
            // Create Text fir heading
            let imgText = document.createTextNode(img.alt);
            // Append the Text to heading
            heading.appendChild(imgText);
            // append heading to popup box
            popupBox.appendChild(heading);
        }
        // create the image
        let popupImage = document.createElement("img");
        // set image source
        popupImage.src = img.src;
        // add image to popup box
        popupBox.appendChild(popupImage);
        // add popupbox to body
        document.body.appendChild(popupBox);
        // Create the close span
        let closeButton = document.createElement("span");
        //create Close button Text
        let closeButtonText = document.createTextNode("X");
        // append closeButtonText to closeSpan
        closeButton.appendChild(closeButtonText);
        // Add Class To close button
        closeButton.className = "close-button";
        // Add closeButton to popupBox
        popupBox.appendChild(closeButton);

    })
})
// Close popup ;
document.addEventListener("click", function (e) {
    if (e.target.className == "close-button") {
        //remove the current popup
        e.target.parentNode.remove();
        //Remove Overlay
        document.querySelector(".popup-overlay").remove();
    }
})
// Select All Bullets 

const AllBullets = document.querySelectorAll(".nav-bullets .bullet");

function scrollToSomewhere(elements) {
    AllBullets.forEach(element => {
        element.addEventListener("click", (e) => {
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: 'smooth'
            })
        })
    })
}
scrollToSomewhere(AllBullets);


// Handle Active state
function handleActive(ev) {
    // remove active class from all childrens
    ev.target.parentElement.querySelectorAll(".active").forEach(element => {
        element.classList.remove("active");
    });
    ev.target.classList.add("active");

}
// Bullets Hide Show 
let bulletsSpan = document.querySelectorAll(".bullets-option span");
let bulletsContainer = document.querySelector(".nav-bullets");
let bulletLocalItem = localStorage.getItem("bullets-option");

if (bulletLocalItem !== null) {
    bulletsSpan.forEach(span => {
        span.classList.remove("active");

    });
    if (bulletLocalItem === "block") {
        bulletsContainer.style.display = "block";
        document.querySelector(".bullets-option .yes").classList.add("active");
    } else {
        bulletsContainer.style.display = "none";
        document.querySelector(".bullets-option .no").classList.add("active");
    }
}

bulletsSpan.forEach(span => {
    span.addEventListener("click", (e) => {
        if (span.dataset.display === "show") {
            bulletsContainer.style.display = "block";
            localStorage.setItem("bullets-option", "block")
        } else {
            bulletsContainer.style.display = "none";
            localStorage.setItem("bullets-option", "none");
        }
        handleActive(e);
    })
})
//Reset Button 
document.querySelector(".reset-option").onclick = function () {
    //localStorage.clear();
    localStorage.removeItem("bullets-option");
    localStorage.removeItem("color_option");
    localStorage.removeItem("background_option");
    // Reload Page
    window.location.reload();
}
// Toggle Menu
let toggleButton = document.querySelector(".toggle-menu");
let tlinks = document.querySelector(".links");

toggleButton.onclick = function (e) {
    // Stop propagation
    e.stopPropagation();

    this.classList.toggle("menu-active");
    tlinks.classList.toggle("open");

}
// click anyWhere outside menu
document.addEventListener("click", (e) => {
    if (e.target !== toggleButton && e.target !== tlinks) {
        // Check if menu if open
        if (tlinks.classList.contains("open")) {

            toggleButton.classList.toggle("menu-active");
            tlinks.classList.toggle("open");
        }
    }
})
// stop propagation on Menu
tlinks.onclick = function (e) {
    e.stopPropagation();
}
