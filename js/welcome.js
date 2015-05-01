$(document).ready(function() {

$('.default_popup').popup();
 var $button = $('.welcomebutton');
 var $introButton = $('.introbutton');
 var $verifyButton = $('#verify');

	$introButton.click(function(e) {
		$('.title-page').addClass("hideme");
		$('.email-top').removeClass("hideme");
	});

	$verifyButton.click(function(e) {
		
	});
 
	$button.click(function(e) {
		e.preventDefault();
		$(".welcome-detail").addClass("hideme");
		$('.play-game').removeClass("hideme");
	});
});