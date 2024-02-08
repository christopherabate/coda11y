class Sandbox {
  constructor(options = {}) {
    this.selector = options.selector || "#SandboxExemple1";
    this.editable = options.editable || true;
    
    this.template = document.querySelector(`${this.selector} iframe`).textContent;
    
    this.updateOutput();
    
    if (this.editable === true) {
      // Collect codeboxes
      let codeboxes = document.querySelectorAll(`${this.selector} pre code`);
    
      // Parse codeboxes
      codeboxes.forEach((codebox) => {
      
        // Create the editor div
        let editor = document.createElement("div");
        editor.classList.add("sandbox-editor");
        
        // Create a textarea for edition
        let textarea = document.createElement("textarea");
        textarea.setAttribute("rows", "1");
        textarea.setAttribute("spellcheck", "false");
        textarea.setAttribute("autocorrect", "off");
        textarea.setAttribute("autocomplete", "off");
        textarea.setAttribute("autocapitalize", "off");
        textarea.setAttribute("translate", "no");
        textarea.setAttribute("title", codebox.getAttribute("title"));
        textarea.setAttribute("aria-label", codebox.getAttribute("title"));
        textarea.innerHTML = codebox.textContent;
        
        // Move textarea and code into editor
        codebox.parentElement.insertAdjacentElement("beforebegin", editor);
        editor.appendChild(codebox.parentElement);
        editor.appendChild(textarea);
        
        // Timeout
        let timeoutID;
        
        // On change
        textarea.addEventListener("input", (e) => {
          codebox.textContent = e.target.value;
          
          try {
            Prism.highlightAll();
          } catch (error) {
            console.log(error);
          }
          
          clearTimeout(timeoutID);
          timeoutID = setTimeout(() => {
            this.updateOutput();;
          }, 400);
        })
      });
    }
  }
  
  updateOutput() {
    let input = {
      html: document.querySelector(`${this.selector} .language-html`).textContent,
      css: document.querySelector(`${this.selector} .language-css`).textContent,
      js: document.querySelector(`${this.selector} .language-js`).textContent,
    };
    
    let output = document.querySelector(`${this.selector} iframe`);
    let languages = Object.keys(input);
    let code = Object.values(input);
    
    let render = new Function(...languages, `return \`${this.template}\`;`)(...code);
		let clone = output.cloneNode();
		output.replaceWith(clone);
		output = clone;
    
    output.contentWindow.document.open();
    output.contentWindow.document.writeln(render);
    output.contentWindow.document.close();
  }
}

new Sandbox ();