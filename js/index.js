
let desplayData = document.querySelector("#desplaydata");
let categories = document.querySelector("#categories");
let area = document.querySelector("#area");
let ingredients = document.querySelector("#ingredients");
let search = document.querySelector("#searchInput");
let datasearch = document.querySelector("#datasearch");
let contactUs = document.querySelector("#contactus");

let clickBtn;

$(document).ready(()=>{

    searchByName("").then(()=>{
        $(".loading").fadeOut(600)
        $("body").css({overflow: "auto"})
    })
    
})

/* open NavBar */
function opnenNav() {

    $(".side-navbar").animate({ left: -0 }, 500);
    $(".icon-toggle").addClass("fa-x");
    $(".icon-toggle").removeClass("fa-align-justify");

    $(".data li").animate({ top: "0px" }, 800)
}

/* Coles NavBar */
function colesNav() {
    let navWidth = $(".side-navbar .nav-details").outerWidth();
    $(".side-navbar").animate({ left: -navWidth }, 500);
    $(".icon-toggle").removeClass("fa-x");
    $(".icon-toggle").addClass("fa-align-justify");

    $(".data li").animate({ top: "300px" }, 500)
}
/* Start Functions */
$(".side-navbar  .icon-toggle").on("click", function () {


    if ($(".side-navbar").css("left") == "0px") {

        colesNav();

    } else {
        opnenNav();
    }

});

colesNav();
async function searchByName(meal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let Data = await response.json()
    displayAllMeals(Data.meals)

}


function displayAllMeals(arr) {

    let allMeals = "";

    for (let i = 0; i < arr.length; i++) {

        allMeals += `

        <div class="col-md-3">
            <div onclick="getIdMeals('${arr[i].idMeal}') " class="inner position-relative overflow-hidden rounded-3">
                <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
                <div class="layer position-absolute d-flex align-items-center justify-content-center ">
                    <h2>${arr[i].strMeal}</h2>
                </div>
            </div>
        </div>



        
        
        `

        desplayData.innerHTML = allMeals

    }

}

searchByName("") 

async function getCategories() {

    datasearch.innerHTML = "";


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)

    let data = await response.json()

    despalayAllCategories(data.categories)

}


function despalayAllCategories(arr) {

    let allCategories = "";

    for (let i = 0; i < arr.length; i++) {


        allCategories += `
    
     <div class="col-md-3">
     <div onclick="filterByCategory('${arr[i].strCategory}')" onclick="getIdMeals('${arr[i].idMeal}')" class="inner position-relative overflow-hidden rounded-3">
         <img src="${arr[i].strCategoryThumb}" class="w-100" alt="meal">
         <div class="layer position-absolute  text-center ">
             <h2>${arr[i].strCategory}</h2>
             <p>${arr[i].strCategoryDescription.split(" ").slice(0,25).join(" ")}</p>
         </div>
     </div>
 </div>
        
    `

        desplayData.innerHTML = allCategories;
    }



}

categories.addEventListener("click", getCategories)

async function getArea() {

    datasearch.innerHTML = "";


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)

    let data = await response.json()

    desplayArea(data.meals)


}

function desplayArea(arr) {


    let allArea = "";

    for (let i = 0; i < arr.length; i++) {

        allArea += `

  
  
  <div class="col-md-3">
    <div onclick="fliterByArea('${arr[i].strArea}')" class="ineer pt-4 px-3 d-flex flex-column text-center">
        <i class="fa-solid fa-house fs-1 "></i>
        <h2>${arr[i].strArea}</h2>
    </div>
</div>
  
  
  

`

        desplayData.innerHTML = allArea

    }

}


area.addEventListener("click", getArea)

async function getIngredients() {
    datasearch.innerHTML = "";


    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    let data = await response.json()
    console.log(data.meals);
    
    despalayAllIngredients(data.meals.slice('0,23'))


}

function despalayAllIngredients(arr) {

    let allIngredients = "";

    for (let i = 0; i < arr.length; i++) {

        allIngredients += `
        

      <div class="col-md-3">
          <div onclick="fliterByIngredients('${arr[i].strIngredient}')" class="ineer pt-4 px-3 d-flex flex-column text-center">
              <i class="fa-solid fa-drumstick-bite fs-1"></i>
              <h2 class="fs-3">${arr[i].strIngredient}</h2>
              <p>${arr[i].strDescription.split(" ").slice(0,20).join(" ")}</p>
          </div>
      </div>
      
    
 
        
        `

        desplayData.innerHTML = allIngredients;

    }
}

ingredients.addEventListener("click", getIngredients)

async function filterByCategory(category){

    let response =await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
      let data = await response.json();
      console.log(data);
      displayFilterByCategory(data.meals)
     
}

function displayFilterByCategory(arr){

    let allFilter =  "";


    for(let i = 0 ; i < arr.length ; i++){

        allFilter += `
        
            <div class="col-md-3">
    <div class="inner position-relative overflow-hidden rounded-3">
        <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
        <div class="layer position-absolute d-flex justify-content-center align-items-center text-center ">
            <h2>${arr[i].strMeal}</h2>
           
        </div>
    </div>
</div>
        
        `

        desplayData.innerHTML = allFilter;
    }
}

async function fliterByArea(category){

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${category}`)
    let data = await response.json() 
    displatFliterByArea(data.meals)
    
    
}

function displatFliterByArea(arr){

    let allFilterArea = "";

    for(let i = 0 ; i< arr.length; i++){

        allFilterArea += `
        
                    <div class="col-md-3">
    <div class="inner position-relative overflow-hidden rounded-3">
        <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
        <div class="layer position-absolute d-flex justify-content-center align-items-center text-center ">
            <h2>${arr[i].strMeal}</h2>
           
        </div>
    </div>
</div>
        
        
        `
        desplayData.innerHTML = allFilterArea;
    }

}

async function fliterByIngredients (category) {

   

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${category}`)
    let data = await response.json()
   
    despalayFliterByIngredients(data.meals)
}

function  despalayFliterByIngredients(arr){


    let allFilterIngredients = "";

    for(let i = 0 ; i< arr.length; i++){

        allFilterIngredients += `
        
                    <div class="col-md-3">
    <div class="inner position-relative overflow-hidden rounded-3">
        <img src="${arr[i].strMealThumb}" class="w-100" alt="meal">
        <div class="layer position-absolute d-flex justify-content-center align-items-center text-center ">
            <h2>${arr[i].strMeal}</h2>
           
        </div>
    </div>
</div>
`

desplayData.innerHTML = allFilterIngredients;

    }
}

async function getIdMeals(meals) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meals}`)
    let data = await response.json()
    console.log(data.meals);
    displayMealsData(data.meals[0])
    
}

function displayMealsData(meal){
    datasearch.innerHTML = "";

     
    let allMealsData = `
    
     <div class="col-md-4">
     <img src="${meal.strMealThumb}" class="rounded-3 w-100" alt="">
     <h2>${meal.strMeal}</h2>
 </div>
 <div class="col-md-8">
     <h2>Instructions</h2>
     <p>
${meal.strInstructions}
     </p>
     <h2>Area : <span> ${meal.strArea}</span></h2>
     <h2>Category :<span>  ${meal.strCategory}</span></h2>
     <h2>Recipes :<span> Japanese</span></h2>
     
      <div class="d-flex flex-wrap gap-3">
         <button class="btn btn-color">300ml Sushi Rice</button>
         <button class="btn btn-color">300ml Sushi Rice</button>
         <button class="btn btn-color">300ml Sushi Rice</button>
         <button class="btn btn-color">300ml Sushi Rice</button>
         <button class="btn btn-color">300ml Sushi Rice</button>
         <button class="btn btn-color">300ml Sushi Rice</button>
         <button class="btn btn-color">300ml Sushi Rice</button>
      </div>
     
     
     <h3 class="pt-4">Tags:</h3>
     <a href="${meal.strSource}" class="btn btn-danger">Source</a>
     <a href="${meal.strYoutube}" class="btn btn-primary">Youtube</a>
     
 </div>
    
    
    `

    desplayData.innerHTML = allMealsData
     
}

function showSearchInput() {


    desplayData.innerHTML = "";
    datasearch.innerHTML =`

    
    <div class="row py-5 d-flex ">
        <div class="col-md-6">
            <input oninput="searchByName(this.value)" class="form-control bg-transparent text-white" type="text" placeholder="Search By Meal Name">
        </div>
        <div class="col-md-6">
            <input oninput="searchByFirstName(this.value)" maxlength='1' class="form-control bg-transparent" type="text" placeholder="Search By First Later Meal Name">
        </div>
    </div>
  
    `

    
    
    
}

search.addEventListener('click', showSearchInput)

async function searchByName(meal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    let Data = await response.json()
    displayAllMeals(Data.meals)

}
async function searchByFirstName(meal) {
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${meal}`)
    let Data = await response.json()
    displayAllMeals(Data.meals)

}

function contactUsShow(){

    datasearch.innerHTML= "";

 desplayData.innerHTML = `
<div class="contact vh-100 d-flex justify-content-center align-items-center">
                <div class="container w-50 text-center">
                    <div class="row g-4">
                        <div class="col-md-6">
                            <input id="nameInput" oninput="inputValidat()" type="text" class="form-control text-black" placeholder="Enter Your Name">
                            <div id="nameAlert" class="alert alert-danger w-100 mt-2 h6 d-none">
                                Special characters and numbers not allowed</div>
                        </div>
                        <div class="col-md-6">
                            <input id="emailInput" oninput="inputValidat()" type="Email" class="form-control" placeholder="Enter Your Email">
                            <div id="emailAlert" class="alert alert-danger w-100 mt-2 h6 d-none">
                                Email not valid *exemple@yyy.zzz</div>
                        </div>
                        <div class="col-md-6">
                            <input id="phoneInput" type="text"   oninput="inputValidat()" class="form-control" placeholder="Enter Your Phone">
                            <div id="phoneAlert" class="alert alert-danger w-100 mt-2 h6 d-none">
                                Enter valid Phone Number</div>

                        </div>
                        <div class="col-md-6">
                            <input  id="ageInput" type="number" oninput="inputValidat()" class="form-control" placeholder="Enter Your Age">
                        </div>
                        <div class="col-md-6">
                            <input id="passwordInput" type="password"  oninput="inputValidat()" class="form-control" placeholder="Enter Your Password">
                            <div id="passwordAlert" class="alert alert-danger w-100 mt-2 h6 d-none">
                                Enter valid password *Minimum eight characters, at least one letter and one number:*</div>

                        </div>
                        <div class="col-md-6">
                            <input id="rPasswordInput" type="password" oninput="inputValidat()" class="form-control" placeholder="Enter Your Rpassword">
                            <div id="rPasswordAlert" class="alert alert-danger w-100 mt-2 h6 d-none">
                                Enter valid repassword</div>

                        </div>
                    </div>
                    <button id="clickBtn" disabled class="btn btn-outline-danger mx-auto  mt-2 "> Submit</button>
            
                </div>
            </div>
            

 



`

document.querySelector("#nameInput").addEventListener("focus", ()=>{

    nameInputAlert = true
})
document.querySelector("#emailInput").addEventListener("focus", ()=>{

    emailInputAlert = true
})

document.querySelector("#phoneInput").addEventListener("focus", ()=>{

   pohneInputAlert = true
})

document.querySelector("#passwordInput").addEventListener("focus", ()=>{

   passwordInputAlert = true
})

document.querySelector("#rPasswordInput").addEventListener("focus", ()=>{

    rPasswordInputAlert = true
 })
 

 clickBtn = document.querySelector("#clickBtn")



}
contactUs.addEventListener("click", contactUsShow)

function inputValidat(){

    if(nameInputAlert){
        if(nameValidat()){

            document.querySelector("#nameAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector("#nameAlert").classList.replace("d-none","d-block")
        }
    
    }


if(emailInputAlert){

    if(emailValidat()){

        document.querySelector("#emailAlert").classList.replace("d-block","d-none")
    }else{
        document.querySelector("#emailAlert").classList.replace("d-none","d-block")
    }



}
    if(pohneInputAlert){
        if(phoneValidat()){

            document.querySelector("#phoneAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector("#phoneAlert").classList.replace("d-none","d-block")
        }
    }

    if(passwordInputAlert){
        if(passwordValidat()){

            document.querySelector("#passwordAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector("#passwordAlert").classList.replace("d-none","d-block")
        }
    }

    if(rPasswordInputAlert){
        if(rPasswordValidat()){

            document.querySelector("#rPasswordAlert").classList.replace("d-block","d-none")
        }else{
            document.querySelector("#rPasswordAlert").classList.replace("d-none","d-block")
        }
        
    }
    
    


if(
    nameValidat()&&
    emailValidat()&&
    phoneValidat()&&
    ageValidat()&&
    passwordValidat()&&
    rPasswordValidat()
)    {

    clickBtn.removeAttribute("disabled")

} else{
    clickBtn.setAttribute("disabled")

}
    
    

}


function nameValidat(){


  return  /^[a-z0-9_-]{3,15}$/.test(document.querySelector("#nameInput").value);

}

function emailValidat(){

    return /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(document.querySelector("#emailInput").value)
}

function phoneValidat(){

    return /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/.test(document.querySelector("#phoneInput").value)
}

function ageValidat(){

    return /^\S[0-9]{0,3}$/.test(document.querySelector("#ageInput").value)
}

function passwordValidat(){

    return /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(document.querySelector("#passwordInput").value)
}

function rPasswordValidat(){

    return document.querySelector("#rPasswordInput").value == document.querySelector("#passwordInput").value
}

let nameInputAlert = false;
let emailInputAlert = false;
let pohneInputAlert = false;
let passwordInputAlert = false;
let rPasswordInputAlert = false;







