<template>
  <div class="snippets">
		
		<div class="containerItem">
			<strong> Title: </strong> {{ snippetList.title }} <br> <hr> <strong> Content: </strong> <p> {{ snippetList.content}} </p> 
		</div>
		
	</div>
</template>

<script>
export default {
	name: 'ShowSnippets',
	props: {
		snippetList: Object(null)
	}
}
</script>

<style>
/* texten i vita rutor */
.snippets{ 
	background-color: rgb(0, 0, 0);
	width: 75%;
	margin: auto;
	border-radius: 20px;
	padding: 2em 0px 2em;
	color: white;
	text-align: left;
}
.containerItem{
		background-color: rgb(255, 255, 255);
		width: 60%;
		margin: auto;
		margin-bottom: 1em;
		border-radius: 20px;
		padding-left: 1em;
		padding-right: 1em;
		padding-top: 1em;
		color: black;
	}
	.containerItem:first-child{
		margin-top: 1em;
	}
	.containerItem > p{
		padding-bottom: 1em;
	}
</style>