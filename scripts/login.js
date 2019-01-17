var loginUrl = "https://chat-api-rails.herokuapp.com/sessions";
function signIn() {
	var userEmail = document.getElementById("email").value;
	var userPassword = document.getElementById("password").value;
	document.getElementById("email").value = "";
	document.getElementById("password").value = "";
	$.post(loginUrl,
		{
			session: {
				email: userEmail,
				password: userPassword
			}
		},
		function(data, status){
			window.localStorage.setItem("token", data.auth_token + "");
			location.assign('../html/chat.html');
		}).fail(function(response) {
				alert("Invalid Email or Password");
		});
}
