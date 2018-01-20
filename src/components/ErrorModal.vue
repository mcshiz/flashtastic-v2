<template>
	<!-- Modal -->
	<div class="modal fade" id="errorModal" tabindex="-1" role="dialog" aria-labelledby="errorModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="errorModalLabel">Error</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					{{errorMessage}}
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>

</template>
<script>
import { mapState } from 'vuex'
import $ from 'jquery'
export default {
	name: 'ErrorModal',
	computed: {
		...mapState(['errorMessage']),
		showModal: function() { return this.$store.state.errorMessage === '' }
	},
	watch: {
		showModal: function(val) {
			if (!val) {
				$('#errorModal').modal()
			}
		}
	},
	mounted() {
		const that = this
		$('#errorModal').on('hidden.bs.modal', function (e) {
			that.$store.dispatch('RESET_ERROR')
		})
	}

}
</script>
