import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)
const store = new Vuex.Store({
	state: {
		decks: [],
		selectedDeck: {},
		newQuestions: [],
		newDeckName: '',
		errorMessage: ''
	},
	actions: {
		LOAD_ALL_DECKS: ({ commit }) => {
			commit('SET_DECKS', { decks: decks })
		},
		LOAD_DECK_BY_ID: ({ commit }, id) => {
			commit('SET_SELECTED_DECK', {id})
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
		}
	},
	mutations: {
		SET_ERROR_MESSAGE: (state, errorMessage) => {
			state.errorMessage = errorMessage
		},
		SET_NEW_DECK: (state) => {
			let newDeck = {
				'id': state.decks.length,
				'name': state.newDeckName,
				'image': '/static/notecards.jpeg',
				'questions': state.newQuestions
			}
			state.decks = state.decks.concat(newDeck)
		},
		SET_NEW_DECK_NAME: (state, name) => {
			state.newDeckName = name
		},
		SET_NEW_QUESTION: (state, { question, answer }) => {
			let lenn = state.newQuestions.length
			state.newQuestions = state.newQuestions.concat({id: lenn + 1, question: question, answer: answer, result: ''})
		},
		SET_DECKS: (state, { decks }) => {
			state.decks = decks
		},
		SET_SELECTED_DECK: (state, { id }) => {
			state.selectedDeck = decks[id]
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
		selectedDeckLength: state => {
			return state.selectedDeck.questions.length
		},
		calculatedScore: state => {
			let correct = 0
			let incorrect = 0
			state.selectedDeck.questions.forEach(card => {
				card.result === 'correct' && correct++
				card.result === 'incorrect' && incorrect++
			})
			return {'correct': correct, 'incorrect': incorrect}
		}
	}
})
// mock database
const decks = [
	{
		'id': 0,
		'name': 'Planets of the apes',
		'image': '/static/planets.jpeg',
		'questions': [
			{'id': 0, 'question': 'Planet closest to the sun', 'answer': 'Mercury', 'result': ''},
			{'id': 1, 'question': 'Planet furthest away from the sun', 'answer': 'Neptune', 'result': ''},
			{'id': 2, 'question': 'What is the largest planet', 'answer': 'Jupiter', 'result': ''},
			{'id': 3, 'question': 'What is the hottest planet', 'answer': 'Venus', 'result': ''},
			{'id': 4, 'question': 'What is the smallest planet', 'answer': 'Mercury', 'result': ''}
		]
	},
	{
		'id': 1,
		'name': 'Chemistry',
		'image': '/static/chemistry.jpg',
		'questions': [
			{'id': 0, 'question': 'H', 'answer': 'Hydrogen', 'result': ''},
			{'id': 1, 'question': 'Pb', 'answer': 'Lead', 'result': ''},
			{'id': 2, 'question': 'Element number 8', 'answer': 'Oxygen', 'result': ''},
			{'id': 3, 'question': 'Fe', 'answer': 'Iron', 'result': ''},
			{'id': 4, 'question': 'What is the lightest element', 'answer': 'Not Lead', 'result': ''}
		]
	},
	{
		'id': 2,
		'name': 'Trees',
		'image': '/static/trees.jpg',
		'questions': [
			{'id': 0, 'question': 'What is the name of the largest tree species', 'answer': 'Giant Sequoia', 'result': ''},
			{'id': 1, 'question': 'What is the name of the oldest tree species', 'answer': 'Bristlecone Pine   ', 'result': ''},
			{'id': 2, 'question': 'What is the name for dating and studying trees', 'answer': 'Dendrochronology', 'result': ''},
			{'id': 3, 'question': 'True of False: Trees die of old age', 'answer': 'False', 'result': ''},
			{'id': 4, 'question': 'How do pine tress spread seeds', 'answer': 'In their Cones', 'result': ''}
		]
	}
]

export default store
