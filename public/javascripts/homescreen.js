$(function(){

	 var $_GET = {};
	 document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	 	function decode(s) {
	 		return decodeURIComponent(s.split("+").join(" "));
	 	}
	 	$_GET[decode(arguments[1])] = decode(arguments[2]);
	 	});
			if($_GET['delete']){
				$(".delete-alert-danger2").text("Your Account was Deleted!").css("display", "block")
			}

	$.ajax({
		url: '/regalia/total', 
		type: 'GET',  
		dataType: 'json',
		success: function(result) 
		{ 
			$(".total-regalia").text(result.total) 
		} 
	});

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
		$('#register-form').submit(function(e){
			e.preventDefault();
			let obj = {password:'exampleDelete', EmailAddress: 'test1@delete.com', FirstName:'Jim', LastName:'Smith', RentPayment:1200};
			$.ajax({
            	url: '/users', 
	            type: 'POST', 
	            data: obj, 
	            dataType: 'json',
	            success: function(result) 
	            { 
	            	$(".registration-results").text(`${result.EmailAddress}${result.FullName} Registered!`) 
	            } 
        	});
		})
		$('#login-form').submit(function(e){
			e.preventDefault();
			let obj = {EmailAddress: 'test1@delete.com',password:'exampleDelete'};
			$.ajax({
            	url: '/api/auth/login', 
	            type: 'POST', 
	            data: obj, 
	            success: function(result)
	            { 
	            	window.location.href = `/logged_in.html?token=${result.authToken}&EmailAddress=${obj.EmailAddress}`
	            }, 
	            error: function() 
	            { 
	            	$(".login-form-response").css("display", "block").text(`Something went wrong -- please try again`) 
	            }  
        	});
		})
})
