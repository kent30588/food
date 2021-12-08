function forms () {
	//Forms
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

	const postData = async (url, data) => {
		const res = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-type': 'application/json'
			},
			body: data
		});

		return await res.json();
	};
	//Пишем функцию которая будет отвечать за постинг данных
	//Эта функция должна принимать какойто аргумент(форму)
	function bindPostData(form) {
		//событие submit - оно срабатывает каждый раз когда мы пытаемся отправить какую-то форму
		form.addEventListener('submit', (e) => {
			//отменяем стандартное поведение браузера (обновление страницы после отправки формы)
			e.preventDefault();
			//Создаем новый блок для вывода сообщений
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
				display: block;
				margin: 0 auto;
			`;
			form.insertAdjacentElement('afterend', statusMessage);

			const formData = new FormData(form);

			const json = JSON.stringify(Object.fromEntries(formData.entries()));

				postData('http://localhost:3000/requests', json)
				.then(data => {
				console.log(data);
				showThanksModal(message.success);
				//удаляем блок с сообщениеми
				statusMessage.remove();
			}).catch(() => {
				showThanksModal(message.failure);
			}).finally(() => {
				//очищаем форму
				form.reset();
			});
		});
	}
}

module.exports = forms;