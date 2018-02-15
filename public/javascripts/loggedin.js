$(function(){
    let obj = {EmailAddress: 'anyemail'}
    $.ajax({
        url: '/users', 
        type: 'GET', 
        data: obj, 
        dataType: 'json',
        success: function(result) 
        { 
            console.log(result);
            $(".login-form").text(`${result.EmailAddress}${result.FullName} Login`) 
        } 
    });
})