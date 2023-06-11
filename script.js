/* start of First setion js */
let slides = document.querySelectorAll('.banner-slide');
let nextImg = document.getElementById("next-img")
let currentIndex = 0;
let prevIndex = 0;
let intervalId;

function changeSlide() { //this function is used to change slide 
  slides[prevIndex].classList.remove('prevSlide');// remove classes
  slides[currentIndex].classList.remove('active');
  prevIndex = currentIndex; //assign current active slide index to  prevIndex
  slides[prevIndex].classList.add('prevSlide');// add class bcz by default height of each slide is 0 so i add this class to make to maintain height
  currentIndex = (currentIndex + 1) % slides.length; // calculate next index and add class
  slides[currentIndex].classList.add('active');
  let nextImgIndex = currentIndex+1;
  if(nextImgIndex == slides.length)// if thumbnail image reaches end then assign to starting index 
    nextImgIndex=0
  let computedStyle = window.getComputedStyle(slides[nextImgIndex]); //get the image and asssign
  let backgroundImage = computedStyle.getPropertyValue("background-image");
  nextImg.style.backgroundImage = backgroundImage
}

function startInterval() { // set the time interval to change slide automatically
  intervalId = setInterval(function () {
    changeSlide();
    restartAnimations();
  }, 5000);
}

function restartAnimations() { // this function is  used to reset the animation when click on next button
  const topSpan = document.querySelector('.top');
  const bottomSpan = document.querySelector('.bottom');
  const rightSpan = document.querySelector('.right');
  const leftSpan = document.querySelector('.left');

  topSpan.style.animation = 'none';
  bottomSpan.style.animation = 'none';
  rightSpan.style.animation = 'none';
  leftSpan.style.animation = 'none';

  void topSpan.offsetWidth; // Trigger reflow
  void bottomSpan.offsetWidth; 
  void rightSpan.offsetWidth; 
  void leftSpan.offsetWidth; 

  topSpan.style.animation = 'animateTop 5.05s ease-in-out infinite';
  bottomSpan.style.animation = 'animateBottom 5.05s ease-in-out infinite';
  rightSpan.style.animation = 'animateRight 5.05s ease-in-out infinite';
  leftSpan.style.animation = 'animateLeft 5.05s ease-in-out infinite';
}

function moveSlide() { //this functon is called when thumbail is clicked
  changeSlide();
  restartAnimations();
  resetTimer();
}

function resetTimer() {// reset the timer to zero and change slide
  clearInterval(intervalId);
  startInterval();
}

startInterval(); // Start the initial interval
/* end of first Section js */

/* Start of Second Section js */
let richText = document.getElementsByClassName("rich-text")[0];
let textAnimation = document.getElementsByClassName("text-animation")[0];

function animateText() {// this function is animated the text based on there location
  var sectionTop = richText.offsetTop; 
  var sectionHeight = richText.offsetHeight;
  var windowScroll = window.pageYOffset || document.documentElement.scrollTop;

  if (windowScroll > sectionTop - window.innerHeight + sectionHeight) {
    textAnimation.classList.add("animate");
  }
}

window.addEventListener("scroll", animateText);
/* end of Second Section js */

/* Start of third Section js */

const slider = document.getElementById("slider");
const card_slides = document.getElementById("slides");
let isMouseDown = false;
let startX;
let initialScrollLeft;

function updateSlideClasses() {
  const slideWidth = slider.clientWidth / 3;
  const centerIndex = Math.round((slider.scrollLeft + slideWidth / 2) / slideWidth);
  const slidesArray = Array.from(card_slides.children);

  slidesArray.forEach((slide, index) => {
    slide.classList.remove("center", "left", "right");

    if (index === centerIndex) {
      slide.classList.add("center");
    } else if (index < centerIndex) {
      slide.classList.add("left");
    } else {
      slide.classList.add("right");
    }
  });
}

slider.addEventListener("mousedown", (e) => {
  isMouseDown = true;
  startX = e.pageX - slider.offsetLeft;
  initialScrollLeft = slider.scrollLeft;
  slider.style.cursor = "grabbing";
});

slider.addEventListener("mouseup", () => {
  isMouseDown = false;
  slider.style.cursor = "pointer";
  const slideWidth = slider.clientWidth / 3;
  const threshold = slideWidth / 4;
  const distanceMoved = Math.abs(initialScrollLeft - slider.scrollLeft);

  if (distanceMoved > threshold) {
    if (initialScrollLeft < slider.scrollLeft) {
      slider.scrollLeft = initialScrollLeft + slideWidth;
    } else {
      slider.scrollLeft = initialScrollLeft - slideWidth;
    }
  } else {
    slider.scrollLeft = initialScrollLeft;
  }

  updateSlideClasses();
});

slider.addEventListener("mousemove", (e) => {
  if (!isMouseDown) return;
  e.preventDefault();
  const x = e.pageX - slider.offsetLeft;
  const move = (x - startX) * 2;
  slider.scrollLeft -= move;
  startX = x;
});

updateSlideClasses();
