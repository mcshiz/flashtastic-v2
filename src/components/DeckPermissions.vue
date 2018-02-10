<template>
	<div class="col-12 col-sm-6 mb-4 text-md-right">
		<select name="deckPermissions" id="deckPermissions" v-model="tmpPermissions" v-on:change="save(tmpPermissions)">
			<option value="private">Private - Only I can use this deck</option>
			<option value="public">Public - Let everyone use this deck</option>
		</select>
	</div>
</template>

<script>
export default {
	name: 'deck-permissions',
	props: ['permissions', 'save'],
	data() {
		return {
			tmpPermissions: this.permissions
		}
	}
}
</script>

<style scoped>

</style>
