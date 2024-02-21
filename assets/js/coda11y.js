import sandbox from "./modules/sandbox.js";
import coda11y from "./modules/coda11y.json.js";

document.querySelector("header .offcanvas-body").appendChild(Object.assign(document.createElement("div"),{
  innerHTML: [`
    ${coda11y.map((question, index) => [`
      <a class="list-group-item list-group-item-action" href="#slide_${index}">${question.title}</a>
    `]).join("")}
  `],
  className: "list-group"
}));

Object.values(coda11y).forEach((question, index) => {
  document.querySelector("main").appendChild(Object.assign(document.createElement("div"),{
    innerHTML: [`
      <form>
        <div class="row">
          <div class="col-md-4 mb-3">
            <div class="card h-100">
              <div class="card-header d-flex justify-content-between align-items-center">
                <span class="bi bi-chevron-right"></span>
                <h2 class="h6 fw-bold m-0">${question.title}</h2>
                <span class="bi bi-window-sidebar"></span>
              </div>
              <div class="card-body">
                <div class="alert" role="alert">
                <strong><span class="bi bi-arrow-down-circle-fill"></span> Challenge :<\/strong>
                ${question.description}</p>
                </div>
                <div class="btn-group">
                  ${question.hints.map((hint, index) => [`
                    <button class="btn btn-info" type="submit" name="hint_${index + 1}" data-hint="${btoa(hint)}">Indice #${index + 1}</button>
                  `]).join("")}
                </div>
                <button class="btn btn-warning" type="submit" name="answer" data-answers="${btoa(JSON.stringify(question.codes.map(code => code.answer)))}">Solution</button>
                <button class="btn btn-success" type="submit" name="test" data-tests="${btoa(JSON.stringify(question.codes.map(code => code.tests)))}">Test</button>
              </div>
            </div>
          </div>
          <div class="col-md mb-3">
            <div class="row">
              ${question.codes.map(code => [`
                <div class="col-md mb-3">
                  <div class="card h-100">
                    <div class="card-header d-flex justify-content-between align-items-center">
                      <h3 class="h6 text-uppercase fw-bold m-0">${code.language}</h3>
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
                    <h3 class="h6 fw-bold m-0">Aperçu</h3>
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
    style: `--slide: ${index}`,
    id: `slide_${index}`,
    className: "container-fluid py-5 slide"
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
        event.submitter.parentElement.parentElement.appendChild(Object.assign(document.createElement("div"),{
          innerHTML: [`
            <strong><span class="bi bi-info-circle-fill"></span> ${event.submitter.textContent} :<\/strong>
            ${atob(event.submitter.dataset.hint)}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
          `],
          className: "alert alert-info alert-dismissible fade show",
          role: "alert"
        }));
        break;
      case "answer":
        event.submitter.parentElement.appendChild(Object.assign(document.createElement("div"),{
          innerHTML: [`
            <strong><span class="bi bi-lightbulb-fill"></span> ${event.submitter.textContent} :<\/strong>
            <ul>
              ${JSON.parse(atob(event.submitter.dataset.answers)).map(answer => [`
                <li>${answer}</li>
              `]).join("")}
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
          `],
          className: "alert alert-warning alert-dismissible fade show",
          role: "alert"
        }));
        break;
      case "test":
        event.submitter.parentElement.appendChild(Object.assign(document.createElement("div"),{
          innerHTML: [`
            <strong><span class="bi bi-universal-access-circle"></span> ${event.submitter.textContent} :<\/strong>
            <ol>
              ${JSON.parse(atob(event.submitter.dataset.tests)).map(code => [`
                ${code.map(test => [`
                  <li>${test.pattern} : ${test.error}</li>
                `]).join("")}
              `]).join("")}
            </ol>
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
