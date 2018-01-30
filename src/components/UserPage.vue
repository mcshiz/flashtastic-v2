<template v-if="authenticated">
	<div class="content">
		<div class="row">
			<div class="col-8 col-sm-9 text-left">
				<h2 class="text=center">
					{{user.displayName}}
				</h2>
			</div>
			<div class=" col-2 col-sm-3 text-center">
				<auth-buttons />
			</div>
		</div>
		<div class="row">
			<div class="col-12">
				<my-deck-list v-if="authenticated" :decks="myDecks"></my-deck-list>
			</div>
		</div>
	</div>
</template>

<script>
import DeckList from './DeckList'
import AuthButtons from './AuthButtons'
import {mapState} from 'vuex'
export default {
	name: 'UserPage',
	computed: {
		...mapState(['myDecks', 'authenticated', 'user'])
	},
	components: {
		'my-deck-list': DeckList,
		'auth-buttons': AuthButtons
	}
}
</script>

<style scoped>

</style>
