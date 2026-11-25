const itemPlaceMap = {
  // 飲み物
  "お茶": "petdrink",
  "緑茶": "petdrink",
  "水": "petdrink",
  "ミネラルウォーター": "petdrink",
  "スポーツドリンク": "petdrink",
  "コーラ": "petdrink",
  "ジュース": "petdrink",
  "コーヒー": "petdrink",

  // 紙パック飲料
  "牛乳": "drink-pack",
  "カフェオレ": "drink-pack",
  "野菜ジュース": "drink-pack",
  "紙パックジュース": "drink-pack",

  // パン
  "パン": "bread",
  "食パン": "bread",
  "メロンパン": "bread",
  "クロワッサン": "bread",
  "あんパン": "bread",
  "クリームパン": "bread",

  // サンドイッチ
  "サンドイッチ": "sandwich",
  "たまごサンド": "sandwich",
  "ハムサンド": "sandwich",
  "ミックスサンド": "sandwich",

  // おにぎり・弁当
  "おにぎり": "rice",
  "鮭おにぎり": "rice",
  "ツナマヨおにぎり": "rice",
  "お弁当": "rice",

  // 弁当コーナー
  "唐揚げ弁当": "bento",
  "のり弁": "bento",
  "幕の内弁当": "bento",

  // スイーツ
  "プリン": "sweets",
  "シュークリーム": "sweets",
  "ロールケーキ": "sweets",
  "アイス": "sweets",

  // お菓子
  "ポテトチップス": "rack2",
  "チョコレート": "rack2",
  "クッキー": "rack2",
  "ガム": "rack2",
  "キャンディ": "rack2"
};

document.getElementById("search-button").addEventListener("click", function (event) {
event.preventDefault();
 
const itemName = document.getElementById("item-input").value.trim();
 
document.getElementById("item-place").textContent = "";
 
const places = [
"drink-pack",
"sweets",
"sandwich",
"rice",
"petdrink",
"bento",
"bread",
"rack2"
];
 
places.forEach(function (placeId) {
const place = document.getElementById(placeId);
if (place) {
place.style.backgroundColor = "#f5f5f5";
}
});
 
const placeId = itemPlaceMap[itemName];
 
if (placeId) {
document.getElementById("item-place").textContent = placeId;
 
const targetPlace = document.getElementById(placeId);
if (targetPlace) {
targetPlace.style.backgroundColor = "yellow";
}
} else {
document.getElementById("item-place").textContent = "見つかりません";
}
});
