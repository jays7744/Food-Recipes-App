let result = document.getElementById("result");
let btn = document.getElementById("search-btn");

let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
console.log(url);

btn.addEventListener("click", ()=>{
    let use = document.getElementById("user").value;
    if(use.length == ""){
        result.innerHTML = `<h3> Please Enter Food Name </h3>`;
    }

    else{
        fetch(url +use )
        .then((Response) => Response.json())
        .then((data)=>{
            let myMeal = data.meals[0];
            console.log(myMeal);
           console.log(myMeal.strMeal);
            console.log(myMeal.strArea);
        
            console.log(myMeal.strMealThumb);
            let count = 1;
            let ingredients = [];
            for (let x in myMeal){
                let ingredient = "";
                let measure="";
                if (x.startsWith("strIngredient") && myMeal[x]) {
                    ingredient = myMeal[x];
                    measure = myMeal["strMeasure"+ count];
                   count += 1;
                   ingredients.push(`${measure} ${ingredient}`);
                }
        
            }
            
            result.innerHTML = `
            <img src=${myMeal.strMealThumb}>
            <div class="details">
                <h2>${myMeal.strMeal}</h2>
                <h4>${myMeal.strArea}</h4>
            </div>
            <div id="ingredient-con"></div>
            <div id="recipe">
                <button id="hide-recipe">X</button>
                <p id="instructions">${myMeal.strInstructions}</p>
            </div>
            <button id="show-recipe">View Recipe</button>
            `;
            
            let ingredientcon = document.getElementById("ingredient-con");
            let recipe = document.getElementById("recipe");
            let hiderecipe = document.getElementById("hide-recipe");
            let showrecipe = document.getElementById("show-recipe");
            let parent = document.createElement("ul");
        
            ingredients.forEach((x)=>{
                let c = document.createElement("li");
                c.innerText = x;
                parent.appendChild(c);
                ingredientcon.appendChild(parent);      
            });
        
            hiderecipe.addEventListener("click", ()=>{
                recipe.style.display = "none";
            });
        
            showrecipe.addEventListener("click", ()=>{
                recipe.style.display="block";
            });

        }).catch(()=>{
            result.innerHTML= `<h3> Entre Valid input</h3>`
        })
        
    }
});



