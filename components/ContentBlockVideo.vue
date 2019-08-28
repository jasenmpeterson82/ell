<template>
	<section class="content__block content__block-video">
		<div :id="videoID" class="plyr__video-embed">
			<iframe
				:src="content.videoAsset"
				allowfullscreen
				allowtransparency
			></iframe>
		</div>
	</section>
</template>

<script>
import Plyr from 'plyr'
export default {
	name: 'videoBlock',
	props: {
		content: {
			type: Object,
			default: null
		}
	},
	data() {
		return {
			videoID: this.content.id,
			so: null
		}
	},
	mounted() {
		this.initPlyr()
		const body = document.getElementsByTagName('body')
		this.so = this.$ScrollOut({
			once: true,
			targets: '.content__block-video',
			onShown: element => {
				// TweenMax.to(element, 0.5, {
				// 	opacity: 1,
				// 	delay: body[0].classList.contains('dom-loaded') ? 2 : 0.3
				// })
			}
		})
	},
	methods: {
		initPlyr: function() {
			if (this.videoID) {
				// prettier-ignore
				const controls = `
				<button class="ell__custom-play-button" data-id="${this.videoID}">
					<svg id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 266.6 266.6"><style>.st0{fill:#231f20}</style><ellipse class="st0" cx="133.5" cy="133.3" rx="126.8" ry="126.5"/><defs><path id="SVGID_1_" d="M104.4 85.5h120.2v136.8H104.4z"/></defs><clipPath id="SVGID_2_"><use xlink:href="#SVGID_1_" overflow="visible"/></clipPath><g clip-path="url(#SVGID_2_)"><path d="M104.4 85.5l120.2 68.4-120.2 68.4V85.5z" fill="#181616"/></g><path d="M93.8 65.8l120 68.5-120 68.5v-137z" fill="#f2ecdc"/><path class="st0" d="M122.6 143c2.1 0 3.6-1.5 3.6-3.6v-9.6c0-2.1-1.4-3.6-3.6-3.6s-3.6 1.6-3.6 3.6h.5c0-1.2 1-2.9 2.3-2.9.2 0 1 0 1 1v13.4c0 1.1-.8 1-1 1-1.3 0-2.3-1.7-2.3-2.9h-.5c0 2 1.5 3.6 3.6 3.6zm-9.2 7.5h7.5v-.5h-2.4v-23.6h-5.1v.5h1.8V150h-1.8v.5zm15.3-7.7h6.9v-.5h-1.8V118h-5.1v.5h1.8v23.8h-1.8v.5zm19.4 0h1.8v-.5h-1.8v-11.6c0-2.8-1.9-4.4-4.5-4.4-.9 0-1.8.3-2.5.7l.3.4c.5-.3 1.1-.5 1.9-.5.7 0 1.3.2 1.3 1.1v11.1c0 2.4 1.1 3.7 3.5 3.7zm-7.3-11c1.1 0 1.9-.9 1.9-2s-.9-1.9-1.9-1.9-1.9.9-1.9 1.9c0 1.2.9 2 1.9 2zm-.3 11.2c2 0 3.6-1.6 3.6-3.6h-.5c0 1.8-1.2 2.8-2.2 2.8-.6 0-1-.4-1-1.3v-5.4c0-.9.3-1.3.9-1.3.9 0 2.3 1.2 2.3 2.8h.5c0-2-1.7-3.6-3.6-3.6-2 0-3.6 1.3-3.6 3.9v1.8c0 2.6 1.6 3.9 3.6 3.9zm11.4 7.7c.8 0 1.5-.4 1.9-1.4l3.9-11.2-3.8-11.6h-5v.5h1.8l5 15.4-2 5.8c-.3-.7-1.1-1.2-1.8-1.2-1.1 0-2 .9-2 1.9.1.9.9 1.8 2 1.8zm6.1-13.5l3.8-10.3h1.8v-.5h-4v.5h1.8l-3.6 9.6.2.7z"/></svg>
				</button>
				<div class="plyr__controls">
					<button type="button" class="plyr__control" aria-label="Play, {title}" data-plyr="play">
						<svg class="icon--pressed" role="presentation"><use xlink:href="#plyr-pause"></use></svg>
						<svg class="icon--not-pressed" role="presentation"><use xlink:href="#plyr-play"></use></svg>
						<span class="label--pressed plyr__tooltip" role="tooltip">Pause</span>
						<span class="label--not-pressed plyr__tooltip" role="tooltip">Play</span>
					</button>
					<div class="plyr__progress">
						<input data-plyr="seek" type="range" min="0" max="100" step="0.01" value="0" aria-label="Seek">
						<progress class="plyr__progress__buffer" min="0" max="100" value="0">% buffered</progress>
						<span role="tooltip" class="plyr__tooltip">00:00</span>
					</div>
				</div>
				`

				const player = new Plyr(`#${this.videoID}`, { controls })
				let customPlayButton = null
				window.player = player

				player.on('ready', event => {
					customPlayButton = document.querySelector(
						`.ell__custom-play-button[data-id="${this.videoID}"]`
					)
					if (customPlayButton) {
						customPlayButton.addEventListener('click', function() {
							player.play()
							this.classList.add('playing')
						})
					}
				})

				player.on('play', event => {
					customPlayButton.classList.add('playing')
				})

				player.on('pause', event => {
					customPlayButton.classList.remove('playing')
				})
			}
		}
	}
}
</script>
