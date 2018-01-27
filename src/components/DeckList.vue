<template>
	<div class="row" v-if="Object.keys(decks).length">
		<div class="col">
			<ul class="list-group">
				<li v-for='(deck, index) in decks' :key='`deck-${index}`' class="list-group-item">
					<div class="row">
						<span class="col-12 col-md-10 text-left justify-content-center align-self-center">
							<b>{{deck.name}}</b>
							<br>
							{{deck.questions.length}} Cards
						</span>
						<div class="col-auto col-md-1 pull-right" >
							<button class="btn btn-info" v-on:click="loadQuiz(index)">Study</button>
						</div>
						<div class="col-md-1">
							<span class="delete-deck" v-on:click="deleteDecK(index)"><i class="fa fa-trash"></i></span>
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
				console.log(this.$store.state.selectedDeck[0])
				const selectedDeckName = encodeURI(this.$store.state.selectedDeck.name.replace(/\s/g, '-').toLowerCase())
				this.$router.push({name: 'Quiz', params: {id: id, name: selectedDeckName}})
			})
		},
		deleteDecK: function(id) {
			this.$store.dispatch('DELETE_DECK_BY_ID', id).then((data) => {
				console.log(this.$store.state.myDecks)
			})
		}
	}
}
</script>

<style>
	.delete-deck {
		line-height: 48px;
	}
</style>
