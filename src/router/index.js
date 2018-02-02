import Vue from 'vue'
import Router from 'vue-router'
import Store from '../store'
import Home from '@/components/Home'
import Quiz from '@/components/Quiz'
import CreateNew from '@/components/CreateNew'
import UserPage from '@/components/UserPage'
import EditDeck from '@/components/EditDeck'

Vue.use(Router)
export default new Router({
	routes: [
		{
			path: '/edit/:key',
			name: 'EditDeck',
			component: EditDeck,
			props: true,
			beforeEnter(to, from, next) {
				if(!Store.state.authenticated) {
					Store.dispatch('SHOW_ERROR', 'You must login to edit decks')
					next({name: 'Home'})
				} else {
					if(!to.params.key) {
						next({name: 'Home'})
					}
					Store.dispatch('LOAD_DECK_BY_KEY', {key: to.params.key}).then(() => {
						next()
					}).catch(error => {
						console.log(error)
					})
				}
			}
		},
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		{
			path: '/quiz/:permissions/:key/:name',
			name: 'Quiz',
			component: Quiz,
			props: true,
			beforeEnter(to, from, next) {
				Store.dispatch('LOAD_DECK_BY_KEY', {key: to.params.key, permissions: to.params.permissions}).then(() => {
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
					Store.dispatch('CREATE_BLANK_DECK').then(() => {
						next()
					})
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
