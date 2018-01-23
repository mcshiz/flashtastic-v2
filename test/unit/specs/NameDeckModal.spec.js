import Vue from 'vue'
import NameDeckModal from '@/components/NameDeckModal'
import $ from 'jquery'
import 'bootstrap'
describe('NameDeckModal.vue', () => {
	let vm
	beforeEach(() => {
		const Constructor = Vue.extend(NameDeckModal)
		vm = new Constructor({
			propsData: {
				newDeckName: 'hello world',
				saveDeckName: jest.fn()
			}
		}).$mount()
	})
	it('copies deck name to local variable', (done) => {
		Vue.nextTick()
			.then(() => {
				expect(vm.deckName).toBe('hello world')
				done()
			})
			.catch(done)
	})
	it('renders the deck name', (done) => {
		Vue.nextTick()
			.then(() => {
				expect(vm.$el.querySelector('.new-deck-name').value).toBe('hello world')
				done()
			})
			.catch(done)
	})
	it('matches the snapshot', (done) => {
		Vue.nextTick()
			.then(() => {
				expect(vm.$el).toMatchSnapshot()
				done()
			})
			.catch(done)
	})
	it('calls save function if deckname is present', (done) => {
		Vue.nextTick()
			.then(() => {
				vm.$el.querySelector('.save').click()
				expect(vm.saveDeckName).toHaveBeenCalled()
				done()
			})
			.catch(done)
	})
	it('doesn\'t call save function if deckName is not present', (done) => {
		Vue.nextTick()
			.then(() => {
				vm.deckName = ''
				vm.$el.querySelector('.save').click()
				expect(vm.saveDeckName).not.toHaveBeenCalled()
				done()
			})
			.catch(done)
	})
	it('to open modal if newDeckName is not present', (done) => {
		const Constructor = Vue.extend(NameDeckModal)
		let newVm = new Constructor({
			propsData: {
				newDeckName: '',
				saveDeckName: jest.fn()
			},
			methods: {
				openModal: jest.fn()
			}
		}).$mount()
		Vue.nextTick()
			.then(() => {
				expect(newVm.openModal).toHaveBeenCalled()
				done()
			})
			.catch(done)
	})
	it('to not open modal if newDeckName is present', (done) => {
		const Constructor = Vue.extend(NameDeckModal)
		let newer = new Constructor({
			propsData: {
				newDeckName: 'asd',
				saveDeckName: jest.fn()
			}
		}).$mount()
		Vue.nextTick()
			.then(() => {
				jest.spyOn(newer, 'openModal')
				expect(newer.openModal).toHaveBeenCalledTimes(0)
				done()
			})
			.catch(done)
	})
})
