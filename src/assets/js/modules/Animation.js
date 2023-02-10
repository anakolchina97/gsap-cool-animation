import LocomotiveScroll from 'locomotive-scroll';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

class Animation {
	constructor() {
		this.init();
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
					markers: true,
					start: 'center',
					end: 'bottom',
					scrub: true,
				},
			}
		);
	}
}

export default new Animation();
