<template>
	<div class='quiz-card-container position-relative'>
		<div class="notecard" id="notecard" v-bind:class="{ flipped: showAnswer }">
			<div class="front">
				<b class="side">Q:</b>
				<score-buttons :current-card="currentCard" :markScore="markScore"></score-buttons>
				<cardField v-if="!showAnswer" :text="currentCard.question" :type="currentCard.questionType"></cardField>
			</div>
			<div class="back row">
				<b class="side">A:</b>
				<score-buttons :current-card="currentCard" :markScore="markScore"></score-buttons>
				<cardField v-if="showAnswer" :text="currentCard.answer" :type="currentCard.answerType"></cardField>
			</div>
		</div>
		<div class="position-relative mt-3 row justify-content-around">
			<div class="flex-column">
				<button class='btn ripple btn-info card-nav pull-left' v-on:click="goToCard(currentIndex - 1)" :disabled="currentIndex === 0"><i class="fa fa-arrow-left" aria-hidden="true"></i></button>
				<div class="d-none d-sm-block">Left Arrow</div>
			</div>
			<div class="flex-column">
				<button class='btn ripple btn-secondary' v-on:click="flipCard()">Flip Card</button>
				<div class="d-none d-sm-block">Spacebar or Enter</div>
			</div>
			<div class="flex-column">
				<button class='btn ripple btn-info card-nav pull-right' v-on:click="goToCard(currentIndex + 1)" :disabled="currentIndex + 1 === deckLength"><i class="fa fa-arrow-right" aria-hidden="true"></i></button>
				<div class="d-none d-sm-block">Right Arrow</div>
			</div>
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
.side {
	font-size: 0.75em;
	top: 5px;
	left: 5px;
	line-height: 1.25em;
	position: absolute;
}

</style>
