import { mount, shallow } from '@vue/test-utils'
import Vue from 'vue/dist/vue.common.js'
import Vuex from 'vuex'
import store from '../../../src/store'
import DeckList from '@/components/DeckList'

Vue.use(Vuex)

describe('Items.vue', () => {
	it('Loads Initial Data', (done) => {
		store._actions.LOAD_MY_DECKS = function() {
			commit('SET_MY_DECKS', {decks: {
					"0" : {
						"id" : 0,
						"image" : "/static/planets.jpeg",
						"name" : "Planets of the apes",
						"questions" : [ {
							"answer" : "Mercury",
							"id" : 0,
							"question" : "Planet closest to the sun",
							"result" : ""
						}, {
							"answer" : "Neptune",
							"id" : 1,
							"question" : "Planet furthest away from the sun",
							"result" : ""
						}, {
							"answer" : "Jupiter",
							"id" : 2,
							"question" : "What is the largest planet",
							"result" : ""
						}, {
							"answer" : "Venus",
							"id" : 3,
							"question" : "What is the hottest planet",
							"result" : ""
						}, {
							"answer" : "Mercury",
							"id" : 4,
							"question" : "What is the smallest planet",
							"result" : ""
						} ]
					},
					"1" : {
						"id" : 1,
						"image" : "/static/chemistry.jpg",
						"name" : "Chemistry",
						"questions" : [ {
							"answer" : "Hydrogen",
							"id" : 0,
							"question" : "H",
							"result" : ""
						}, {
							"answer" : "Lead",
							"id" : 1,
							"question" : "Pb",
							"result" : ""
						}, {
							"answer" : "Oxygen",
							"id" : 2,
							"question" : "Element number 8",
							"result" : ""
						}, {
							"answer" : "Iron",
							"id" : 3,
							"question" : "Fe",
							"result" : ""
						}, {
							"answer" : "Not Lead",
							"id" : 4,
							"question" : "What is the lightest element",
							"result" : ""
						} ]
					},
					"2" : {
						"id" : 2,
						"image" : "/static/trees.jpg",
						"name" : "Trees",
						"questions" : [ {
							"answer" : "Giant Sequoia",
							"id" : 0,
							"question" : "What is the name of the largest tree species",
							"result" : ""
						}, {
							"answer" : "Bristlecone Pine   ",
							"id" : 1,
							"question" : "What is the name of the oldest tree species",
							"result" : ""
						}, {
							"answer" : "Dendrochronology",
							"id" : 2,
							"question" : "What is the name for dating and studying trees",
							"result" : ""
						}, {
							"answer" : "False",
							"id" : 3,
							"question" : "True of False: Trees die of old age",
							"result" : ""
						}, {
							"answer" : "In their Cones",
							"id" : 4,
							"question" : "How do pine tress spread seeds",
							"result" : ""
						} ]
					},
					"-L3Ms2pFdC0YqgQPoJ2E" : {
						"id" : 0,
						"name" : "firebase",
						"questions" : [ {
							"answer" : "blue",
							"id" : 0,
							"question" : "what color is the sky",
							"result" : ""
						}, {
							"answer" : "Round",
							"id" : 1,
							"question" : "What shape is the earth",
							"result" : ""
						} ]
					}
				}})
		}
		const vm = new Vue({
			template: '<div><test></test></div>',
			store: store,
			components: {
				'test': DeckList
			}
		}).$mount()
		Vue.nextTick()
			.then(() => {
				expect(Object.keys(store.state.decks).length).toBe(4)
				done()
			})
			.catch(done)
	})
	it('Renders a list', (done) => {
		const vm = new Vue({
			template: '<div><test></test></div>',
			store: store,
			components: {
				'test': DeckList
			}
		}).$mount()
		Vue.nextTick()
			.then(() => {
				expect(vm.$el.querySelectorAll('.list-group-item').length).toEqual(4)
				done()
			})
			.catch(done)
	})
	it('Matches its snapshot', (done) => {
		const vm = new Vue({
			template: '<div><test></test></div>',
			store: store,
			components: {
				'test': DeckList
			}
		}).$mount()
		Vue.nextTick()
			.then(() => {
				expect(vm.$el).toMatchSnapshot()
				done()
			})
			.catch(done)
	})
})
