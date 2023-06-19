const slider = document.querySelector('.slider-container'),
  slides = Array.from(document.querySelectorAll('.slide'));

let isDragging = false,
  startPos = 0,
  currentTranslate = 0,
  prevTranslate = 0,
  animationID,
  currentIndex = 0,
  startPosY = 0,
  isVerticalDrag = false;

slides.forEach((slide, index) => {
  const slideImage = slide.querySelector('img');

  slideImage.addEventListener('dragstart', (e) => e.preventDefault());

  if(slides.length >= 2) {

    slide.addEventListener('touchstart', touchStart(index));
    slide.addEventListener('touchend', touchEnd);
    slide.addEventListener('touchmove', touchMove);

    slide.addEventListener('mousedown', touchStart(index));
    slide.addEventListener('mouseup', mouseUp);
    slide.addEventListener('mousemove', mouseMove);
    slide.addEventListener('mouseleave', mouseLeave);
  }
});

window.addEventListener('resize', setPositionByIndex);

function getPositionX(event) {
  return event.type.includes('mouse') ? event.pageX : event.touches[0].clientX;
}

function getPositionY(event) {
  return event.type.includes('mouse') ? event.pageY : event.touches[0].clientY;
}

function goPrev(event) {
  event.preventDefault();
  event.stopPropagation();
  if (currentIndex > 0) {
    currentIndex -= 1;
    setPositionByIndex();
  }
  return false;
}

function goNext(event) {
  event.preventDefault();
  event.stopPropagation();
  if (currentIndex < slides.length - 1) {
    currentIndex += 1;
    setPositionByIndex();
  }
  return false;
}

function touchStart(index) {
  return function (event) {
    currentIndex = index;
    startPos = getPositionX(event);
    startPosY = getPositionY(event);
    isDragging = true;
    isVerticalDrag = false;
    animationID = requestAnimationFrame(animation);
    slider.classList.add('grabbing');
  }
}

function mouseMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    currentTranslate = prevTranslate + currentPosition - startPos;
  }
}

function touchMove(event) {
  if (isDragging) {
    const currentPosition = getPositionX(event);
    const currentY = getPositionY(event);
    const deltaX = currentPosition - startPos;
    const deltaY = currentY - startPosY;

    if (Math.abs(deltaY) > Math.abs(deltaX) && !isVerticalDrag) {
      isVerticalDrag = true;
      endGrab();
      window.scrollBy(0, -deltaY * 30);
      startPosY = currentY;
      return;
    }

    currentTranslate = prevTranslate + deltaX;
    setSliderPosition();
  }
}

function touchEnd() {
 if (!isVerticalDrag) {
    endGrab();
    setPositionByIndex();
  } 
}

function mouseUp() {
  endGrab();
  setPositionByIndex();
}

function mouseLeave() {
  endGrab();
}

function endGrab() {
  cancelAnimationFrame(animationID);
  isDragging = false;
  const movedBy = currentTranslate - prevTranslate;

  if (movedBy < -50 && currentIndex < slides.length - 1) {
    currentIndex += 1;
  }

  if (movedBy > 50 && currentIndex > 0) {
    currentIndex -= 1;
  }

  slider.classList.remove('grabbing');
}

function animation() {
  setSliderPosition();
  if (isDragging) requestAnimationFrame(animation);
}

function setPositionByIndex() {
  currentTranslate = currentIndex * -window.innerWidth;
  prevTranslate = currentTranslate;

  setSliderPosition();
}

function setSliderPosition() {
  slider.style.transform = `translateX(${currentTranslate}px)`;
}