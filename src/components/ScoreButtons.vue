<template>
	<div class="score-buttons">
		<button class="btn ripple btn-success score correct" v-on:click="markScore('correct')" :disabled="currentCard.result === 'correct'"><i class="fa fa-check" aria-hidden="true"></i></button>
		<button class="btn ripple btn-warning score incorrect" v-on:click="markScore('incorrect')" :disabled="currentCard.result === 'incorrect'"><i class="fa fa-times" aria-hidden="true"></i></button>
	</div>
</template>

<script>
export default {
	name: 'score-buttons',
	props: ['markScore', 'currentCard']
}
</script>

<style scoped>
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
