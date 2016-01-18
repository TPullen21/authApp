Template.register.events({
	"submit .form-register": function(event) {
		var firstName = trimInput(event.target.first_name.value);
		var lastName = trimInput(event.target.last_name.value);
		var email = trimInput(event.target.email.value);
		var password = trimInput(event.target.password.value);
		var passwordConfirm = trimInput(event.target.passwordConfirm.value);

		if (isNotEmpty(firstName) && isNotEmpty(lastName) && isNotEmpty(email) && isNotEmpty(password) && isEmail(email) && areValidPasswords(password, passwordConfirm)) {

			Accounts.createUser({
				profile: {
					first_name: firstName,
					last_name: lastName
				},
				email: email,
				password: password
			}, function(err) {
				if (err) {
					FlashMessages.sendError('There was an error with registration');
				} else {
					FlashMessages.sendSuccess('Account Created!');
					Router.go('/dashboard');
				}
			});

		}
	
		// Prevent submit
		return false;
	}
});

// Trim Helper
var trimInput = function(val) {
	return val.replace(/^\s*|\s*$/g, "");
}

// Check For Empty Fields
var isNotEmpty = function(value) {
	if (value && value !== '') {
		return true;
	}

	FlashMessages.sendError("Please fill in all fields");
	return false;
}

// Validate Email
var isEmail = function(value) {
	var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

	if (filter.test(value)) {
		return true;
	}

	FlashMessages.sendError("Please use a valid email address");
	return false;
}

// Check Password Field
var isValidPassword = function(password) {
	if (password.length < 6) {
		FlashMessages.sendError("Password must be at least 6 characters");
		return false;
	}

	return true;
}

// Match Passwords
var areValidPasswords = function(password, confirm) {
	if (!isValidPassword(password)) {
		return false;
	};

	if (password !== confirm) {
		FlashMessages.sendError("Passwords do nt match");
		return false;
	}

	return true;
}