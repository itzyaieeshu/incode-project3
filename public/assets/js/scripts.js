console.log('Scripts file');
window.onload = ('Load', () => {
    const firstNameMessage = document.getElementById('firstNameMessage');
    const lastNameMessage = document.getElementById('lastNameMessage');
    const emailMessage = document.getElementById('emailMessage');
    const submitUser = document.getElementById('submit-user');
    firstNameMessage.style.visibility = 'hidden';
    lastNameMessage.style.visibility = 'hidden';
    emailMessage.style.visibility = 'hidden';
    submitUser.disabled = true;
});
document.addEventListener('DOMContentLoaded', () => {
    const firstName = document.getElementById('fname');
    const lastName = document.getElementById('lname');
    const email = document.getElementById('email');
    const password = document.getElementById('password');
    const submitUser = document.getElementById('submit-user');
    const firstNameMessage = document.getElementById('firstNameMessage');
    const lastNameMessage = document.getElementById('lastNameMessage');
    const emailMessage = document.getElementById('emailMessage');
    const nameValid = /^[A-Za-zÀ-ÖØ-öø-ÿ \-']+$/i;
    const emailValid = /^[a-z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-z0-9-]+(?:\.[a-z0-9-]+)*$/;
    const strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
    const mediumPassword = new RegExp('((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))');
    const fieldNormal = (element, textElement) => {
      element.classList.remove('valid-box');
      element.classList.remove('error-box');
      textElement.style.visibility = 'hidden';
    };
    const normalFirstName = () => { if (!firstName.value) fieldNormal(firstName, firstNameMessage); };
    const normalLastName = () => { if (!lastName.value) fieldNormal(lastName, lastNameMessage); };
    const normalEmail = () => { if (!email.value) fieldNormal(email, emailMessage); };
    const fieldValid = (element) => {
      element.classList.remove('error-box');
      element.classList.add('valid-box');
    };
    const fieldInValid = (element) => {
      element.classList.remove('valid-box');
      element.classList.add('error-box');
    };
    const firstNameValidation = () => {
      let result = false;
      if ((nameValid.test(firstName.value) === false) && firstName !== '') {
        firstNameMessage.style.visibility = 'visible';
        fieldInValid(firstName);
        result = true;
      } else if ((nameValid.test(firstName.value) === true) || (firstName.value === '')) {
        firstNameMessage.style.visibility = 'hidden';
        fieldValid(firstName);
        result = false;
      }
      return result;
    };
    const lastNameValidation = () => {
      let result = false;
      if ((nameValid.test(lastName.value) && lastName !== '') === false) {
        lastNameMessage.style.visibility = 'visible';
        fieldInValid(lastName);
        result = true;
      } else if ((nameValid.test(lastName.value) === true) || (lastName.value === '')) {
        lastNameMessage.style.visibility = 'hidden';
        fieldValid(lastName);
        result = false;
      }
      return result;
    };
    const emailValidation = () => {
      let result = false;
      if ((emailValid.test(email.value) === false) && email !== '') {
        emailMessage.style.visibility = 'visible';
        fieldInValid(email);
        result = true;
      } else if ((emailValid.test(email.value) === true) || (lastName.value === '')) {
        emailMessage.style.visibility = 'hidden';
        fieldValid(email);
        result = false;
      }
      return result;
    };
    const passwordValidation = () => {
        let result = false;
        const passwordMeter = document.getElementById('passwordMeter');
        if (strongPassword.test(password.value)) {
            passwordMeter.style.backgroundColor = 'green';
            passwordMeter.style.width = '100%';
            passwordMeter.textContent = 'Strong';
            fieldValid(password);
            result = true;
        } else if (mediumPassword.test(password.value)) {
            passwordMeter.style.backgroundColor = 'blue';
            passwordMeter.style.width = '66.67%';
            passwordMeter.textContent = 'Medium';
            fieldValid(password);
            result = true;
        } else if (!password.value) {
            passwordMeter.style.backgroundColor = 'red';
            passwordMeter.style.width = '1%';
            passwordMeter.textContent = '';
            fieldInValid(password);
            result = false;
        } else {
            passwordMeter.style.backgroundColor = 'red';
            passwordMeter.style.width = '33.34%';
            passwordMeter.textContent = 'Weak';
            fieldInValid(password);
            result = false;
        }
        return result;
    };
    const submitUserEnable = () => {
      if (!firstNameValidation() && !lastNameValidation()
      && !emailValidation() && passwordValidation()) {
          submitUser.disabled = false;
      } else {
        submitUser.disabled = true;
      }
    };
    firstName.oninput = () => {
      submitUserEnable();
      firstNameValidation();
      normalLastName();
      normalEmail();
    };
    lastName.oninput = () => {
      submitUserEnable();
      lastNameValidation();
      normalFirstName();
      normalEmail();
    };
    email.oninput = () => {
      submitUserEnable();
      emailValidation();
      normalFirstName();
      normalLastName();
    };
    password.oninput = () => {
      submitUserEnable();
      passwordValidation();
      normalFirstName();
      normalLastName();
    };
  });
