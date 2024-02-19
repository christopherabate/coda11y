import sandbox from "./modules/sandbox.js";

const alert = (parent, title, message, type) => {
  const wrapper = document.createElement("div")
  wrapper.innerHTML = [`
    <p class="alert alert-${type} alert-dismissible fade show" role="alert">
      <strong>${title} :<\/strong> ${message}
      <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
    <\/p>`
    ];

  parent.appendChild(wrapper);
}

document.querySelectorAll("form").forEach((box) => {
  sandbox({ box: box, editable: true });

  box.addEventListener("input", (event) => {
    Prism.highlightAll();
  });
  
  box.addEventListener("submit", (event) => {
    console.log(event.submitter);
    
    [...box.querySelectorAll('.card-body .alert-dismissible')].map(element => new bootstrap.Alert(element)).forEach((alert) => {
      alert.close()
    });

    switch (event.submitter.name) {
      case "hint_1":
      case "hint_2":
      case "hint_3":
        console.log("hints");
        alert(box.querySelector(".card-body"), `<span class="bi bi-info-circle-fill"></span> ${event.submitter.name}`, "Nice, you triggered this alert message!", "info")
        break;
      case "answer":
        console.log("answer");
        alert(box.querySelector(".card-body"), `<span class="bi bi-lightbulb-fill"></span> ${event.submitter.name}`, "Nice, you triggered this alert message!", "warning")
        break;
      case "test":
        console.log("test");
        alert(box.querySelector(".card-body"), `<span class="bi bi-universal-access-circle"></span> ${event.submitter.name}`, "Nice, you triggered this alert message!", "success")
        break;
    }
    
    event.preventDefault();
  });
});

fetch('./coda11y.json')
.then(response => response.json())
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error);
});
