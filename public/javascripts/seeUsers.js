$(function(){
    var $_GET = {};
	document.location.search.replace(/\??(?:([^=]+)=([^&]*)&?)/g, function () {
	function decode(s) {
	    return decodeURIComponent(s.split("+").join(" "));
	}
	$_GET[decode(arguments[1])] = decode(arguments[2]);
	});

	let token = $_GET['token']
    $.ajax({
	    url: `/see_users`,
	    type: 'GET',
	    headers: { 'authorization': `Bearer ${token}`},
	    success:function(data){
			console.log("this is the data", data);
	    
	    },
	    error: function(){
	    	$(".problem").css('display', 'block')
	    	console.log('error')
	    	//should return 
	    }
	});
    }
});
