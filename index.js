$(document).ready(function() {

	VK.init({
		apiId: 7071222
	});

	/* отвечает за отображение друзей */
	function requestFriendList() {
		VK.Api.call(
			'friends.get',
			{
				v: '5.101',
				fields: 'photo_100'
			}, 
			function(data) {
				const count = data.response.count;
				const friendsList = data.response.items;

				let html = '';

				if (count === 0) {
					html = 'В списке друзей пусто';
				} else if (count > 5) {
					for (let i = count; friendsList.length > 5; i--) {
						friendsList.splice(Math.floor(Math.random() * (friendsList.length + 1)), 1);
					}
				}

				for (let i = 0; i < friendsList.length; i++) {
					const friend = friendsList[i];

					html += 
						'<li>' +
							'<a target="_blank" href="https://vk.com/id' + friend.id + '">' +
								'<img src="' + friend.photo_100 + '" />' +
								'<h4 class="first-name">' + friend.first_name +  '</h4>' + 
								'<h4 class="last-name">' + friend.last_name +  '</h4>' +
							'</a>' +
						'</li>';
				}

				$('ul').html(html);
			}
		);

		$('#vk-login').attr('disabled', true);
		$('#vk-logout').removeAttr('disabled');
	}

	/* Проверяет статус авторизации */
	VK.Auth.getLoginStatus(function(response) {

		if (response.status === 'connected') {

			const user = response.session;

			$.ajax({
				url: 'https://api.vk.com/method/users.get?user_ids=' + user.mid + '&access_token=' + user.sid + '&v=5.101',
				type: 'GET',
				dataType: 'JSONP',
			})
			.done(function(data) {
				$('h3').html('Hello, ' + data.response[0].first_name + '!');
			});

			requestFriendList();
		}

		if (response.status === 'not_authorized') {
			$('h3').html("5 random VK's friends");
		}

	});

	/* Привязка событий к кнопкам */
	$('#vk-login').on('click', function() {
		VK.Auth.login(
			function(response) {

				if (response.status === 'connected') {
					const user = response.session.user;

					$('h3').html('Hello, ' + user.first_name + '!');

					requestFriendList();
				}
			},
			VK.access.FRIENDS
		);
	});

	$('#vk-logout').on('click', function() {
		VK.Auth.logout(function(data) {
			$('#vk-login').removeAttr('disabled');
			$('h3').html("5 random VK's friends");
			$('ul').html(null);
		});

		$('#vk-logout').attr('disabled', true);
	});

});