<template>
	<div class="app">
		<HelloWorld helloMsg="Welcome to this Snippet Guru!"
					subMsg="- The only one you'd ever need!"/>
					<div class="snippets">
					<HandleApi/>
					</div>
	</div>
</template>

<script src="https://cdn.jsdlivr.net/npm/vue"></script>
<script>
import HelloWorld from './components/HelloWorld.vue'
import HandleApi from './components/HandleApi'
export default {
	name: 'App',
	components: {
		HelloWorld,
		HandleApi
	}
}
</script>

<style>
.app {
	font-family: Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;	
}

#imLoading{
	color: white;
}
</style>
