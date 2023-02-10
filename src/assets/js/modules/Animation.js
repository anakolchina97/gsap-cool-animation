import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class Animation {
	constructor() {
		this.init();
		this.getUserScreen();
		window.addEventListener('resize', () => this.getUserScreen());
	}
	getUserScreen() {
		const userScreen = window.innerWidth;
		const elementUserScreen = document.querySelector('[data-user-screen]');
		elementUserScreen.innerHTML = userScreen;
	}
	init() {
		const locoScroll = new LocomotiveScroll({
			el: document.querySelector('.smooth-scroll'),
			smooth: true,
		});

		locoScroll.on('scroll', ScrollTrigger.update);

		ScrollTrigger.scrollerProxy('.smooth-scroll', {
			scrollTop(value) {
				return arguments.length
					? locoScroll.scrollTo(value, 0, 0)
					: locoScroll.scroll.instance.scroll.y;
			},
			getBoundingClientRect() {
				return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
			},
			pinType: document.querySelector('.smooth-scroll').style.transform ? 'transform' : 'fixed',
		});

		gsap.fromTo(
			'.hero-section',
			{ opacity: 1 },
			{
				opacity: 0,
				scrollTrigger: {
					trigger: '.hero-section',
					scroller: '.smooth-scroll',
					start: '+=30%',
					end: 'bottom',
					scrub: true,
				},
			}
		);

		const itemsL = gsap.utils.toArray('.gallery__left .gallery__item');
		itemsL.forEach(item => {
			gsap.fromTo(
				item,
				{
					x: -150,
					opacity: 0,
				},
				{
					opacity: 1,
					x: 0,
					scrollTrigger: {
						trigger: item,
						scroller: '.smooth-scroll',
						scrub: true,
					},
				}
			);
		});

		const itemsR = gsap.utils.toArray('.gallery__right .gallery__item');
		itemsR.forEach(item => {
			gsap.fromTo(
				item,
				{
					x: 100,
					opacity: 0,
				},
				{
					opacity: 1,
					x: 0,
					scrollTrigger: {
						trigger: item,
						scroller: '.smooth-scroll',
						scrub: true,
						start: 100,
					},
				}
			);
		});
	}
}

export default new Animation();
