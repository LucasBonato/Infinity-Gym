const sliderLocal = document.querySelector('.slider-container-local'),
    slidesLocal = Array.from(document.querySelectorAll('.slide-local'))

// set up our state
let isDraggingLocal = false,
    startPosLocal = 0,
    currentTranslateLocal = 0,
    prevTranslateLocal = 0,
    animationIDLocal,
    currentIndexLocal = 0


// add our event listeners
slidesLocal.forEach((slideLocal, indexLocal) => {
    const slideImageLocal = slideLocal.querySelector('img')
    // disable default image drag
    slideImageLocal.addEventListener('dragstart', (e) => e.preventDefaultLocal())
    if(slidesLocal.length >= 2) {
        // pointer events
        slideLocal.addEventListener('touchstart', touchStartLocal(indexLocal))
        slideLocal.addEventListener('touchend', touchEndLocal)
        slideLocal.addEventListener('touchmove', touchMoveLocal)
        // mouse events
        slideLocal.addEventListener('mousedown', touchStartLocal(indexLocal))
        slideLocal.addEventListener('mouseup', mouseUp)
        slideLocal.addEventListener('mousemove', touchMoveLocal)
        slideLocal.addEventListener('mouseleave', mouseLeaveLocal)
    }
})

// make responsive to viewport changes
window.addEventListener('resize', setPositionByIndexLocal)

// use a HOF so we have index in a closure
function getPositionXLocal(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX
}

function goPrevLocal(event) {
    event.preventDefaultLocal()
    event.stopPropagationLocal()
    if (currentIndexLocal > 0) {
        currentIndexLocal -= 1
        setPositionByIndexLocal()
    }
    return false
}

function goNextLocal(event) {
    event.preventDefaultLocal()
    event.stopPropagationLocal()
    if (currentIndexLocal < slidesLocal.length - 1) {
        currentIndexLocal += 1
        setPositionByIndexLocal()
    }
    return false
}

// use a HOF so we have index in a closure
function touchStartLocal(index) {
    return function (event) {
        currentIndexLocal = index
        startPosLocal = getPositionXLocal(event)
        isDraggingLocal = true
        animationIDLocal = requestAnimationFrame(animationLocal)
        sliderLocal.classList.add('grabbing')
    }
}

function touchMoveLocal(event) {
    if (isDraggingLocal) {
        const currentPositionLocal = getPositionXLocal(event)
        currentTranslateLocal = prevTranslateLocal + currentPositionLocal - startPosLocal
    }
}

function touchEndLocal() {
    endGrabLocal()
    setPositionByIndexLocal()
}

function mouseUpLocal() {
    endGrabLocal()
    setPositionByIndexLocal()
}

function mouseLeaveLocal() {
    endGrabLocal()
}

function endGrabLocal() {
    cancelAnimationFrame(animationIDLocal)
    isDraggingLocal = false
    const movedByLocal = currentTranslateLocal - prevTranslateLocal

    // if moved enough negative then snap to next slide if there is one
    if (movedByLocal < -50 && currentIndexLocal < slidesLocal.length - 1) {
        currentIndexLocal += 1
    }

    // if moved enough positive then snap to previous slide if there is one
    if (movedByLocal > 50 && currentIndexLocal > 0) {
        currentIndexLocal -= 1
    }

    sliderLocal.classList.remove('grabbing')
}

function animationLocal() {
    setSliderPositionLocal()
    if (isDraggingLocal) requestAnimationFrame(animationLocal)
}

function setPositionByIndexLocal() {
    currentTranslateLocal = currentIndexLocal * -window.innerWidth
    prevTranslateLocal = currentTranslateLocal

    setSliderPositionLocal()
}

function setSliderPositionLocal() {
    sliderLocal.style.transform = `translateX(${currentTranslateLocal}px)`
}