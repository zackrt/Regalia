$(function(){

	$.ajax({
    	url: '/users', 
        type: 'GET',
        dataType: 'json',
        success: function(result) 
        { 
        	// console.log(result)
        	let str = `<table class="table table-striped">
        				<thead><th>name</th><th>id</th><th>blockchains</th></thead><tbody>
        	`;
        	for(let i = 0; i < result.length; i++){
        		str += `<tr><td>${result[i].name}</td><td>${result[i].id}</td><td>${result[i].blockchains}</td></li>`
        	}
        	str+'</tbody></table>'
        	$(".users").html(str) 
        } 
	});


	$('form').submit(function(e){
		e.preventDefault();
		let obj = {
			name: $('#exampleInputName1').val()
		}
		$.ajax({
            	url: '/users', 
	            type: 'POST', 
	            data: obj, 
	            dataType: 'json',
	            success: function(result) 
	            { 
	            	$('#exampleInputName1').val("");
	            	$(".form-response").css('display', 'block').text(`${result.name} has been added`) 
	            } 
        	});
	})
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
})