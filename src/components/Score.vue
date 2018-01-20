<template>
	<div class="row score-box-row">
		<div class="score-box col-xs-6">
			<div class="text-center score-box-header">Correct</div>
			<div class="text-center score-box-value">{{score.correct}}</div>
		</div>
		<div class="score-box col-xs-6">
			<div class="text-center score-box-header">Incorrect</div>
			<div class="text-center score-box-value">{{score.incorrect}}</div>
		</div>
	</div>
</template>
<script>
export default {
	name: 'Quiz',
	props: ['score'],
	data() {
		return {
			msg: 'Score',
			deck: {
				'name': 'Planets',
				'questions': [
					{'Planet closest to the sun': 'Mercury'},
					{'Planet furthest away from the sun': 'Neptune'},
					{'What is the largest planet': 'Jupiter'},
					{'What is the hottest planet': 'Venus'},
					{'What is the smallest planet': 'Mercury'}
				]
			}
		}
	}
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
