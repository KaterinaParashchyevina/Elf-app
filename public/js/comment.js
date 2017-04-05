$(document).ready(function(){
	
	var votedValue = 0;
	var item = $('.container').find('img').data('item');

    $('.vote').on ('click', function(){

        $(this).addClass('active');
        $(this).parent().parent().parent().parent().addClass('voted');
        votedValue = parseInt($(this).attr('data-score'));
        
    });
           
	
	$('#comment_form').find('button').on('click', function(){

		event.preventDefault();
		var tempText = $('#comment_form').find('textarea').val();
		
		if(tempText === "" || tempText === " "){	
			$('#comment_form').find('textarea').val('');
		
		}else{
		
		
			$('.comments_list').find('ul').prepend('<li><p>Rate: '+ votedValue + '</p><p>'+ tempText +'</p></li>');
			$('#comment_form').find('textarea').val('');
			$(".ratingHolder").removeClass('voted');
		}
	});


})
