const listEl = document.getElementById("vuln-list");
const formEl = document.getElementById("note-form");
const noteOutput = document.getElementById("note-output");

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

  article.append(header, desc, location, example);
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
