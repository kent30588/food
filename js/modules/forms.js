import { closeModal, openModal } from './modal';
import { postData } from '../services/services';

function forms(formSelector, modalTimerId) {
	//Forms
	const forms = document.querySelectorAll(formSelector);
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

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

	//оповещение пользователя
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content">
			<div class="modal__close" data-close>x</div>
			<div class="modal__title">${message}</div>
		</div>
		`;
		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal('.modal');
		}, 4000);
		document.querySelector('.modal').append(thanksModal);
	}
}

export default forms;