
const form = document.querySelector('form');
const searchLocation = document.querySelector('input');
const msg1 = document.querySelector('#msg-1');
const msg2 = document.querySelector('#msg-2');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    msg1.textContent = '...loading';
    msg2.textContent = '';
    fetch(`http://localhost:3000/weather?address=${searchLocation.value}`).then(response => {
        response.json().then(parsedResponse => {
            if(parsedResponse.error) {
                msg1.textContent = parsedResponse.error;
            }
            else{
                msg1.textContent = parsedResponse.location;
                msg2.textContent = parsedResponse.forecast;
            }
        })
    })
})