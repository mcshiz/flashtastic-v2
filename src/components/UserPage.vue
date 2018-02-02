<template v-if="authenticated">
	<div class="content">
		<div class="row">
			<div class="col-8 col-sm-9 text-left">
				<h2 class="text=center">
					{{user.displayName}}
				</h2>
			</div>
		</div>
		<div class="row mb-5">
			<div class="col-12">
				<my-deck-list v-if="authenticated" :decks="privateDecks"></my-deck-list>
			</div>
		</div>
		<div class="row">
			<div class="col-3"></div>
			<div class="col-6 text-center">
				<auth-buttons></auth-buttons>
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
		...mapState(['privateDecks', 'authenticated', 'user'])
	},
	components: {
		'my-deck-list': DeckList,
		'auth-buttons': AuthButtons
	}
}
</script>

<style scoped>

</style>
