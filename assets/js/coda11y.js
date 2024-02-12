import sandbox from "../modules/sandbox.js";
import splitviews from "../modules/splitviews.js";

splitviews();

document.querySelectorAll("form").forEach((box) => {
  sandbox({ box: box, editable: true });

  box.addEventListener("input", (event) => {
    Prism.highlightAll();
  });
  
  box.addEventListener("submit", (event) => {
    console.log(event.submitter);
    
    switch (event.submitter.name) {
      case "clue1":
      case "clue2":
      case "clue3":
        console.log("clue");
        break;
      case "solution":
        console.log("solution");
        break;
      case "validate":
        console.log("validate");
        break;
    }
    
    event.preventDefault();
  });
});

fetch('./exercises.json')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
});