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
	//add RentPayment to display 
	$('#seeusers').click(function(){
		window.location.href = `/see-users.html?token=${token}&EmailAddress=${EmailAddress}`
	})
	$.ajax({
	    url: `/logged_in`,
	    type: 'GET',
	    data: {EmailAddress},
	    headers: { 'authorization': `Bearer ${token}`},
	    success:function(data){
			console.log("this is the data", data);
	    	console.log("EmailAddress", EmailAddress)
	    	$(".no-problem").css('display', 'block');
			$(".Email-Address").text(EmailAddress);
			$(".Rent-Payment").text(numberWithCommas(data.user.RentPayment));
			$("#inputEmail3").val(EmailAddress);
			$("#inputFirstName3").val(data.user.FirstName);
			$("#inputLastName3").val(data.user.LastName);
			$("#inputRentPayment3").val(data.user.RentPayment);
	    },
	    error: function(){
	    	$(".problem").css('display', 'block')
	    	console.log('error')
	    	//should return 
	    }
	});
	function numberWithCommas(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	 }
	 $('body').on('click', '.testingPost', function(){
    	let obj = {};
        $.ajax({
            	url: '/blockchain', 
	            type: 'POST', 
	            data: obj, 
	            dataType: 'json',
	            success: function(result) 
	            { 
	            	$(".alert-success").text(result.message) 
	            } 
        	});
    	})

    $('body').on('click', '.testingDelete', function(){
    	let obj = {};
        $.ajax({
            	url: '/blockchain', 
	            type: 'DELETE', 
	            data: obj, 
	            dataType: 'json',
	            success: function(result) 
	            { 
	            	$(".alert-danger").text(result.message) 
	            } 
        	});
    	})
    $('body').on('click', '.testingGet', function(){
    	let obj = {};
        $.ajax({
            	url: '/blockchain', 
	            type: 'GET', 
	            data: obj, 
	            dataType: 'json',
	            success: function(result) 
	            { 
	            	$(".alert-warning").text(result.message) 
	            } 
        	});
    	})
    $('body').on('click', '.testingPut', function(){
    	let obj = {};
        $.ajax({
            	url: '/blockchain', 
	            type: 'PUT', 
	            data: obj, 
	            dataType: 'json',
	            success: function(result) 
	            { 
	            	$(".alert-info").text(result.message) 
	            } 
        	});
		})
	$('#deleteAccount').click(function(){
			$.ajax({
            	url: `/logged_in`, 
	            type: 'DELETE', 
				data: {EmailAddress},
				headers: { 'authorization': `Bearer ${token}`},
	            dataType: 'json',
	            success: function(result) 
	            { 
	            	$(".delete-alert-danger").text(result.message) 
	            } 
			});
	})
})