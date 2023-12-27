const loadPhone = async(searchPhone='13') =>{
   const res = await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchPhone}`);
   const data = await res.json();
   const phones = data.data;
   displayPhones(phones);
}
const displayPhones = phones =>{
    const phoneContainer = document.getElementById('phone-container');
    phoneContainer.textContent= '';

    // display phone 12 than show all btn
    const showPhoneContainer = document.getElementById('show-phone-container');
    if(phones.length > 12){
        showPhoneContainer.classList.remove('hidden')
    }else{
        showPhoneContainer.classList.add('hidden')
    }

    // only show 12
    phones=phones.slice(0, 12);

    phones.forEach(phone => {
        // console.log(phone)
        // create div
        const phoneCard = document.createElement('div');
        phoneCard.classList= `card bg-gray-100 p-3 shadow-xl`;
        // set inner html
        phoneCard.innerHTML = `
        <figure class="px-10 pt-10">
                        <img src="${phone.image}" alt="Shoes"
                            class="rounded-xl" />
                    </figure>
                    <div class="card-body items-center text-center">
                        <h2 class="card-title">${phone.phone_name}</h2>
                        <p>There are many variations of passages of available, but the majority have suffered</p>
                        <div class="card-actions">
                            <button onclick="handleShowDetails('${phone.slug}')" class="btn btn-primary">Show details</button>
                        </div>
                    </div>
        `;
        // append child
        phoneContainer.appendChild(phoneCard);
    });
    loadingSpinner(false);
}

const handleButton =()=>{
    loadingSpinner(true);
    const inputField = document.getElementById('input-field');
    const inputText = inputField.value;
    console.log(inputText);
    loadPhone(inputText)
}

const handleShowDetails= async (id)=>{
    console.log('clink button show details', id);
    const res = await fetch(`https://openapi.programming-hero.com/api/phone/${id}`);
    const data = await res.json();
    const phone=data.data;
    showPhoneDetails(phone)
}

const showPhoneDetails = (phone)=>{
    console.log(phone)
    singleDetailsShow.showModal();
}

const loadingSpinner = (isLoading)=>{
    const loadSpner = document.getElementById('spinner-load');
    if(isLoading){
        loadSpner.classList.remove('hidden');
    }else{
        loadSpner.classList.add('hidden')
    }
}

loadPhone();