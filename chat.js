var sendMessageUrl = "https://chat-room-api-jbailey21.c9users.io/messages";
var token = window.localStorage.getItem("token");
var sessionsUrl = "https://chat-room-api-jbailey21.c9users.io/sessions/destroy";
function sendMessage() {
	var userMessage = document.getElementById("message").value;
	$.post(sendMessageUrl, 
	{
		message: 
		{
			body: userMessage
		},
		auth_token: token
	},
	function (data, status){
		console.log(data);
		console.log(status);
	}).fail( function (response) {
			console.log(response.responseJSON);
		});
	document.getElementById("message").value = "";
}
function signOut() {
	$.post(sessionsUrl, 
	{
		auth_token: token
	},
	function (data, status){
		console.log(data);
		console.log(status);
		location.assign('login.html');
	}).fail( function (response) {
			console.log(response.responseJSON);
		});
}

$(document).ready(function() {
	var textArea = document.getElementById("chat");
	function getMessages() {
		$.get(sendMessageUrl,
			{
				auth_token: token
			},
			function(data, status) {
				textArea.innerHTML = "";
				var messages = data;
				messages.forEach(message => {
					var displayMessage = "\n" + message.username + " says: " + message.body;
					textArea.append(displayMessage);
				});
				textArea.scrollTop = textArea.scrollHeight;
			}, 'json').fail(function (response){
				location.assign('login.html');
			});
		
	}
	getMessages();
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function refresh(){
		while (true) {
		getMessages();
		await sleep(2000);
		}
	}
	refresh();
	
	
});