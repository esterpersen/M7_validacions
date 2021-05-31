$("#botoEntrar").click(function () {
	console.log("hola, ha entrat o algo");

	$("#signupForm").validate({
		rules: {
			firstname: "required",
			lastname: "required",
			username: {
				required: true,
				minlength: 2
			},
			password: {
				required: true,
				minlength: 8,
				validPassword: true
			},
			confirm_password: {
				required: true,
				minlength: 8,
				equalTo: "#password"
			},
			email: {
				required: true,
				email: true
			},
			agree: "required"
		},
		messages: {
			firstname: "Please enter your firstname",
			lastname: "Please enter your lastname",
			username: {
				required: "Please enter a username",
				minlength: "Your username must consist of at least 2 characters"
			},
			password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 8 characters long"
			},
			confirm_password: {
				required: "Please provide a password",
				minlength: "Your password must be at least 8 characters long",
				equalTo: "Please enter the same password as above"
			},
			email: "Please enter a valid email address",
			agree: "Please accept our policy"
		},
		errorElement: "em",
		errorPlacement: function (error, element) {
			// Add the `invalid-feedback` class to the error element
			error.addClass("invalid-feedback");

			if (element.prop("type") === "checkbox") {
				error.insertAfter(element.next("label"));
			} else {
				error.insertAfter(element);
			}
		},
		highlight: function (element, errorClass, validClass) {
			$(element).addClass("is-invalid").removeClass("is-valid");
		},
		unhighlight: function (element, errorClass, validClass) {
			$(element).addClass("is-valid").removeClass("is-invalid");
		},
		//submit the form (afegit després)
		submitHandler: function (form) {
			form.submit();
		}
	});

	//propose username by combining first and last name 
	$("#username").focus(function () {
		var firstname = $("#firstname").val();
		var lastname = $("#lastname").val();
		if (firstname && lastname && !this.value) {
			this.value = firstname + "." + lastname;
		}
	});

	//mètode adicional per validar contrassenyes segons un cert patró
	$.validator.addMethod("validPassword", function (value, element) {
		var pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
		return this.optional(element) || pattern.test(value);
	}, "Your password must be at least 8 characters long, contain at least 1 cappital letter and 1 number, and must not contain spaces, special characters, or emoji.");

});