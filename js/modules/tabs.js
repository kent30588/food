function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {
	//Табы
	let tabs = document.querySelectorAll(tabsSelector);
	let tabsContent = document.querySelectorAll(tabsContentSelector);
	let tabsParent = document.querySelector(tabsParentSelector);

	function hideRabContent() {
		tabsContent.forEach(item => {
			item.classList.add('hide');
			item.classList.remove('show', 'fade');
		});
		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});
	}

	function showTabContent(i = 0) {
		tabsContent[i].classList.add('show', 'fade');
		tabsContent[i].classList.remove('hide');
		tabs[i].classList.add(activeClass);
	}

	hideRabContent();
	showTabContent();

	tabsParent.addEventListener('click', (event) => {
		const target = event.target;

		if (target && target.classList.contains(tabsSelector.slice(1))) {
			tabs.forEach((item, i) => {
				if (target == item) {
					hideRabContent();
					showTabContent(i);
				}
			});
		}
	});
}

export default tabs;