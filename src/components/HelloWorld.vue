<template>
	<div class="hello">
	<h1>{{ helloMsg }}</h1> <br> <h3> {{ subMsg }} </h3>
	</div>
</template>

<script>
export default {
	name: 'HelloWorld',
	props: {
	helloMsg: String,
	subMsg:String
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
	margin: 0;
	text-align: center;
}
.hello > h1{
	margin: 0;
}
.hello > h3{
	margin-top: -15px;
	margin-bottom: 2em;
}
</style>
