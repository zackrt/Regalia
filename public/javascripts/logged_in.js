$(function(){

	// get url vars
	var $_GET = {};
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	function decode(s) {
	    return decodeURIComponent(s.split("+").join(" "));
	}
	$_GET[decode(arguments[1])] = decode(arguments[2]);
	});

	let token = $_GET['token']
	let EmailAddress = $_GET['EmailAddress']
	$.ajax({
	    url: `/logged_in`,
	    type: 'GET',
	    data: {EmailAddress},
	    headers: { 'authorization': `Bearer ${token}`},
	    success:function(data){
	    	console.log("EmailAddress", EmailAddress)
	    	$(".no-problem").css('display', 'block');
	    	$(".userData").text(data);
	    },
	    error: function(){
	    	$(".problem").css('display', 'block')
	    	console.log('error')
	    	//should return 
	    }
	});


})