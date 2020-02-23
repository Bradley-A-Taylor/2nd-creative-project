var numberOfIngredients = 0;

function populateResult(json){
    document.getElementById("result").innerHTML = '';
    for(i = 0; i < json.number; i++){
        recipie = document.createElement("div");
        recipie.setAttribute("class", "recipie-item");
        recipie.setAttribute("id", json.results[i].id);


        image = document.createElement("img");
        image.setAttribute("class", "recipie-pic");
        image.setAttribute("src", (json.baseUri + json.results[i].image));
        recipie.appendChild(image);

        title = document.createElement("h4");
        title.setAttribute("class", "recipie-title");
        title.innerHTML = json.results[i].title;
        recipie.appendChild(title);
        
        info = document.createElement("div");
        info.setAttribute("class", "recipie-info");

        readyIn = document.createElement("p");
        servings = document.createElement("p");
        readyIn.setAttribute("class", "info-item");
        servings.setAttribute("class", "info-item");
        readyIn.innerHTML = "Ready in " + json.results[i].readyInMinutes + " min";
        servings.innerHTML = "Makes " + json.results[i].servings + " servings";
        info.appendChild(readyIn);
        info.appendChild(servings);

        recipie.appendChild(info)

        document.getElementById("result").appendChild(recipie);
        document.getElementById(json.results[i].id).addEventListener("click", function(event){
            showRecipie(event.currentTarget.getAttribute("id"));
        });
    }
    document.getElementById("result").style.backgroundColor = "white";
}

function showRecipie(id){
    var url = "https://api.spoonacular.com/recipes/" + id + "/information?apiKey=b271f91eb96e4a92851502a3b90d40a9&includeNutrition=false"
    var req = new Request(url);
    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            window.open(json.sourceUrl);
        })
}


function keywordSearch(value){
    if(value == ""){
        return;
    }
    var url = "https://api.spoonacular.com/recipes/search?apiKey=b271f91eb96e4a92851502a3b90d40a9&number=20&instructionsRequired=true&query="
    url += value;
    var req = new Request(url);
    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function(json){
            populateResult(json);
        })
}

function ingredientSearch(value){
    ingredients = value;
    if(ingredients == ""){
        return;
    }
    for(i = 2; i <= numberOfIngredients; i++){
        id = "ingredient-" + i;
        ingredient = document.getElementById(id).value;
        if (ingredient != ""){
            ingredients += ',' + ingredient;
        }
    }
    var url = "https://api.spoonacular.com/recipes/search?apiKey=b271f91eb96e4a92851502a3b90d40a9&number=20&instructionsRequired=true&findByIngredients="
    url += ingredients;
    var req = new Request(url);
    fetch(req)
        .then(function (response) {
            return response.json();
        })
        .then(function (json) {
            populateResult(json);
        })
}

function loadKeywordSearch(){

    if(document.getElementById("load-keyword-search").classList.contains("active-button"))
    {
        keywordSearch(document.getElementById("keyword-input").value);
        return
    }
    document.getElementById("load-keyword-search").classList.add("active-button");
    document.getElementById("load-ingredient-search").classList.remove("active-button");

    searchBar = "";
    searchBar += '<input id="keyword-input" placeholder="What sounds good?" type="text"></input>'
    searchBar += '<img id="search-icon" src="http://www.endlessicons.com/wp-content/uploads/2012/12/search-icon.png">'

    document.getElementById("search").innerHTML = searchBar;
    document.getElementById("keyword-input").value = ""
    document.getElementById("keyword-input").addEventListener("keypress", function(event){
        if(event.keyCode === 13){
            event.preventDefault(); 
            value = document.getElementById("keyword-input").value
            document.getElementById("keyword-input").value = "";
            keywordSearch(value);
        }
    })
    document.getElementById("search-icon").addEventListener("click", function (event) {
        event.preventDefault();
        value = document.getElementById("keyword-input").value
        document.getElementById("keyword-input").value = "";
        keywordSearch(value);    
    })
    document.getElementById("search").style.height = "80px";
}

function removeIngredient(){
    if(numberOfIngredients == 2){
        document.getElementById("remove-ingredient").remove();
    }
    document.getElementById("ingredient-" + numberOfIngredients).remove();
    numberOfIngredients--;
}

function addIngredient(){
    if(numberOfIngredients == 1){
        removeIngredientLink = document.createElement("a");
        removeIngredientLink.setAttribute("id", "remove-ingredient");
        removeIngredientLink.setAttribute("class", "con-link description");
        removeIngredientLink.innerHTML = "Remove";
        document.getElementById("ingredient-list-buttons").appendChild(removeIngredientLink);
        document.getElementById("remove-ingredient").addEventListener("click", function(event){removeIngredient()})
    }

    numberOfIngredients++;

    ingredientList = document.getElementById("ingredient-list").innerHTML;
    ingredientList += '<input class="ingredient" id="ingredient-' + numberOfIngredients + '"placeholder="Ingredient ' 
                    + numberOfIngredients + '"type="text"></input>'
    document.getElementById("ingredient-list").innerHTML = ingredientList;

}

function loadIngredientSearch(){
    if (document.getElementById("load-ingredient-search").classList.contains("active-button")) {
        ingredientSearch(document.getElementById("ingredient-input").value);
        return
    }

    document.getElementById("load-ingredient-search").classList.add("active-button");
    document.getElementById("load-keyword-search").classList.remove("active-button");

    numberOfIngredients = 1;

    searchBar = ''
    searchBar += '<div id=ingredient-list>'
    searchBar += '<input id="ingredient-input" class="ingredient" placeholder="Ingredient" type="text"></input>'
    searchBar += '</div>'
    searchBar += '<div id="ingredient-list-buttons">'
    searchBar += '<a id="add-ingredient" class="con-link description">Add Ingredient</a>'
    searchBar += '</div>'

    document.getElementById("search").innerHTML = searchBar;
    document.getElementById("ingredient-input").addEventListener("keypress", function (event) {
        if (event.keyCode === 13) {
            event.preventDefault();
            value = document.getElementById("ingredient-input").value;
            document.getElementById("ingredient-input").value = "";
            ingredientSearch(value);
        }
    })
    document.getElementById("add-ingredient").addEventListener("click", function(event){
        event.preventDefault();
        value = document.getElementById("ingredient-input").value;
        document.getElementById("ingredient-input").value = "";
        ingredientSearch(value);
    })
    document.getElementById("search").style.height = "auto"
}

document.getElementById("load-keyword-search").addEventListener("click", function(event){loadKeywordSearch()})
document.getElementById("load-ingredient-search").addEventListener("click", function(event){loadIngredientSearch()});
