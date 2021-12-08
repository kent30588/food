function timer(id, deadLine) {
	//таймер
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
		if (num >= 0 && num < 10) {
			return '0' + num;
		} else {
			return num;
		}
	}

	function setClock() {
		const days = document.querySelector('#days');
		const hours= document.querySelector('#hours');
		const minutes = document.querySelector('#minutes');
		const seconds = document.querySelector('#seconds');
		const timeInterva = setInterval(updateClock, 1000);
		updateClock();
		function updateClock () {
			const t = getTimeDifference(deadLine);
			days.innerHTML = zero(t.days);
			hours.innerHTML = zero(t.hours);
			minutes.innerHTML = zero(t.minutes);
			seconds.innerHTML = zero(t.seconds);
			if (t.total <= 0) {
				clearInterval(timeInterva);
			}
		}
	}

	setClock(id, deadLine);
}

export default timer;