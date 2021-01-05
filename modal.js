function editNav() {
	const x = document.getElementById('myTopnav')
	if (x.className === 'topnav') {
		x.className += ' responsive'
	} else {
		x.className = 'topnav'
	}
}

// DOM Elements
const modalbg = document.querySelector('.bground')
const modalBtn = document.querySelectorAll('.modal-btn')
const closeModalBtn = document.querySelector('.close')
const closeConfirmModal = document.querySelector('.close-confirm-modal')
const formData = document.querySelectorAll('.formData')

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal))
// close modal event
closeModalBtn.addEventListener('click', closeModal)
modalbg.addEventListener('click', closeModal)
closeConfirmModal.addEventListener('click', closeModal)

// launch modal form
function launchModal() {
	modalbg.style.display = 'block'
}

/**
 * Ferme la boite modal en cas de clique sur le bon element
 * @param {Event} event
 */
function closeModal(event) {
	if (
		modalbg !== event.target &&
		closeModalBtn !== event.target &&
		closeConfirmModal !== event.target
	)
		return
	modalbg.style.display = 'none'
}

// VALIDATION FORM

// recupération du formulaire
const formElement = document.getElementById('reserve')

/**
 * Permet de vérifié que toute les données dans le formulaire son correct
 * @param {Event} event événements contenant le formulaire au moment du submit
 */
formElement.addEventListener('submit', (event) => {
	event.preventDefault()
	const reserveFormData = new FormData(event.target)

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
	])

	validation.forEach((value, key, map) => {
		document
			.getElementsByName(key)[0]
			?.parentElement.setAttribute('data-error-visible', !value)
		if (value) map.delete(key)
	})

	if (validation.size === 0) {
		confirmContentModal()
	}
})

/**
 * Permet de tester la valeur recuperer sur une input text en fonction du paramètres définie
 * @param {string} value Valeur d'une input de type text
 * @param {number} min taille minimum que l'on veut tester
 * @return {boolean} renvoie si la valeur donné est valide
 */
function inputTextValidation(value, min = 0) {
	return value.trim().length >= min
}

/**
 * Permet de tester la valeur recuperer sur une input number en fonction des paramètres définie
 * @param {string} value Valeur d'une input de type number
 * @param {number} min taille minimum du nombre
 * @param {number} max taille maximum du nombre
 * @return {boolean} renvoie si la valeur donné est valide
 */
function inputNumberValidation(value, min = 0, max = Infinity) {
	const num = parseInt(value.trim())
	return !isNaN(num) && num >= min && num <= max
}

/**
 * Permet de tester la valeur recuperer sur une input email en fonction du paramètres définie
 * @param {string} value Valeur d'une input de type email
 * @param {boolean} required indique si la value doit peut être vide ou non
 * @return {boolean} renvoie si la valeur donné est valide
 */
function inputMailValidation(value, required = false) {
	const isRequired = required ? !value.trim() === '' : value.trim() === ''
	const regexMail = /[a-zA-Z0-9\-\_\.]+\@[a-zA-Z0-9\-\_]+\.[a-z]+/
	return regexMail.test(value.trim()) || isRequired
}

/**
 * Permet de tester la valeur recuperer sur une input date
 * @param {string} value Valeur d'une input de type date
 * @return {boolean} renvoie si la valeur donné est valide
 */
function inputDateValidation(value) {
	const dateRegex = /^\d{4}\-(0?[1-9]|1[012])\-(0?[1-9]|[12][0-9]|3[01])$/
	return dateRegex.test(value.trim())
}

/**
 * Ajouter les class nécessaire pour faire disparaitre le contenut du formulaire
 * et faire apparaitre le contenut de confirmation d'inscrition
 */
function confirmContentModal() {
	const registerModal = document.querySelector('.modal-body')
	const confirmModal = document.querySelector('.confirmation-modal')

	registerModal.classList.add('close-modal')
	confirmModal.classList.add('open-modal')
}
