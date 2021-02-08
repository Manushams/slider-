const slider = document.querySelector('.slider-container'),
    slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false,
    startPos = 0,
    currentPos = 0,
    prevPos = 0,
    currentIndex = 0,
    animationID = 0;


slides.forEach((slide, index) => {
    slide.addEventListener('dragstart', (e) =>e.preventDefault());

    //mouse events 
    slide.addEventListener('mousedown', onMouseDown(index));
    slide.addEventListener('mousemove', onMouseMove);
    slide.addEventListener('mouseup', onMouseUp);
    slide.addEventListener('mouseleave', onMouseUp);

    //touch events 
    slide.addEventListener('touchstart', onMouseDown(index));
    slide.addEventListener('touchmove', onMouseMove);
    slide.addEventListener('touchend', onMouseUp);

})

window.oncontextmenu = function (event) {
    event.preventDefault()
    event.stopPropagation()
    return false
}

window.onresize = function (){setPosition()}

function onMouseDown(index){
    return function(event){
        isDragging = true
        startPos = getPositionX(event);
        currentIndex = index
        slider.classList.add('grabbing')

        animationID = requestAnimationFrame(animation)
    }
}

function onMouseMove(e){
    if(isDragging){
        currentPos = prevPos + getPositionX(event) - startPos;

        const totalTranslate = currentPos - prevPos;

        if(totalTranslate < -100 && currentIndex < slides.length -1 ){
            setPositionByIndex(1);
        }else if(totalTranslate > 100 && currentIndex > 0){
            setPositionByIndex(-1)
        }else if(Math.abs(totalTranslate) > 100){
            setPositionByIndex(0)
        }

    }
}

function onMouseUp(){
    isDragging = false
    slider.classList.remove('grabbing')   ;
    cancelAnimationFrame(animationID)
}

function setPositionByIndex(ind){
    currentPos = (currentIndex + ind) * -window.innerWidth;
    prevPos = currentPos;
    setPosition()
}

function getPositionX(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function animation(){
    setPosition();    
    requestAnimationFrame(animation);
}

function setPosition(){
    slider.style.transform = `translate(${currentPos}px)`;    
}