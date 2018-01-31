<template>
	<div class="modal fade" id="editModal" tabindex="-1" role="dialog"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Edit</h5>
				</div>
				<div class="modal-body text-left">
					<div class="col-12 text-center mb-4">
						<new-question-answer-fields :id="'question-edit'" :field="'questionImage'" :type="editingCard.questionType" :loading="questionImageLoading" v-model="editingCard.question" :upload="uploadImage"></new-question-answer-fields>
					</div>
					<div class="col-12 text-center mb-4">
						<new-question-answer-fields :id="'question-edit'" :field="'answerImage'" :type="editingCard.answerType" :loading="answerImageLoading" v-model="editingCard.answer" :upload="uploadImage"></new-question-answer-fields>
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn ripple btn-secondary cancel" data-dismiss="modal" aria-label="Close">Cancel</button>
					<button type="button" class="btn ripple btn-primary save" v-on:click="save({index: index, card: editingCard})">Save changes</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import NewQuestionAnswerFields from './NewQuestionAnswerFields'
import ImageTools from '../assets/ImageTools'
export default {
	name: 'EditCardModal',
	props: ['card', 'index', 'save'],
	data() {
		return{
			questionImageLoading: false,
			answerImageLoading: false
		}
	},
	computed: {
		// make a copy of the card we are editing so we are not mutating, and can easily cancel edits
		editingCard: function() {
			return Object.assign({}, this.card)
		}
	},
	components: {
		'new-question-answer-fields': NewQuestionAnswerFields
	},
	methods: {
		uploadImage: function(e, id) {
			let file = e.target.files[0]
			let reader = new FileReader()
			if(id.includes('question')) {
				this.editingCard.questionType = 'image'
				this.questionImageLoading = true
			} else if (id.includes('answer')) {
				this.editingCard.answerType = 'image'
				this.answerImageLoading = true
			} else {
				console.log('Image Field Not Specified')
				return false
			}
			file.src = reader.result
			ImageTools.resize(file, {
				width: 810, // maximum width
				height: 375 // maximum height
			}, (blob, didItResize) => {
				this.$store.dispatch('UPLOAD_IMAGE', blob).then((response) => {
					if(id.includes('question')) {
						this.editingCard.question = response.downloadURL
						this.questionImageLoading = false
					} else {
						this.editingCard.answer = response.downloadURL
						this.editingCard.answer = response.downloadURL
						this.answerImageLoading = false
					}
				}).catch(error => [
					console.log('err', error)
				])
			})
		}
	}
}
</script>
