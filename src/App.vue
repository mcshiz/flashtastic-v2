<template>
	<div id="app">
		<div class="wrapper">
			<div class="main container clear-top">
				<router-view/>
				<error-modal/>
			</div>
		</div>
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
		position: relative;
		height: 100%;
		overflow-x: hidden;
	}
	.wrapper {
		padding-top: 40px;
		min-height: 100%;
	}
	@media screen and (max-width: 576px){
		.wrapper {
			padding-top: 10px;
		}

	}
	.main {
		max-height: 100%;
		overflow:scroll;
		padding-bottom:50px;
	}

	button.ripple {
		border: none;
		cursor: pointer;
		color: white;
	}

	/* Ripple magic */
	button.ripple {
		position: relative;
		overflow: hidden;
	}

	button.ripple:after {
		content: '';
		position: absolute;
		top: 50%;
		left: 50%;
		width: 5px;
		height: 5px;
		background: rgba(255, 255, 255, .5);
		opacity: 0;
		border-radius: 100%;
		transform: scale(1, 1) translate(-50%);
		transform-origin: 50% 50%;
	}

	@keyframes ripple {
		0% {
			transform: scale(0, 0);
			opacity: 1;
		}
		20% {
			transform: scale(25, 25);
			opacity: 1;
		}
		100% {
			opacity: 0;
			transform: scale(40, 40);
		}
	}

	button.ripple:focus:not(:active)::after {
		animation: ripple 1s ease-out;
	}
	.content {
		margin-bottom: 30px;
	}
	i.fa {
		padding: 0 5px;
	}
</style>
