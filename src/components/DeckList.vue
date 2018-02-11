<template>
	<div v-if="!loadingDecks">
		<div v-if="Object.keys(decks).length === 0">
			<div class="col-12">
				<p>Create a deck</p>
				<create-new-deck-button></create-new-deck-button>
			</div>
		</div>
		<ul class="list-group">
			<li v-for='(deck, key) in filteredList' :key='`deck-${key}`' class="list-group-item">
				<div class="row">
					<div class="col-6 col-sm-8 col-md-10 text-left justify-content-center align-self-center">
						<b>{{deck.name}}</b><span v-for="(tag, index) in deck.tags.split(',').filter((val) => {if(val !== '') return val})" :key="index" class="tag ml-1 mr-1 d-none d-sm-inline">{{tag}}</span>
						<br>
						{{Object.keys(deck.cards).length}} Cards in Deck
						<br>
						<span v-if="deck.scores && authenticated"
								v-bind:class="{
												'text-success': highScore(deck) / Object.keys(deck.cards).length === 1,
												'text-warning': highScore(deck) / Object.keys(deck.cards).length >= 0.5 && highScore(deck) / Object.keys(deck.cards).length < 1,
												'text-danger': highScore(deck) / Object.keys(deck.cards).length <= 0.5}">
							High Score: <b>{{highScore(deck)}} / {{Object.keys(deck.cards).length}}</b>
						</span>
						<span v-else-if="authenticated && !decks.scores">Not Completed</span>

					</div>
					<div class="col-4 col-sm-2 col-md-1 pull-right align-self-center">
						<button class="btn btn-info btn-sm mb-1" v-on:click="loadDeck(deck, key)">Study</button>
					</div>
					<div v-if="(deck.creator === user.id)" class="col-2 col-sm-2 col-md-1 align-self-center">
						<span v-on:click="editDeck(key)"><i class="fa fa-pencil"></i></span>
						<span v-on:click="deleteDeck(key)" class="delete-deck"><i class="fa fa-trash"></i></span>
					</div>
				</div>
			</li>
			<div v-if="Object.keys(filteredList).length === 0"> Nothing Found</div>
		</ul>
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
	props: ['decks', 'filter'],
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
		// fix this
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
		...mapState(['loadingDecks', 'user', 'authenticated']),
		filteredList() {
			let filteredList = {}
			Object.keys(this.decks).forEach((key) => {
				if (this.decks[key].tags.toLowerCase().includes(this.filter.toLowerCase())) {
					filteredList[key] = this.decks[key]
				}
			})
			return filteredList
		}
	}
}
</script>

<style>
	.delete-deck {
		line-height: 48px;
	}
	.tag {
		border: 1px solid lightgrey;
		border-radius: 5px;
		padding: 2px 5px 0 5px;
		text-transform: capitalize;
		cursor: pointer;
		font-size: 0.8em;
	}
</style>
