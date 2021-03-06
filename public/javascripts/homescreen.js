$(function(){
	function createURLObject(){
		let string = window.location.search.substring(1);
		let arr = string.split('&');
		let returnObj = {};
		for(let i = 0; i < arr.length; i++){
		  let miniArr = arr[i].split("=")
		  returnObj[miniArr[0]] = miniArr[1]
		}
		return returnObj;
	}
	$_GET = createURLObject();
		if($_GET['delete']){
			$(".delete-alert-danger2").text("Your Account was Deleted!").css("display", "block");
		}
	$('.signout-li').css('display','none');
	$.ajax({
		url: '/regalia/total', 
		type: 'GET',  
		dataType: 'json',
		success: function(result) 
		{ 
			$(".total-regalia").text(result.total); 
		} 
	});

		$('#register-form').submit(function(e){
			e.preventDefault();
			let password = $('#exampleInputPassword1').val() ||'exampleDelete'; 
			let EmailAddress = $('#exampleInputEmail1').val() || 'test1@development.com';
			let FirstName = $('#exampleInputFirstName').val() || 'Jake';
			let LastName = $('#exampleInputLastName').val() || 'Smith';
			let RentPayment = $('#exampleInputRentPayment').val() || 1200;

			let obj = {
			password,
			EmailAddress, 
			FirstName, 
			LastName, 
			RentPayment
			};
			$.ajax({
            	url: '/users', 
	            type: 'POST', 
	            data: obj, 
	            dataType: 'json',
	            success: function(result) 
	            { 
					$(".registration-results").text(`${result.EmailAddress}, ${result.FullName} successfully registered!`); 
					$('#exampleInputEmail1').val("");
					$('#exampleInputPassword1').val("");
					$('#exampleInputFirstName').val("");
					$('#exampleInputLastName').val("");
					$('#exampleInputRentPayment').val("");
				},
				error: function(error){
					$(".registration-results").text(`Error found: ${error.responseJSON.message} !`); 
				}
        	});
		})
		$('#login-form').submit(function(e){
			e.preventDefault();
			let EmailAddress = $('#loginEmail').val() || 'test1@development.com';
			let password = $('#loginPassword').val() ||'exampleDelete';

			let obj = {
			EmailAddress,
			password
			};
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