var signUpUrl = "https://chat-room-api-jbailey21.c9users.io/users"
//signUpUrl = "https://chat-api-rails.herokuapp.com/users";
// add error handler
function signUp() {
	var userEmail = document.getElementById("email").value;
	var userPassword = document.getElementById("password").value;
	var confirm = document.getElementById("password_confirmation").value;
	var name = document.getElementById("username").value;
	document.getElementById("email").value = "";
	document.getElementById("password").value = "";
	document.getElementById("password_confirmation").value = "";
	document.getElementById("username").value = "";
	$.post(signUpUrl,
		{
			user: {
				email: userEmail,
				username: name,
				password: userPassword,
				password_confirmation: confirm
			}
		},
		function(data, status){
			//if successful
			// launch to login
			// else invalid stuff warning
			console.log(data);
			console.log(status);
			location.assign('login.html');
		}, 'json').fail( function (response) {
			console.log(response.responseJSON);
		});
	
}