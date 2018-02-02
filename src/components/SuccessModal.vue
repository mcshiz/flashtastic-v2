<template>
	<!-- Modal -->
	<div class="modal fade" id="successModal" tabindex="-1" role="dialog" aria-labelledby="successModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title text-success" id="successModalLabel">{{successTitle}}</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					{{successMessage}}
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
	name: 'SuccessModal',
	computed: {
		...mapState(['successMessage', 'successTitle']),
		showModal: function() { return this.$store.state.successMessage === '' }
	},
	watch: {
		showModal: function(val) {
			if (!val) {
				$('#successModal').modal()
			}
		}
	},
	mounted() {
		const that = this
		$('#successModal').on('hidden.bs.modal', function (e) {
			that.$store.dispatch('RESET_SUCCESS')
		})
	}

}
</script>
