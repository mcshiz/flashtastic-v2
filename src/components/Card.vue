<template>
	<div class='quiz-card-container'>
		<div class="notecard"  v-bind:class="{ flipped: showAnswer }">
			<div class="front">
				<div class="score-buttons">
					<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="card.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
					<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="card.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<img v-if="card.questionType === 'image'" :src="card.question" alt="" class="card-image align-self-end">
				<div v-else>{{card.question}}</div>
			</div>
			<div class="back">
				<div class="score-buttons">
					<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="card.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
					<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="card.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<img v-if="card.answerType === 'image' && showAnswer" :src="card.answer" alt="" class="card-image align-self-end">
				<div v-else-if="card.answerType === 'text' && showAnswer">{{card.answer}}</div>
			</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Card',
	props: ['card', 'showAnswer', 'markScore'],
	data() {
		return {}
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
