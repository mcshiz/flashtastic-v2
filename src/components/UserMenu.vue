<template>
	<button v-if="authenticated">Sign Out</button>
	<button v-else>Sign In With Google</button>
</template>
<script>
import { mapState } from 'vuex'

export default {
	name: 'Home',
	computed: {
		...mapState(['authenticated', 'user'])
	}
}
</script>
