const ulList = document.getElementById('list-group')
const beerDetailsDiv = document.getElementById('beer-detail')

////Step 1////
function showAll() {
  fetch('http://localhost:3000/beers')
    .then(resp => resp.json())
    .then(parsedJson => createLi(parsedJson))
}

function createLi(parsedJson) {
  parsedJson.forEach(beer => {
    let li = document.createElement('li')
      li.className = "list-group-item"
      li.innerText = beer.name
      li.dataset.id = beer.id
      ulList.appendChild(li)

      li.addEventListener('click', displayDetails(beer))

  })
}

/////Step 2/////
function displayDetails(beer) {
  fetch(`http://localhost:3000/beers/${beer.id}`)
    .then(resp => resp.json())
    .then(beerDetails => displayBeerDetails(beerDetails))
}

function displayBeerDetails(beerDetails) {

  let details = `<h1>${beerDetails.name}</h1>
                  <img src="${beerDetails.image_url}">
                  <h3>${beerDetails.tagline}</h3>
                  <textarea>${beerDetails.description}</textarea>
                  <button id="edit-beer" class="edit-button btn btn-info">`
                  beerDetailsDiv.innerHTML = details
}

////Step 3///////
function  editDescription(beerDetails) {
  let textarea = document.querySelectorAll('textarea')
  fetch(`http://localhost:3000/beers/${beerDetails.id}`, {
    method: "PATCH",
    Headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      description: textarea.value
    })
    // .then(alert("I was edited!"))
  })
}

showAll()
