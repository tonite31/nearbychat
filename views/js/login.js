$(document).ready(function()
{
	formSubmit('#signinForm', function(data)
	{
		doProgress('#signin', function(done)
		{
			data.signup = $('#signin').attr('data-type');
			$.ajax({url : '/auth/signin', type : 'post', data : data}).done(function(result)
			{
				if(result == 'created')
				{
					location.href = './index';
				}
				else if(result == 'not_authorized')
				{
					console.log('비밀번호 틀림');
				}
				else if(result == 'ok')
				{
					location.href = './index';
				}
				
			}).fail(function(res)
			{
//				if(res.status == 404 && res.responseText == 'not_found')
//				{
//					$('input[name="passwordConfirm"]').parent().show();
//					$('#signin').text('등록 후 로그인').attr('data-type', 'signup');
//				}
//				else
//				{
					console.log(res);
					alert('존재하지 않는 아이디');
//				}
			});
		});
	});
	
	$('#signin').on('click', function()
	{
		$(this).prev().click();
	});
});