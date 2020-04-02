<template>
	<div class="snippets">		
		<div class="containerItem" >
			<span class="pngButtons">
			<div class="item-1">
			<strong> Title: </strong> {{ reportedList.title }} 
			</div>
			<div class="item-2">
				<img src="../assets/trash-can.png" alt="trash" style="width:25px;height:25px;" @click="handleRemove" class="removeItem" :id="reportedList.id">
				</div>
				<div class="item-3">
				
				</div>
				<div class="item-4"> 
				<img  src="../assets/undo-arrow.png" alt="Undo report" style="width:25px;height:25px;" @click="handleUnreport" :id="reportedList.id">
				</div>
			</span>
			<br> <hr> 
			<strong> Content: </strong> <p> 
				{{ reportedList.content}}  </p> 
		</div>		
	</div>
</template>

<script>
export default {
	namn: 'ReportedSnippets',
	props: {
		reportedList: Object(null),
	},
	methods: {
		handleRemove(trash){
			console.log(trash.target.id);
			this.snippetId = trash.target.id
			this.$emit('whatId', this.snippetId)
		},
		handleUnreport(undoArrow){
			console.log(undoArrow.target.id);			
			this.undoId = undoArrow.target.id;
			this.$emit('whatUndo', this.undoId);
			
		}
	}
}
</script>

<style scoped>
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
	.removeItem:hover{
		cursor: pointer;
	}
</style>