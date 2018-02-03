'use strict';

$(function(){
    $('body').on('click', '.TEST-BLOCKCHAIN', function(){
        alert("this is working");
        $.ajax(
            {url: '/get_blockchain', 
            type: 'POST', 
            data: { index: index, user: user }, 
            success: function(result) 
            { alert('success from POST') } });
    }
})