<template>
	<div class='quiz-card-container'>
		<div class="notecard"  v-bind:class="{ flipped: showAnswer}">
			<div class="front">
				<div class="score-buttons">
					<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="card.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
					<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="card.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<p>{{card.question}}</p>
			</div>
			<div class="back">
				<div class="score-buttons">
					<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="card.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
					<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="card.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
				</div>
				<p v-if="showAnswer">{{card.answer}}</p>
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
</style>
