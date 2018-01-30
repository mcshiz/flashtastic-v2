<template>
	<div class="col-12">
		<h4 class="text-left">Add a new question</h4>
	</div>
	<div class="col-12 col-sm-5 text-center mb-4">
		<new-question-answer-fields :field="'questionImage'" :type="newQuestionType" :loading="questionImageLoading" v-model="newQuestion" :upload="uploadImage"></new-question-answer-fields>
	</div>
	<div class="col-12 col-sm-5 text-center mb-4">
		<new-question-answer-fields :field="'answerImage'" :type="newAnswerType" :loading="answerImageLoading" v-model="newAnswer" :upload="uploadImage"></new-question-answer-fields>
	</div>
	<div class="col-12 col-sm-2 mb-4">
		<button class="btn ripple btn-success" v-on:click="addCard">Add</button>
		<button class="btn ripple btn-secondary" v-on:click="clearCard">Clear</button>
	</div>
</template>

<script>
export default {
	name: "add-new-card"
}
</script>

<style scoped>

</style>
