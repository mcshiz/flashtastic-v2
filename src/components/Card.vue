<template>
	<div class='quiz-card-container position-relative'>
		<div class="notecard"  v-bind:class="{ flipped: showAnswer }">
			<div class="front">
				<div class="score-buttons">
					<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="currentCard.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
					<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="currentCard.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<img v-if="currentCard.questionType === 'image'" :src="currentCard.question" alt="" class="card-image align-self-end">
				<div v-else>{{currentCard.question}}</div>
			</div>
			<div class="back">
				<div class="score-buttons">
					<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="currentCard.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
					<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="currentCard.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<img v-if="currentCard.answerType === 'image' && showAnswer" :src="currentCard.answer" alt="" class="card-image align-self-end">
				<div v-else-if="currentCard.answerType === 'text' && showAnswer">{{currentCard.answer}}</div>
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
export default {
	name: 'Card',
	props: ['cards', 'markScore', 'currentIndex', 'goToCardNumber'],
	data() {
		return {
			showAnswer: false
		}
	},
	methods: {
		flipCard: function() {
			this.showAnswer = !this.showAnswer
		},
		goToCard: function(index) {
			this.showAnswer = false
			this.goToCardNumber(index)
		}
	},
	computed: {
		currentCard: function() {
			return this.cards[this.currentIndex]
		},
		deckLength: function() {
			return Object.keys(this.cards).length
		}
	}
}
</script>
<style lang="css" scoped>

@import "../styles/notecard.css";

.score-buttons {
	position: absolute;
	top: 0;
	text-align: right;
	padding-right: 25px;
}
.score-buttons > button {
		top: 50%;
		margin-top: -10px;
}
.card-image {
	height: 85%;
}
</style>
