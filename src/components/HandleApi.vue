<template>
	<div>
		<div class="nav">
		<button @click="snippetAdder">Add snippet</button><button @click="seeLatest">Show latest</button><button @click="bestScore">Higest score</button><button @click="seeReported">Reported snippets</button>
		</div>
		
		<div class="getSnippets" v-if="showLatest">
			<button @click="fetchFromAPI">Fetch from api</button>
			<ShowSnippets @whatId="handleRemove($event)" v-bind:snippetList="snippets" v-for="snippets in latestSnippets" :key="snippets.id"/>
		</div>

		<div class="getSnippets" v-if="addSnippet">
			<AddSnippet/>
			<button>Add awesome code</button>
		</div>

	</div>
</template>

<script>
import axios from 'axios';
import ShowSnippets from './ShowSnippets'
import AddSnippet from './AddSnippet'
export default {
	name: 'HandleApi',
	components: {
		ShowSnippets,
		AddSnippet
	},
	
	data: () => ({
		latestSnippets: [],
		idToRemove: Number,
		baseURL: 'https://www.forverkliga.se/JavaScript/api/api-snippets.php',
		showLatest: false,
		addSnippet: false,
		higestScore: false,
		reported: false,
	}),
	methods:{
		seeLatest(){
			this.showLatest = true;
			this.addSnippet = false;
			this.higestScore = false;
			this.reported = false;
		},
		snippetAdder(){
			this.showLatest = false;
			this.addSnippet = true;
			this.higestScore = false;
			this.reported = false;
		},
		bestScore(){
			this.showLatest = false;
			this.addSnippet = false;
			this.higestScore = true;
			this.reported = false;
		},
		seeReported(){
			this.showLatest = false;
			this.addSnippet = false;
			this.higestScore = false;
			this.reported = true;
		},



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
		},
		handleRemove(emittedId){			
			this.idToRemove = emittedId
			console.log(this.idToRemove);

			const params = new URLSearchParams();
			params.append("delete", null);
			params.append('id', this.idToRemove);

			this.$http.post('https://www.forverkliga.se/JavaScript/api/api-snippets.php',  params)
				.then((Response) => {
					console.log(Response);
					console.log(Response.headers);
					this.latestSnippets = this.latestSnippets.filter(
							latestSnippets => latestSnippets.id != this.idToRemove,
						);
						console.log(Response)
				})
		}
	}
}
</script>

<style>
.nav{
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
.nav > button{
	padding: 0.3em 1em 0.3em;
	border-radius: 30px;
	border: 3px solid lightgrey;
	margin-bottom: 1.5em;
}
.nav > button:hover{
	cursor: pointer;
	border: 3px solid yellowgreen;
}
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