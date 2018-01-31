<template>
	<div>
		<nameDeckModal :newDeckName="deck.name" :saveDeckName="saveEditName"></nameDeckModal>
		<div class="row">
			<h1 class="col">Edit</h1>
		</div>
		<deck-name :deck="deck"></deck-name>
		<div class="row">
			<deck-tagging></deck-tagging>
			<deck-permissions :deckPermissions="deck.deckPermissions" :save="saveEditPermissions"></deck-permissions>
		</div>
		<div class="row">
			<newCardsList :cards="deck.questions" :delete="deleteCard" :save="saveEdits"></newCardsList>
		</div>
		<div class="row new-question-container mt-4">
			<div class="col-12">
				<h4 class="text-left">Add a new question</h4>
			</div>
			<div class="col-12 col-sm-5 text-center mb-4">
				<new-question-answer-fields :field="'questionImage'" :type="newQuestionType" :loading="questionImageLoading" v-model="newQuestion" :upload="uploadImage"></new-question-answer-fields>
			</div>
			<div class="col-12 col-sm-5 text-center mb-4">
				<new-question-answer-fields :field="'answerImage'" :type="newAnswerType" :loading="answerImageLoading" v-model="newAnswer" :upload="uploadImage"></new-question-answer-fields>
			</div>
			<div class="col-12 col-sm-2 mb-4">
				<button class="btn ripple btn-success" v-on:click="addCard">Add</button>
				<button class="btn ripple btn-secondary" v-on:click="clearCard">Clear</button>
			</div>
		</div>
	</div>
</template>
<script>
import { mapState } from 'vuex'
import newCardsList from './NewCardsList'
import DeckName from './DeckName'
import DeckTagging from './DeckTagging'
import DeckPermissions from './DeckPermissions'
import NameDeckModal from './NameDeckModal'
import NewCardForm from './NewCardForm'
import ImageTools from '../assets/ImageTools'
import NewQuestionAnswerFields from './NewQuestionAnswerFields'
export default {
	name: 'Editdeck',
	data() {
		return {
			newQuestion: '',
			newAnswer: '',
			newQuestionType: 'text',
			newAnswerType: 'text',
			deckPermissions: 'private',
			questionImageLoading: false,
			answerImageLoading: false,
			editing: false
		}
	},
	methods: {
		addCard: function() {
			console.log('adding....')
		},
		clearCard: function() {
			console.log('clearing...')
		},
		saveEditPermissions: function(permissions) {
			let editedDeck = Object.assign({}, this.deck, {deckPermissions: permissions})
			this.$store.dispatch('CHANGE_DECK_PERMISSIONS', editedDeck).then(() => {
				console.log('loading', permissions)
				this.$store.dispatch('LOAD_DECK_BY_KEY', {key: this.deck.key, deckPermissions: permissions})
			})
		},
		saveEditName: function(name) {
			let editedDeck = Object.assign({}, this.deck, {name: name})
			this.$store.dispatch('SAVE_EDITS_BY_KEY', editedDeck)
		},
		saveEdits: function(card) {
			let editedQuestions = Object.assign({}, this.deck.questions, {[card.index]: card.card})
			let editedDeck = Object.assign({}, this.deck, {questions: editedQuestions})
			this.$store.dispatch('SAVE_EDITS_BY_KEY', editedDeck)
		},
		deleteCard: function(index) {
			let keyz = Object.keys(this.deck.questions)[index]
			let editedQuestions = Object.keys(this.deck.questions)
				.filter(key => key !== keyz)
				.reduce((result, current) => {
					result[current] = this.deck.questions[current]
					return result
				}, {})
			let editedDeck = Object.assign({}, this.deck, {questions: editedQuestions})
			this.$store.dispatch('SAVE_EDITS_BY_KEY', editedDeck)
		},
		uploadImage: function(e, field) {
			let file = e.target.files[0]
			let reader = new FileReader()
			if(field === 'questionImage') {
				this.newQuestionType = 'image'
				this.questionImageLoading = true
			} else if (field === 'answerImage') {
				this.newAnswerType = 'image'
				this.answerImageLoading = true
			} else {
				console.log('Image Field Not Specified')
				return false
			}
			file.src = reader.result
			ImageTools.resize(file, {
				width: 810, // maximum width
				height: 375 // maximum height
			}, (blob, didItResize) => {
				this.$store.dispatch('UPLOAD_IMAGE', blob).then((response) => {
					if(field === 'questionImage') {
						this.newQuestion = response.downloadURL
						this.questionImageLoading = false
					} else {
						this.newAnswer = response.downloadURL
						this.answerImageLoading = false
					}
				}).catch(error => [
					console.log('err', error)
				])
			})
		}
	},
	computed: {
		...mapState(['selectedDeck']),
		deck: function() {
			return Object.assign({}, this.selectedDeck)
		}
	},
	components: {
		NewQuestionAnswerFields,
		NewCardForm,
		newCardsList,
		DeckName,
		DeckTagging,
		DeckPermissions,
		NameDeckModal
	}
}
</script>
