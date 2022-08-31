const loadPhons = async (searceText, dataLimet) => {
    const url = `https://openapi.programming-hero.com/api/phones?search=${searceText}`
    const res = await fetch(url);
    const data = await res.json();

    displayPhone(data.data, dataLimet);
}

const displayPhone = (phones, dataLimet) => {
    // console.log(phons);
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent = '';
    // Display 10 phone Only

    const showAll = document.getElementById('show-all');

    if (dataLimet && phones.length > 10) {
        phones = phones.slice(0, 10);
        showAll.classList.remove('d-none');
    }
    else {
        showAll.classList.add('d-none');
    }

    // display no phons found
    const noPhone = document.getElementById('no-found-phone');

    if (phones.length === 0) {
        noPhone.classList.remove('d-none');
    } else {
        noPhone.classList.add('d-none');
    }


    // display all phons
    phones.forEach(phone => {
        // console.log(phone);
        const phoneDiv = document.createElement('div');
        phoneDiv.classList.add('col');;
        phoneDiv.innerHTML = `
        
                    <div class="card p-4">
                        <img src="${phone.image}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${phone.phone_name}</h5>
                            <p class="card-text">This is a longer card with supporting text below as a natural lead-in
                                to additional content. This content is a little bit longer.</p>
                                <button onclick="loadPhoneDetails('${phone.slug}')" href="#" class="btn btn-primary"data-bs-toggle="modal" data-bs-target="#phoneDetailModal">Show Detals</button>

                               
                                
                        </div>
                    </div>
        
        `;
        phoneContainer.appendChild(phoneDiv);

    });
    // stop loader
    toggolSpenner(false);

}
const prosessSearce = (dataLimet) => {
    toggolSpenner(true);
    const searceFild = document.getElementById('searce-fild');
    const searceText = searceFild.value;
    loadPhons(searceText, dataLimet);

}

// heandrel searce button click
document.getElementById('btn-searce').addEventListener('click', function () {
    // start loader
    prosessSearce(10)

})

// searcr input fild enter key hendler
document.getElementById('searce-fild').addEventListener('keypress', function (e) {
    // console.log(e.key);
    if (e.key === 'Enter') {
        prosessSearce(10);
    }
});

const toggolSpenner = (isLoading) => {
    const loadingSection = document.getElementById('loader');

    if (isLoading) {
        loadingSection.classList.remove('d-none');
    } else {
        loadingSection.classList.add('d-none');
    }


}

// Not the best way to load show all
document.getElementById('btn-show-all').addEventListener('click', function () {

    prosessSearce();


})

const loadPhoneDetails = async (id) => {
    const url = ` https://openapi.programming-hero.com/api/phone/${id}`;
    const res = await fetch(url);
    const data = await res.json();

    displayPhoneDetails(data.data);
}


const displayPhoneDetails = (phone) => {
    console.log(phone);
    const modailTitle = document.getElementById('exampleModalLabel');
    modailTitle.innerText = phone.name;
    const phoneDetals = document.getElementById('phone-details');
    phoneDetals.innerHTML = `
    
    <p>Phone details:-${phone.releaseDate ? phone.releaseDate : 'No found releaseDate'}</p>
    <p>Display Size:-${phone.mainFeatures.displaySize ? phone.mainFeatures.displaySize : 'No found'}</p>
    <p>Memory :- ${phone.mainFeatures.memory ? phone.mainFeatures.memory : 'No Found Memory'}</p>
  `;

}

loadPhons('a')