

var recipeContainer = document.getElementById("recipeContainer");


var imgs = document.querySelectorAll("#img");
let counter = 0;
slideShow();

function slideShow(){
  for(let i=0; i<imgs.length; i++){
    imgs[i].style.display="none";
  }
  counter++;
  if(counter>imgs.length){
    counter = 1;
  }
  imgs[counter-1].style.display="block";
  setTimeout(slideShow, 2000);
}

var button = document.getElementById("searchBtn");

let ingredient = button.addEventListener("click", getRecipeID);


function getRecipeID(){
  var ingredient = document.getElementById('searchBar').value;
  console.log(ingredient);

  var newRequest = new XMLHttpRequest();

  let apiKey="0a6f8665e3854f32a648b5bd03d6cd64";

  newRequest.open('GET', `https://api.spoonacular.com/recipes/findByIngredients?ingredients=${ingredient}&number=10&limitLicense=true&ranking=1&apiKey=${apiKey}`)

  newRequest.onload = function(){
    var ourData = JSON.parse(newRequest.responseText);
    console.log(ourData[0].id);
    getRecipe(ourData);
  }

  newRequest.send();
 
}

function getRecipe(data){
  var recipeIDList = "";

  for(let i=0; i<data.length-1; i++){
    recipeIDList+=data[i].id+',';
  }

  var recipeID = recipeIDList+data[9].id;

  const recipeIDs= recipeID.split(',');

  for(let j=0; j<recipeIDs.length; j++){
    var id=recipeIDs[j];
    console.log(id);

    var recipeRequest = new XMLHttpRequest();
    let apiKey="0a6f8665e3854f32a648b5bd03d6cd64";
    
    recipeRequest.open('GET', `https://api.spoonacular.com/recipes/${id}/information?includeNutrition=false&apiKey=${apiKey}`);

    recipeRequest.onload = function(){
      var recipe = JSON.parse(recipeRequest.responseText);
      console.log(recipe);
      recipeContainer.innerHTML = `<div id="recipe">
      <img id="recipePhoto" src=${recipe.image}>
      <h2>${recipe.title}</h2>
      <p>${recipe.summary}</p>
      <a id="button" href="${recipe.spoonacularSourceUrl}">
        <button>Read More</button>
      </a>
    </div>`;
      
    }

    recipeRequest.send();
  }

}






