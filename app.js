document.getElementById("search-button").addEventListener("click", function () {
  const itemName = document.getElementById("item-input").value;
  document.getElementById("item-place").textContent = itemName;
});
