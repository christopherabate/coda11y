import sandbox from "./modules/sandbox.js";
import splitviews from "./modules/splitviews.js";

splitviews();

const alert = (parent, title, message, type) => {
  const wrapper = document.createElement("div")
  wrapper.innerHTML = [`
    <p class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>${title} :<\/strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
    <\/p>`
    ];

  parent.appendChild(wrapper)
}

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
        alert(box.querySelector("#console .card-body"), '<span class="bi bi-info-circle-fill"></span> Indice', "Nice, you triggered this alert message!", "info")
        break;
      case "solution":
        console.log("solution");
        alert(box.querySelector("#console .card-body"), '<span class="bi bi-lightbulb-fill"></span> Solution', "Nice, you triggered this alert message!", "warning")
        break;
      case "validate":
        console.log("validate");
        alert(box.querySelector("#console .card-body"), '<span class="bi bi-universal-access-circle"></span> Success', "Nice, you triggered this alert message!", "success")
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
