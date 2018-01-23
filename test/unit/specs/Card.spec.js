import Vue from 'vue'
import Card from '@/components/Card'

describe('Card.vue', () => {
	it('matches the snapshot', (done) => {
		const Constructor = Vue.extend(Card)
		const vm = new Constructor({
			propsData: {
				card: {question: 'b', answer: 'c', result: ''},
				showAnswer: false,
				markScore: jest.fn()
			}
		}).$mount()
		Vue.nextTick()
			.then(() => {
				expect(vm.$el).toMatchSnapshot()
				done()
			})
			.catch(done)
	})
	it('has flipped class and matches snapshot', (done) => {
		const Constructor = Vue.extend(Card)
		const vm = new Constructor({
			propsData: {
				card: {question: 'b', answer: 'c', result: ''},
				showAnswer: true,
				markScore: jest.fn()
			}
		}).$mount()
		Vue.nextTick()
			.then(() => {
				expect(vm.$el.querySelectorAll('.notecard.flipped').length).toBe(1)
				expect(vm.$el).toMatchSnapshot()
				done()
			})
			.catch(done)
	})
})
