<template>
	<div class="snippets">
		<div class="containerItem">
			Title: <hr>
			<input type="text" id="titleInput" placeholder="  Enter title here!">
			<p>Your Code:</p> <hr>
			<textarea placeholder=" Code awesome goes here!" id="" cols="70" rows="17"></textarea>
		</div>
	</div>
</template>
<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
<script>
import $ from 'jquery'
export default {
	name: 'AddSnippet',
	mounted () {
   $('textarea')
  .focus(function() { $(this).css("background", "none") })
  .blur(function() { if ($(this)[0].value == '') { $(this).css("background", "url(../assets/codeIcon.png) center center no-repeat") } });
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
</style>