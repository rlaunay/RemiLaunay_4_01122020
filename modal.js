function editNav() {
	const x = document.getElementById('myTopnav');
	if (x.className === 'topnav') {
		x.className += ' responsive';
	} else {
		x.className = 'topnav';
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const closeModalBtn = document.querySelector('.close');
const formData = document.querySelectorAll('.formData');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));
// close modal event
closeModalBtn.addEventListener('click', closeModal);
modalbg.addEventListener('click', closeModal);

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

// close modal form
function closeModal(event) {
	if (modalbg !== event.target && closeModalBtn !== event.target) return;
	modalbg.style.display = 'none';
}

// VALIDATION FORM

const formElement = document.getElementById('reserve');

formData.forEach((data) =>
	data.addEventListener('focusout', (event) => {
		data.setAttribute('data-error-visible', !event.target.validity.valid);
	})
);

formElement.onsubmit = (event) => {
	event.preventDefault();
	const reserveFormData = new FormData(event.target);

	const validation = new Map([
		['first', inputTextValidation(reserveFormData.get('first'), 2)],
		['last', inputTextValidation(reserveFormData.get('last'), 2)],
		['email', inputMailValidation(reserveFormData.get('email'), true)],
		['birthdate', inputDateValidation(reserveFormData.get('birthdate'))],
		[
			'quantity',
			inputNumberValidation(reserveFormData.get('quantity', 0, 99)),
		],
		['location', reserveFormData.get('location') !== null],
		['conditions', reserveFormData.get('conditions') !== null],
	]);

	validation.forEach((value, key, map) => {
		document
			.getElementsByName(key)[0]
			.parentElement.setAttribute('data-error-visible', !value);
		if (value) map.delete(key);
	});

	if (validation.size === 0) {
		console.log('c valid');
	}
};

/**
 * Permet de tester la valeur recuperer sur une input text en fonction du paramtre définie
 * @param {string} value Valeur d'une input de type text
 * @param {number} min taille minimum que l'on veut tester
 */
function inputTextValidation(value, min = 0) {
	return value.trim().length >= min;
}

function inputNumberValidation(value, min = 0, max = Infinity) {
	const num = parseInt(value.trim());
	return !isNaN(num) && num >= min && num <= max;
}

function inputMailValidation(value, required = false) {
	const isRequired = required ? !value.trim() === '' : value.trim() === '';
	const regexMail = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
	return regexMail.test(value.trim()) || isRequired;
}

function inputDateValidation(value) {
	const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/;
	return dateRegex.test(value.trim());
}
