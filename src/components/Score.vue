<template>
	<div class="row score-box-row">
		<div class="score-box col-xs-6">
			<div class="text-center score-box-header">Correct</div>
			<div class="text-center score-box-value correct">{{score.correct}}</div>
		</div>
		<div class="score-box col-xs-6">
			<div class="text-center score-box-header">Incorrect</div>
			<div class="text-center score-box-value incorrect">{{score.incorrect}}</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Quiz',
	props: ['score']
}
</script>
<style scoped>
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
