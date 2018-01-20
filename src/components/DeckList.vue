<template>


	<div class="row">
		<div class="col">
			<ul class="list-group">
				<li v-for='deck in decks' :key='`deck-${deck.id}`' class="list-group-item">
					<div class="row">
						<span class="col-12 col-md-10 text-left justify-content-center align-self-center">
							<b>{{deck.name}}</b>
							<br>
							{{deck.questions.length}} Cards
						</span>
						<div class="col-md-1"></div>
						<div class="col-auto col-md-1 pull-right" >
							<button class="btn btn-primary" v-on:click="loadQuiz(deck.id)">Study</button>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
export default {
	name: 'DeckList',
	computed: {
		...mapState(['decks'])
	},
	methods: {
		urlEncodeName: (name) => {
			return name.replace(/\s/g, '-').toLowerCase()
		},
		loadQuiz: function(id) {
			this.$store.dispatch('LOAD_DECK_BY_ID', id).then((data) => {
				const selectedDeckName = this.urlEncodeName(this.$store.state.selectedDeck.name)
				this.$router.push(`/quiz/${id}/${selectedDeckName}`)
			})
		}
	},
	mounted: function () {
		this.$store.dispatch('LOAD_ALL_DECKS')
	},
	data() {
		return {
			msg: 'Welcome to Your Vue.js App',
			props: ['id', 'name'],
			image: '../assets/planets.jpeg'
		}
	}
}
</script>

<style>
.deck-list-item {
	max-width: 320px;
}
	.deck-image {
		width:290px !important;
		height:182px !important;
		display: block;
		overflow: hidden;
	}
</style>
