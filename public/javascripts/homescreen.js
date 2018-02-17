$(function(){
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
			let obj = {password:'examplePass', EmailAddress: 'test1@test.com', FirstName:'Joey', LastName:'Smith', RentPayment:1200};
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
			let obj = {EmailAddress: 'test1@test.com',password:'examplePass'};
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
