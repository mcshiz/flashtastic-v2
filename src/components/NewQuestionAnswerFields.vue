<template>
<div v-if="side">
	<div v-bind:class="{'input-group': side.type === 'text'}">
		<img v-if="side.type === 'image' && !loading" :src="side.value" alt="" height="200" width="200" class="mb-2">
		<input v-else-if="side.type === 'text' && !loading" type="text" class="form-control" aria-label="Question" :value="side.value" @input="update" :placeholder="field">
		<div v-if="!loading" class="input-group-append justify-content-center">
			<button class="btn btn-secondary" type="button" v-on:click="openImageFinder" tabindex="-1"><i class="fa fa-camera"></i></button>
		</div>
	</div>
	<div style="height:0;overflow:hidden;display:none">
		<input type="file" :id="id" name="fileInput" v-on:change="(event) => { uploadImage(event) }"/>
	</div>
	<small class="text-muted text-left form-text">Upload Images, Paste Image Links, or Use Plain Text</small>
</div>
</template>

<script>
import ImageTools from '../assets/ImageTools'
export default {
	name: 'new-question-answer-fields',
	props: ['field', 'card', 'updateCard'],
	data() {
		return {
			loading: false,
			id: Math.random().toString(36).substr(2, 10)
		}
	},
	computed: {
		side: function() {
			if(this.field === 'question') {
				return {
					value: this.card.question,
					type: this.card.questionType
				}
			} else if(this.field === 'answer') {
				return {
					value: this.card.answer,
					type: this.card.answerType
				}
			}
		}
	},
	methods: {
		openImageFinder: function() {
			document.getElementById(this.id).click()
		},
		update: function(e) {
			if(this.field === 'question') {
				this.$emit('update-card', {field: 'question', value: e.target.value})
			} else if (this.field === 'answer') {
				this.$emit('update-card', {field: 'answer', value: e.target.value})
			} else if(this.field === 'questionType') {
				this.$emit('update-card', {field: 'questionType', value: e.target.value})
			} else if(this.field === 'answerType') {
				this.$emit('update-card', {field: 'answerType', value: e.target.value})
			}
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
						this.$store.commit('UPDATE_CARD', {field: 'questionType', value: 'image'})
						this.$store.commit('UPDATE_CARD', {field: 'question', value: response.downloadURL})
					} else if(this.field === 'answer') {
						this.$store.commit('UPDATE_CARD', {field: 'answerType', value: 'image'})
						this.$store.commit('UPDATE_CARD', {field: 'answer', value: response.downloadURL})
					}
					this.side.value = response.downloadURL
					this.loading = false
					// reset this to blank so it fires the @change event (useful for uploading the same filename 2x - mobile phones)
					e.target.value = ''
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
