import Vue from 'vue'
import EditCardModal from '@/components/EditCardModal'

describe('EditCardModal.vue', () => {
	let vm
	beforeEach(() => {
		const Constructor = Vue.extend(EditCardModal)
		vm = new Constructor({
			propsData: {
				card: {question: 'Brian is the best', answer: 'duh', result: ''},
				index: 1,
				save: jest.fn()
			}
		}).$mount()
	})
	it('renders the question and answer', (done) => {
		Vue.nextTick()
			.then(() => {
				expect(vm.$el.querySelector('#editQuestion').value).toBe('Brian is the best')
				expect(vm.$el.querySelector('#editAnswer').value).toBe('duh')
				done()
			})
			.catch(done)
	})
	it('makes a copy of the card object', (done) => {
		Vue.nextTick()
			.then(() => {
				expect(vm.editingCard).toMatchObject({question: 'Brian is the best', answer: 'duh', result: ''})
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
	it('calls save function', (done) => {
		Vue.nextTick()
			.then(() => {
				vm.$el.querySelector('.save').click()
				expect(vm.save).toHaveBeenCalled()
				done()
			})
			.catch(done)
	})
})
