// document elements
const beerList = document.getElementById("list-group")
const beerDetail = document.getElementById("beer-detail")
const beerDescrip2 = document.getElementById("beer-description")
// end document elements

// placeholder variable
  let beerIdHolder = -1
//

// Fetch beer and render function
function getFetchBeers () {

  fetch("http://localhost:3000/beers")
  .then(resp => resp.json())
  .then(data => {
    console.log(data)
    renderBeerList(data)
  })
}

function renderBeerList(beerData) {
  htmlString = ""
  beerData.forEach(beer => {
    htmlString += `<li data-id="${beer.id}" class="list-group-item">${beer.name}</li>`
  })
  beerList.innerHTML = htmlString
}

// end Fetch beer and render function

// Beer detail Code
  // eventlistener for list
beerList.addEventListener('click', () => {
  console.log(event.target)
  let detailID = event.target.dataset.id
  getBeerDetail(detailID)
})
  // end eventlistener for list

  // Function to get single beer detail
  function getBeerDetail (beerID) {
    fetch("http://localhost:3000/beers/" + beerID)
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      renderBeerDetail(data)
      beerDescrip2.value = data.description
      beerIdHolder = data.id
    })
  }
  // end Function to get single beer detail

  // Beer detail render function
    function renderBeerDetail (data) {
      // let beerDetailString = `
      // <h1>${data.name}</h1>
      // <img src="${data.image_url}">
      // <h3>${data.tagline}</h3>
      // <textarea id="beer-desciption">${data.description}</textarea>
      // <button data.id="${data.id}" id="edit-beer" class="btn btn-info">
      //   Save
      // </button>
      // `
      let beerDetailString = `
      <h1>${data.name}</h1>
      <img src="${data.image_url}">
      <h3>${data.tagline}</h3>
      <button data.id="${data.id}" id="edit-beer" class="btn btn-info">
        Save
      </button>
      `
      beerDetail.innerHTML = beerDetailString
    }
  // end Beer detail render function
// end Beer detail Code

// Edit beer detail code

// end Edit beer detail code
  // event listener for beer detail
  beerDetail.addEventListener('click', () => {
    console.log(event.target)
    if (event.target.id === "edit-beer") {
      // let beerDetailID = event.target.dataset.id
      patchBeerDescription(beerIdHolder)
    }
  })
  // end event listener for beer detail

  // edit beer description function
  function patchBeerDescription (id) {
    console.log("running patch beer")
    let beerDescrip = document.getElementById("beer-description")
    let beerDescrip2 = document.querySelector("#beer-description")

    let newDesc = {description: beerDescrip2.value}

    fetch("http://localhost:3000/beers/" + id, {
      method: "PATCH",
      body: JSON.stringify(newDesc),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(data => {
      console.log(data)
      getBeerDetail(beerIdHolder)
    })
  }
  // end edit beer description

// Application run functions
  getFetchBeers()
// end Application run functions
