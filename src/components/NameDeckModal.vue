<template>
	<div class="modal fade" id="deckModal" tabindex="-1" role="dialog"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">Name This Deck of Notecards</h5>
				</div>
				<div class="modal-body">
					<div class="input-group">
						<input type="text" class="form-control new-deck-name" placeholder="Deck Name" aria-label="Deck Name" v-model="deckName" >
					</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn ripple btn-secondary" v-on:click="cancel" >Cancel</button>
					<button type="button" class="btn ripple btn-primary save" v-on:click="save">Save changes</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
import $ from 'jquery'
export default {
	name: 'deckModal',
	props: ['newDeckName', 'saveDeckName'],
	data() {
		return {
			deckName: this.newDeckName.slice(0)
		}
	},
	methods: {
		save: function () {
			if (this.deckName === '') {
				return false
			}
			$('#deckModal').modal('hide')
			this.saveDeckName(this.deckName)
		},
		openModal: function() {
			$('#deckModal').modal({
				keyboard: false,
				backdrop: 'static'
			})
		},
		cancel: function() {
			$('#deckModal').modal('hide')
		}
	},
	mounted() {
		// open modal
		if(this.newDeckName === '') {
			this.openModal()
		}
	}
}
</script>
