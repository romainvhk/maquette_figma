const form = document.querySelector(".article__form")

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    const formData = new FormData(form);
    
    const errors = {
        firstName: document.querySelector("#firstnameError"),
        lastName: document.querySelector("#lastnameError"),
        email: document.querySelector("#emailError"),
        phone: document.querySelector("#phoneError"),
        message: document.querySelector("#messageError"),
    }

    const phoneRegex = /^(?:(?:\+|00)33|0)\s*[1-9](?:[\s.-]*\d{2}){4}$/;
    const emailRegex = /[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}/igm;
    const nameRegex = /^[a-zA-Z ]+$/;

    let error = false;

    const userData = {};

    formData.forEach((valeur, key) => {
        if (!valeur) {
            errors[key].setAttribute('data-error', true), error = true;
        } else {
            if (key === 'firstName' && !nameRegex.test(valeur)) {
                return errors[key].setAttribute('data-error', true), error = true;
            } else if (key === 'lastName' && !nameRegex.test(valeur)) {
                return errors[key].setAttribute('data-error', true), error = true;
            } else if (key === 'email' && !emailRegex.test(valeur)) {
                return errors[key].setAttribute('data-error', true), error = true;
            } else if (key === 'phone' && !phoneRegex.test(valeur)) {
                return errors[key].setAttribute('data-error', true), error = true;
            } else if (key === 'message' && valeur.length < 10) {
                return errors[key].setAttribute('data-error', true), error = true;
            }

            errors[key].setAttribute('data-error', false), error = false;
            userData[key] = valeur;
        }
    });

    if (!error) {
        axios.post('http://212.83.176.255:3030/contact', userData)
            .then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.log(error)
            });
            form.reset();
    };
    
});