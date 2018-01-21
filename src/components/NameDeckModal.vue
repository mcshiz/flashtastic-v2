<template>
	<div class="modal fade" id="nameDeckModal" tabindex="-1" role="dialog"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Name your Deck of Notecards</h5>
				</div>
				<div class="modal-body">
					<div class="input-group">
						<input type="text" class="form-control" placeholder="Deck Name" aria-label="Deck Name" v-model="deckName">
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn ripple btn-primary" v-on:click="save">Save changes</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
export default {
	name: 'NameDeckModal',
	props: ['newDeckName', 'saveDeckName'],
	data() {
		return {
			deckName: ''
		}
	},
	methods: {
		save: function () {
			if(this.deckName === '') {
				return false
			}
			$('#nameDeckModal').modal('hide')
			this.saveDeckName(this.deckName)
			this.deckName = ''
		}
	},
	mounted() {
		// open modal and prevent dismiss without clicking save button
		if(!this.newDeckName) {
			$('#nameDeckModal').modal({
				keyboard: false,
				backdrop: 'static'
			})
		}
	}
}
</script>
