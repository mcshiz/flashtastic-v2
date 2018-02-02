<template>
	<div v-if="!loadingDecks">
		<div v-if="Object.keys(decks).length === 0">
			<div class="col-12">
				<p>Create a deck</p>
				<create-new-deck-button></create-new-deck-button>
			</div>
		</div>
		<div class="col">
			<ul class="list-group">
				<li v-for='(deck, key) in decks' :key='`deck-${key}`' class="list-group-item">
					<div class="row">
						<div class="col-6 col-sm-8 col-md-10 text-left justify-content-center align-self-center">
							<b>{{deck.name}}</b>
							<br>
							{{Object.keys(deck.cards).length}} Cards in Deck
							<br>
							<span v-if="deck.scores"
									v-bind:class="{
													'text-success': highScore(deck) / Object.keys(deck.cards).length === 1,
													'text-warning': highScore(deck) / Object.keys(deck.cards).length >= 0.5 && highScore(deck) / Object.keys(deck.cards).length < 1,
													'text-danger': highScore(deck) / Object.keys(deck.cards).length <= 0.5}">
								High Score: <b>{{highScore(deck)}} / {{Object.keys(deck.cards).length}}</b>
							</span>
							<span v-else>Not Completed</span>
						</div>
						<div class="col-4 col-sm-2 col-md-1 pull-right align-self-center">
							<button class="btn btn-info btn-sm mb-1 col-12" v-on:click="loadDeck(deck, key)">Study</button>
						</div>
						<div v-if="(deck.permissions === 'private' || deck.creator === user.id)" class="col-2 col-sm-2 col-md-1 align-self-center">
							<button class="btn btn-default btn-sm col-12" v-on:click="editDeck(key)">Edit</button>
							<span v-on:click="deleteDeck(key)" class="delete-deck"><i class="fa fa-trash"></i></span>
						</div>
					</div>
				</li>
			</ul>
		</div>
	</div>
	<div v-else>Loading...</div>
</template>
<script>
import CreateNewDeckButton from './CreateNewDeckButton'
import { mapState } from 'vuex'
export default {
	components: {
		'create-new-deck-button': CreateNewDeckButton
	},
	name: 'DeckList',
	props: ['decks'],

	methods: {
		editDeck: function(key, permissions) {
			this.$router.push({name: 'EditDeck', params: {key: key, permissions: permissions}})
		},
		loadDeck: function(deck, key) {
			this.$router.push({name: 'Quiz', params: {key: key, name: deck.name, permissions: deck.permissions}})
		},
		deleteDeck: function(key) {
			if(window.confirm('Are you sure you want to delete this deck?')) {
				this.$store.dispatch('DELETE_DECK_BY_KEY', key)
			}
		},
		// fix this shit
		highScore: function(deck) {
			let highScore = 0
			for(let key in deck.scores) {
				if(deck.scores[key].correct > highScore) {
					highScore = deck.scores[key].correct
				}
			}
			return highScore
		}
	},
	computed: {
		...mapState(['loadingDecks', 'user'])
	}
}
</script>

<style>
	.delete-deck {
		line-height: 48px;
	}
</style>
