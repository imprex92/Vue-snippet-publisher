<template>
	<div class="snippets">		
		<div class="containerItem" >
			<span class="pngButtons">
				<div class="item-1">
					<strong> Title: </strong> {{ rankedList.title }} 
				</div>
				<div class="item-2">
					<img src="../assets/trash-can.png" alt="trash" style="width:25px;height:25px;" @click="handleRemove" class="removeItem" :id="rankedList.id">
				</div>
				<div class="item-3">
					<img src="../assets/exclamation-mark.png" alt="Report snippet" style="width:10px;height:25px;" :id="rankedList.id">
				</div>
				<div class="item-4"> 
					<img src="../assets/thumbup.png" alt="Thumb Up, Upvote" style="width:25px;height:25px;" :id="rankedList.id" v-debounce:2s="handleUpvote">
					{{ rankedList.score}}
					<img src="../assets/thumbdown.png" alt="Thumb Down, Downvote" style="width:25px;height:25px;" :id="rankedList.id" v-debounce:2s="handleDownvote">
				</div>
			</span>
				<br> <hr> 
				<strong> Content: </strong> <p> 
					{{ rankedList.content}}  </p> 
		</div>		
	</div>
</template>
<script src="https://unpkg.com/lodash.debounce@4.0.8/index.js"></script>
<script>
export default {
	name: 'RankedSnippets',
	props: {
		rankedList: Object(null)
	},
	methods: {
		handleRemove(trash){
			console.log(trash.target.id);
			this.snippetId = trash.target.id
			this.$emit('whatId', this.snippetId)
		},
		handleReport(exclamation){
			console.log(exclamation.target.id);
			this.reportId = exclamation.target.id;
			this.$emit('whatReport', this.reportId);
		},
		handleUpvote(thumbup, val){
			console.log(val.target.id);
			this.upvoteId = val.target.id;
			this.$emit('whatUpvote', this.upvoteId);
			this.snippetList.score += 1;			
		},
		handleDownvote(thumbdown, val){
			console.log(val.target.id);
			this.downvoteId = val.target.id;
			this.$emit('whatDownvote', this.downvoteId);
			this.snippetList.score -= 1;
		},	
	}
}
</script>

<style >
.pngButtons{
	display: flex;	
}
.pngButtons .item-1{
	flex-grow: 30;
}
.pngButtons .item-2{
	flex-grow: 1;
}
.pngButtons .item-3{
	flex-grow: 1;
}
.pngButtons .item-4{
	flex-grow: 1;
}
.snippets{ 
	background-color: rgb(0, 0, 0);
	width: 75vw;
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
	width: 60vw;
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
img:hover{
	cursor: pointer;
}
</style>