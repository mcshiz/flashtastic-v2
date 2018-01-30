<template>
		<div class="content">
			<nameDeckModal :newDeckName="newDeck.name" :saveDeckName="saveDeckName"></nameDeckModal>
			<div class="row">
				<h1 class="col">{{msg}}</h1>
			</div>
			<deck-name :deck="newDeck"></deck-name>
			<div class="row">
				<deck-tagging></deck-tagging>
				<deck-permissions :deckPermissions="deckPermissions" :save="saveDeckPermissions"></deck-permissions>
			</div>
			<div class="row">
				<newCardsList :cards="newDeck.questions" :delete="deleteCard" :save="saveEdits"></newCardsList>
			</div>
			<div class="row new-question-container">
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
			<div class="row">
				<div class="col-12 justify-content-sm-between">
					<button class="btn ripple btn-danger" v-on:click="resetNewDeck"><i class="fa fa-refresh" aria-hidden="true"></i>Clear All</button>
					<button class="btn ripple btn-primary" v-on:click="createDeck">Create Deck</button>
				</div>
			</div>
		</div>
</template>

<script>
import NewCardsList from './NewCardsList'
import NameDeckModal from './NameDeckModal'
import $ from 'jquery'
import { mapState } from 'vuex'
import NewQuestionAnswerFields from './NewQuestionAnswerFields'
import ImageTools from '../assets/ImageTools'
import DeckName from './DeckName'
import DeckPermissions from './DeckPermissions'
import DeckTagging from './DeckTagging'
export default {
	name: 'NewCard',
	data() {
		return {
			msg: 'Create New Quiz',
			newQuestion: '',
			newAnswer: '',
			newQuestionType: 'text',
			newAnswerType: 'text',
			deckPermissions: 'private',
			questionImageLoading: false,
			answerImageLoading: false,
			editing: false,
			created: false
		}
	},
	computed: {
		...mapState(['newDeck', 'authenticated'])
	},
	beforeRouteLeave(to, from, next) {
		if(!this.created) {
			if(confirm('Leaving will discard any changes')) {
				this.resetNewDeck().then(() => {
					next()
				}).catch(error => {
					console.log(error)
					next()
				})
			}
		} else {
			next()
		}
	},

	methods: {
		saveDeckPermissions: function() {
			this.$store.dispatch('CHANGE_DECK_PERMISSIONS', this.deckPermissions)
		},
		deleteCard: function(index) {
			this.$store.dispatch('DELETE_CARD', index)
		},
		saveEdits: function(card) {
			this.$store.dispatch('SAVE_CARD_EDITS', card)
		},
		resetNewDeck: function() {
			return new Promise((resolve, reject) => {
				this.newQuestion = ''
				this.newAnswer = ''
				this.newQuestionType = 'text'
				this.newAnswerType = 'text'
				this.deckPermissions = 'private'
				this.$store.dispatch('RESET_NEW_DECK').then(() => {
					resolve()
				}).catch(error => {
					reject(new Error(error))
				})
			})
		},
		saveDeckName: function (name) {
			this.$store.dispatch('CREATE_NEW_DECK_PLACEHOLDER', name)
		},
		clearCard: function() {
			this.newQuestion = ''
			this.newAnswer = ''
			this.newQuestionType = 'text'
			this.newAnswerType = 'text'
		},
		addCard: function() {
			if((this.newQuestion === '' && this.newQuestionType === 'text') || (this.newAnswer === '' && this.newAnswerType === 'text')) {
				this.$store.dispatch('SHOW_ERROR', 'Both question and answer must be entered')
				return
			}
			let newQuestion = {'question': this.newQuestion, 'questionType': this.newQuestionType, 'answer': this.newAnswer, 'answerType': this.newAnswerType}
			this.$store.dispatch('ADD_NEW_QUESTION', newQuestion)
			this.newQuestion = ''
			this.newAnswer = ''
			this.newQuestionType = 'text'
			this.newAnswerType = 'text'
		},
		createDeck: function() {
			if(!this.newDeck.questions.length) {
				this.$store.dispatch('SHOW_ERROR', 'You must first add questions and answers')
				return
			}
			if(this.newDeck.name === '') {
				$('#deckModal').modal({
					keyboard: false,
					backdrop: 'static'
				})
				return
			}
			this.$store.dispatch('CREATE_DECK').then(() => {
				this.created = true
				this.$router.push({path: 'home'})
			})
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
	.deck-title {
		vertical-align: middle;
		font-size: 2.25em;
		border-bottom: 1px solid lightgray;
	}
	.deck-title-edit-button {
		background-color: lightgray;
	}
	.deck-title-container:hover .deck-title-edit-button {
		background-color: darkgray;
	}
</style>
