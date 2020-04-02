<template>
	<div class="snippets1">
		<div class="containerItem">
			Title:  <hr>
			<input type="text" id="titleInput" placeholder="Enter title here!" v-model="form.titleInput" >
			<p>Your Code:</p> <hr>
			<textarea placeholder="Code awesome goes here!" id="" cols="70" rows="17" v-model="form.contentInput"></textarea>
		</div>
			<button @click="emitForm">Add awesome code</button>
	</div>
</template>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
import $ from 'jquery'
import jQuery from "jquery";
export default {
	name: 'AddSnippet',
	data: () => ({
		form: [
		{titleInput: ''},
		{contentInput: ''}
		]
	}),
	mounted () {
		$('textarea')
		.focus(function() { $(this).css("background", "none") })
		.blur(function() { if ($(this)[0].value == '') { $(this).css("background", "url(../assets/codeIcon.png) center center no-repeat") } });
	},
	methods: {
		emitForm(){
			this.$emit('whatForm', this.form)
			console.log(this.form);
		}
	}
}
</script>

<style scoped>
	textarea{
		background: url(../assets/codeIcon.png) center center no-repeat; /* This ruins default border */
		border: 1px solid #888;
		outline: none;
		-moz-outline: none;
	}
	#titleInput{
		width: 33vw;
		height: 2em;
		margin-bottom: 2em;
		
	}
	p{
		padding-bottom: 0;
		margin-bottom: 2px;
	}
	.snippets1{ 
	background-color: rgb(0, 0, 0);
	width: 75vw;
	margin: auto;
	border-radius: 20px;
	padding: 2em 0px 0.5em;
	color: white;
}
.snippets1:nth-child(1){
	padding-top: 1em;
}
	.snippets1 > button{
	padding: 1em 4em 1em;
	border-radius: 30px;
	border: 3px solid lightgrey;
	text-align: center;	
	}
	.snippets1 > button:hover{
	cursor: pointer;
	border: 3px solid yellowgreen;
}
</style>