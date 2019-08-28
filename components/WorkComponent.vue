<template>
	<main>
		<header class="page-work__header">
			<h1>selected<span class="text-mustard">work</span></h1>
		</header>
		<section class="work-component__navigation">
			<nav>
				<button
					v-for="button in workFilters"
					:key="button.label"
					:class="[currFilter === button.projectType ? 'active' : '']"
					:data-id="button.projectType"
					v-on:click="filterProjects"
				>
					{{ button.label }}
				</button>
			</nav>
		</section>
		<section class="projects-section">
			<figure
				v-for="project in projects"
				:key="project.slug"
				:class="[
					currFilter === 'all' || currFilter === project.typeOfWork
						? 'opacity-100'
						: 'opacity-25',
					'project'
				]"
			>
				<nuxt-link
					:to="{
						name: 'work-project',
						params: { project: project.slug, linkType: 'button' }
					}"
				>
					<div class="tint"></div>
					<figure class="background-image">
						<img
							:src="
								project.projectThumbnail.length &&
									project.projectThumbnail[0].url !== null
									? project.projectThumbnail[0].url
									: ''
							"
							:alt="
								project.projectThumbnail.length &&
									project.projectThumbnail[0].alt !== null
									? project.projectThumbnail[0].alt
									: ''
							"
						/>
					</figure>
					<figcaption>
						<div>
							<h2>{{ project.projectName }}</h2>
							<h1>{{ project.clientName }}</h1>
						</div>
						<figure class="project-arrow">
							<!-- prettier-ignore -->
							<svg
								width="61"
								height="61"
								viewBox="0 0 61 61"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<circle
									cx="30.5"
									cy="30.5"
									r="30.5"
									fill="#DE5640"
								/>
								<path
									d="M26.23 39.45C26.57 39.81 27.14 39.81 27.5 39.45C27.84 39.11 27.84 38.54 27.5 38.19L21.06 31.75H42.3C42.8 31.75 43.19 31.36 43.19 30.86C43.19 30.37 42.8 29.96 42.3 29.96H21.06L27.5 23.54C27.84 23.18 27.84 22.61 27.5 22.27C27.14 21.91 26.57 21.91 26.23 22.27L18.27 30.23C17.91 30.57 17.91 31.14 18.27 31.48L26.23 39.45Z"
									fill="white" />
							</svg>
						</figure>
					</figcaption>
				</nuxt-link>
				<h3>{{ project.workCategory }}</h3>
			</figure>
		</section>
	</main>
</template>

<script>
export default {
	name: 'WorkComponent',
	props: {
		projects: {
			type: Array,
			default: null
		},
		filter: {
			type: String,
			default: null
		}
	},
	data() {
		return {
			currFilter: this.filter !== null ? this.filter : 'all'
		}
	},
	computed: {
		workFilters: function() {
			let buttons = []
			for (let item of this.projects) {
				buttons.push({
					label: item.workCategory,
					projectType: item.typeOfWork
				})
			}
			// https://dev.to/vuevixens/removing-duplicates-in-an-array-of-objects-in-js-with-sets-3fep
			const uniqueButtons = Array.from(
				Array.from(new Set(buttons.map(a => a.projectType))).map(
					projectType => {
						return buttons.find(a => a.projectType === projectType)
					}
				)
			)
			// remove null objects from array
			const filterItems = uniqueButtons.filter(
				value => value.label !== null
			)
			filterItems.unshift({
				label: 'All',
				projectType: 'all'
			})
			return filterItems
		}
	},
	methods: {
		filterProjects: function(e) {
			let filterType = e.target.dataset.id
			this.currFilter = filterType
		}
	}
}
</script>
