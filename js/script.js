window.addEventListener('DOMContentLoaded', () => {
//Табы
    const tabs = document.querySelectorAll('.tabheader__item');
    const tabsContent = document.querySelectorAll('.tabcontent');
    const tabsParent = document.querySelector('.tabheader__items');

    function hideRabContent() {
        tabsContent.forEach(item => {
            item.classList.add('hide');
            item.classList.remove('show', 'fade');
        });
        tabs.forEach(item => {
            item.classList.remove('tabheader__item_active');
        });
    }

    function showTabContent(i = 0) {
        tabsContent[i].classList.add('show', 'fade');
        tabsContent[i].classList.remove('hide');
        tabs[i].classList.add('tabheader__item_active');
    }

    hideRabContent();
    showTabContent();

    tabsParent.addEventListener('click', (event) => {
        const target = event.target;

        if (target && target.classList.contains('tabheader__item')) {
            tabs.forEach((item, i) => {
                if (target == item) {
                    hideRabContent();
                    showTabContent(i);
                }
            });
        }
	 });

	//Модальное окно

	const modalTrigger = document.querySelectorAll('[data-modal]');
	const modal = document.querySelector('.modal');

	function openModal() {
		modal.classList.add('show');
		modal.classList.remove('hide');
		document.body.style.overflow = 'hidden';
		clearInterval(modalTimerId);
	}

	modalTrigger.forEach(btn => {
		btn.addEventListener('click', openModal);
	});

	function closeModal() {
		modal.classList.add('hide');
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	modal.addEventListener('click', (e) => {
		if (e.target === modal || e.target.getAttribute('data-close') === '') {
				closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		if (e.code === 'Escape' && modal.classList.contains('show')) {
			closeModal();
		}
	});

	const modalTimerId = setTimeout(openModal, 50000);
	function showModalByScroll() {
				if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
					openModal();
					window.removeEventListener('scroll', showModalByScroll);
		}
	}
	window.addEventListener('scroll', showModalByScroll);

//Используем классы для карточек

	class MenuCard{
		constructor(src,alt,title,descr,price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.classes = classes;
			this.parent = document.querySelector(parentSelector);
			this.transfer = 27;
			this.changeToUAH();
		}
		changeToUAH() {
			this.price = this.price * this.transfer;
		}
		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				this.element = 'menu__item';
				element.classList.add(this.element);
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}
			element.innerHTML = `
				<img src=${this.src} alt=${this.alt} >
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${this.price}</span> грн/день</div>
				</div>
			`;
			this.parent.append(element);
		}
	}
	//Создаем новый объект и вызываем render()
	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy" ,
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite"  ,
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		21,
		'.menu .container',
		'menu__item'
	).render();

	new MenuCard(
		"img/tabs/post.jpg" ,
		"post" ,
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		15,
		'.menu .container',
		'menu__item'
	).render();

	//Forms
	//получим все формы на странице
	const forms = document.querySelectorAll('form');
	const message = {
		loading: 'img/form/spinner.svg',
		success: 'Спасибо! Скоро мы с вами свяжемся',
		failure: 'Что-то пошло не так'
	};

	forms.forEach(item => {
		postData(item);
	});
	//Пишем функцию которая будет отвечать за постинг данных
	//Эта функция должна принимать какойто аргумент(форму)
	function postData(form) {
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
			//создаем объект 
			const request = new XMLHttpRequest();
			//вызываем метод open что бы настроить запрос
			request.open('POST', 'server.php');
			//Заголовки которые говорят серверу что именно приходит ВАЖНО. Если используем связку new XMLHttpRequest() + new FormData(form); заголовки не нужны! Будет ОШИБКА!
			//request.setRequestHeader('Content-type', 'multipart/form-data');

			// Для отправки JSON
			request.setRequestHeader('Content-type', 'application/json');
			//создаем объект который позволяет нам с определенной формы быстро сформировать  данные которые заполнил пользователь формат (ключ - значение)
			const formData = new FormData(form);
			//код для JSON формата
			const object = {};
			formData.forEach(function (value, key) {
				object[key] = value;
			});
			//метод превращает обычный объект в JSOn
			const json = JSON.stringify(object);
			//Вызываем метод send для отправки - formData
			//request.send(formData);
			//для JSON
			request.send(json);
			//Создаю обработчик для отслеживания нашей конечной загрузки
			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.success);
					//После успешной отправки, очищаем форму
					form.reset();
					//удаляем блок с сообщениеми
						statusMessage.remove();
				} else {
					showThanksModal(message.failure);
				}
			});
		});
	}

	//оповещение пользователя
	function showThanksModal(message) {
		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

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
			closeModal();
		}, 4000);
		document.querySelector('.modal').append(thanksModal);
	}

});