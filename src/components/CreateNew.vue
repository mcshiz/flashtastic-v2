<template>
		<div class="container">
			<!-- Modal -->
			<div class="modal fade" id="nameDeckModal" tabindex="-1" role="dialog"  aria-hidden="true">
				<div class="modal-dialog modal-dialog-centered" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<h5 class="modal-title" id="exampleModalLabel">Name your Deck of Notecards</h5>
						</div>
						<div class="modal-body">
							<div class="input-group">
								<input type="text" class="form-control" placeholder="Deck Name" aria-label="Deck Name" v-model="deckName">
							</div>
						</div>
						<div class="modal-footer">
							<button type="button" class="btn btn-primary" v-on:click="saveDeckName">Save changes</button>
						</div>
					</div>
				</div>
			</div>
			<div class="row">
				<h1 class="col">{{msg}}</h1>
			</div>
			<div class="row">
				<div class="col deck-title-container">
					<span class="deck-title">{{newDeckName}}</span>
					<button class="btn btn-light deck-title-edit-button" data-toggle="modal" data-target="#nameDeckModal">
						<i class="fa fa-pencil" aria-hidden="true"></i>
					</button>
				</div>
			</div>
			<div class="row">
				<div class="col">
					<ul class="list-group">
						<li v-for='(newQuestion, index) in newQuestions' :key='`question-${index}`' class="list-group-item">
							<div class="row">
								<span class="col-12 col-md-10 text-left justify-content-center align-self-center">
									<b class="new-question-label">Question:</b> {{newQuestion.question}}
									<br/>
									<b class="new-question-label">Answer:</b> {{newQuestion.answer}}
								</span>
								<div class="col-auto col-md-1 pull-right" >
									<button class="btn btn-sm btn-primary">Edit</button>
								</div>
								<div class="col-auto col-md-1 pull-right">
									<button class="btn btn-sm btn-danger">Delete</button>
								</div>
							</div>
						</li>
					</ul>
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
				<div class="col-12 col-sm-6">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Answer" aria-label="Answer" v-model="newAnswer">
					</div>
				</div>
			</div>
			<div class="row">
				<div class="col text-left">
				<button class="btn btn-success" v-on:click="saveCard">Save</button>
				</div>
				<div class="col text-right">
					<button class="btn btn-primary" v-on:click="createDeck">create Deck</button>
				</div>
			</div>
		</div>
</template>

<script>
import NewQuestions from './NewQuestions'
import { mapState } from 'vuex'
import $ from 'jquery'
export default {
	name: 'NewCard',
	data() {
		return {
			msg: 'Create a new quiz deck',
			deckName: '',
			newQuestion: '',
			newAnswer: ''
		}
	},
	computed: {
		...mapState(['newQuestions', 'newDeckName'])
	},
	methods: {
		saveCard: function() {
			if(this.newQuestion === '' || this.newAnswer === '') {
				this.$store.dispatch('SHOW_ERROR', 'Both question and answer must be entered')
				return
			}
			let newQuestion = {'question': this.newQuestion, 'answer': this.newAnswer}
			this.$store.dispatch('ADD_NEW_QUESTION', newQuestion)
		},
		saveDeckName: function () {
			if(this.deckName === '') {
				return false
			}
			$('#nameDeckModal').modal('hide')
			this.$store.dispatch('NAME_DECK', this.deckName)
		},
		createDeck: function() {
			this.$store.dispatch('CREATE_DECK').then(() => {
				this.$router.push({path: 'home'})
			})
		}
	},
	components: {
		'newQuestions': NewQuestions
	},
	mounted() {
		// open modal and prevent dismiss without clicking save button
		$('#nameDeckModal').modal({
			keyboard: false,
			backdrop: 'static'
		})
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
