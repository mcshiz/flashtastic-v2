<template>
	<div class="col-12 col-sm-6 mt-4 mb-4">
		<select name="deckPermissions" id="deckPermissions" v-model="permissions" v-on:change="save">
			<option value="private">Private - Only I can use this deck</option>
			<option value="public">Public - Let everyone use this deck</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'deck-permissions',
	props: ['deckPermissions', 'save'],
	data() {
		return {
			permissions: this.deckPermissions
		}
	}
}
</script>

<style scoped>

</style>
