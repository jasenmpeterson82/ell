// state
export const state = () => ({
	pageData: null,
	contentBlocks: null,
	pageTitle: null,
	pageSlug: null,
	pageDescription: null,
	pageKeywords: null
})

// mutations
export const mutations = {
	setPageData(state, payload) {
		state.pageData = payload
	},
	setContentBlocks(state, payload) {
		state.contentBlocks = payload
	},
	setPageTitle(state, payload) {
		state.pageTitle = payload
	},
	setPageDescription(state, payload) {
		state.pageDescription = payload
	},
	setPageKeywords(state, payload) {
		state.pageKeywords = payload
	},
	setPageSlug(state, payload) {
		state.pageSlug = payload
	}
}

// getters
export const getters = {
	getPageData(state) {
		return state.pageData
	},
	getPageTitle(state) {
		return state.pageTitle
	},
	getPageDescription(state) {
		return state.pageDescription
	},
	getPageKeywords(state) {
		return state.pageKeywords
	},
	getPageSlug(state) {
		return state.pageSlug
	}
}
