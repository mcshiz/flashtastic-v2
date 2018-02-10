<template>
	<div class="col-12 col-sm-6">
		<div class="row">
			<div class="col-12">
				<input type="text" class="form-control tags" placeholder="Up to 5 comma separated tags" id="deck-tags" @input="(event) => update(event)">
			</div>
		</div>
		<div class="row">
			<div class="col-12 mb-4 ml-3">
				<div class="row">
					<small v-if="!tagsArray.length" id="tagsHelp" class="form-text text-muted text-left">Tag this deck for easier finding later</small>
					<div v-else v-for="(tag, index) in tagsArray" :key="index" class="tag col-auto mt-2 mr-2">{{tag}} <i class="fa fa-close" @click="removeTag(index)"></i></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'deck-tagging',
	props: ['tags'],
	computed: {
		tagsArray: function() {
			return this.tags.split(',').filter((val) => {
				if(val !== '') {
					return val
				}
			})
		}
	},
	methods: {
		update: function(e) {
			if(this.tagsArray.length === 5) {
				return false
			}
			if(e.data === ',') {
				this.tagsArray.push(e.target.value.replace(',', ''))
				this.$emit('update-tags', this.tagsArray.join())
				e.target.value = ''
			}
		},
		removeTag: function(index) {
			let tmp = this.tagsArray.slice(0, index).concat(this.tagsArray.slice(index + 1))
			this.$emit('update-tags', tmp.join())
		}
	}
}
</script>

<style scoped>
.tag {
	border: 1px solid lightgrey;
	border-radius: 5px;
	padding: 2px 5px 0 5px;
	text-transform: capitalize;
	cursor: pointer;
	font-size: 0.8em;
 }
.tag i.fa-close {
	font-size: 0.75em;
	font-weight: 100;
	color: lightgrey;
	padding-right: 0;
	vertical-align: text-top;
}
.tag i.fa-close:hover {
	color: grey;
}
</style>
