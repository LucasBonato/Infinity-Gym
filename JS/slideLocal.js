const sliderLocal = document.querySelector('.slider-container-local'),
    slidesLocal = Array.from(document.querySelectorAll('.slide-local'));

let isDraggingLocal = false,
    startPosLocal = 0,
    currentTranslateLocal = 0,
    prevTranslateLocal = 0,
    animationIDLocal,
    currentIndexLocal = 0,
    startPosYLocal = 0,
    isVerticalDragLocal = false;

slidesLocal.forEach((slideLocal, indexLocal) => {
    const slideImageLocal = slideLocal.querySelector('img');

    slideImageLocal.addEventListener('dragstart', (e) => e.preventDefaultLocal());

    if(slidesLocal.length >= 2) {

        slideLocal.addEventListener('touchstart', touchStartLocal(indexLocal));
        slideLocal.addEventListener('touchend', touchEndLocal);
        slideLocal.addEventListener('touchmove', touchMoveLocal);

        slideLocal.addEventListener('mousedown', touchStartLocal(indexLocal));
        slideLocal.addEventListener('mouseup', mouseUpLocal);
        slideLocal.addEventListener('mousemove', mouseMoveLocal);
        slideLocal.addEventListener('mouseleave', mouseLeaveLocal);
    }
});

window.addEventListener('resize', setPositionByIndexLocal);

function getPositionXLocal(event) {
    return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function getPositionYLocal(event) {
    return event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
}

function goPrevLocal(event) {
    event.preventDefaultLocal();
    event.stopPropagationLocal();
    if (currentIndexLocal > 0) {
        currentIndexLocal -= 1;
        setPositionByIndexLocal();
    }
    return false;
}

function goNextLocal(event) {
    event.preventDefaultLocal();
    event.stopPropagationLocal();
    if (currentIndexLocal < slidesLocal.length - 1) {
        currentIndexLocal += 1;
        setPositionByIndexLocal();
    }
    return false;
}

function touchStartLocal(index) {
    return function (event) {
        currentIndexLocal = index;
        startPosLocal = getPositionXLocal(event);
        startPosYLocal = getPositionYLocal(event);
        isDraggingLocal = true;
        isVerticalDragLocal = false;
        animationIDLocal = requestAnimationFrame(animationLocal);
        sliderLocal.classList.add('grabbing');
    }
}

function mouseMoveLocal(event) {
    if (isDraggingLocal) {
        const currentPositionLocal = getPositionXLocal(event);
        currentTranslateLocal = prevTranslateLocal + currentPositionLocal - startPosLocal;
    }
}

function touchMoveLocal(event) {
    if (isDraggingLocal) {
        const currentPositionLocal = getPositionXLocal(event);
        const currentYLocal = getPositionYLocal(event);
        const deltaXLocal = currentPositionLocal - startPosLocal;
        const deltaYLocal = currentYLocal - startPosYLocal;

        if(Math.abs(deltaYLocal) > Math.abs(deltaXLocal) && !isVerticalDragLocal) {
            isVerticalDragLocal = true;
            endGrabLocal();
            window.scrollBy(0, -deltaYLocal * 30);
            startPosYLocal = currentYLocal;
            return;
        }

        currentTranslateLocal = prevTranslateLocal + deltaXLocal;
        setSliderPositionLocal();
    }
}

function touchEndLocal() {
    if(!isVerticalDragLocal) {
        endGrabLocal();
        setPositionByIndexLocal();
    }
}

function mouseUpLocal() {
    endGrabLocal();
    setPositionByIndexLocal();
}

function mouseLeaveLocal() {
    endGrabLocal();
}

function endGrabLocal() {
    cancelAnimationFrame(animationIDLocal);
    isDraggingLocal = false;
    const movedByLocal = currentTranslateLocal - prevTranslateLocal;

    if (movedByLocal < -50 && currentIndexLocal < slidesLocal.length - 1) {
        currentIndexLocal += 1;
    }

    if (movedByLocal > 50 && currentIndexLocal > 0) {
        currentIndexLocal -= 1;
    }

    sliderLocal.classList.remove('grabbing');
}

function animationLocal() {
    setSliderPositionLocal();
    if (isDraggingLocal) requestAnimationFrame(animationLocal);
}

function setPositionByIndexLocal() {
    currentTranslateLocal = currentIndexLocal * -window.innerWidth;
    prevTranslateLocal = currentTranslateLocal;

    setSliderPositionLocal();
}

function setSliderPositionLocal() {
    sliderLocal.style.transform = `translateX(${currentTranslateLocal}px)`;
}