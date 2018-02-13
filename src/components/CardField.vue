<template>
	<div v-if="isImage(text, type)" class="image-container">
		<img :src="text" alt="" class="card-image">
	</div>
	<div v-else :class="[contentTextSize, 'q-a-text']">{{text}}</div>
</template>

<script>
export default {
	name: 'card-list-field',
	props: ['text', 'type'],
	methods: {
		isImage: function(text, type) {
			return text.match(/\.(jpg|jpeg|gif|png)$/) != null || type === 'image'
		}
	},
	computed: {
		contentTextSize: function() {
			let textLen = this.text.split('').length
			if(textLen > 200) {
				return 'text-xs'
			}
			if(textLen > 150) {
				return 'text-sm'
			}
			if(textLen > 100) {
				return 'text-md'
			}
			if(textLen > 80) {
				return 'text-lg'
			}
		}
	}
}
</script>

<style scoped>
	.text-xs {
		font-size: 16px;
		line-height: 1em;
	}
	.text-sm {
		font-size: 0.5em;
		line-height: 1em;
	}
	.text-md {
		font-size: 0.65em;
		line-height: 1em;
	}
	.text-lg {
		font-size: 1em;
	}
	.card-image {
		height: 100%;
		width: 100%;
	}
	.image-container {
		height: calc(100% - 50px);
		width: 100%;
		top: 48px;
		left: 0;
	}
</style>
