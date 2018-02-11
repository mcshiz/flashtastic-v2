<template>
		<div class="content">
			<name-deck-modal :name="workingDeck.name" :saveDeckName="saveDeckName"></name-deck-modal>
			<div class="row">
				<h1 class="col">Create New Deck</h1>
			</div>
			<deck-name :name="workingDeck.name"></deck-name>
			<div class="row">
				<deck-tagging :tags="workingDeck.tags" @update-tags="updateTags"></deck-tagging>
				<deck-permissions :permissions="workingDeck.permissions" :save="saveDeckPermissions"></deck-permissions>
			</div>
			<div class="row">
				<cards-list :cards="workingDeck.cards" :delete="deleteCard" :save="saveCardEdits"></cards-list>
			</div>
			<div class="row">
			<add-new-card></add-new-card>
		</div>
		<div class="row">
			<div class="col-12 justify-content-sm-between">
				<button class="btn ripple btn-danger" v-on:click="cancel">Cancel</button>
				<button class="btn ripple btn-primary" v-on:click="updateDeck">Save Deck</button>
			</div>
		</div>
	</div>
</template>

<script>
import CardsList from './CardsList'
import AddNewCard from './AddNewCard'
import NameDeckModal from './NameDeckModal'
import $ from 'jquery'
import { mapState } from 'vuex'
import NewQuestionAnswerFields from './NewQuestionAnswerFields'
import DeckName from './DeckName'
import DeckPermissions from './DeckPermissions'
import DeckTagging from './DeckTagging'

export default {
	name: 'NewCard',
	data() {
		return {
			isDirty: false
		}
	},
	computed: {
		...mapState(['workingDeck', 'authenticated'])
	},
	beforeRouteLeave(to, from, next) {
		if(this.isDirty) {
			if(confirm('Leaving will discard any changes')) {
				this.resetDeck()
				next()
			}
		} else {
			next()
		}
	},

	methods: {
		updateTags: function(tags) {
			let tmp = Object.assign({}, this.workingDeck, {tags: tags})
			this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
			this.isDirty = true
		},
		saveDeckPermissions: function(permissions) {
			let tmp = Object.assign({}, this.workingDeck, {permissions: permissions})
			this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
		},
		saveDeckName: function(name) {
			let tmp = Object.assign({}, this.workingDeck, {name: name})
			this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
		},
		deleteCard: function (index) {
			if(Object.keys(this.workingDeck.cards).length === 1) {
				this.$store.dispatch('SHOW_ERROR', 'You cannot delete all of the questions')
				return
			}
			let cards = Object.keys(this.workingDeck.cards).reduce((obj, key) => {
				if (key !== index) {
					obj[key] = this.workingDeck.cards[key]
				}
				return obj
			}, {})
			let tmp = Object.assign({}, this.workingDeck, {cards: cards})
			this.$store.dispatch('DELETE_CARD', index).then(() => {
				this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
			})
		},
		saveCardEdits: function(card, key) {
			let tmp = Object.assign({}, this.workingDeck, {cards: {
				...this.workingDeck.cards,
				[key]: card
			}})
			this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
		},
		cancel: function () {
			this.$router.push({name: 'Home'})
		},
		updateDeck: function () {
			if (!Object.keys(this.workingDeck.cards).length) {
				this.$store.dispatch('SHOW_ERROR', 'You must first add questions and answers')
				return
			}
			if(this.workingDeck.name === '') {
				$('#deckModal').modal({
					keyboard: false,
					backdrop: 'static'
				})
				return
			}
			this.isDirty = false
			this.$store.dispatch('UPDATE_DECK').then(() => {
				this.$store.dispatch('SHOW_SUCCESS', {message: 'Successfully Updated Deck', title: 'Success'})
			})
		}
	},
	components: {
		AddNewCard,
		DeckTagging,
		DeckPermissions,
		DeckName,
		NewQuestionAnswerFields,
		CardsList,
		NameDeckModal
	}

}
</script>
<style>
</style>
