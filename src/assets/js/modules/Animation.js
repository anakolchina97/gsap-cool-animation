import LocomotiveScroll from 'locomotive-scroll';

class Animation {
	constructor() {
		this.init();
	}
	init() {
		new LocomotiveScroll({
			el: document.querySelector('[data-scroll-container]'),
			smooth: true,
		});
	}
}

export default new Animation();
