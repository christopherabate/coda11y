'use strict';

const splitviews = () => {
    
  document.querySelectorAll(".splitviews").forEach((box) => {
    
    [...box.children].slice(0, -1).forEach((view) => {
      
      if (view !== box.lastChild) {
        
        let handle = document.createElement("span");
        
        view.insertAdjacentElement("afterend", handle);
      
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
        
      }
    });
  });
}

export default splitviews
