numberOfIngredients = 0;

function keywordSearch(){

}
function ingredientSearch(){

}
function loadKeywordSearch(){

    if(document.getElementById("load-keyword-search").classList.contains("active-button"))
    {
        return
    }

    document.getElementById("load-keyword-search").classList.add("active-button");
    document.getElementById("load-ingredient-search").classList.remove("active-button");

    searchBar = '<form>'
    searchBar += '<input id="keyword-input" placeholder="Search Recipies" type="text"></input></br>'
    searchBar += '<input id="keyword-submit" type="submit" value="Search"></input>'
    searchBar += '</form>'

    document.getElementById("search").innerHTML = searchBar;
    document.getElementById("keyword-submit").addEventListener("click", function(event){keywordSearch()})
}
function loadIngredientSearch(){
    if (document.getElementById("load-ingredient-search").classList.contains("active-button")) {
        return
    }

    document.getElementById("load-ingredient-search").classList.add("active-button");
    document.getElementById("load-keyword-search").classList.remove("active-button");

    searchBar = '<form>'
    searchBar += '<input id="ingredient-input" placeholder="Ingredient" type="text"></input></br>'
    searchBar += '<input id="ingredient-submit" type="submit" value="Search"></input>'
    searchBar += '</form>'

    numberOfIngredients = 1;

    document.getElementById("search").innerHTML = searchBar;
    document.getElementById("ingredient-submit").addEventListener("click", function (event) {ingredientSearch() })
}

document.getElementById("load-keyword-search").addEventListener("click", function(event){loadKeywordSearch()})
document.getElementById("load-ingredient-search").addEventListener("click", function(event){loadIngredientSearch()});
