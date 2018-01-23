import { shallow } from '@vue/test-utils'
import Home from '@/components/Home'

describe('Home.vue', () => {
	it('is vue instance', () => {
		const wrapper = shallow(Home)
		expect(wrapper.isVueInstance()).toBe(true)
	})
})
