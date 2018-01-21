<template>
<div class="content" v-if="selectedDeck.questions">
	<div class="row">
		<div class="col">
			<h1>{{selectedDeck.name}}</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-12 col-sm-10 col-md-6">
			<span>Card {{currentIndex + 1}} of {{selectedDeck.questions.length}}</span>
			<card :card="selectedDeck.questions[currentIndex]" :showAnswer="showAnswer" :markScore="markScore"></card>
		</div>
		<div class="col-12 col-sm-2 col-md-4">
			<score v-bind:score="{correct: score.correct, incorrect: score.incorrect} "></score>
		</div>
	</div>
	<div class="row">
		<div class="col-12 col-sm-10 col-md-6">
			<button class='btn ripple btn-info card-nav' v-on:click="goToPreviousCard()" :disabled="currentIndex === 0"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
			<button class='btn ripple btn-secondary' v-on:click="flipCard()">Flip Card</button>
			<button class='btn ripple btn-info card-nav' v-on:click="goToNextCard()" :disabled="currentIndex + 1 === selectedDeck.questions.length"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
			<button class='btn ripple btn-danger' v-on:click="reset()"><i class="fa fa-refresh" aria-hidden="true"></i>Reset</button>
		</div>
	</div>
</div>
<div class="loading" v-else>Loading...</div>
</template>
<script>
import Score from './Score'
import Card from './Card'
import { mapState } from 'vuex'
export default {
	name: 'Quiz',
	methods: {
		goToNextCard: function() {
			if(this.currentIndex <= this.selectedDeck.questions.length) {
				this.showAnswer = false
				this.currentIndex++
			}
		},
		goToPreviousCard: function() {
			this.showAnswer = false
			this.currentIndex--
		},
		flipCard: function() {
			this.showAnswer = !this.showAnswer
		},
		markScore: function(result) {
			this.$store.dispatch('MARK_CARD_RESULT', {
				id: this.currentIndex,
				result: result
			})
		},
		reset: function() {
			this.currentIndex = 0
			this.showAnswer = false
			this.$store.dispatch('RESET_RESULTS')
		}
	},
	data() {
		return {
			currentIndex: 0,
			showAnswer: false
		}
	},
	computed: {
		...mapState(['selectedDeck']),
		score: function() {
			let correct = 0
			let incorrect = 0
			this.selectedDeck.questions.forEach(card => {
				console.log(card)
				card.result === 'correct' && correct++
				card.result === 'incorrect' && incorrect++
			})
			console.log('c', correct)
			console.log('ic', incorrect)
			return {'correct': correct, 'incorrect': incorrect}
		}
	},
	props: ['id', 'name', 'deck'],
	components: {
		'score': Score,
		'card': Card
	},
	created() {
		this.$store.dispatch('LOAD_DECK_BY_ID', this.$route.params.id)
	}
}
</script>
<style>
.score.incorrect {
	background: red !important;
}
.score.correct {
	background: green !important;
}
.card-nav {
	width: 5em;
}
</style>
