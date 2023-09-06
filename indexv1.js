// Constants
const cards = $('#card-slider .slider-item').toArray();
const animationDuration = 0.75;
const scrollDelay = 1000;

// State variables
let currentIndex = 0;
let isScrolling = false;

// Function to handle mouse scroll events
function handleMouseScroll(event) {
    if (isScrolling) return;

    const delta = event.deltaY;

    if (delta > 0) {
        currentIndex = (currentIndex + 1) % cards.length;
    } else if (delta < 0) {
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }

    isScrolling = true;

    setTimeout(() => {
        isScrolling = false;
    }, scrollDelay);

    animateCards(cards, currentIndex);
}

// Add a scroll event listener to the document
document.addEventListener('wheel', handleMouseScroll);

// Function to animate cards
function animateCards(cardArray, index) {
    if(cardArray.length >= 4 ) {
        TweenMax.fromTo(cardArray[0], animationDuration, {x:0, y: 0, opacity:0.75}, {x:0, y: -120, opacity:0, zIndex: 0, delay:0.03, ease: Cubic.easeInOut, onComplete: () => sortArray(cardArray)});

        TweenMax.fromTo(cardArray[1], animationDuration, {x:79, y: 125, opacity:1, zIndex: 1}, {x:0, y: 0, opacity:0.75, zIndex: 0, boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', ease: Cubic.easeInOut});

        TweenMax.to(cardArray[2], animationDuration, {bezier:[{x:0, y:250}, {x:65, y:200}, {x:79, y:125}], boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', zIndex: 1, opacity: 1, ease: Cubic.easeInOut});

        TweenMax.fromTo(cardArray[3], animationDuration, {x:0, y:400, opacity: 0, zIndex: 0}, {x:0, y:250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut});
        
        // Add click event listeners to each card
        cardArray.forEach((card, cardIndex) => {
            card.addEventListener('click', () => {
                // Redirect to home.html when a card is clicked
                window.location.href = 'home.html';
            });
        });
    } else {
        $('#card-slider').append('<p>Sorry, carousel should contain more than 3 slides</p>');
    }
}

// Initialize the animation with the initial currentIndex
animateCards(cards, currentIndex);

// Function to sort the cardArray
function sortArray(cardArray) {
    setTimeout(function(){
        const firstElem = cardArray.shift();
        cardArray.push(firstElem);
        animateCards(cardArray, currentIndex);
    }, 3000);
}
