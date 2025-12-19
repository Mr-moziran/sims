const listEl = document.getElementById("vuln-list");
const formEl = document.getElementById("note-form");
const noteOutput = document.getElementById("note-output");

fetch("vulnerabilities.json")
  .then((response) => response.json())
  .then((items) => {
    listEl.innerHTML = items
      .map(
        (item) => `
        <article class="vuln-card">
          <header>
            <span class="pill severity-${item.severity}">${item.severity}</span>
            <h3>${item.id} · ${item.title}</h3>
          </header>
          <p>${item.description}</p>
          <p><strong>位置：</strong>${item.location}</p>
          <p class="example"><strong>代码片段：</strong>${item.example}</p>
        </article>
      `
      )
      .join("");
  })
  .catch((error) => {
    listEl.textContent = `加载失败：${error}`;
  });

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = new FormData(formEl).get("note");
  noteOutput.innerHTML = note || "<em>没有输入内容。</em>";
});
