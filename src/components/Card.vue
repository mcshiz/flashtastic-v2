<template>
	<div class='quiz-card-container position-relative'>
		<div class="notecard"  v-bind:class="{ flipped: showAnswer }">
			<div class="front">
				<div class="score-buttons">
					<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="currentCard.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
					<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="currentCard.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<img v-if="isImage(currentCard.question, currentCard.questionType)" :src="currentCard.question" alt="" class="card-image align-self-end">
				<div v-else>{{currentCard.question}}</div>
			</div>
			<div class="back">
				<div class="score-buttons">
					<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="currentCard.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
					<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="currentCard.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<img v-if="isImage(currentCard.answer, currentCard.answerType) && showAnswer" :src="currentCard.answer" alt="" class="card-image align-self-end">
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
	props: ['cards', 'markScore', 'currentIndex', 'currentKey', 'goToCardNumber', 'showAnswer'],
	methods: {
		flipCard: function() {
			this.$emit('flip-card', !this.showAnswer)
		},
		goToCard: function(index) {
			this.showAnswer = false
			this.goToCardNumber(index)
		},
		isImage: function(text, type) {
			if(text.match(/\.(jpg|jpeg|gif|png)$/) != null || type === 'image') {
				return true
			} else {
				return false
			}
		}
	},
	computed: {
		currentCard: function() {
			return this.cards[this.currentKey]
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
