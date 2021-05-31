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
};

// Expressions regulars per a la validació
const exp = {
	fullName: /^[a-zA-ZàáâäãåąčćęèéêëėįìíîïłńòóôöõøùúûüųūÿýżźñçčšžÀÁÂÄÃÅĄĆČĖĘÈÉÊËÌÍÎÏĮŁŃÒÓÔÖÕØÙÚÛÜŲŪŸÝŻŹÑßÇŒÆČŠŽ∂ð ,'-]+$/u,

	email: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,

	// Min 8 caracters, 1 majúscula, i 1 número

	//ho accepta SENSE majúscules
	//pwd: /(?=^.{8,16}$)((?=.*\w)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]))^.*/gi,
	//no accepta cap combinació (treta de la correccio al moddle)
	//pwd: /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
	//la va enviar l'Albert p discord
	//pwd: /^(?=.\d)(?=.[A-Z])(?=.[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/gm,
	//stackoverflow:
	pwd: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
};

// El formulari de registre
const formRegister = document.getElementById('formRegister');

//Formulari Registre
function crearCompte() {
	// Comptador d'errors per si falta info
	var acumErrores = 0;

	// Treure la class is-invalid de moment
	formRegister.classList.remove('is-invalid');

	// Variables agafant la info del formulari
	let inputFirstName = document.forms["formRegister"]["validationNom"];
	let inputLastName = document.forms["formRegister"]["validationCognom"];
	let inputProvince = document.forms["formRegister"]["validacioProvince"];
	let inputEmail = document.forms["formRegister"]["validacioEmail"];
	let inputPassword = document.forms["formRegister"]["validacioPassword"];
	let inputPasswordMatch = document.forms["formRegister"]["validacioPasswordMatch"];
	let gridCheck = document.forms["formRegister"]["gridCheck"];
	let okFeedback = "Looks good!";

	//Què passa si es deixa en blanc algun input, o si és incorrecte:
	if (inputFirstName.value == "") {
		inputFirstName.classList.add("is-invalid");
		document.getElementById("errorFirstName").textContent = "First name missing.";
		document.getElementById("okFirstName").textContent = "";
		acumErrores++;
	} else if (parametreValidacio(exp.fullName, inputFirstName.value) == false) {
		inputFirstName.classList.add("is-invalid");
		document.getElementById("errorFirstName").textContent = "Please enter a valid name (only letters).";
		document.getElementById("okFirstName").textContent = "";
		acumErrores++;
		console.log("ha entrat al nom invalid.");
	} else {
		inputFirstName.classList.add("is-valid");
		document.getElementById("errorFirstName").textContent = "";
		document.getElementById("okFirstName").textContent = okFeedback;
	}

	//Last name
	if (inputLastName.value == "") {
		inputLastName.classList.add("is-invalid");
		document.getElementById("errorLastName").textContent = "Last name missing.";
		document.getElementById("okLastName").textContent = "";
		acumErrores++;
	} else if (parametreValidacio(exp.fullName, inputLastName.value) == false) {
		inputLastName.classList.add("is-invalid");
		document.getElementById("errorLastName").textContent = "Please enter a valid last name (only letters).";
		document.getElementById("okLastName").textContent = "";
		acumErrores++;
		console.log("ha entrat al cognom invalid.");
	} else {
		inputLastName.classList.add("is-valid");
		document.getElementById("errorLastName").textContent = "";
		document.getElementById("okLastName").textContent = okFeedback;
	}

	//Province
	if (inputProvince.value == "") {
		inputProvince.classList.add("is-invalid");
		document.getElementById("errorProvince").textContent = "Please select a province.";
		acumErrores++;
	} else {
		inputProvince.classList.add("is-valid");
		document.getElementById("okProvince").textContent = okFeedback;
	}

	//email
	if (inputEmail.value == "") {
		inputEmail.classList.add("is-invalid");
		document.getElementById("errorEmail").textContent = "Email missing.";
		document.getElementById("okEmail").textContent = "";
		acumErrores++;
	} else if (parametreValidacio(exp.email, inputEmail.value) == false) {
		inputEmail.classList.add("is-invalid");
		document.getElementById("errorEmail").textContent = "Please enter a valid email address.";
		document.getElementById("okEmail").textContent = "";
		acumErrores++;
		console.log("ha entrat al email invalid.");
	} else {
		inputEmail.classList.add("is-valid");
		document.getElementById("errorEmail").textContent = "";
		document.getElementById("okEmail").textContent = okFeedback;
		console.log("ha entrat al email valid.");
	}

	//password
	if (inputPassword.value == "") {
		inputPassword.classList.add("is-invalid");
		document.getElementById("errorPassword").textContent = "Password missing.";
		document.getElementById("okPassword").textContent = "";
		acumErrores++;
	} else if (parametreValidacio(exp.pwd, inputPassword.value) == false) {
		inputPassword.classList.add("is-invalid");
		document.getElementById("errorPassword").textContent = "Please follow the instructions below.";
		document.getElementById("okPassword").textContent = "";
		acumErrores++;
		console.log("ha entrat a la contra invalida.");
	} else {
		inputPassword.classList.add("is-valid");
		document.getElementById("errorPassword").textContent = "";
		document.getElementById("okPassword").textContent = okFeedback;
		console.log("ha entrat a la contra valida.");
	}

	//password Match
	if (inputPasswordMatch.value == "") {
		inputPasswordMatch.classList.add("is-invalid");
		document.getElementById("errorPasswordMatch").textContent = "Password missing.";
		acumErrores++;
	} else if ((inputPassword.value) !== (inputPasswordMatch.value)) {
		console.log("hola, funciona? " + inputPasswordMatch.value);
		inputPasswordMatch.classList.add("is-invalid");
		document.getElementById("errorPasswordMatch").textContent = "Passwords don't match.";
		acumErrores++;
	} else {
		inputPasswordMatch.classList.add("is-valid");
		document.getElementById("okPasswordMatch").textContent = okFeedback;
	}

	//accept 
	if (!gridCheck.checked) {
		gridCheck.classList.add("is-invalid");
		document.getElementById("errorCheck").textContent = "Please accept.";
		document.getElementById("okCheck").textContent = "";
		acumErrores++;
	} else {
		gridCheck.classList.add("is-valid");
		document.getElementById("errorCheck").textContent = "";
		document.getElementById("okCheck").textContent = "Thank you!";
	}

	//Acumulació errors 
	if (acumErrores > 0) {
		return false;
	} else {
		return true;
	}
}

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

	//email
	if (inputLoginEmail.value == "") {
		inputLoginEmail.classList.add("is-invalid");
		document.getElementById("errorEmailLogin").textContent = "Email missing.";
		document.getElementById("okEmailLogin").textContent = "";
		acumErrorsLogin++;
	} else if (parametreValidacio(exp.email, inputLoginEmail.value) == false) {
		inputLoginEmail.classList.add("is-invalid");
		document.getElementById("errorEmailLogin").textContent = "Please enter a valid email address.";
		document.getElementById("okEmailLogin").textContent = "";
		acumErrorsLogin++;
		console.log("ha entrat al mail invalid.");
	} else {
		inputLoginEmail.classList.add("is-valid");
		document.getElementById("okEmailLogin").textContent = "Looks good!";
		console.log("ha entrat al mail valid.");
	}

	//password
	if (inputLoginPassword.value == "") {
		inputLoginPassword.classList.add("is-invalid");
		document.getElementById("errorPasswordLogin").textContent = "Password missing.";
		document.getElementById("okPasswordLogin").textContent = "";
		acumErrorsLogin++;
	} else if (parametreValidacio(exp.pwd, inputLoginPassword.value) == false) {
		inputLoginPassword.classList.add("is-invalid");
		document.getElementById("errorPasswordLogin").textContent = "Please follow the instructions below: Your password must be at least 8 characters long, contain at least 1 cappital letter and 1 number, and must not contain spaces, special characters, or emoji.";
		document.getElementById("okPasswordLogin").textContent = "";
		acumErrorsLogin++;
		console.log("ha entrat a la contra invalida");
	} else {
		inputLoginPassword.classList.add("is-valid");
		document.getElementById("errorPasswordLogin").textContent = "";
		document.getElementById("okPasswordLogin").textContent = "Looks good!";
		console.log("ha entrat a la contra valida");
	}

	if (acumErrorsLogin > 0) {
		return false;
	} else {
		return true;
	}
}

//treure class is-invalid quan es deixa de posar el focus a un element del form de registre. 
formRegister.addEventListener('blur', (event) => {
	console.log(event);
	if (event.target.value != '') event.target.classList.remove('is-invalid');
}, true);

//treure class is-invalid quan es deixa de posar el focus a un element del form de login
formLogin.addEventListener('blur', (event) => {
	console.log(event);
	if (event.target.value != '') event.target.classList.remove('is-invalid');
}, true);

//VALIDACIÓ
//mateixa funcio per les 3 validacions
function parametreValidacio(expr, paraula) {
	console.log("parametre: " + paraula);
	return expr.test(paraula) ? true : false;
}