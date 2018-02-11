<template>
	<div class='quiz-card-container position-relative'>
		<div class="notecard"  v-bind:class="{ flipped: showAnswer }">
			<div class="front">
				<score-buttons :current-card="currentCard" :markScore="markScore"></score-buttons>
				<cardField v-if="!showAnswer" :text="currentCard.question" :type="currentCard.questionType"></cardField>
			</div>
			<div class="back">
				<score-buttons :current-card="currentCard" :markScore="markScore"></score-buttons>
				<cardField v-if="showAnswer" :text="currentCard.answer" :type="currentCard.answerType"></cardField>
			</div>
		</div>
		<div class="position-relative w-100 mt-3">
			<button class='btn ripple btn-info card-nav pull-left' v-on:click="goToCard(currentIndex - 1)" :disabled="currentIndex === 0"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
			<button class='btn ripple btn-secondary col-5' v-on:click="flipCard()">Flip Card</button>
			<button class='btn ripple btn-info card-nav pull-right' v-on:click="goToCard(currentIndex + 1)" :disabled="currentIndex + 1 === deckLength"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
		</div>
	</div>
</template>
<script>
import CardField from './CardField'
import ScoreButtons from './ScoreButtons'
export default {
	name: 'Card',
	props: ['cards', 'markScore', 'currentIndex', 'currentKey', 'goToCardNumber', 'showAnswer'],
	methods: {
		flipCard: function() {
			this.$emit('flip-card', !this.showAnswer)
		},
		goToCard: function(index) {
			this.$emit('flip-card', false)
			this.goToCardNumber(index)
		}
	},
	computed: {
		currentCard: function() {
			return this.cards[this.currentKey]
		},
		deckLength: function() {
			return Object.keys(this.cards).length
		}
	},
	components: {
		ScoreButtons,
		CardField
	}
}
</script>
<style lang="css" scoped>

@import "../styles/notecard.css";

.quiz-card-container img {
	height: 85%;
}
</style>
