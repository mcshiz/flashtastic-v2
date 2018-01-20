<template>
	<div id="app" class="container-fluid">
		<router-view/>
		<error-modal/>
		<nav-bar />
	</div>
</template>
<script>
import Navigation from './components/Navigation'
import ErrorModal from './components/ErrorModal'
export default {
	name: 'App',
	components: {
		'error-modal': ErrorModal,
		'nav-bar': Navigation
	}
}
</script>

<style lang="css">
	#app {
		font-family: 'Avenir', Helvetica, Arial, sans-serif;
		-webkit-font-smoothing: antialiased;
		-moz-osx-font-smoothing: grayscale;
		text-align: center;
		color: #2c3e50;
		position: absolute;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		overflow: auto;
	}
	html {
		height: 100%;
		box-sizing: border-box;
	}

	*,
	*:before,
	*:after {
		box-sizing: inherit;
	}

	body {
		position: relative;
		margin: 0;
		padding-bottom: 6rem;
		min-height: 100%;
		font-family: "Helvetica Neue", Arial, sans-serif;
	}
	@import "~bootstrap";

</style>
