import Vue from 'vue'
import Vuex from 'vuex'
import fire from './fire'
import * as Firebase from 'firebase'
Vue.use(Vuex)

class BlankDeck {
	constructor(state) {
		this.name = ''
		this.cards = {}
		this.key = ''
		this.permissions = 'private'
		this.creator = state.user.id
	}
}
export default new Vuex.Store({
	state: {
		workingDeck: {},
		authenticated: false,
		user: {},
		privateDecks: {},
		publicDecks: {},
		loadingDecks: true,
		errorMessage: '',
		successMessage: '',
		successTitle: ''
	},
	actions: {
		INITIALIZE: ({commit, dispatch}) => {
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
							scoreRef: `users/${result.uid}/scores`,
							storageRef: `users/${result.uid}/images`,
							id: result.uid
						}
					} else {
						user = {}
						authd = false
					}
					commit('SET_AUTHENTICATED', {authd, user})
					dispatch('LOAD_DECKS')
					resolve()
				})
			})
		},
		SIGN_IN: ({ commit, dispatch }) => {
			let provider = new Firebase.auth.GoogleAuthProvider()
			Firebase.auth().signInWithPopup(provider).then(() => {
				dispatch('INITIALIZE')
			}).catch(function(error) {
				commit('SET_ERROR_MESSAGE', error)
			})
		},
		SIGN_OUT: ({ commit }) => {
			Firebase.auth().signOut().then(function() {
				commit('SIGN_OUT_USER')
			}, function(error) {
				commit('SET_ERROR_MESSAGE', error)
			})
		},
		CREATE_BLANK_DECK: ({commit, state}) => {
			return new Promise((resolve, reject) => {
				let newDeck = new BlankDeck(state)
				commit('SET_WORKING_DECK', newDeck)
				resolve()
			})
		},
		LOAD_DECKS: ({ commit, state }) => {
			let publicDecks = {}
			let privateDecks = {}
			let decksRef = fire.database().ref('decks/').orderByKey().limitToLast(100)
			decksRef.on('value', snapshot => {
				let decks = snapshot.val()
				for(let key in decks) {
					if(decks[key].permissions === 'public') {
						publicDecks[key] = decks[key]
					} else if(decks[key].permissions === 'private' && decks[key].creator === state.user.id) {
						privateDecks[key] = decks[key]
					}
				}
				if(state.authenticated) {
					let scoresRef = fire.database().ref(`${state.user.scoreRef}`)
					scoresRef.on('value', snapshot => {
						for(let key in snapshot.val()) {
							if(decks[key]) {
								decks[key].score = snapshot.val()[key]
							}
						}
						commit('SET_LOADED_DECKS', {'private': privateDecks, 'public': publicDecks})
					})
				} else {
					commit('SET_LOADED_DECKS', {'private': privateDecks, 'public': publicDecks})
				}
			})
		},
		LOAD_DECK_BY_KEY: ({ commit, state }, {key, permissions}) => {
			return new Promise((resolve, reject) => {
				let decksRef = fire.database().ref(`decks/${key}`)
				decksRef.on('value', snapshot => {
					let deck = {
						...snapshot.val()
					}
					if(state.authenticated) {
						let scoresRef = fire.database().ref(`${state.user.scoreRef}/${key}`)
						scoresRef.on('value', snapshot => {
							deck.scores = snapshot.val()
							deck.key = snapshot.key
							commit('SET_WORKING_DECK', deck)
							resolve()
						})
					} else {
						commit('SET_WORKING_DECK', deck)
						resolve()
					}
				})
			})
		},
		UPDATE_DECK: ({commit, state}) => {
			return new Promise((resolve, reject) => {
				let decksRef = fire.database().ref(`decks/${state.workingDeck.key}`)
				decksRef.set(state.workingDeck).then(response => {
					resolve(response)
				})
			})
		},
		UPDATE_WORKING_DECK_IN_STATE: ({ commit }, deck) => {
			commit('SET_WORKING_DECK', deck)
		},
		DELETE_DECK_BY_KEY: ({ commit, state }, key) => {
			return new Promise((resolve, reject) => {
				// need to figure out a way to recursively delete files @ directory
				// Firebase.storage().ref().child(`${state.user.storageRef}/${key}`).delete() doesnt work
				// because we need to specify a ref all the way down to the exact filename
				fire.database().ref(`/decks/${key}`).remove().then(() => {
					fire.database().ref(`/decks/${key}`).remove().then(() => {
						resolve()
					})
				})
			})
		},
		SAVE_SCORE: ({ commit, state, dispatch }, score) => {
			let workingDeck = state.workingDeck.key
			let timestamp = new Date().getTime() * 1000
			fire.database().ref(`${state.user.scoreRef}/${workingDeck}/${timestamp}`).set({
				correct: score.correct,
				incorrect: score.incorrect
			})
				.catch(error => {
					commit('SET_ERROR_MESSAGE', error)
				})
		},
		UPLOAD_IMAGE: ({ commit, state }, {image, name}) => {
			let storageRef = Firebase.storage().ref()
			let filename = `${new Date().getTime() * 1000}_${name}`
			let newImageRef = storageRef.child(`/images/${filename}`)
			return new Promise((resolve, reject) => {
				newImageRef.put(image).then(snapshot => {
					if(snapshot.state === 'success') {
						resolve(snapshot)
					} else {
						reject(snapshot)
					}
				})
			})
		},
		CREATE_DECK: ({ commit, state }) => {
			return new Promise((resolve, reject) => {
				fire.database().ref('/decks').push(state.workingDeck)
					.then(() => {
						commit('SET_RESET')
						resolve()
					}).catch((error) => {
						commit('SET_ERROR_MESSAGE', error)
						reject(new Error(error))
					})
			})
		},
		SHOW_ERROR: ({ commit }, errorMessage) => {
			commit('SET_ERROR_MESSAGE', errorMessage)
		},
		RESET_ERROR: ({ commit }) => {
			commit('SET_ERROR_MESSAGE', '')
		},
		SHOW_SUCCESS: ({ commit }, {message, title}) => {
			commit('SET_SUCCESS_MESSAGE', {message, title})
		},
		RESET_SUCCESS: ({ commit }) => {
			commit('SET_SUCCESS_MESSAGE', {message: '', title: ''})
		}
	},
	mutations: {
		SET_SUCCESS_MESSAGE: (state, {message, title}) => {
			state.successMessage = message
			state.successTitle = title
		},
		SET_LOADED_DECKS: (state, decks) => {
			state.privateDecks = Object.assign({}, decks.private)
			state.publicDecks = Object.assign({}, decks.public)
			state.loadingDecks = false
		},
		SET_WORKING_DECK: (state, deck) => {
			state.workingDeck = Object.assign({}, state.workingDeck, deck)
		},
		SIGN_OUT_USER: (state) => {
			state.authenticated = false
			state.user = Object.assign({})
			state.myDecks = Object.assign({})
		},
		SET_AUTHENTICATED: (state, {authd, user}) => {
			state.authenticated = authd
			state.user = Object.assign({}, user)
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
		SET_RESET: (state) => {
			state.newDeck = Object.assign({}, new BlankDeck(state))
		}
	}
})
