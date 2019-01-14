var loginUrl = "https://chat-room-api-jbailey21.c9users.io/sessions";
//loginUrl = "https://chat-api-rails.herokuapp.com/sessions";
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
			//if successful
			// get authen from data and launch to chat
			// else wrong password warning
			console.log(data)
			console.log(status);
			window.localStorage.setItem("token", data.auth_token + "");
			console.log(window.localStorage.getItem("token"));
			location.assign('chat.html');
		});
}
$(document).ready(function() {
});