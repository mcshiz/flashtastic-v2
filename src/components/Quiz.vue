<template>
<div class="content" v-if="selectedDeck">
	<div class="row">
		<div class="col-12">
			<h1>{{selectedDeck.name}}</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-12 col-md-10 col-lg-6">
			<span>Card {{currentIndex + 1}} of {{deckLength}}</span>
			<card :card="selectedDeck.questions[currentCard]" :showAnswer="showAnswer" :markScore="markScore"></card>
		</div>
		<div class="col-12 col-md-2">
			<score v-bind:score="{correct: score.correct, incorrect: score.incorrect}" :lastScore="selectedDeck.score"></score>
		</div>
	</div>
	<div class="row">
		<div class="col-12 mb-2">
			<button class='btn ripple btn-info card-nav' v-on:click="goToPreviousCard()" :disabled="currentIndex === 0"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
			<button class='btn ripple btn-secondary' v-on:click="flipCard()">Flip Card</button>
			<button class='btn ripple btn-info card-nav' v-on:click="goToNextCard()" :disabled="currentIndex + 1 === deckLength"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
		</div>
	</div>
	<div class="row">
		<div class="col-12">
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
	props: ['id', 'name', 'deck'],
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
			for(let key in this.selectedDeck.questions) {
				let card = this.selectedDeck.questions[key]
				card.result === 'correct' && correct++
				card.result === 'incorrect' && incorrect++
			}
			return {'correct': correct, 'incorrect': incorrect}
		},
		deckLength: function() {
			return Object.keys(this.selectedDeck.questions).length
		},
		currentCard: function() {
			return Object.keys(this.selectedDeck.questions)[this.currentIndex]
		},
		deckKey: function() {
			return Object.keys(this.selectedDeck.questions)[this.currentIndex]
		}
	},
	methods: {
		goToNextCard: function() {
			if(this.currentIndex <= this.deckLength) {
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
				key: this.currentCard,
				result: result
			})
		},
		reset: function() {
			this.currentIndex = 0
			this.showAnswer = false
			this.$store.dispatch('RESET_RESULTS')
		}
	},
	watch: {
		score: function() {
			// when they've scored every card save the score
			if(this.score.correct + this.score.incorrect === this.deckLength) {
				this.$store.dispatch('SAVE_SCORE', this.score)
			}
		}
	},
	components: {
		'score': Score,
		'card': Card
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
