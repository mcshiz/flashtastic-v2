import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Quiz from '@/components/Quiz'
import CreateNew from '@/components/CreateNew'

Vue.use(Router)
export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/quiz/:id/:name',
			name: 'Quiz',
			component: Quiz,
			props: true
		},
		{
			path: '/create-new',
			name: 'CreateNew',
			component: CreateNew
		},
		{
			path: '*',
			redirect: {name: 'Home'}
		}
	]
})
