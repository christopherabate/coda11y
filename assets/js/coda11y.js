import sandbox from "./modules/sandbox.js";
import coda11y from "./modules/coda11y.json.js";

Object.values(coda11y).forEach((question, index) => {
  document.querySelector("main").appendChild(Object.assign(document.createElement("div"),{
    innerHTML: [`
      <h2>${question.title}</h2>
      <form>
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-header d-flex justify-content-between align-items-center">
                <span class="bi bi-chevron-right"></span>
                <p class="fw-bold m-0">Console</p>
                <span class="bi bi-window-sidebar"></span>
              </div>
              <div class="card-body">
                <p class="alert" role="alert">
                  <span class="bi bi-arrow-down-circle-fill"></span>
                  ${question.description}
                </p>
                <ul class="list-inline d-flex justify-content-between">
  
                  ${question.hints.map((hint, index) => [`
                    <li class="list-inline-item">
                      <button class="btn btn-info" type="submit" name="hint_${index + 1}" data-hint="${btoa(hint)}">Indice #${index + 1}</button>
                    </li>
                  `]).join("")}
                  
                  <li class="list-inline-item">
                    <button class="btn btn-warning" type="submit" name="answer" data-answer="${btoa(question.codes.map(code => code.answer).join(""))}">Solution</button>
                  </li>
                  <li class="list-inline-item">
                    <button class="btn btn-success" type="submit" name="test" data-errors="">Tester</button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="col-md mb-3">
            <div class="row">
  
              ${question.codes.map(code => [`
                <div class="col-md mb-3">
                  <div class="card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <p class="fw-bold m-0">${code.language}</p>
                      <span class="bi bi-filetype-${code.language}"></span>
                    </div>
                    <div class="card-body p-0">
                      <pre class="m-0"><code title="${code.language}" class="language-${code.language}">${code.placeholder}</code></pre>
                    </div>
                  </div>
                </div>
              `]).join("")}
  
            </div>
            <div class="row">
              <div class="col-md">
                <div class="card h-100">
                  <div class="card-header d-flex justify-content-between align-items-center">
                    <div>
                      <span class="bi bi-circle-fill text-danger"></span>
                      <span class="bi bi-circle-fill text-warning"></span>
                      <span class="bi bi-circle-fill text-success"></span>
                    </div>
                    <p class="fw-bold m-0">${question.title}</p>
                    <span class="bi bi-window"></span>
                  </div>
                  <div class="card-body d-flex overflow-hidden p-0" style="resize: vertical;">
                    <iframe title="Résultat Exercice 2" class="flex-grow-1 h-100 w-100 bg-white">${question.template}</iframe>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </form>
    `],
    style.[--slide]: index
  }));
});

document.querySelectorAll("form").forEach((box) => {
  sandbox({ box: box, editable: true });

  box.addEventListener("input", (event) => {
    Prism.highlightAll();
  });
  
  box.addEventListener("submit", (event) => {
    
    [...box.querySelectorAll(".card-body .alert-dismissible")].map(element => new bootstrap.Alert(element)).forEach((alert) => {
      alert.close()
    });

    switch (event.submitter.name) {
      case "hint_1":
      case "hint_2":
      case "hint_3":
        event.submitter.parentElement.parentElement.parentElement.appendChild(Object.assign(document.createElement("p"),{
          innerHTML: [`
            <strong><span class="bi bi-info-circle-fill"></span> ${event.submitter.textContent} :<\/strong> ${atob(event.submitter.dataset.hint)}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
          `],
          className: "alert alert-info alert-dismissible fade show",
          role: "alert"
        }));
        break;
      case "answer":
        event.submitter.parentElement.parentElement.parentElement.appendChild(Object.assign(document.createElement("p"),{
          innerHTML: [`
            <strong><span class="bi bi-lightbulb-fill"></span> ${event.submitter.textContent} :<\/strong> ${atob(event.submitter.dataset.answer)}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
          `],
          className: "alert alert-warning alert-dismissible fade show",
          role: "alert"
        }));
        break;
      case "test":
        event.submitter.parentElement.parentElement.parentElement.appendChild(Object.assign(document.createElement("p"),{
          innerHTML: [`
            <strong><span class="bi bi-universal-access-circle"></span> ${event.submitter.textContent} :<\/strong> ${atob(event.submitter.dataset.errors)}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
          `],
          className: "alert alert-success alert-dismissible fade show",
          role: "alert"
        }));
        break;
    }
    
    event.preventDefault();
  });
});
