<template>
	<div class="row" v-if="Object.keys(decks).length">
		<div class="col">
			<ul class="list-group">
				<li v-for='(deck, index) in decks' :key='`deck-${index}`' class="list-group-item">
					<div class="row">
						<span class="col-6 col-sm-8 col-md-10 text-left justify-content-center align-self-center">
							<b>{{deck.name}}</b>
							<br>
							{{deck.questions.length}} Cards
						</span>
						<div class="col-4 col-sm-2 col-md-1 pull-right" >
							<button class="btn btn-info" v-on:click="loadQuiz(index)">Study</button>
						</div>
						<div class="col-2 col-sm-2 col-md-1">
							<span class="delete-deck" v-on:click="deleteDeck(index)"><i class="fa fa-trash"></i></span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div v-else>Loading...</div>
</template>
<script>
export default {
	name: 'DeckList',
	props: ['decks'],
	methods: {
		loadQuiz: function(id) {
			this.$store.dispatch('LOAD_DECK_BY_ID', id).then((data) => {
				const selectedDeckName = encodeURI(this.$store.state.selectedDeck.name.replace(/\s/g, '-').toLowerCase())
				this.$router.push({name: 'Quiz', params: {id: id, name: selectedDeckName}})
			})
		},
		deleteDeck: function(id) {
			if(window.confirm('Are you sure you want to delete this deck?')) {
				this.$store.dispatch('DELETE_DECK_BY_ID', id)
			}
		}
	}
}
</script>

<style>
	.delete-deck {
		line-height: 48px;
	}
</style>
