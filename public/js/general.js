(function() {
let day = document.querySelectorAll(".day");
let dropDownHourly = document.querySelector(".dropDownHourly");
let clickedIndex = 0;
let searchInput = document.querySelector("#searchInput");
let searchList = document.querySelector(".searchResult");
let cityId = document.querySelector("#cityId");
let searchForm = document.querySelector("#searchForm");

day.forEach (function(el, i) {
  el.addEventListener("click", function(){
    if (clickedIndex === i) {
      dropDownHourly.classList.toggle("show");
      this.classList.toggle("highlight");
    } else {
      day[clickedIndex].classList.remove("highlight");
      dropDownHourly.classList.add("show");
      this.classList.add("highlight");
    }
    clickedIndex = i;
  });
});

searchInput.addEventListener("input", async (event) => {
  let input = event.target.value;
  let list = document.createElement("ul");
  list.setAttribute("class", "cityList");

  if (input == "") {
    searchList.classList.replace("searchResultShow", "searchResult");
    list.innerHTML = " ";
  } else {
    searchList.classList.replace("searchResult", "searchResultShow");

    let url = new URL("http://localhost:8080/general/search");
    let params = {city: input};
    url.search = new URLSearchParams(params);

    try {
      let res = await fetch(url);
      let cities = await res.json();
      if (cities.length === 0) {
        list.innerHTML = "<em>No match found</em>";
      } else {
        for (let i = 0; i < cities.length; i++) {
          let item = document.createElement("li");
          if (cities[i].province === null) {
            item.textContent = `${cities[i].city}, ${cities[i].country}`;
          } else {
            item.textContent = `${cities[i].city}, ${cities[i].province}, ${cities[i].country}`;
          }
          item.addEventListener("click", () => {
            cityId.value = cities[i].id;
            searchInput.value = item.textContent;
            searchForm.submit();
          });
          list.appendChild(item);
        }
      }
    } catch(err) {
      list.innerHTML = "<em>Error connecting to database</em>";
      console.log(err);
    }
  }
  searchList.replaceChild(list, searchList.childNodes[0]);
});
})();
