var cards = $('#card-slider .slider-item').toArray();

var currentIndex = 0;
var isScrolling = false;

startAnim(cards);


// Function to handle mouse scroll events
function handleMouseScroll(event) {
    if (isScrolling) return;

    // Calculate the direction of the scroll
    var delta = event.deltaY;

    if (delta > 0) {
        // Scroll down, move cards to the left
        currentIndex = (currentIndex + 1) % cards.length;
    } else if (delta < 0) {
        // Scroll up, move cards to the right
        currentIndex = (currentIndex - 1 + cards.length) % cards.length;
    }

    // Update the animation based on the new index
    startAnim(cards);
        // Set a flag to prevent rapid scrolling
    isScrolling = true;

    // Reset the flag after a short delay to allow for the next scroll
    setTimeout(function () {
        isScrolling = false;
    }, 500);
}
// Add a scroll event listener to the document
document.addEventListener('wheel', handleMouseScroll);

function startAnim(array){
    if(array.length >= 4 ) {
        TweenMax.fromTo(array[0], 0.5, {x:0, y: 0, opacity:0.75}, {x:0, y: -120, opacity:0, zIndex: 0, delay:0.03, ease: Cubic.easeInOut, onComplete: sortArray(array)});

        TweenMax.fromTo(array[1], 0.5, {x:79, y: 125, opacity:1, zIndex: 1}, {x:0, y: 0, opacity:0.75, zIndex: 0, boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', ease: Cubic.easeInOut});

        TweenMax.to(array[2], 0.5, {bezier:[{x:0, y:250}, {x:65, y:200}, {x:79, y:125}], boxShadow: '-5px 8px 8px 0 rgba(82,89,129,0.05)', zIndex: 1, opacity: 1, ease: Cubic.easeInOut});

        TweenMax.fromTo(array[3], 0.5, {x:0, y:400, opacity: 0, zIndex: 0}, {x:0, y:250, opacity: 0.75, zIndex: 0, ease: Cubic.easeInOut}, );
    } else {
        $('#card-slider').append('<p>Sorry, carousel should contain more than 3 slides</p>')
    }
}

function sortArray(array) {
    clearTimeout(delay);
    var delay = setTimeout(function(){
        var firstElem = array.shift();
        array.push(firstElem);
        return startAnim(array); 
    },3000)
}
