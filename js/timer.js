/**1.функция которая будет устанавливать таймер(получить элементы и что то с ними делать) 
2. функционал который будет определять разницу между временем пользователь и датой окончания таймера
3. функция которая будет заниматся обномвлением таймера
**/
const stock = '2021-12-10';

function getTimeDifference(endtime) {
	const t = Date.parse(endtime) - Date.parse(new Date());
	const days = Math.floor(t / (1000 * 60 * 60 * 24));
	const hours = Math.floor((t / (1000 * 60 * 60) )% 24);
	const minutes = Math.floor((t / (1000 * 60)) % 60);
	const seconds = Math.floor((t / 1000) % 60);
	return {
		'total': t,
		'days': days,
		'hours': hours,
		'minutes': minutes,
		'seconds': seconds
	};
}
function zero(num) {
	if (num < 10) {
		return `0${num}`;
	} else {
		return num;
	}
}
//console.log(getTimeRemaining(deadLine));

function setClock() {
	const days = document.querySelector('#days');
	const hours= document.querySelector('#hours');
	const minutes = document.querySelector('#minutes');
	const seconds = document.querySelector('#seconds');
	const timeInterva = setInterval(updateClock, 1000);
	updateClock();
	function updateClock () {
		const t = getTimeDifference(stock);
		days.innerHTML = zero(t.days);
		hours.innerHTML = zero(t.hours);
		minutes.innerHTML = zero(t.minutes);
		seconds.innerHTML = zero(t.seconds);
		if (t <= 0) {
			clearInterval(timeInterva);
		}
	}
}

setClock();


