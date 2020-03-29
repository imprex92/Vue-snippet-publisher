<template>
  <div class="getSnippets">
		<button @click="fetchFromAPI">Fetch from api</button>
		<ShowSnippets v-bind:snippetList="snippets" v-for="snippets in latestSnippets" :key="snippets.id"/>
	</div>
</template>

<script>
import axios from 'axios';
import ShowSnippets from './ShowSnippets'
export default {
	name: 'HandleApi',
	components: {
		ShowSnippets
	},
	
	data: () => ({
		latestSnippets: [],
	}),
	methods:{
		fetchFromAPI(){
			axios.get('https://www.forverkliga.se/JavaScript/api/api-snippets.php?latest')
			.then((Response) => {
				console.log(Response);
				console.log(Response.data);
				this.latestSnippets = Response.data;			
				console.log(Response.status);
				console.log(Response.config);
				console.log(this.latestSnippets);
			})
			
			
		}
	}
}
</script>

<style>
.getSnippets {
	text-align: center;
}
.getSnippets > button{
	padding: 1em 4em 1em;
	border-radius: 30px;
	border: 3px solid lightgrey;
	
}
.getSnippets > button:hover{
	cursor: pointer;
	border: 3px solid yellowgreen;
}
</style>