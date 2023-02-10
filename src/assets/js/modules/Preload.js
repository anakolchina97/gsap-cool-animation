class Preload {
	constructor() {
		this.init();
	}
	init() {
		document.addEventListener('DOMContentLoaded', () => {
			function preloadImages(arr) {
				arr.forEach((image, i) => {
					image = new Image();
					image.src = arr[i];
				});
			}

			preloadImages(['./assets/images/hero.png']);
		});
	}
}

export default new Preload();
