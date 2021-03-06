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
	    	$(".no-problem").css('display', 'block');
			$(".Email-Address").text(EmailAddress);
			$(".Rent-Payment").text(numberWithCommas(data.user.RentPayment));
			$(".Rent-Payment").attr("data-rent",data.user.RentPayment);
			$("#inputEmail3").val(EmailAddress);
			//fill in update form
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
				console.log('success = ', result);
	            $('#inputFirstName3').val(result.FirstName);
	           	$('#inputLastName3').val(result.LastName);
				$('#inputRentPayment3').val(result.RentPayment);
				$('.update-alert-success').css('display','block').text("Your account has been updated!");
	        },
			error: function(error){
				$(".problem").css('display', 'block');
				console.log('error', error);
			}
		});
	});
	$('.send-regalia-btn').click(function(e){
		e.preventDefault();
			let sendObj = {
				EmailAddress:$('#inputEmail4').val(),
				RentPayment:$('#inputRegaliaSendAmount').val()
			};
			console.log(sendObj);
			$.ajax({
				//need url, need to compare sendObj to see if other user email exists, and if sendAmount exist in user A's regalia, no negative amount allowed, no letters, check if regalia by adding to receiver. 
				url: `/logged_in/sendRegalia`, 
				type: 'PUT', 
				data: sendObj,
				headers: { 'authorization': `Bearer ${token}`},
				dataType: 'json',
				success: function(result) 
				{ 
					//transaction completion,number.toLocaleString();			
					const newAmount = parseInt($('.Rent-Payment').attr("data-rent"),10)-sendObj.RentPayment;
					$('.send-alert-success').css('display','block').text(`${sendObj.RentPayment} Regalia sent to ${sendObj.EmailAddress}!`);
					$('.Rent-Payment').text(numberWithCommas(newAmount));
					$('.Rent-Payment').attr("data-rent",newAmount);
				},
				error: function(error){
					$('.send-alert-success').css('display', 'block').text("Invalid User receiver email or Insufficient Regalia!");
				}
			});
	});
})