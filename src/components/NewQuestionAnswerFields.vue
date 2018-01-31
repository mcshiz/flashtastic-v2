<template>
	<div v-bind:class="{'input-group' : type === 'text'}">
		<span v-if="loading">Loading...</span>
		<img v-if="type === 'image'"  :src="value" alt="" height="200" width="200" class="mb-2">
		<input v-else type="text" class="form-control" aria-label="Question"  v-bind:value="value" v-on:input="updateValue($event.target.value)">
		<div class="input-group-append justify-content-center">
			<button class="btn btn-secondary" type="button" v-on:click="openImageFinder" tabindex="-1"><i class="fa fa-camera"></i></button>
		</div>
		<div style="height:0;overflow:hidden;display:none">
			<input type="file" :id="field" name="fileInput" v-on:change="(event) => { upload(event, field) }"/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'new-question-answer-fields',
	props: ['field', 'type', 'loading', 'value', 'upload'],
	methods: {
		openImageFinder: function() {
			document.getElementById(this.field).click()
		},
		updateValue: function (value) {
			this.$emit('input', value)
		}
	}
}
</script>

<style scoped>

</style>
