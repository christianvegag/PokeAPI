const API = "https://pokeapi.co/api/v2/pokemon?offset=0&limit=50";
let html = "";

const getAPI = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      fillData(json.results), pagination(json);
    })
    .catch((error) => {
      console.log("Error in the API", error);
    });
};

const getAPIImg = (url) => {
  return fetch(url)
    .then((response) => response.json())
    .then((json) => {
      fillDataImg(json, json.sprites.other.dream_world);
    })
    .catch((error) => {
      console.log("Error in the API", error);
    });
};

const fillData = (data) => {
  html = "";
  data.forEach((ch) => {
    getAPIImg(ch.url);
  });
};

const fillDataImg = (dataImg, img) => {


  // html += '<div class="col">';
  // html += '<div class="card h-100 bg-info bg-opacity-10">';
  // html += `<img src="${img.front_default}" class="card-img-top" style="height:250px;" alt="...">`;
  // html += '<div class="card-body text-center">';
  // html += `<h3 class="card-title text-uppercase">${dataImg.name}</h3>`;
  // html += `<h5 class="card-text">Altura -> ${dataImg.height}</h5>`;
  // html += `<h5 class="card-text">Peso -> ${dataImg.weight}</h5>`;
  // html += "</div>";
  // html += "</div>";
  // html += "</div>";

  html += `
  <div class="wrapper">
        <div class="clash-card barbarian">
          <div class="clash-card__image clash-card__image--barbarian">
            <img src="${img.front_default}"  style="height:280px;" alt="..." alt="barbarian" />
          </div>
          <div class="clash-card__level clash-card__level--barbarian">Level ${dataImg.base_experience}</div>
          <div class="clash-card__unit-name text-uppercase">${dataImg.name}</div>
          <div class="clash-card__unit-description">
            The ${dataImg.name} it's a special pokemon so you can't trade it.
          </div>
    
          <div class="clash-card__unit-stats clash-card__unit-stats--barbarian clearfix">
            <div class="one-third">
              <div class="stat">${dataImg.height}</div>
              <div class="stat-value">Height</div>
            </div>
    
            <div class="one-third">
              <div class="stat">${dataImg.weight}</div>
              <div class="stat-value">Weight</div>
            </div>
    
            <div class="one-third no-border">
              <div class="stat">${dataImg.base_experience}</div>
              <div class="stat-value">Power</div>
            </div>
    
          </div>
    
        </div> <!-- end clash-card barbarian-->
      </div> <!-- end wrapper -->`

  document.getElementById("characters").innerHTML = html;
};


const pagination = (info) => {
  let html = "";

  html += `<li style="cursor:pointer;" class="page-item ${info.previous == null ? "disabled" : ""}"><a class="page-link bg-transparent" onclick="getAPI('${info.previous}')">Prev</a></li>`;
  html += `<li style="cursor:pointer;" class="page-item ${info.next == null ? "disabled" : ""}"><a class="page-link bg-transparent" onclick="getAPI('${info.next}')">Next</a></li>`;

  document.getElementById("pagination").innerHTML = html;
};

getAPI(API);
