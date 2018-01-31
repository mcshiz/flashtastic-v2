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
			key: '',
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
							scoreRef: `users/${result.uid}/scores`,
							storageRef: `users/${result.uid}/images`,
							id: result.uid
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
				commit('SIGN_OUT_USER')
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
						if(!decks[key].hasOwnProperty('questions')) {
							fire.database().ref(`${state.user.deckRef}/${key}`).remove()
						}
					}
					if(state.authenticated && decks) {
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
		LOAD_DECK_BY_KEY: ({ commit, state }, {key, deckPermissions}) => {
			return new Promise((resolve, reject) => {
				let decksRef
				if(deckPermissions === 'public') {
					decksRef = fire.database().ref(`decks/${key}`)
				} else if(deckPermissions === 'private') {
					decksRef = fire.database().ref(`${state.user.deckRef}/${key}`)
				} else {
					reject(new Error('Deck Permissions not specified'))
				}
				decksRef.on('value', snapshot => {
					let deck = {
						...snapshot.val()
					}
					if(state.authenticated) {
						let scoresRef = fire.database().ref(`${state.user.scoreRef}/${key}`)
						scoresRef.on('value', snapshot => {
							deck.score = snapshot.val()
							commit('SET_SELECTED_DECK', {deck: deck, key: key})
							resolve()
						})
					} else {
						commit('SET_SELECTED_DECK', {deck: deck, key: key})
						resolve()
					}
				})
			})
		},
		DELETE_DECK_BY_KEY: ({ commit, state }, key) => {
			return new Promise((resolve, reject) => {
				if(!key || typeof key === 'undefined' || key === null) {
					// stupid hack to delete decks without questions because firebase can't store an empty object
					fire.database().ref(`${state.user.deckRef}/`).on('value', snapshot => {
						let decks = snapshot.val()
						for(key in decks) {
							if(!decks[key].hasOwnProperty('questions')) {
								fire.database().ref(`${state.user.deckRef}/${key}`).remove()
							}
						}
						reject(new Error('No key provided'))
					})
					return
				}
				// need to figure out a way to recursively delete files @ directory
				// Firebase.storage().ref().child(`${state.user.storageRef}/${key}`).delete() doesnt work
				// because we need to specify a ref all the way down to the exact filename
				fire.database().ref(`${state.user.scoreRef}/${key}`).remove().then(() => {
					fire.database().ref(`${state.user.deckRef}/${key}`).remove().then(() => {
						resolve()
					})
				})
			})
		},
		MARK_CARD_RESULT: ({ commit }, {key, result}) => {
			commit('SET_CARD_RESULT', {key, result})
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
		ADD_NEW_QUESTION: ({ commit }, {question, questionType, answer, answerType}) => {
			commit('SET_NEW_QUESTION', {question, questionType, answer, answerType})
		},
		CREATE_NEW_DECK_PLACEHOLDER: ({ commit, state }, name) => {
			commit('SET_NEW_DECK_NAME', name)
			Firebase.database().ref().child(`${state.user.deckRef}`).push(state.newDeck).then(response => {
				commit('SET_NEW_DECK_KEY', response.key)
			})
		},
		UPLOAD_IMAGE: ({ commit, state }, file) => {
			let storageRef = Firebase.storage().ref()
			let newImageRef = storageRef.child(`${state.user.storageRef}/${state.newDeck.key}/${file.name}`)
			return new Promise((resolve, reject) => {
				newImageRef.put(file).then(snapshot => {
					if(snapshot.state === 'success') {
						resolve(snapshot)
					} else {
						reject(snapshot)
					}
				})
			})
		},
		CREATE_DECK: ({ commit, state, dispatch }) => {
			let ref
			let newDeck = Object.assign({}, state.newDeck, {questions: state.newDeck.questions})
			if(newDeck.deckPermissions === 'public') {
				ref = '/decks/'
			} else {
				ref = state.user.deckRef
			}
			fire.database().ref(ref).child(state.newDeck.key).set(newDeck)
				.then(() => {
					commit('SET_RESET')
				}).catch((error) => {
					commit('SET_ERROR_MESSAGE', error)
				})
		},
		CHANGE_DECK_PERMISSIONS: ({commit, state}, deck) => {
			let oldRef
			let newRef
			if(deck.deckPermissions === 'public') {
				oldRef = Firebase.database().ref().child(`${state.user.deckRef}`).child(deck.key)
				newRef = Firebase.database().ref('/decks').child(deck.key)
			} else if (deck.deckPermissions === 'private') {
				oldRef = Firebase.database().ref('/decks').child(deck.key)
				newRef = Firebase.database().ref(`${state.user.deckRef}`).child(deck.key)
			}
			return new Promise((resolve, reject) => {
				oldRef.once('value', function(snap) {
					let oldDeck = snap.val()
					oldDeck.deckPermissions = deck.deckPermissions
					oldDeck.creator = state.user.id
					newRef.set(oldDeck, function(error) {
						if(!error) {
							oldRef.remove()
							resolve()
						}
					}).then(response => {
						reject(new Error('Could not update permissions'))
						console.log('REZ', response)
					})
				})
				commit('SET_DECK_PERMISSIONS', deck.deckPermissions)
			})
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
		RESET_NEW_DECK: ({commit, state, dispatch}) => {
			return new Promise((resolve, reject) => {
				dispatch('DELETE_DECK_BY_KEY', state.newDeck.key).then(() => {
					commit('SET_RESET')
					resolve()
				}).catch(error => {
					reject(error)
				})
			})
		},
		DELETE_CARD: ({commit}, index) => {
			commit('SET_DELETE', index)
		},
		SAVE_EDITS_BY_KEY: ({ commit, state }, deck) => {
			let ref
			if(deck.deckPermissions === 'public') {
				ref = Firebase.database().ref('/decks').child(deck.key)
			} else if (deck.deckPermissions === 'private') {
				ref = Firebase.database().ref(`${state.user.deckRef}`).child(deck.key)
			}
			ref.set(deck)
		}
	},
	mutations: {
		SIGN_OUT_USER: (state) => {
			state.authenticated = false
			state.user = Object.assign({})
			state.myDecks = Object.assign({})
		},
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
		SET_NEW_DECK_KEY: (state, key) => {
			state.newDeck.key = key
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
		SET_NEW_QUESTION: (state, { question, questionType, answer, answerType }) => {
			state.newDeck.questions = state.newDeck.questions.concat({question: question, questionType: questionType, answer: answer, answerType: answerType, result: ''})
		},
		SET_MY_DECKS: (state, {decks}) => {
			state.myDecks = Object.assign({}, decks)
		},
		SET_PUBLIC_DECKS: (state, {decks}) => {
			state.publicDecks = Object.assign({}, decks)
		},
		SET_SELECTED_DECK: (state, { deck, key }) => {
			state.selectedDeck = Object.assign({}, deck, {key: key})
		},
		SET_CARD_RESULT: (state, { key, result }) => {
			for(let i in state.selectedDeck.questions) {
				if(i === key) {
					state.selectedDeck.questions[i].result = result
				}
			}
			state.selectedDeck.questions = Object.assign({}, state.selectedDeck.questions)
		},
		RESET_RESULTS: (state) => {
			state.selectedDeck.questions = Object.keys(state.selectedDeck.questions).map(key => {
				state.selectedDeck.questions[key].result = ''
				return state.selectedDeck.questions[key]
			})
		}
	},
	getters: {
	}
})
