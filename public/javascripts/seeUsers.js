$(function(){
    var $_GET = {};
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	function decode(s) {
	    return decodeURIComponent(s.split("+").join(" "));
	}
	$_GET[decode(arguments[1])] = decode(arguments[2]);
	});

	let token = $_GET['token']
	let EmailAddress = $_GET['EmailAddress']
	$('.back-to-user-page').attr('href',`/logged_in.html?token=${token}&EmailAddress=${EmailAddress}`)
	$('.dropdown-menu a').attr('href', '/');
    $.ajax({
	    url: `/users`,
	    type: 'GET',
	    headers: { 'authorization': `Bearer ${token}`},
	    success:function(data){
			console.log("this is the data", data);
			let formattedData = DisplayAllUsers(data);
			$('tbody').html(formattedData);
	    },
	    error: function(){
	    	$(".problem").css('display', 'block')
	    	console.log('error')
	    	//should return 
	    }
	});
	function DisplayAllUsers (data) {
		let returnString = "";
		data.allusers.forEach(userDetails => {
			returnString += "<tr>"
			returnString += `<td>${userDetails['EmailAddress']}</td>`
			returnString += `<td>${userDetails['FirstName']}</td>`
			returnString += `<td>${userDetails['LastName']}</td>`
			returnString += `<td>${userDetails['RentPayment']}</td>`
			returnString += "</tr>"
		})
		return returnString;  
	}
});
