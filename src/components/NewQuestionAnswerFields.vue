<template>
<div v-if="side">
	<div v-bind:class="{'input-group': side.type === 'text'}">
		<div v-if="loading" class="col-12">Loading...</div>
		<img v-if="side.type === 'image' && !loading" :src="side.value" alt="" height="200" width="200" class="mb-2">
		<input v-else-if="side.type === 'text' && !loading" type="text" class="form-control" aria-label="Question" @input="(event) => { updateValue(event.target.value)}" v-model="side.value" :placeholder="field">
		<div v-if="!loading" class="input-group-append justify-content-center">
			<button class="btn btn-secondary" type="button" v-on:click="openImageFinder" tabindex="-1"><i class="fa fa-camera"></i></button>
		</div>
	</div>
	<div style="height:0;overflow:hidden;display:none">
		<input type="file" :id="side.id" name="fileInput" v-on:change="(event) => { uploadImage(event) }"/>
	</div>
	<small class="text-muted text-left form-text">Upload Images, Paste Image Links, or Use Plain Text</small>
</div>
</template>

<script>
import ImageTools from '../assets/ImageTools'
export default {
	name: 'new-question-answer-fields',
	props: ['field', 'card'],
	data() {
		return {
			loading: false
		}
	},
	computed: {
		side: function() {
			if(this.field === 'question') {
				return {
					value: this.card.question,
					type: this.card.questionType,
					id: Math.random().toString(36).substr(2, 10)
				}
			} else if(this.field === 'answer') {
				return {
					value: this.card.answer,
					type: this.card.answerType,
					id: Math.random().toString(36).substr(2, 10)
				}
			}
		}
	},
	methods: {
		openImageFinder: function() {
			document.getElementById(this.side.id).click()
		},
		updateValue: function(value) {
			this.$emit('update-value', value, this.field)
		},
		uploadImage: function(e) {
			this.loading = true
			let file = e.target.files[0]
			let reader = new FileReader()
			file.src = reader.result
			ImageTools.resize(file, {
				width: 810, // maximum width
				height: 375 // maximum height
			}, (blob, didItResize) => {
				this.$store.dispatch('UPLOAD_IMAGE', {image: blob, name: file.name}).then((response) => {
					if(this.field === 'question') {
						this.$emit('update-value', 'image', 'questionType')
						this.$emit('update-value', response.downloadURL, 'question')
					} else if(this.field === 'answer') {
						this.$emit('update-value', 'image', 'answerType')
						this.$emit('update-value', response.downloadURL, 'answer')
					}
					this.side.value = response.downloadURL
					this.loading = false
					this.$forceUpdate()
				}).catch(error => {
					console.log('err', error)
				})
			})
		}
	}
}
</script>

<style scoped>

</style>
