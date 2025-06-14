/**
 * MultiRangeSlider
 * @param {HTMLElement} elmement - the dom element that will be made the slider
 * @param {object} settings
 * @param {function} [getFormattedValue] - a function that will convert the label values
 */
function MultiRangeSlider(element,getFormattedValue = (value) => value) {
  const slider = element;
  const DOM = {};
  let steps = [];
  let dragging = false;
  let currentHandle = null;
  const getHandleOffset = () => DOM.handles[0].offsetWidth / 2;
  const getTrackWidth = () => DOM.track.offsetWidth;
  const getFocusedHandle = () => DOM.handles.find(handle => document.activeElement === handle);

  var mouseOffset =0;


  const values = {
    start: parseFloat(slider.dataset.initvalue),
    end: parseFloat(slider.dataset.endvalue),
    inputstart: parseFloat(slider.dataset.initvalue),
    inputend: parseFloat(slider.dataset.endvalue)
  };

  var incre = Math.abs(parseFloat(slider.dataset.initvalue)-parseFloat(slider.dataset.endvalue))/20.0;

  //console.log(incre);

   var  settings = {
    start: parseFloat(slider.dataset.initvalue),
    end: parseFloat(slider.dataset.endvalue),
    increment: incre
  };


  /*const values = {
    start: settings.start,
    end: settings.end
  };*/

  function getSteps(sliderWidth, stepLen, handleOffset) {
    const steps = [];

    //console.log(sliderWidth);
    //console.log(stepLen);
    //console.log(handleOffset);

    for (let i = 0; i <= stepLen; i++) {
      const stepX = i * (sliderWidth * 0.95 / stepLen) + handleOffset;
      const stepPercent = (i * (95 / stepLen)).toFixed(2);
      const value = i * settings.increment + settings.start;
      steps.push({
        value,
        stepX,
        stepPercent
      });
    }
    //console.log(steps);
    return steps;
  }

  const getStepLen = () => Math.abs(settings.end - settings.start) / settings.increment;

  const startDrag = (event) => {
    currentHandle = event.target;
    dragging = true;
  };
  const stopDrag = () => dragging = false;

  function createLabels(container, settings) {
    const labels = document.createElement("div");
    labels.classList.add("multi-range__labels");
    steps = getSteps(slider.offsetWidth, getStepLen(), getHandleOffset());

    steps.forEach(step => {
      const label = document.createElement("label");
      label.classList.add("label");
      label.textContent = getFormattedValue(step.value);
      label.style.left = `${step.stepPercent}%`;
      labels.appendChild(label);
      const tick = document.createElement("div");
      tick.classList.add("multi-range__tick");
      container.appendChild(tick);
    });

    return labels;
  }

  function addElementsToDOM() {
    const track = document.createElement("div");
    track.classList.add("multi-range__track");
    DOM.track = track;
    const trackBg = document.createElement("div");
    trackBg.classList.add("multi-range__track-bg");
    const trackFill = document.createElement("div");
    trackFill.classList.add("multi-range__fill");
    DOM.trackFill = trackFill;
    const ticksContainer = document.createElement("div");
    ticksContainer.classList.add("multi-range__ticks");
    let handleContainer = document.createElement("div");
    handleContainer.classList.add("multi-range__handles");
    const leftHandle = document.createElement("div");
    leftHandle.classList.add("multi-range__handle");
    leftHandle.setAttribute("data-handle-position", "start");
    leftHandle.setAttribute("tabindex", 0);
    const rightHandle = document.createElement("div");
    rightHandle.classList.add("multi-range__handle");
    rightHandle.setAttribute("data-handle-position", "end");
    rightHandle.setAttribute("tabindex", 0);
    handleContainer.appendChild(leftHandle);
    handleContainer.appendChild(rightHandle);
    DOM.handles = [leftHandle, rightHandle];
    track.appendChild(trackBg);
    track.appendChild(trackFill);
    slider.appendChild(track);
    slider.appendChild(handleContainer);
    const labels = createLabels(ticksContainer, settings);
    slider.appendChild(labels);
    track.appendChild(ticksContainer);

    var rect = leftHandle.getBoundingClientRect();
    mouseOffset= rect.left;
  }

  function init() {
    addElementsToDOM();
    DOM.handles.forEach(handle => {
      handle.addEventListener("mousedown", startDrag);
      handle.addEventListener("touchstart", startDrag);
    });
    window.addEventListener("mouseup", stopDrag);
    window.addEventListener("touchend", stopDrag);
    window.addEventListener("resize", onWindowResize);
    window.addEventListener("mousemove", onHandleMove);
    window.addEventListener("touchmove", onHandleMove);
    window.addEventListener("keydown", onKeyDown);
  }

  function dispatchEvent() {
    let event;
    if (window.CustomEvent) {
      event = new CustomEvent("slider-change", {
        detail: { start: values.start, end: values.end, inputstart: values.start, inputend: values.end }
      });
    } else {
      event = document.createEvent("CustomEvent");
      event.initCustomEvent("slider-change", true, true, {
        start: values.start,
        end: values.end,
        inputstart: values.start,
        inputend: values.end
      });
    }
    slider.dispatchEvent(event);
  }

  function getClosestStep(newX, handlePosition) {
    //console.log(newX + " :: " + handlePosition);
    const isStart = handlePosition === "start";
    const otherStep = getStep(values[isStart ? "end" : "start"]);
    //const otherStep = steps[isStart ? (steps.length-1) : 0];
    let closestDistance = Infinity;
    let indexOfClosest = null;
    for (let i = 0; i < steps.length; i++) {
      if (
        (isStart && steps[i].stepX < otherStep.stepX) ||
        (!isStart && steps[i].stepX > otherStep.stepX)
      ) {
        const distance = Math.abs(steps[i].stepX - newX);
        if (distance < closestDistance) {
          closestDistance = distance;
          indexOfClosest = i;
        }
      }
    }
    return steps[indexOfClosest];
  }

  function updateHandles() {
    DOM.handles.forEach(function(handle, index) {
     const step = index === 0 ? getStep(values.start) :  getStep(values.end);
      //const step = index === 0 ? getStep(values.start) : steps[(steps.length-1)];//(values.end);
      handle.style.left = `${step.stepPercent}%`;

    });
   
  }

  const getStep = value => steps.find(step =>  step.value >= value );

  function updateFill() {
    const trackWidth = getTrackWidth();
    const startStep = getStep(values.start);
    const endStep = getStep(values.end);//steps[(steps.length-1)];//
  /*  console.log("values ");
    console.log(values);
    console.log("startStep ");
    console.log(startStep);
    console.log("endStep ");
    console.log(steps);
    console.log(endStep);*/


    const newWidth =
      trackWidth - (startStep.stepX + (trackWidth - endStep.stepX));
    const percentage = newWidth / trackWidth * 100;
    DOM.trackFill.style.width = `${percentage}%`;
    DOM.trackFill.style.left = `${startStep.stepPercent}%`;

  }

  function render() {
    updateFill();
    updateHandles();
  }

  function onHandleMove(event) {
    event.preventDefault();
    if (!dragging) return;
    const handleOffset = getHandleOffset();
    const clientX = event.clientX || event.touches[0].clientX;

    window.requestAnimationFrame(() => {
      if (!dragging) return;
      const mouseX = clientX - mouseOffset ;//slider.offsetLeft;
      const handlePosition = currentHandle.dataset.handlePosition;
      let newX = Math.max(
        handleOffset,
        Math.min(mouseX, slider.offsetWidth - handleOffset)
      );
      const currentStep = getClosestStep(newX, handlePosition);
      values[handlePosition] = currentStep.value;
      //console.log("-- " +clientX + " :: " + slider.offsetLeft);
      //console.log(newX);
      render();
      dispatchEvent();
    });
  }

  function onKeyDown(e) {
    const keyCode = e.keyCode;
    const handle = getFocusedHandle();
    const keys = {
      "37": "left",
      "39": "right"
    };
    const arrowKey = keys[keyCode];
    if(!handle || !arrowKey) return;
    const handlePosition = handle.dataset.handlePosition;
    const stepIncrement = arrowKey === "left" ? -1 : 1;
    const stepIndex = steps.findIndex(step => step.value === values[handlePosition]);
    const newIndex = stepIndex + stepIncrement;
    if(newIndex < 0 || newIndex >= steps.length) return;
    values[handlePosition] = steps[newIndex].value;
    render();
    dispatchEvent();
  }

  function onWindowResize() {
    steps = getSteps(slider.offsetWidth, getStepLen(), getHandleOffset());
    render();
  }

  function update(newValues) {
    values.start = newValues.start;
    values.end = newValues.end;
    render();
  }

  function on(eventType, fn) {
    slider.addEventListener(eventType, fn);
  }

  function off(eventType, fn) {
    slider.removeEventListener(eventType, fn);
  }

  function destroy(removeElement) {
    DOM.handles.forEach(handle => {
      handle.removeEventListener("mousedown", startDrag);
      handle.removeEventListener("touchstart", startDrag);
    });
    window.removeEventListener("mouseup", stopDrag);
    window.removeEventListener("touchend", stopDrag);
    window.removeEventListener("resize", onWindowResize);
    window.removeEventListener("mousemove", onHandleMove);
    window.removeEventListener("touchmove", onHandleMove);
    window.removeEventListener("keydown", onKeyDown);
    if(removeElement) slider.parentNode.removeChild(slider);
  }


  init();

  render();

  return {
    on,
    off,
    update,
    destroy
  };
}

/**
  * Slider settings
**/
/*
const settings = {
  start: -10,
  end: 10,
  increment: 1
};
*/
/**
 * A function such as this one can be passed into
 * MultiRangeSlider to transform the labels
 * based on their values.
 */
function getFormattedValue(value) {
  let hour;
  //hour = value % 12 == 0 ? 12 : value % 12;
  //hour = value / 12 >= 1 ? hour + " PM" : hour + " AM";
  return value.toFixed(3);
}

// Select all Class for multirange Slider
var sliders = document.querySelectorAll(".multi-range");

//
sliders.forEach((item, index) => {

  //console.log(index+1);
  //console.log(parseFloat(item.dataset.initvalue) + " " + parseFloat(item.dataset.endvalue) );

  var ddd = MultiRangeSlider(
    item,
    getFormattedValue
  )

  var startSlide =".start-slide-"+(index+1).toString();
  var endSlide =".end-slide-"+(index+1).toString();

  var container = document.getElementById("formulario-busqueda-avanzada-submit");

  var a = document.createElement('input');
  a.type = "hidden";
  a.name = item.dataset.namefield+"-start";
  a.value = 0;//parseFloat(item.dataset.initvalue);
  var b = document.createElement('input');
  b.type = "hidden";
  b.name = item.dataset.namefield+'-end';
  b.value = 0; //parseFloat(item.dataset.endvalue);
var startInputSlide= container.appendChild(a);
var endInputSlide=  container.appendChild(b);

  var view = {
    start: document.querySelector(startSlide), //document.querySelector(".start-slide"),
    end: document.querySelector(endSlide), //document.querySelector(".end-slide"),
    inputstart: startInputSlide,
    inputend: endInputSlide,
    update: function(values) {
      for (let key in values) {
        if (key.indexOf('input')!== -1){
          this[key].value = getFormattedValue(values[key]);
        }else{
          this[key].textContent = getFormattedValue(values[key]);
        }
      }
    }
  };

  view.update({
    start: parseFloat(item.dataset.initvalue), // slider.settings.start,
    end: parseFloat(item.dataset.endvalue) //slider.settings.end
  });
  /**
   * You can listen to the slider-change event
   * which fires every time a handle is moved.
   */
  ddd.on("slider-change", event => view.update(event.detail));


});
