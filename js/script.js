/**
 * DOM Elements to Be Added Dynamically
 */

const gallery = document.getElementById('gallery');
const searchContainer = document.getElementsByClassName('search-container');
const modalContainer = document.createElement('div');

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
                <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
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
                    <p class="modal-text">Birthday: ${data.dob.date.substring(5,7)}/${data.dob.date.substring(8,10)}/${data.dob.date.substring(0,5)}</p>
                </div>
            </div>
    `;

    modalContainer.innerHTML = modalContainerHTML;
    gallery.append(modalContainer);
    //element.insertAdjacentHTML('beforeend', 'HTML string') this is what they said to use instead
}

/**
 * Fetching Data Functions
 */

async function fetchData(url) {
    return fetch(url)
        .then(res => res.json()); //for loop this twelve times? and then store in something to have 12 objects
}

fetchData('https://randomuser.me/api/')
    .then(data => {
        for (let i = 0; i < 12; i++) { //and then iterate through the 12 objects here?
            generateGallery(data.results[0]);
        }
        gallery.addEventListener('click', e => {
            generateModalContainer(data.results[0]);
        });
    });

/**
 * Function calls
 */

generateSearchContainer();

/**
 * Event Listeners
 */

// searchContainer.addEventListener('click', e => {

// });



// modalContainer.addEventListener('click', e => {

// });

document.getElementById('modal-close-btn').addEventListener('click', () => modalContainer.remove());
