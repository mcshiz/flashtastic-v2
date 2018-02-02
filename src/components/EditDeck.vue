<template>
	<div class="content">
		<nameDeckModal :name="workingDeck.name" :saveDeckName="saveDeckName"></nameDeckModal>
		<div class="row">
			<h1 class="col">Edit Deck</h1>
		</div>
		<deck-name :name="workingDeck.name"></deck-name>
		<div class="row">
			<deck-tagging></deck-tagging>
			<deck-permissions :permissions="workingDeck.permissions" :save="saveDeckPermissions"></deck-permissions>
		</div>
		<div class="row">
			<newCardsList :cards="workingDeck.cards" :delete="deleteCard" :save="saveCardEdits"></newCardsList>
		</div>
		<div class="row new-question-container">
			<div class="col-12">
				<h4 class="text-left">Add a new question</h4>
			</div>
			<div class="col-12 col-sm-5 text-center mb-4">
				<new-question-answer-fields :field="'question'" :card="newCard" @update-value="update"></new-question-answer-fields>
			</div>
			<div class="col-12 col-sm-5 text-center mb-4">
				<new-question-answer-fields :field="'answer'" :card="newCard" @update-value="update"></new-question-answer-fields>
			</div>
			<div class="col-12 col-sm-2 mb-4">
				<button class="btn ripple btn-success" v-on:click="addCard">Add</button>
				<button class="btn ripple btn-secondary" v-on:click="clearCard">Clear</button>
			</div>
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
import NewCardsList from './NewCardsList'
import NameDeckModal from './NameDeckModal'
import $ from 'jquery'
import {mapState} from 'vuex'
import NewQuestionAnswerFields from './NewQuestionAnswerFields'
import ImageTools from '../assets/ImageTools'
import DeckName from './DeckName'
import DeckPermissions from './DeckPermissions'
import DeckTagging from './DeckTagging'

class Card {
	constructor() {
		this.question = ''
		this.answer = ''
		this.questionType = 'text'
		this.answerType = 'text'
	}
}

export default {
	name: 'NewCard',
	data() {
		return {
			newCard: new Card(),
			isDirty: false
		}
	},
	computed: {
		...mapState(['workingDeck', 'authenticated'])
	},
	beforeRouteLeave(to, from, next) {
		if (this.isDirty) {
			if (confirm('Leaving will discard any changes')) {
				this.resetDeck()
				next()
			}
		} else {
			next()
		}
	},

	methods: {
		// ugh
		update: function (e, field) {
			if (field === 'question') {
				this.newCard.question = e
			} else if (field === 'answer') {
				this.newCard.answer = e
			}
			this.isDirty = true
		},
		saveDeckPermissions: function (permissions) {
			let tmp = Object.assign({}, this.workingDeck, {permissions: permissions})
			this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
		},
		saveDeckName: function (name) {
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
			this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
		},
		saveCardEdits: function (card, key) {
			console.log('se', card)
			let tmp = Object.assign({}, this.workingDeck, {
				cards: {
					...this.workingDeck.cards,
					[key]: card
				}
			})
			this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
		},
		addCard: function () {
			if ((this.newCard.question === '' && this.newCard.questionType === 'text') || (this.newCard.answer === '' && this.newCard.answerType === 'text')) {
				this.$store.dispatch('SHOW_ERROR', 'Both question and answer must be entered')
				return
			}
			let key = Object.keys(this.workingDeck.cards).length
			let tmp = Object.assign({}, this.workingDeck, {
				cards: {
					...this.workingDeck.cards,
					[key]: this.newCard
				}
			})
			this.$store.dispatch('UPDATE_WORKING_DECK_IN_STATE', tmp)
			this.newCard = new Card()
		},
		clearCard: function () {
			this.newCard = new Card()
		},
		cancel: function () {
			this.$router.push({name: 'Home'})
		},
		updateDeck: function () {
			if (!Object.keys(this.workingDeck.cards).length) {
				this.$store.dispatch('SHOW_ERROR', 'You must first add questions and answers')
				return
			}
			if (this.workingDeck.name === '') {
				$('#deckModal').modal({
					keyboard: false,
					backdrop: 'static'
				})
				return
			}
			this.isDirty = false
			this.$store.dispatch('UPDATE_DECK')
		}
	},
	components: {
		DeckTagging,
		DeckPermissions,
		DeckName,
		NewQuestionAnswerFields,
		'newCardsList': NewCardsList,
		'nameDeckModal': NameDeckModal
	}

}
</script>
<style>
</style>
