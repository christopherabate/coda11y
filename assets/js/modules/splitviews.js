'use strict';

const splitviews = (options = {}) => {
    
  const BOXES = options.boxes || document.querySelectorAll(".splitviews");
  const HANDLECLASS = options.handleClass || "handle";
  
  BOXES.forEach((box) => {
    
    box.querySelectorAll(`.${HANDLECLASS}`).forEach((handle) => {
      
      let left = handle.previousElementSibling;
      let right = handle.nextElementSibling;
      let x = 0;
      let leftOrigin = 0;
      let rightOrigin = 0;

      let mousedown = function(e) {
        x = e.clientX;
        
        leftOrigin = left.getBoundingClientRect().width;
        rightOrigin = right.getBoundingClientRect().width;
      
        document.addEventListener('mousemove', mousemove);
        document.addEventListener('mouseup', mouseup);
      };
      
      let mousemove = function(e) {
        const dx = e.clientX - x;
        
        left.style.userSelect = "none";
        left.style.pointerEvents = "none";
        left.style.flexGrow = 0;
        left.style.flexBasis = `${leftOrigin + dx}px`;
        right.style.userSelect = "none";
        right.style.pointerEvents = "none";
        right.style.flexGrow = 0;
        right.style.flexBasis = `${rightOrigin - dx}px`;
      };
      
      let mouseup = function(e) {
        left.style.removeProperty("user-select");
        left.style.removeProperty("pointer-events");
        right.style.removeProperty("user-select");
        right.style.removeProperty("pointer-events");
        
        document.removeEventListener('mousemove', mousemove);
        document.removeEventListener('mouseup', mouseup)
      };
      
      handle.addEventListener('mousedown', mousedown);
    });
  });
  
  return BOXES;
}

export default splitviews
