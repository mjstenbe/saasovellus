function haeSaatiedot(kaupunki) {
  var api =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    kaupunki +
    "&units=metric&mode=json&APPID=ff64c247a136f706923d1ee0d55d71e2";
  var xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET", api, true);
  xmlhttp.send();

  xmlhttp.onreadystatechange = function () {
    if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
      // alert(xmlhttp.responseText);
      // Muutetaan teksti JSON olioksi
      let data = JSON.parse(xmlhttp.responseText);

      naytaData(data);
    }
  };
}
function naytaData(data) {
  var el = document.querySelector("#app");
  //  // Kaivetaan haluttu kenttä ulos
  kuvaus = data.weather[0].description;
  temp = data.main.temp;
  kosteus = data.main.humidity;
  tuuli = data.wind.speed;
  city = data.name;
  ikoni = data.weather[0].icon;

  let html = `
  <div id="valikko">
  <label for="paikka">Valitse paikkakunta:</label>
    <select onchange="haeKaupunki()" name="paikka" id="paikka">
        <option value="Helsinki">Helsinki</option>
        <option value="Turku">Turku</option>
        <option value="Kuopio">Kuopio</option>
        <option value="Bangkok">Bangkok</option>
    </select>
    </div>
  <div id="container">
    <div id="kuvaus">${city}</div>  
    <div id="kuvaus">${kuvaus}</div>
    <div id="temp">${temp} &deg;C</div>
    <div id="kosteus">${kosteus} %</div>
    <div id="tuuli">${tuuli} m/s</div>
    <div id="icon"><img src="http://openweathermap.org/img/w/${ikoni}.png"></div>
  </div>
  
    `;
  // Piirretään ruudulle
  el.innerHTML = html;
}
function haeKaupunki() {
  let kaupunki = document.querySelector("select").value;
  haeSaatiedot(kaupunki);
}
function haeData() {
  var url =
    "https://api.openweathermap.org/data/2.5/weather?q=Helsinki,%20FI&APPID=ff64c247a136f706923d1ee0d55d71e2";

  fetch(url)
    .then((response) => {
      return response.text();
    })
    .then((data) => {
      document.write(data);
    });
}
// Kutsutaan säätiedot hakevaa funktiota
haeSaatiedot("Helsinki");
