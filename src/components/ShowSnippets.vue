<template>
  <div class="snippets">		
		<div class="containerItem" >
			<strong> Title: </strong> {{ snippetList.title }} <button  @click="handleRemove" class="removeItem" :id="snippetList.id">remove</button> <img src="../assets/thumbup.png" alt="Thumb Up, Upvote" style="width:25px;height:25px;"> <br> <hr> <strong> Content: </strong> <p> {{ snippetList.content}}  </p> 
		</div>		
	</div>
</template>

<script>
export default {
	name: 'ShowSnippets',
	props: {
		snippetList: Object(null)
	},
	data: () => ({
		snippetId: Number,
		toShow: false
	}),
	methods: {
		handleRemove(button){
			console.log(button.target.id);
			this.snippetId = button.target.id
			this.$emit('whatId', this.snippetId)
		}
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
	padding: 2em 0px 0.5em;
	color: white;
	text-align: left;
}
.snippets:nth-child(1){
	padding-top: 1em;
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
	.containerItem > button{
		padding: 0.5em 2em 0.5em;
		border-radius: 30px;
		border: 3px solid lightgrey;
	}
	.containerItem:first-child{
		margin-top: 1em;
	}
	.containerItem > p{
		padding-bottom: 1em;
	}
	.removeItem:hover{
		cursor: pointer;
		border: 3px solid yellowgreen;
	}
</style>