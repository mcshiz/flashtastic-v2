<template>
		<div class="content">
			<nameDeckModal :newDeckName="newDeck.name" :saveDeckName="saveDeckName"></nameDeckModal>
			<div class="row">
				<h1 class="col">{{msg}}</h1>
			</div>
			<div class="row">
				<div class="col deck-title-container">
					<span class="deck-title">{{newDeck.name}}</span>
					<button class="btn ripple btn-light deck-title-edit-button" data-toggle="modal" data-target="#nameDeckModal">
						<i class="fa fa-pencil" aria-hidden="true"></i>
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col-12 col-sm-6">
					<input type="text" class="form-control tags" placeholder="Chemistry, Nursing" id="deck-tags">
					<small id="tagsHelp" class="form-text text-muted text-left">Tag this deck for easier finding later</small>
				</div>
				<div class="col-12 col-sm-6">
					<select name="deckPermissions" id="deckPermissions" v-model="deckPermissions" v-on:change="saveDeckPermissions">
						<option value="private">Private - Only I can use this deck</option>
						<option value="public">Public - Let everyone use this deck</option>
					</select>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<newCardsList :cards="newDeck.questions" :deleteCard="deleteCard" :save="saveEdits"></newCardsList>
				</div>
			</div>
			<div class="row new-question-container">
				<div class="col-12">
					<h4 class="text-left">Add a new question</h4>
				</div>
				<div class="col-12 col-sm-5 text-left">
					<div v-bind:class="{'input-group' : newQuestionType === 'text'}">
						<span v-if="questionImageLoading">Loading...</span>
						<img v-if="newQuestionType === 'image'"  :src="newQuestion" alt="" height="200" width="200">
						<input v-else type="text" class="form-control" placeholder="Question" aria-label="Question" v-model="newQuestion">
						<div class="input-group-append">
							<button class="btn btn-secondary" type="button" v-on:click="useQuestionImage" tabindex="-1"><i class="fa fa-camera"></i></button>
						</div>
						<div style="height:0;overflow:hidden;display:none">
							<input type="file" id="QuestionFileInput" name="fileInput" v-on:change="uploadQuestionImage"/>
						</div>
					</div>
				</div>
				<div class="col-12 col-sm-5">
					<div class="input-group">
						<span v-if="answerImageLoading">Loading...</span>
						<img v-if="newAnswerType === 'image'"  :src="newAnswer" alt="" height="200" width="200">
						<input v-else type="text" class="form-control" placeholder="Answer" aria-label="Answer" v-model="newAnswer">
						<span v-bind:class="{'input-group-append' : newAnswerType === 'text'}" >
							<button class="btn btn-secondary" type="button" v-on:click="useAnswerImage" tabindex="-1`"><i class="fa fa-camera"></i></button>
						</span>
						<div style="height:0;overflow:hidden;display:none">
							<input type="file" id="AnswerFileInput" name="fileInput" v-on:change="uploadAnswerImage"/>
						</div>
					</div>
				</div>
				<div class="col-12 col-sm-2">
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
export default {
	name: 'NewCard',
	data() {
		return {
			msg: 'Create a new quiz deck',
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
		...mapState(['newDeck'])
	},
	beforeRouteLeave(to, from, next) {
		if(!this.created) {
			if(confirm('Leaving will discard any changes')) {
				this.resetNewDeck().then(() => {
					next()
				})
			}
		}
		next()
	},
	methods: {
		deleteCard: function(index) {
			if(window.confirm('Are you sure you want to delete this question?')) {
				this.$store.dispatch('DELETE_CARD', index)
			}
		},
		saveEdits: function(card) {
			this.$store.dispatch('SAVE_CARD_EDITS', card)
			$('#editModal').modal('hide')
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
				})
			})
		},
		saveDeckName: function (name) {
			this.$store.dispatch('CREATE_NEW_DECK', name)
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
		saveDeckPermissions: function() {
			this.$store.dispatch('CHANGE_DECK_PERMISSIONS', this.deckPermissions)
		},
		createDeck: function() {
			if(!this.newDeck.questions.length) {
				this.$store.dispatch('SHOW_ERROR', 'You must first add questions and answers')
				return
			}
			if(this.newDeck.name === '') {
				$('#nameDeckModal').modal({
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
		useQuestionImage: function() {
			document.getElementById('QuestionFileInput').click()
		},
		useAnswerImage: function() {
			document.getElementById('AnswerFileInput').click()
		},
		uploadQuestionImage: function(e) {
			let file = e.target.files[0]
			let reader = new FileReader()
			this.newQuestionType = 'image'
			file.src = reader.result
			this.questionImageLoading = true
			this.$store.dispatch('UPLOAD_IMAGE', file).then(response => {
				this.newQuestion = response.downloadURL
				this.questionImageLoading = false
			}).catch(error => [
				console.log('err', error)
			])
		},
		uploadAnswerImage: function(e) {
			let file = e.target.files[0]
			let reader = new FileReader()
			this.newAnswerType = 'image'
			file.src = reader.result
			this.answerImageLoading = true
			this.$store.dispatch('UPLOAD_IMAGE', file).then(response => {
				this.newAnswer = response.downloadURL
				this.answerImageLoading = false
			}).catch(error => [
				console.log('err', error)
			])
		}
	},
	components: {
		'newCardsList': NewCardsList,
		'nameDeckModal': NameDeckModal
	}

}
</script>
<style>
	.deck-title {
		vertical-align: middle;
		font-size: 2.25em;
	}
	.deck-title-edit-button {
		visibility: hidden;
	}
	.deck-title-container:hover .deck-title-edit-button {
		visibility: visible;
	}
	.new-question-label {
		display: inline-block;
		width: 75px;
	}
	.new-question-container {
		margin-top: 30px;
		margin-bottom: 30px;
	}
</style>
