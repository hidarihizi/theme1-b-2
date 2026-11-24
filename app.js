// =============================================
// 商品名で検索して、売り場を店内マップで表示する
// （売り場と商品のデータは data.js にあります）
// =============================================

const SVG_NS = "http://www.w3.org/2000/svg";
const MAX_LIST = 8; // 結果の一覧に出す最大件数

// ---------- 文字のゆれをそろえる ----------
// 全角/半角・大文字/小文字・カタカナ/ひらがな・空白 の違いを気にせず比べられるようにする
function normalize(text) {
  return text
    .normalize("NFKC")
    .toLowerCase()
    .replace(/[ァ-ヶ]/g, (ch) => String.fromCharCode(ch.charCodeAt(0) - 0x60))
    .replace(/\s+/g, "");
}

// ---------- 検索 ----------
// 商品名・ほかの呼び方・売り場名から探す。
// ぴったり一致するものがあればそれだけを、なければ一部が一致するものを返す。
// （「プリン」で探したときに「プリント」まで出てこないようにするため）
// 返す値: [{ label: 一覧に出す名前, section: 売り場の id }, ...]
function searchItems(query) {
  const q = normalize(query);
  const sectionsAsItems = SECTIONS.map((section) => ({ name: section.name, section: section.id }));
  const exact = [];
  const partial = [];

  ITEMS.concat(sectionsAsItems).forEach((item) => {
    const words = [item.name].concat(item.keywords || []);
    if (words.some((word) => normalize(word) === q)) {
      exact.push({ label: item.name, section: item.section });
      return;
    }
    // 一部が一致したときは、一致した呼び方を出す（例:「チョコ」→ チョコアイス）
    const matchedWord = words.find((word) => normalize(word).includes(q));
    if (matchedWord) {
      partial.push({ label: matchedWord, section: item.section });
    }
  });

  return exact.length > 0 ? exact : partial;
}

function findSection(id) {
  return SECTIONS.find((section) => section.id === id);
}

// ---------- 店内マップ ----------
function createSvg(tag, attributes) {
  const element = document.createElementNS(SVG_NS, tag);
  Object.entries(attributes).forEach(([key, value]) => element.setAttribute(key, value));
  return element;
}

function drawMap() {
  const svg = document.getElementById("store-map");

  // 壁（下のすき間が入口）
  svg.append(createSvg("path", { class: "wall", d: "M120 490 H390 V10 H10 V490 H30" }));
  const entrance = createSvg("text", { class: "entrance", x: 75, y: 510 });
  entrance.textContent = "▲ 入口";
  svg.append(entrance);

  // 売り場
  SECTIONS.forEach((section) => {
    const group = createSvg("g", { class: "section", "data-id": section.id });
    group.append(createSvg("rect", { x: section.x, y: section.y, width: section.w, height: section.h, rx: 6 }));
    const label = createSvg("text", { x: section.x + section.w / 2, y: section.y + section.h / 2 });
    label.textContent = section.name;
    group.append(label);
    svg.append(group);
  });
}

// 指定した売り場を目立たせ、ほかの売り場を薄くする
function highlightSections(sectionIds) {
  const svg = document.getElementById("store-map");
  svg.classList.toggle("has-hit", sectionIds.length > 0);
  svg.querySelectorAll(".section").forEach((group) => {
    group.classList.toggle("is-hit", sectionIds.includes(group.getAttribute("data-id")));
  });
}

// ---------- 結果の表示 ----------
function showResults(query) {
  const place = document.getElementById("item-place");
  const list = document.getElementById("result-list");
  list.innerHTML = "";

  if (query.trim() === "") {
    place.textContent = "商品名を入力してください";
    highlightSections([]);
    return;
  }

  const results = searchItems(query);
  if (results.length === 0) {
    place.textContent = "「" + query.trim() + "」は見つかりませんでした。別の言い方で探すか、店員さんに聞いてください。";
    highlightSections([]);
    return;
  }

  // 見つかった売り場（重なりをなくす）
  const sectionIds = [...new Set(results.map((item) => item.section))];
  place.textContent = sectionIds.map((id) => findSection(id).name).join("、");
  highlightSections(sectionIds);

  // どの商品がどの売り場か一覧にする（売り場名そのものでヒットしたものは省く）
  const details = results.filter((item) => item.label !== findSection(item.section).name);
  details.slice(0, MAX_LIST).forEach((item) => {
    const li = document.createElement("li");
    li.textContent = item.label + " → " + findSection(item.section).name;
    list.append(li);
  });
  if (details.length > MAX_LIST) {
    const li = document.createElement("li");
    li.textContent = "ほか " + (details.length - MAX_LIST) + " 件";
    list.append(li);
  }

  // スマホでマップが画面の外にあるときは見える位置までスクロール
  document.getElementById("store-map").scrollIntoView({ behavior: "smooth", block: "nearest" });
}

// 入力欄の候補（datalist）に商品名を入れる
function fillSuggestions() {
  const datalist = document.getElementById("item-names");
  ITEMS.forEach((item) => {
    const option = document.createElement("option");
    option.value = item.name;
    datalist.append(option);
  });
}

// ---------- はじめに実行 ----------
drawMap();
fillSuggestions();

document.getElementById("search-form").addEventListener("submit", function (event) {
  event.preventDefault(); // ページが再読み込みされないようにする
  showResults(document.getElementById("item-input").value);
});

// URL に ?q=おにぎり のように付けて開くと、最初から検索した状態で表示する
const firstQuery = new URLSearchParams(location.search).get("q");
if (firstQuery) {
  document.getElementById("item-input").value = firstQuery;
  showResults(firstQuery);
}
