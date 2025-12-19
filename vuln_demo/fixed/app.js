const listEl = document.getElementById("vuln-list");
const formEl = document.getElementById("note-form");
const noteOutput = document.getElementById("note-output");

const createDemo = (item) => {
  const demo = document.createElement("div");
  demo.className = "demo";

  const header = document.createElement("div");
  header.className = "demo-header";

  const headerText = document.createElement("div");
  const title = document.createElement("h4");
  title.textContent = item.demoTitle;
  const desc = document.createElement("p");
  desc.className = "muted";
  desc.textContent = item.demoDescription;
  headerText.append(title, desc);

  const action = document.createElement("button");
  action.className = "demo-action";
  action.type = "button";
  action.textContent = "触发演示";
  action.addEventListener("click", () => {
    result.textContent = item.demoPayload;
  });

  header.append(headerText, action);

  const output = document.createElement("div");
  output.className = "demo-output";
  const outputLabel = document.createElement("strong");
  outputLabel.textContent = "输出：";
  const result = document.createElement("div");
  result.className = "demo-result";
  output.append(outputLabel, result);

  demo.append(header, output);
  return demo;
};

const createCard = (item) => {
  const article = document.createElement("article");
  article.className = "vuln-card";

  const header = document.createElement("header");
  const severity = document.createElement("span");
  severity.className = `pill severity-${item.severity}`;
  severity.textContent = item.severity;

  const title = document.createElement("h3");
  title.textContent = `${item.id} · ${item.title}`;

  header.append(severity, title);

  const desc = document.createElement("p");
  desc.textContent = item.description;

  const location = document.createElement("p");
  const locationStrong = document.createElement("strong");
  locationStrong.textContent = "位置：";
  location.append(locationStrong, document.createTextNode(item.location));

  const example = document.createElement("p");
  example.className = "example";
  const exampleStrong = document.createElement("strong");
  exampleStrong.textContent = "代码片段：";
  example.append(exampleStrong, document.createTextNode(item.example));

  article.append(header, desc, location, example, createDemo(item));
  return article;
};

fetch("vulnerabilities.json")
  .then((response) => response.json())
  .then((items) => {
    listEl.innerHTML = "";
    items.forEach((item) => listEl.append(createCard(item)));
  })
  .catch((error) => {
    listEl.textContent = `加载失败：${error}`;
  });

formEl.addEventListener("submit", (event) => {
  event.preventDefault();
  const note = new FormData(formEl).get("note");
  noteOutput.textContent = note || "没有输入内容。";
});
