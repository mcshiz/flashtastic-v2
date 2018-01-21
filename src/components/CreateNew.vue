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
				<div class="col">
					<newCardsList :cards="newDeck.questions" :deleteCard="deleteCard" :save="saveEdits"></newCardsList>
				</div>
			</div>
			<div class="row new-question-container">
				<div class="col-12">
					<h4 class="text-left">Add a new question</h4>
				</div>
				<div class="col-12 col-sm-6">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Question" aria-label="Question" v-model="newQuestion">
					</div>
				</div>
				<div class="col-12 col-sm-5">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Answer" aria-label="Answer" v-model="newAnswer">
					</div>
				</div>
				<div class="col-xs-12 col-sm-auto">
					<button class="btn ripple btn-success" v-on:click="saveCard">Save</button>
				</div>
			</div>
			<div class="row">
				<div class="col text-left">
					<button class="btn ripple btn-danger" v-on:click="resetNewDeck"><i class="fa fa-refresh" aria-hidden="true"></i>Reset</button>
					<button class="btn ripple btn-primary" v-on:click="createDeck">Create Deck</button>
				</div>
				<div class="col text-left">

				</div>
			</div>
		</div>
</template>

<script>
import NewQuestions from './NewQuestions'
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
			editing: false
		}
	},
	computed: {
		...mapState(['newQuestions', 'newDeck'])
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
			this.$store.dispatch('RESET_NEW_DECK')
			$('#nameDeckModal').modal()
		},
		saveDeckName: function (name) {
			this.$store.dispatch('NAME_DECK', name)
		},
		saveCard: function() {
			if(this.newQuestion === '' || this.newAnswer === '') {
				this.$store.dispatch('SHOW_ERROR', 'Both question and answer must be entered')
				return
			}
			let newQuestion = {'question': this.newQuestion, 'answer': this.newAnswer}
			this.$store.dispatch('ADD_NEW_QUESTION', newQuestion)
			this.newQuestion = ''
			this.newAnswer = ''
		},
		createDeck: function() {
			if(!this.newDeck.questions.length) {
				this.$store.dispatch('SHOW_ERROR', 'You must first add questions and answers')
				return
			}
			this.$store.dispatch('CREATE_DECK').then(() => {
				this.$router.push({path: 'home'})
				console.log(this.$store.state)
			})
		}
	},
	components: {
		'newQuestions': NewQuestions,
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
