<template>
	<span v-if="isImage(text, type)">
		<img :src="text" alt="" height="200" width="200">
	</span>
	<span v-else>{{text}}</span>
</template>

<script>
export default {
	name: 'card-list-field',
	props: ['text', 'type'],
	methods: {
		isImage: function(text, type) {
			return text.match(/\.(jpg|jpeg|gif|png)$/) != null || type === 'image'
		}
	}
}
</script>

<style scoped>

</style>
