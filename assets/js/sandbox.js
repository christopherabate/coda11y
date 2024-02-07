// Function to update the results
function updateResult (box) {
  let result = box.querySelector("iFrame");
  let html = box.querySelector(".language-html");
  let css = box.querySelector(".language-css");
  let js = box.querySelector(".language-js");
  
  // Create new iframe
  let clone = result.cloneNode();
  result.replaceWith(clone);
  result = clone;

  // Render
  result.contentWindow.document.open();
  result.contentWindow.document.writeln(`
    <!doctype html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>${css.textContent}<\/style>
      <\/head>
      <body>
        ${html.textContent}
        <script type="module">${js.textContent}<\/script>
      <\/body>
    <\/html>
  `);
  result.contentWindow.document.close();
}

// Collect sandboxes
let sandboxes = document.querySelectorAll('.sandbox');

// Parse sandboxes
sandboxes.forEach((sandbox) => {

  updateResult(sandbox);
  
  // Check for editable mode
  if (sandbox.getAttribute("data-sandbox-editable") === "true") {
  
    // Collect codeboxes
    let codeboxes = sandbox.querySelectorAll('pre code');
  
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
          updateResult(sandbox);
        }, 400);
      })
    });
  }
});