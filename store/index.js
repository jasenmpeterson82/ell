// state
export const state = () => ({
	siteData: null,
	siteMenu: null,
	siteContent: null,
	projects: null,
	GA: null,
	menuOpen: false,
})

// mutations
export const mutations = {
	setSiteData(state, payload) {
		state.siteData = payload
	},
	setSiteMenu(state, payload) {
		state.siteMenu = payload
	},
	setSiteContent(state, payload) {
		state.siteContent = payload
	},
	setProjects(state, payload) {
		state.projects = payload
	},
	setPageMeta(state, payload) {
		state.pageMeta = payload
	},
	setGA(state, payload) {
		state.GA = payload
	},
	setMenuState(state, payload) {
		state.menuOpen = payload
	}
}

// actions
export const actions = {
	async nuxtServerInit({ commit }) {
		const getSiteData = () => {
			return this.$axios.$get('/global.json')
		}

		const getSiteContent = () => {
			return this.$axios.$get('/content.json')
		}

		const getSiteMenu = () => {
			return this.$axios.$get('/menu.json')
		}

		const getProjects = () => {
			return this.$axios.$get('/work.json')
		}

		const [
			siteData,
			siteContent,
			siteMenu,
			siteProjects
		] = await Promise.all([
			getSiteData(),
			getSiteContent(),
			getSiteMenu(),
			getProjects()
		])
		// mutation function name, payload
		commit('setSiteData', siteData)
		commit('setSiteMenu', siteMenu)
		commit('setSiteContent', siteContent)
		commit('setProjects', siteProjects)
		commit('setGA', siteData.data[0].extraMeta)
	},
	pageMeta({ commit }, payload) {
		commit('setPageMeta', payload)
	},
	menuState({ commit }, payload) {
		commit('setMenuState', payload)
	}
}

// getters
export const getters = {
	getSiteMenu(state) {
		return state.siteMenu
	},
	getSiteData(state) {
		return state.siteData
	},
	getSiteProjects(state) {
		return state.projects
	},
	getGA(state) {
		return state.GA
	},
	getMenuState(state) {
		return state.menuOpen
	}
}
