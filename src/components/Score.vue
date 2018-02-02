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
		<div class="col-12" v-for="(score, key) in scores" v-bind:key="key">
			{{getScoreDate(key, score)}}

		</div>
	</div>
</template>
<script>
export default {
	name: 'Quiz',
	props: ['score', 'scores'],
	methods: {
		getScoreDate: function(unix, score) {
			let dt = new Date(unix / 1000)
			let str = `${dt.getMonth() + 1}/${dt.getDate()} ${dt.toLocaleTimeString()} - ${score.correct} / ${score.incorrect + score.correct}`
			return str
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
