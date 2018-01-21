import Vue from 'vue'
import Vuex from 'vuex'
import fire from './fire'

Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		decks: [],
		selectedDeck: {},
		newDeck: {
			name: '',
			questions: []
		},
		errorMessage: ''
	},
	actions: {
		LOAD_ALL_DECKS: ({ commit }) => {
			let decksRef = fire.database().ref('decks').orderByKey().limitToLast(100)
			decksRef.on('value', snapshot => {
				commit('SET_DECKS', { decks: snapshot.val() })
			})
		},
		LOAD_DECK_BY_ID: ({ commit }, id) => {
			let decksRef = fire.database().ref('decks/' + id)
			decksRef.on('value', snapshot => {
				commit('SET_SELECTED_DECK', {deck: snapshot.val()})
			})
		},
		MARK_CARD_RESULT: ({ commit }, {id, result}) => {
			commit('SET_CARD_RESULT', {id, result})
		},
		RESET_RESULTS: ({ commit }) => {
			commit('RESET_RESULTS')
		},
		ADD_NEW_QUESTION: ({ commit }, {question, answer}) => {
			commit('SET_NEW_QUESTION', {question, answer})
		},
		NAME_DECK: ({ commit }, name) => {
			commit('SET_NEW_DECK_NAME', name)
		},
		CREATE_DECK: ({ commit }) => {
			commit('SET_NEW_DECK')
		},
		SHOW_ERROR: ({ commit }, errorMessage) => {
			commit('SET_ERROR_MESSAGE', errorMessage)
		},
		RESET_ERROR: ({ commit }) => {
			commit('SET_ERROR_MESSAGE', '')
		},
		SAVE_CARD_EDITS: ({commit}, {index, card}) => {
			commit('SET_EDITS', {index, card})
		},
		RESET_NEW_DECK: ({commit}) => {
			commit('SET_RESET')
		},
		DELETE_CARD: ({commit}, index) => {
			commit('SET_DELETE', index)
		}
	},
	mutations: {
		SET_DELETE: (state, index) => {
			state.newDeck.questions = [
				...state.newDeck.questions.slice(0, index),
				...state.newDeck.questions.slice(index + 1)
			]
		},
		SET_EDITS: (state, { index, card }) => {
			function replaceAt(array, index, value) {
				const ret = array.slice(0)
				ret[index] = value
				return ret
			}
			state.newDeck.questions = replaceAt(state.newDeck.questions, index, card)
		},
		SET_ERROR_MESSAGE: (state, errorMessage) => {
			state.errorMessage = errorMessage
		},
		SET_NEW_DECK: (state) => {
			let newDeck = Object.assign({}, state.newDeck)
			newDeck.id = state.decks.length
			fire.database().ref('decks/').push(newDeck)
		},
		SET_NEW_DECK_NAME: (state, name) => {
			state.newDeck.name = name
		},
		SET_NEW_QUESTION: (state, { question, answer }) => {
			let len = state.newDeck.questions.length
			state.newDeck.questions = state.newDeck.questions.concat({id: len, question: question, answer: answer, result: ''})
		},
		SET_DECKS: (state, { decks }) => {
			state.decks = decks
		},
		SET_SELECTED_DECK: (state, { deck }) => {
			state.selectedDeck = Object.assign({}, deck)
		},
		SET_CARD_RESULT: (state, { id, result }) => {
			state.selectedDeck.questions = state.selectedDeck.questions.map(card => {
				if(card.id === id) {
					card.result = result
				}
				return card
			})
		},
		RESET_RESULTS: (state) => {
			state.selectedDeck.questions = state.selectedDeck.questions.map(card => {
				card.result = ''
				return card
			})
		}
	},
	getters: {
	}
})

export default store
