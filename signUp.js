var signUpUrl = "https://chat-api-rails.herokuapp.com/users"
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
			console.log(data);
			console.log(status);
			location.assign('login.html');
		}, 'json').fail( function (response) {
			console.log(response.responseJSON);
			var warning = "";
			response.responseJSON.forEach(error => {
				warning += error + ", ";
			});
			alert(warning.substring(0, warning.length - 2));
		});
	
}