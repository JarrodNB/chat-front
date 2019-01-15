var sendMessageUrl = "https://chat-api-rails.herokuapp.com/messages";
var token = window.localStorage.getItem("token");
var sessionsUrl = "https://chat-api-rails.herokuapp.com/sessions/destroy";
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
	var messageId = -1;
	function getMessages(isFirstLogin) {
		$.get(sendMessageUrl,
			{
				auth_token: token
			},
			function(data, status) {
				textArea.innerHTML = "";
				var messages = data;
				if (messages.length < 10) {
					messageId = 0;
				} else if (isFirstLogin) {
					messageId = messages.length - 10;
				}
				for (var index = messageId; index < messages.length; index++){
						var message = messages[index];
						var displayMessage = "\n" + message.username + " says: " + message.body;
						textArea.append(displayMessage);
					}
				textArea.scrollTop = textArea.scrollHeight;
			}, 'json').fail(function (response){
				location.assign('login.html');
			});
	}
	getMessages(true);
	function sleep(ms) {
		return new Promise(resolve => setTimeout(resolve, ms));
	}
	async function refresh(){
		while (true) {
		getMessages(false);
		await sleep(2000);
		}
	}
	refresh();
});