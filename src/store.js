import Vue from 'vue'
import Vuex from 'vuex'
import fire from './fire'
import * as Firebase from 'firebase'
Vue.use(Vuex)
export default new Vuex.Store({
	state: {
		authenticated: false,
		user: {},
		myDecks: {},
		publicDecks: {},
		selectedDeck: {},
		newDeck: {
			name: '',
			questions: [],
			deckPermissions: 'private'
		},
		errorMessage: ''
	},
	actions: {
		INITIALIZE: ({commit, dispatch, state}) => {
			return new Promise((resolve, reject) => {
				let user
				let authd
				Firebase.auth().onAuthStateChanged((result) => {
					if (result !== null && result.uid) {
						authd = true
						user = {
							displayName: result.displayName,
							email: result.email,
							photoURL: result.photoURL,
							deckRef: `users/${result.uid}/decks`,
							scoreRef: `users/${result.uid}/scores`
						}
					} else {
						user = {}
						authd = false
					}
					commit('SET_AUTHENTICATED', {authd, user})
					dispatch('LOAD_MY_DECKS')
					dispatch('LOAD_PUBLIC_DECKS')
					resolve()
				})
			})
		},
		SIGN_IN: ({ commit, dispatch }) => {
			let provider = new Firebase.auth.GoogleAuthProvider()
			Firebase.auth().signInWithPopup(provider).then(function(result) {
				dispatch('INITIALIZE')
			}).catch(function(error) {
				commit('SET_ERROR_MESSAGE', error)
			})
		},
		SIGN_OUT: ({ commit }) => {
			Firebase.auth().signOut().then(function() {
			}, function(error) {
				commit('SET_ERROR_MESSAGE', error)
			})
		},
		LOAD_MY_DECKS: ({ commit, state }) => {
			let decksRef
			if(state.authenticated) {
				decksRef = fire.database().ref(state.user.deckRef).orderByKey().limitToLast(100)
				decksRef.on('value', snapshot => {
					let decks = snapshot.val()
					for(let key in decks) {
						decks[key].deckPermissions = 'private'
						decks[key].key = key
					}
					if(state.authenticated) {
						let scoresRef = fire.database().ref(`${state.user.scoreRef}`)
						scoresRef.on('value', snapshot => {
							for(let key in snapshot.val()) {
								if(decks[key]) {
									decks[key].score = snapshot.val()[key]
								}
							}
							commit('SET_MY_DECKS', {decks: decks})
						})
					} else {
						commit('SET_MY_DECKS', {decks: decks})
					}
				})
			}
		},
		LOAD_PUBLIC_DECKS: ({ commit, state }) => {
			let decksRef = fire.database().ref('decks/').orderByKey().limitToLast(100)
			decksRef.on('value', snapshot => {
				let decks = snapshot.val()
				for(let key in decks) {
					decks[key].deckPermissions = 'public'
					decks[key].key = key
				}
				if(state.authenticated) {
					let scoresRef = fire.database().ref(`${state.user.scoreRef}`)
					scoresRef.on('value', snapshot => {
						for(let key in snapshot.val()) {
							if(decks[key]) {
								decks[key].score = snapshot.val()[key]
							}
						}
						commit('SET_PUBLIC_DECKS', {decks: decks})
					})
				} else {
					commit('SET_PUBLIC_DECKS', {decks: decks})
				}
			})
		},
		LOAD_DECK_BY_ID: ({ commit, state }, {id, deckPermissions}) => {
			let decksRef
			if(deckPermissions === 'private') {
				decksRef = fire.database().ref(`${state.user.deckRef}/${id}`)
			} else {
				decksRef = fire.database().ref(`decks/${id}`)
			}
			return new Promise((resolve, reject) => {
				decksRef.on('value', snapshot => {
					let id = snapshot.key
					let deck = {
						...snapshot.val(),
						key: id
					}
					if(state.authenticated) {
						let scoresRef = fire.database().ref(`${state.user.scoreRef}/${id}`)
						scoresRef.on('value', snapshot => {
							deck.score = snapshot.val()
							commit('SET_SELECTED_DECK', {deck: deck})
							resolve()
						})
					} else {
						commit('SET_SELECTED_DECK', {deck: deck})
						resolve()
					}
				})
			})
		},
		DELETE_DECK_BY_ID: ({ commit, state }, id) => {
			try {
				fire.database().ref(`${state.user.deckRef}/${id}`).remove()
				fire.database().ref(`${state.user.scoreRef}/${id}`).remove()
			} catch(e) {
				console.log(e)
			}
		},
		MARK_CARD_RESULT: ({ commit }, {id, result}) => {
			commit('SET_CARD_RESULT', {id, result})
		},
		SAVE_SCORE: ({ commit, state, dispatch }, score) => {
			let selectedDeckKey = state.selectedDeck.key
			fire.database().ref(`${state.user.scoreRef}/${selectedDeckKey}`).set({
				correct: score.correct,
				incorrect: score.incorrect
			})
				.catch(error => {
					commit('SET_ERROR_MESSAGE', error)
				})
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
		CREATE_DECK: ({ commit, state }) => {
			let ref
			let newDeck = Object.assign({}, state.newDeck)
			newDeck.id = Object.keys(state.myDecks).length
			if(newDeck.deckPermissions === 'public') {
				ref = '/decks/'
			} else {
				ref = state.user.deckRef
			}
			fire.database().ref(ref).push(newDeck)
				.then((response) => {
					console.log('save response', response)
				}).catch((error) => {
					commit('SET_ERROR_MESSAGE', error)
				})
		},
		CHANGE_DECK_PERMISSIONS: ({commit}, permissions) => {
			commit('SET_DECK_PERMISSIONS', permissions)
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
		SET_AUTHENTICATED: (state, {authd, user}) => {
			state.authenticated = authd
			state.user = Object.assign({}, user)
		},
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
		SET_DECK_PERMISSIONS: (state, permissions) => {
			state.newDeck = {
				...state.newDeck,
				deckPermissions: permissions
			}
		},
		SET_NEW_DECK: (state) => {
			let newDeck = Object.assign({}, state.newDeck)
			newDeck.id = state.myDecks.length
			fire.database().ref('decks/').push(newDeck)
		},
		SET_NEW_DECK_NAME: (state, name) => {
			state.newDeck.name = name
		},
		SET_RESET: (state) => {
			let reset = {
				name: '',
				questions: [],
				deckPermissions: 'private'
			}
			state.newDeck = Object.assign({}, reset)
		},
		SET_NEW_QUESTION: (state, { question, answer }) => {
			let len = state.newDeck.questions.length
			state.newDeck.questions = state.newDeck.questions.concat({id: len, question: question, answer: answer, result: ''})
		},
		SET_MY_DECKS: (state, {decks}) => {
			state.myDecks = Object.assign({}, decks)
		},
		SET_PUBLIC_DECKS: (state, {decks}) => {
			state.publicDecks = Object.assign({}, decks)
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
