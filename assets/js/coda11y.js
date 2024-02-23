import sandbox from "./modules/sandbox.js";
import coda11y from "./modules/coda11y.json.js";


document.querySelector("header .offcanvas-body").appendChild(Object.assign(document.createElement("div"), {
  innerHTML: [`
    ${coda11y.map((question, index) => [`
      <a class="list-group-item list-group-item-action" href="#slide_${index}">${index + 1}. ${question.title}</a>
    `]).join("")}
  `],
  className: "list-group"
}));

Object.values(coda11y).forEach((question, index, {length}) => {
  document.querySelector("main").appendChild(Object.assign(document.createElement("div"), {
    innerHTML: [`
      <nav class="position-absolute top-0 bottom-0 start-0 end-0 d-flex justify-content-between align-items-center">
        ${index == 0
          ? `<span class="z-2 py-3 border border-start-0 border-light bg-light rounded-end fs-3 bi bi-chevron-left" aria-hidden="true"></span>`
          : `<a class="z-2 link-dark" href="#slide_${index - 1}" role="button"><span class="py-3 shadow border border-start-0 border-light bg-light rounded-end fs-3 bi bi-chevron-left" aria-hidden="true"></span></a>`
        }
        ${index + 1 == length
          ? `<span class="z-2 py-3 border border-end-0 border-light bg-light rounded-start fs-3 bi bi-chevron-right" aria-hidden="true"></span>`
          : `<a class="z-2 link-dark" href="#slide_${index + 1}" role="button"><span class="py-3 shadow border border-end-0 border-light bg-light rounded-start fs-3 bi bi-chevron-right" aria-hidden="true"></span></a>`
        }
      </nav>
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
                <p>${question.description}</p>
                <div class="btn-group">
                  ${question.hints.map((hint, index) => [`
                    <button class="btn btn-outline-info mb-3" type="submit" name="hint_${index + 1}" data-hint="${btoa(hint)}">Indice #${index + 1}</button>
                  `]).join("")}
                </div>
                <button class="btn btn-outline-warning mb-3" type="submit" name="answer" data-answers="${btoa(JSON.stringify(question.codes.map(code => Object.assign({}, {['language']: code.language, ['answer']: code.answer} ))))}">Solution</button>
                <button class="btn btn-outline-success mb-3" type="submit" name="test" data-tests="${btoa(JSON.stringify(question.codes.map(code => Object.assign({}, {['language']: code.language, ['tests']: code.tests} ))))}">Test</button>
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
    className: "container-fluid slide pt-5"
  }));
});

document.querySelectorAll("form").forEach((box) => {
  sandbox({ box: box, editable: true });

  box.addEventListener("input", (event) => {
    Prism.highlightAll();
  });
  
  box.addEventListener("submit", (event) => {

    event.preventDefault();

    [...box.querySelectorAll(".card-body .alert-dismissible")].map(element => new bootstrap.Alert(element)).forEach((alert) => {
      alert.close();
    });

    switch (event.submitter.name) {
      case "hint_1":
      case "hint_2":
      case "hint_3":
        event.submitter.parentElement.parentElement.appendChild(Object.assign(document.createElement("div"), {
          innerHTML: [`
            <strong><span class="bi bi-info-circle-fill"></span> ${event.submitter.textContent} :<\/strong>
            ${atob(event.submitter.dataset.hint)}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
          `],
          className: "alert alert-info alert-dismissible show",
          role: "alert"
        }));
        break;
      case "answer":
        event.submitter.parentElement.appendChild(Object.assign(document.createElement("div"), {
          innerHTML: [`
            <strong><span class="bi bi-lightbulb-fill"></span> ${event.submitter.textContent} :<\/strong>
            <ul>
              ${JSON.parse(atob(event.submitter.dataset.answers)).map(code => [`
                <li>${code.language} : ${code.answer}</li>
              `]).join("")}
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
          `],
          className: "alert alert-warning alert-dismissible show",
          role: "alert"
        }));
        break;
      case "test":
        Object.entries(Object.fromEntries(new FormData(event.target).entries())).forEach(([input, value]) => {
          console.log(`${input}: ${value}`);
        });

        [...JSON.parse(atob(event.submitter.dataset.tests))].forEach((code) => {
          console.log(code.language);
          console.log(code.tests.map(test => test.pattern));
        });

        event.submitter.parentElement.appendChild(Object.assign(document.createElement("div"), {
          innerHTML: [`
            <strong><span class="bi bi-universal-access-circle"></span> ${event.submitter.textContent} :<\/strong>
            <ul>
              ${JSON.parse(atob(event.submitter.dataset.tests)).map(code => [`
              <li>${code.language}
                  <dl>
                    ${code.tests.map(test => [`
                      <dt>${test.pattern}</dt>
                      <dd>Erreur : ${test.error}</dd>
                      <dd>Succès : ${test.success}</dd>
                    `]).join("")}
                  </dl>
                </li>
              `]).join("")}
            </ul>
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Fermer"><\/button>
          `],
          className: "alert alert-success alert-dismissible show",
          role: "alert"
        }));
        break;
    }
  });
});
