import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import Home from '@/components/Home'
import Quiz from '@/components/Quiz'
import CreateNew from '@/components/CreateNew'
import UserPage from '@/components/UserPage'

Vue.use(Router)
export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/quiz/:deckPermissions/:key/:name',
			name: 'Quiz',
			component: Quiz,
			props: true,
			beforeEnter(to, from, next) {
				Store.dispatch('LOAD_DECK_BY_ID', {key: to.params.key, deckPermissions: to.params.deckPermissions}).then(() => {
					next()
				})
			}
		},
		{
			path: '/create-new',
			name: 'CreateNew',
			component: CreateNew,
			beforeEnter(to, from, next) {
				if(!Store.state.authenticated) {
					Store.dispatch('SHOW_ERROR', 'You must login to create decks')
					next({name: 'Home'})
				} else {
					next()
				}
			}
		},
		{
			path: '/profile',
			name: 'UserPage',
			component: UserPage
		},
		{
			path: '*',
			redirect: {name: 'Home'}
		}
	]
})
