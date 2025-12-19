const listEl = document.getElementById("vuln-list");
const formEl = document.getElementById("note-form");
const noteOutput = document.getElementById("note-output");

const renderDemo = (item) => {
  return `
    <div class="demo">
      <div class="demo-header">
        <div>
          <h4>${item.demoTitle}</h4>
          <p class="muted">${item.demoDescription}</p>
        </div>
        <button class="demo-action" data-payload="${item.demoPayload}">触发演示</button>
      </div>
      <div class="demo-output">
        <strong>输出：</strong>
        <div class="demo-result"></div>
      </div>
    </div>
  `;
};

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
          ${renderDemo(item)}
        </article>
      `
      )
      .join("");

    listEl.querySelectorAll(".demo-action").forEach((button) => {
      button.addEventListener("click", (event) => {
        const payload = event.currentTarget.dataset.payload;
        const result = event.currentTarget
          .closest(".demo")
          .querySelector(".demo-result");
        result.innerHTML = `<span class=\"unsafe\">${payload}</span>`;
      });
    });
  })
  .catch((error) => {
    listEl.textContent = `加载失败：${error}`;
  });

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = new FormData(formEl).get("note");
  noteOutput.innerHTML = note || "<em>没有输入内容。</em>";
});
