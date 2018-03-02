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
	$('#permanent-delete-account').click(function(){
			$.ajax({
            	url: `/logged_in`, 
	            type: 'DELETE', 
				data: {EmailAddress},
				headers: { 'authorization': `Bearer ${token}`},
	            dataType: 'json',
	            success: function(result) 
	            { 
					//then return to index.html
					window.location.href = `/index.html?delete=true`
					//doesn't display on index.html
					$(".delete-alert-danger2").text(result.message) 
					
					
	            },
				error: function(){
					$(".problem").css('display', 'block')
					console.log('error')
					//should return 
				}
			});
			
	})
	$('.update-account').click(function(e){
		e.preventDefault();
		let obj = {
			EmailAddress:$('#inputEmail3').val().trim(),
			FirstName:$('#inputFirstName3').val().trim(),
			LastName:$('#inputLastName3').val().trim(),
			RentPayment:$('#inputRentPayment3').val().trim()
		};
			$.ajax({
            	url: `/logged_in`, 
	            type: 'PUT', 
				data: obj,
				headers: { 'authorization': `Bearer ${token}`},
	            dataType: 'json',
	            success: function(result) 
	            { 
					$('.update-account-msg').css('display','block')
				console.log(result);
	            },
				error: function(){
					$(".problem").css('display', 'block')
					console.log('error')
				
				}
		})
	})
})