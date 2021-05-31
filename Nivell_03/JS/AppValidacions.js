//Per evitar que es refresqui la pàgina quan es fa la cerca
document.getElementById("botoCerca").addEventListener("click", function (event) {
	event.preventDefault();
});

//Per evitar que es refresqui la pàgina quan es clica a login
document.getElementById("botoLogin").addEventListener("click", function (event) {
	event.preventDefault();
});

//Per evitar que es refresqui la pàgina quan es clica a registre
document.getElementById("botoRegistre").addEventListener("click", function (event) {
	event.preventDefault();
});

//Formulari cerca
function cercarContingut() {
	let missatge = "Aquests són els resultats.";
	let inputCercar = document.getElementById("cercaInput").value;

	let inputCercarArray = inputCercar.split("");

	if (inputCercarArray.length >= 3) {
		document.getElementById("cercaResultat").innerHTML = "Has cercat " + inputCercar + ". " + missatge;
	} else {
		document.getElementById("cercaResultat").innerHTML = "Cerca una paraula de 3 lletres com a mínim, si us plau.";
	}
}

// El formulari de registre
const formRegister = document.getElementById('formRegister');

//Formulari Registre
function crearCompte() {
	// Comptador d'errors per si falta info
	var acumErrores = 0;

	// Treure la class is-invalid de moment
	formRegister.classList.remove('is-invalid');

	// Variables agafant la info del formulari
	var inputFirstName = document.forms["formRegister"]["validationNom"];
	var inputLastName = document.forms["formRegister"]["validationCognom"];
	var inputProvince = document.forms["formRegister"]["validacioProvince"];
	var inputEmail = document.forms["formRegister"]["validacioEmail"];
	var inputPassword = document.forms["formRegister"]["validacioPassword"];
	var inputPasswordMatch = document.forms["formRegister"]["validacioPasswordMatch"];
	var gridCheck = document.forms["formRegister"]["gridCheck"];
	let okFeedback = "Looks good!";

	//Què passa si es deixa en blanc algun input, o si és incorrecte:
	if (inputFirstName.value == "") {
		inputFirstName.classList.add("is-invalid");
		document.getElementById("errorFirstName").textContent = "First name missing.";
		acumErrores++;
	} else {
		inputFirstName.classList.add("is-valid");
		document.getElementById("okFirstName").textContent = okFeedback;
	}

	if (inputLastName.value == "") {
		inputLastName.classList.add("is-invalid");
		document.getElementById("errorLastName").textContent = "Last name missing.";
		acumErrores++;
	} else {
		inputLastName.classList.add("is-valid");
		document.getElementById("okLastName").textContent = okFeedback;
	}

	if (inputProvince.value == "") {
		inputProvince.classList.add("is-invalid");
		document.getElementById("errorProvince").textContent = "Please select a province.";
		acumErrores++;
	} else {
		inputProvince.classList.add("is-valid");
		document.getElementById("okProvince").textContent = okFeedback;
	}

	if (inputEmail.value == "") {
		inputEmail.classList.add("is-invalid");
		document.getElementById("errorEmail").textContent = "Email missing.";
		acumErrores++;
	} else if (!emailValidacio(inputEmail.value)) {
		inputEmail.classList.add("is-invalid");
		document.getElementById("errorEmail").textContent = "Please enter a valid email address.";
		acumErrores++;
	} else {
		inputEmail.classList.add("is-valid");
		document.getElementById("okEmail").textContent = okFeedback;
	}

	if (inputPassword.value == "") {
		inputPassword.classList.add("is-invalid");
		document.getElementById("errorPassword").textContent = "Password missing.";
		acumErrores++;
	} else if (!contrassenyaValidacio(inputPassword.value)) {
		inputPassword.classList.add("is-invalid");
		document.getElementById("errorPassword").textContent = "Please follow the instructions below.";
		acumErrores++;
	} else {
		inputPassword.classList.add("is-valid");
		document.getElementById("okPassword").textContent = okFeedback;
	}

	if (inputPasswordMatch.value == "") {
		inputPasswordMatch.classList.add("is-invalid");
		document.getElementById("errorPasswordMatch").textContent = "Password missing.";
		acumErrores++;
	} else if ((inputPassword.value) !== (inputPasswordMatch.value)) {
		inputPasswordMatch.classList.add("is-invalid");
		document.getElementById("errorPasswordMatch").textContent = "Passwords don't match.";
		acumErrores++;
	} else {
		inputPasswordMatch.classList.add("is-valid");
		document.getElementById("okPasswordMatch").textContent = okFeedback;
	}

	if (!gridCheck.checked) {
		gridCheck.classList.add("is-invalid");
		document.getElementById("errorCheck").textContent = "Please accept.";
		acumErrores++;
	} else {
		gridCheck.classList.add("is-valid");
		document.getElementById("okCheck").textContent = "Thank you!";
	}

	if (acumErrores > 0) {
		return false;
	} else {
		return true;
	}
}

formRegister.addEventListener('blur', (event) => {
	console.log(event);
	if (event.target.value != '') event.target.classList.remove('is-invalid');
}, true);

// El formulari de login
const formLogin = document.getElementById('formLogin');

//Formulari login
function entrarCompte() {
	// Comptador d'errors per si falta info
	var acumErrorsLogin = 0;

	// Treure la class is-invalid de moment
	formLogin.classList.remove('is-invalid');

	// Variables agafant la info del formulari
	var inputLoginEmail = document.forms["formLogin"]["validacioLoginEmail"];
	var inputLoginPassword = document.forms["formLogin"]["validacioLoginPassword"];

	if (inputLoginEmail.value == "") {
		inputLoginEmail.classList.add("is-invalid");
		document.getElementById("errorEmailLogin").textContent = "Email missing.";
		acumErrorsLogin++;
	} else if (!emailValidacio(inputLoginEmail.value)) {
		inputLoginEmail.classList.add("is-invalid");
		document.getElementById("errorEmailLogin").textContent = "Please enter a valid email address.";
		acumErrorsLogin++;
	} else {
		inputLoginEmail.classList.add("is-valid");
		document.getElementById("okEmailLogin").textContent = "Looks good!";
	}


	if (inputLoginPassword.value == "") {
		inputLoginPassword.classList.add("is-invalid");
		document.getElementById("errorPasswordLogin").textContent = "Password missing.";
		acumErrorsLogin++;
	} else if (!contrassenyaValidacio(inputLoginPassword.value)) {
		inputLoginPassword.classList.add("is-invalid");
		document.getElementById("errorPasswordLogin").textContent = "Please follow the instructions below: Your password must be at least 8 characters long, contain at least 1 cappital letter and 1 number, and must not contain spaces, special characters, or emoji.";
		acumErrorsLogin++;
	}

	if (acumErrorsLogin > 0) {
		return false;
	} else {
		return true;
	}
}

formLogin.addEventListener('blur', (event) => {
	console.log(event);
	if (event.target.value != '') event.target.classList.remove('is-invalid');
}, true);

//CONDICIONS DE VALIDACIÓ 
//email 
function emailValidacio(email) {
	const regex1 = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex1.test(email) ? true : false;
}

//contrassenya> Mínim una majúscula + Mínim un número + Mínim 8 caràcters
function contrassenyaValidacio(contra) {
	const regex2 = /(?=^.{8,}$)((?=.*\w)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))^.*/gi;
	return regex2.test(contra) ? true : false;
}
