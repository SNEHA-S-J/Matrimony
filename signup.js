document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#form');
    const password = document.querySelector('#password');
    const email = document.querySelector('#email');
    const confirmPassword = document.querySelector('#confirmPassword');
    console.log(email,password)

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        validateInputs();
    });

    function validateInputs() {
        console.log("Hii")
        const passwordVal = password.value.trim();
        const emailVal = email.value.trim();
        const confirmPasswordVal = confirmPassword.value.trim();

        if (emailVal === '') {
            setError(email, 'Email is required');
        } else if (!validateEmail(emailVal)) {
            setError(email, 'Please enter a valid email');
        } else {
            setSuccess(email);
        }

        if (passwordVal === '') {
            setError(password, 'Password is required');
        } else if (passwordVal.length < 6) {
            setError(password, 'Password must contain at least 6 characters');
        } else {
            setSuccess(password);
        }

        if (confirmPasswordVal === '') {
            setError(confirmPassword, 'Confirm Password is required');
        } else if (confirmPasswordVal !== passwordVal) {
            setError(confirmPassword, 'Passwords do not match');
        } else {
            setSuccess(confirmPassword);
        }

        if (document.querySelectorAll('.input-group.error').length === 0) {
            submitForm(emailVal, passwordVal);
        }
    }

    function setError(element, message) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = message;
        inputGroup.classList.add('error');
        inputGroup.classList.remove('success');
    }

    function setSuccess(element) {
        const inputGroup = element.parentElement;
        const errorElement = inputGroup.querySelector('.error');

        errorElement.innerText = '';
        inputGroup.classList.add('success');
        inputGroup.classList.remove('error');
    }

    function validateEmail(email) {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    }

    function submitForm(email, password) {
        const data = { email, password };

        fetch('/signup', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => response.text())
        .then(data => {
            if (data === 'Signup successful') {
                alert('Signup successful!');
                window.location.href = 'dashboard.html';
            } else {
                alert(data);
            }
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});