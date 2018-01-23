import Vue from 'vue'
import Score from '@/components/Score'

describe('Score.vue', () => {
	it('renders the score', (done) => {
		const Constructor = Vue.extend(Score)
		const vm = new Constructor({
			propsData: { score: {correct: 9, incorrect: 6} }
		}).$mount()
		Vue.nextTick()
			.then(() => {
				expect(vm.$el.querySelectorAll('.correct')[0].textContent).toBe('9')
				expect(vm.$el.querySelectorAll('.incorrect')[0].textContent).toBe('6')
				done()
			})
			.catch(done)
	})
	it('matches the snapshot', (done) => {
		const Constructor = Vue.extend(Score)
		const vm = new Constructor({
			propsData: { score: {correct: 9, incorrect: 6} }
		}).$mount()
		Vue.nextTick()
			.then(() => {
				expect(vm.$el).toMatchSnapshot()
				done()
			})
			.catch(done)
	})
})
