<template>
	<div class="row score-box-row">
		<div class="score-box">
			<div class="text-center score-box-header">Correct</div>
			<div class="text-center score-box-value correct">{{score.correct}}</div>
		</div>
		<div class="score-box">
			<div class="text-center score-box-header">Incorrect</div>
			<div class="text-center score-box-value incorrect">{{score.incorrect}}</div>
		</div>
		<div class="col-12" v-if="prevScore">
			Previous Score {{prevScore}}
		</div>
	</div>
</template>
<script>
export default {
	name: 'Quiz',
	props: ['score', 'lastScore'],
	computed: {
		prevScore: function() {
			if(this.lastScore) {
				return `${Math.floor((this.lastScore.correct / (this.lastScore.correct + this.lastScore.incorrect)) * 100).toFixed(0)}%`
			} else {
				return false
			}
		}
	}
}
</script>
<style scoped>
	.score-box-row {
		justify-content: center;
	}
.score-box-header, .score-box-value {
	font-size: 2em;
	line-height: 1em;
}
.score-box {
	width: 150px;
	padding: 10px;
}
@media screen and (min-width: 768px) {
	.score-box-row {
		margin-top: 40%;
	}
}
</style>
