import { mount, shallow } from '@vue/test-utils'
import Vuex from 'vuex'
import Vue from 'vue/dist/vue.common.js'
import store from '../../../src/store'
import DeckList from '@/components/DeckList'

Vue.use(Vuex)

describe('Items.vue', () => {
	it('Loads Initial Data', (done) => {
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
