
/**
 * It creates a constructor function for the Membership object.
 * @param trademark - The trademark of the car.
 * @param year - The year the membership was created.
 * @param type - "Basic, Full"
 */
function Membership(trademark, year, type){
    this.trademark = trademark;
    this.year = year;
    this.type = type;
}

/* A function that calculates the price of the insurance. */
Membership.prototype.InsurancePrice = function(){

    let amount;
    const base = 2000;

    switch(this.trademark){
        case '1':
                amount = base * 1.15;
   
                break;
        case '2':
            amount = base * 1.05;
 
                break;      
        case '3':
                amount = base * 1.35;
       
                break;
        default:
            break;
    }

    

    const Disccount = new Date().getFullYear() - this.year;

    amount -= ((Disccount * 3) * amount) / 100 ;

    if (this.type === 'basico'){
        amount += 1.30;
    }

    else{
        amount += 1.50;
    }

    return amount;

}

/**
 * It creates a new option element for each year between the current year and 20 years ago, and appends
 * each option to the select element with the id of year.
 */
function UI() {};

UI.prototype.fillOptions = () => {
    const max = new Date().getFullYear();
    const min = max - 20;

    const selectYear = document.querySelector('#year');


    for(let i = max; i>min; i--){
        let option = document.createElement('option');

        option.value = i;

        option.textContent = i;

        selectYear.appendChild(option);
    }
}


/* A function that creates a div element and appends it to the form element with the id of
cotizar-seguro. */
UI.prototype.ShowMessage = (message, type) => {
    const div = document.createElement('div');
    const Form = document.querySelector('#cotizar-seguro');
    if (type === 'error') {
        div.classList.add('mensaje', 'error');
    }

    else {
        div.classList.add('mensaje', 'correcto');
    }

    div.classList.add('mt-10');


    div.textContent = message;

    Form.insertBefore(div, document.querySelector('#resultado'));


    setTimeout(() => {
        div.remove();
    }, 3000);

}


/* Creating a div element and appending it to the form element with the id of cotizar-seguro. */
UI.prototype.ShowInsurance = (insurance, total) => {

    const div = document.createElement('div');
    div.classList.add('mt-10');

    let trademarkname;

    switch(insurance.trademark){
        case '1':
            trademarkname = 'American';
            break;

        case '2':
            trademarkname = 'Asian';
            break;

        case '3':
            trademarkname = 'European';
            break;
        default:
            break;

    }

    let typetext = 'Full';

    if (insurance.type === 'basico'){
        typetext = 'Basic';
    }
    

    div.innerHTML = `<p class="header">Your insurance: </p>
                    <p class="font-bold"> Brand: <span class="font-normal">${trademarkname}</p></p>
                    <p class="font-bold"> Total: <span class="font-normal">$${total}</p></p>
                    <p class="font-bold"> Year: <span class="font-normal">${insurance.year}</p></p>
                    <p class="font-bold"> Type: <span class="font-normal">${typetext}</p></p>
    `;
  

    const result = document.querySelector('#resultado');


    const spinner = document.querySelector('#cargando');
    spinner.style.display = 'block';

    setTimeout(() => {
        spinner.style.display = 'none';
        result.appendChild(div);
    }, 3000);
}

/**
 * When the form is submitted, check the membership.
 */
const ui = new UI();


document.addEventListener('DOMContentLoaded', () =>{
    ui.fillOptions();
})

/**
 * LoadEvents() is a function that selects the form element with the id of cotizar-seguro and adds an
 * event listener to it that calls the CheckMembership() function when the form is submitted.
 */
LoadEvents();

function LoadEvents() {
    const Form = document.querySelector('#cotizar-seguro');
    Form.addEventListener('submit', CheckMembership);
}

/**
 * CheckMembership() is a function that prevents the default action of the event, gets the values of
 * the trademark, year and type, and then checks if any of them are empty. If they are, it shows an
 * error message. If they aren't, it shows a message saying that it's filling, removes the previous
 * result, creates a new membership, calculates the total price and shows the insurance.
 * @param e - event
 * @returns The total price of the insurance.
 */
function CheckMembership(e){
    e.preventDefault();
    

    const trademark = document.querySelector('#marca').value;
    const year = document.querySelector('#year').value;


    const type = document.querySelector('input[name="tipo"]:checked').value;
    console.log(type);
    
    if(trademark === '' || year === '' || type === ''){
        ui.ShowMessage('Please Fill the form', 'error');
        return;
    }

    ui.ShowMessage('Filling...', 'exito');

    const results = document.querySelector('#resultado div');
    if(results !== null){
        results.remove();
    }


    const member = new Membership(trademark, year, type);
    const total = member.InsurancePrice();

    ui.ShowInsurance(member, total);

}