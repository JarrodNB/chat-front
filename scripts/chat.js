var sendMessageUrl = "https://chat-api-rails.herokuapp.com/messages";
var token = window.localStorage.getItem("token");
var sessionsUrl = "https://chat-api-rails.herokuapp.com/sessions/destroy";
var initialMessageLimit = 10;
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
	}).fail( function (response) {
		});
	document.getElementById("message").value = "";
}
function signOut() {
	$.post(sessionsUrl, 
	{
		auth_token: token
	},
	function (data, status){
		location.assign('../html/index.html');
	}).fail( function (response) {
		});
}
$(document).ready(function() {
	var textArea = document.getElementById("chat");
	var messageIndex = -1;
	function getMessages(isFirstLogin) {
		$.get(sendMessageUrl,
			{
				auth_token: token
			},
			function(messages, status) {
				textArea.innerHTML = "";
				if (messages.length < initialMessageLimit) {
					messageIndex = 0;
				} else if (isFirstLogin) {
					messageIndex = messages.length - initialMessageLimit;
				}
				for (var index = messageIndex; index < messages.length; index++){
						var message = messages[index];
						var displayMessage = "\n" + message.username + " says: " + message.body;
						textArea.append(displayMessage);
					}
				textArea.scrollTop = textArea.scrollHeight;
			}, 'json').fail(function (response){
					location.assign('../html/index.html');
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