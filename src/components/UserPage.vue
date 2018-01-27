<template v-if="authenticated">
	<div class="content">
		<div class="row">
			<h2 class="text=center">
				{{user.displayName}}
			</h2>
		</div>
		<div class="row">
			<button v-if="authenticated" v-on:click="authenticate" class="btn btn-primary ripple">Sign Out</button>
			<button v-else v-on:click="signOut" class="btn btn-primary ripple">Sign In With Google</button>
		</div>
		<div class="row">
			<my-deck-list :decks="myDecks"></my-deck-list>
		</div>
	</div>
</template>

<script>
import DeckList from './DeckList'
import {mapState} from 'vuex'
export default {
	name: 'UserPage',
	computed: {
		...mapState(['myDecks', 'authenticated', 'user'])
	},
	components: {
		'my-deck-list': DeckList
	},
	methods: {
		authenticate: function() {
			this.$store.dispatch('SIGN_IN')
		},
		signOut: function() {
			this.$store.dispatch('SIGN_OUT')
		}
	}
}
</script>

<style scoped>

</style>