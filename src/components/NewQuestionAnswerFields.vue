<template>
	<div v-bind:class="{'input-group' : type === 'text'}">
		<div v-if="loading">Loading...</div>
		<img v-if="type === 'image' && !loading"  :src="value" alt="" height="200" width="200" class="mb-2">
		<input v-else-if="type === 'text'" type="text" class="form-control" aria-label="Question"  v-bind:value="value" v-on:input="updateValue($event.target.value)">
		<div class="input-group-append justify-content-center">
			<button class="btn btn-secondary" type="button" v-on:click="openImageFinder" tabindex="-1"><i class="fa fa-camera"></i></button>
		</div>
		<div style="height:0;overflow:hidden;display:none">
			<input type="file" :id="id" name="fileInput" v-on:change="(event) => { upload(event, id) }"/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'new-question-answer-fields',
	props: ['id', 'field', 'type', 'loading', 'value', 'upload'],
	methods: {
		openImageFinder: function() {
			document.getElementById(this.id).click()
		},
		updateValue: function (value) {
			this.$emit('input', value)
		}
	}
}
</script>

<style scoped>

</style>
