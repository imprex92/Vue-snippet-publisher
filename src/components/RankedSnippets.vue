<template>
	<div class="snippets">		
		<div class="containerItem" >
			<strong> Title: </strong> {{ rankedList.title }} <button  @click="handleRemove" class="removeItem" :id="rankedList.id">remove</button> <img src="../assets/thumbup.png" alt="Thumb Up, Upvote" style="width:25px;height:25px;"> <br> <hr> <strong> Content: </strong> <p> {{ rankedList.content}}  </p> 
		</div>		
	</div>
</template>

<script>
export default {
	name: 'RankedSnippets',
	props: {
		rankedList: Object(null)
	},
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

</style>