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
						<div class="col-md-1"></div>
						<div class="col-auto col-md-1 pull-right" >
							<button class="btn btn-info" v-on:click="loadQuiz(index)">Study</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div v-else>Loading...</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	name: 'DeckList',
	computed: {
		...mapState(['decks'])
	},
	methods: {
		loadQuiz: function(id) {
			this.$store.dispatch('LOAD_DECK_BY_ID', id).then((data) => {
				const selectedDeckName = encodeURI(this.$store.state.selectedDeck.name.replace(/\s/g, '-').toLowerCase())
				this.$router.push({name: 'Quiz', params: {id: id, name: selectedDeckName}})
			})
		}
	},
	mounted: function () {
		if(!this.$store.state.decks.length) {
			this.$store.dispatch('LOAD_ALL_DECKS')
		}
	},
	data() {
		return {
			props: ['id', 'name']
		}
	}
}
</script>

<style>

</style>
