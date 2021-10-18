/**
 * DOM Elements to Be Added Dynamically
 */

const gallery = document.getElementById('gallery');
const searchContainer = document.getElementsByClassName('search-container')[0];
const modalContainer = document.createElement('div');
const employees = [];

/** 
 * Dynamically Adding Functions
*/

function generateSearchContainer() {
    const searchContainerHTML = `
        <form action="#" method="get">
            <input type="search" id="search-input" class="search-input" placeholder="Search...">
            <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>
    `;

    searchContainer.innerHTML = searchContainerHTML;
}

function generateGallery(data) {
    const galleryHTML = `
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data.picture.medium}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="${data.name.first}" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="card-text">${data.email}</p>
                <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
            </div>
        </div>
    `;

    gallery.insertAdjacentHTML('beforeend', galleryHTML);
}

function generateModalContainer(data) {
    const modalContainerHTML = `
        <div class="modal-container">
            <div class="modal">
                <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                <div class="modal-info-container">
                    <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                    <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                    <p class="modal-text">${data.email}</p>
                    <p class="modal-text cap">${data.location.city}</p>
                    <hr>
                    <p class="modal-text">${data.cell}</p>
                    <p class="modal-text">${data.location.street.number} ${data.location.street.name}, ${data.location.city}, ${data.location.state} ${data.location.postcode}</p>
                    <p class="modal-text">Birthday: ${data.dob.date.substring(5,7)}/${data.dob.date.substring(8,10)}/${data.dob.date.substring(0,4)}</p>
                </div>
            </div>
    `;

    modalContainer.innerHTML = modalContainerHTML;
    gallery.append(modalContainer);
}

/**
 * Fetching Data
 */

//asynchronously fetches data from API given in url
 async function fetchData(url) {
    return fetch(url)

        //returns results from json and converts it to javascript object
        .then(res => res.json()); 
}

fetchData('https://randomuser.me/api/?results=12&nat=us')
    .then(data => {
        for (let i = 0; i < 12; i++) { 

            //adds each employee into an array to work with later
            employees.push(data.results[i]);

            //generates the cards for each employee in the gallery
            generateGallery(data.results[i]);
        }
    });

/**
 * Event Listeners
 */

//event listener for closing the modal container
document.addEventListener('click', e => {
    if (e.target.id === "modal-close-btn" || e.target.className == "modal-container" || e.target.tagName.toLowerCase() === "strong") {
        modalContainer.remove();
    }
});

//event listener for generating modal containers corresponding to each employee
gallery.addEventListener('click', e=> {

    //generate modal containers for clicking on the card itself
    if (e.target.className === "card") {
        let personNum;
        let person = e.target.children[1].children[0].id;
        for (i = 0; i < 12; i++) {
            if (person === employees[i].name.first) {
                personNum = i;
            }
        }
        generateModalContainer(employees[personNum]); 
    }

    //generate modal containers for clicking on card's children elements
    if (e.target.className === "card-info-container" || e.target.className === "card-img-container") {
        let personNum;
        let person = e.target.parentElement.children[1].children[0].id;
        for (i = 0; i < 12; i++) {
            if (person === employees[i].name.first) {
                personNum = i;
            }
        }
        generateModalContainer(employees[personNum]); 
    }

    //generate modal containers for clicking on card's children's children elements
    if (e.target.className === "card-img" || e.target.className === "card-name" || e.target.className === "card-text" || e.target.className === "card-name cap" || e.target.className === "card-text cap") {
        let personNum;
        let person = e.target.parentElement.parentElement.children[1].children[0].id;
        for (i = 0; i < 12; i++) {
            if (person === employees[i].name.first) {
                personNum = i;
            }
        }
        generateModalContainer(employees[personNum]); 
    }
});

//event listener for searching the inputted employee name
function searchInputListener() {
    document.getElementById('search-input').addEventListener('input', e => {
        let val = e.target.value;

        //clear the page and matches when new input is entered
        gallery.innerHTML = ``;
        searchBox = [];
    
        employees.forEach(employee => {
            if(employee.name.first.toLowerCase().includes(val.toLowerCase()) || employee.name.last.toLowerCase().includes(val.toLowerCase())) {
                searchBox.push(employee);
            }
        });
    
        searchBox.forEach(person => generateGallery(person));
        
    });
} 

//event listener for searching the submitted employee name
function searchSubmitListener() {
    document.getElementById('search-submit').addEventListener('submit', e => {
        e.target.preventDefault();
        let val = e.target.value;

        //clear the page and matches when new input is entered
        gallery.innerHTML = ``;
        searchBox = [];
    
        employees.forEach(employee => {
            if(employee.name.first.toLowerCase().includes(val.toLowerCase()) || employee.name.last.toLowerCase().includes(val.toLowerCase())) {
                searchBox.push(employee);
            }
        });
    
        searchBox.forEach(person => generateGallery(person));
        
    });
} 

/**
 * Helper Functions
 */

function search() {
    let searchBox = [];
    searchInputListener();
    searchSubmitListener();
}

//generates the search container on screen
generateSearchContainer();

//makes searching functional
search();