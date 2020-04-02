<template>
	<div>
		<div class="nav">
			<button @click="snippetAdder" v-bind:class="{active: addSnippet}">Add snippet</button>
			<button @click="seeLatest" v-bind:class="{active: showLatest}">Show latest</button>
			<button @click="bestScore" v-bind:class="{active: higestScore}">Higest score</button>
			<button @click="seeReported" v-bind:class="{active: reported}">Reported snippets</button>
		</div>

		<div class="getSnippets" v-if="showLatest">
			<button @click="fetchFromAPI">Fetch from api</button>
			<ShowSnippets
				@whatId="handleRemove($event)"
				@whatReport="handleReport($event)"
				@whatUpvote="handleUpvote($event)"
				@whatDownvote="handleDownvote($event)"
				v-bind:snippetList="snippets"
				v-for="snippets in latestSnippets"
				:key="snippets.id"
			/>
		</div>

		<div class="getSnippets" v-if="addSnippet">
			<AddSnippet @whatForm="handleAdd($event)" />
			<span class="uploadedSpan">{{uploadMessage}}</span>
		</div>

		<div class="getSnippets" v-if="higestScore">
			<button @click="fetchRankedAPI">Fetch Ranked</button>
			<RankedSnippets
				@whatId="handleRemove($event)"
				@whatReport="handleReport($event)"
				@whatUpvote="handleUpvote($event)"
				@whatDownvote="handleDownvote($event)"
				v-bind:rankedList="snippets"
				v-for="snippets in rankedSnippets"
				:key="snippets.id"
			/>
		</div>

		<div class="getSnippets" v-if="reported">
			<button @click="fetchReportedAPI">Fetch Reported</button>
			<ReportedSnippets
				@whatId="handleRemove($event)"
				@whatUndo="handleUnreport($event)"
				v-bind:reportedList="snippets"
				v-for="snippets in reportedSnippets"
				:key="snippets.id"
			/>
		</div>

		<span v-if="operationProgress" id="operationProgress">
			<p id="loading">
				Loading In Progress
				<span>.</span>
				<span>.</span>
				<span>.</span>
			</p>
		</span>
	</div>
</template>

<script>
import axios from "axios";
import ShowSnippets from "./ShowSnippets";
import AddSnippet from "./AddSnippet";
import RankedSnippets from "./RankedSnippets";
import ReportedSnippets from "./ReportedSnippets";
export default {
	name: "HandleApi",
	components: {
		ShowSnippets,
		AddSnippet,
		RankedSnippets,
		ReportedSnippets
	},

	data: () => ({
		formFromChild: [],
		latestSnippets: [],
		rankedSnippets: [],
		reportedSnippets: [],
		idToRemove: Number,
		baseURL: "https://www.forverkliga.se/JavaScript/api/api-snippets.php",
		showLatest: false,
		addSnippet: false,
		higestScore: false,
		reported: false,
		uploadMessage: "",
		operationProgress: false,	
	}),
	methods: {
		seeLatest() {
			this.showLatest = true;
			this.addSnippet = false;
			this.higestScore = false;
			this.reported = false;
		},
		snippetAdder() {
			this.showLatest = false;
			this.addSnippet = true;
			this.higestScore = false;
			this.reported = false;
		},
		bestScore() {
			this.showLatest = false;
			this.addSnippet = false;
			this.higestScore = true;
			this.reported = false;
		},
		seeReported() {
			this.showLatest = false;
			this.addSnippet = false;
			this.higestScore = false;
			this.reported = true;
		},
		fetchFromAPI() {
			this.operationProgress = true;
			axios
				.get(
					"https://www.forverkliga.se/JavaScript/api/api-snippets.php?latest"
				)
				.then(Response => {
					this.latestSnippets = Response.data;
					this.operationProgress = false;
				})
				.catch(error => {
					console.log(error.data);
				});
		},
		fetchRankedAPI() {
			this.operationProgress = true;
			axios
				.get("https://forverkliga.se/JavaScript/api/api-snippets.php?best")
				.then(Response => {
					this.rankedSnippets = Response.data;
					this.operationProgress = false;
				})
				.catch(error => {
					console.log(error.data);
				});
		},
		fetchReportedAPI() {
			this.operationProgress = true;
			axios
				.get("https://forverkliga.se/JavaScript/api/api-snippets.php?reported")
				.then(Response => {
					this.reportedSnippets = Response.data;
					this.operationProgress = false;
				})
				.catch(error => {
					console.log(error.data);
				});
		},
		handleRemove(emittedId) {
			this.idToRemove = emittedId;
			console.log(this.idToRemove);

			const params = new URLSearchParams();
			params.append("delete", null);
			params.append("id", this.idToRemove);

			this.$http
				.post(this.baseURL, params)
				.then(Response => {
					console.log(Response);
					this.latestSnippets = this.latestSnippets.filter(
						latestSnippets => latestSnippets.id != this.idToRemove
					);

					this.rankedSnippets = this.rankedSnippets.filter(
						rankedSnippets => rankedSnippets.id != this.idToRemove
					);
					this.reportedSnippets = this.reportedSnippets.filter(
						reportedSnippets => reportedSnippets.id != this.idToRemove
					);
				})
				.catch(error => {
					console.log(error.data);
				});
		},		
		handleReport(emittedReportId) {
			this.idToReport = emittedReportId;
			console.log(this.idToReport);
			
			const params = new URLSearchParams();
			params.append('report', null);
			params.append('id', this.idToReport);

			this.$http
				.post(this.baseURL, params)
				.then(Response => {
					this.latestSnippets = this.latestSnippets.filter(
						latestSnippets => latestSnippets.id != this.idToReport
					);
					console.log(Response);

					this.rankedSnippets = this.rankedSnippets.filter(
						rankedSnippets => rankedSnippets.id != this.idToReport
					);
				})
		},
		handleUnreport(emittedUnreportId) {
			this.idToUnreport = emittedUnreportId;
			console.log(this.idToUnreport);

			const params = new URLSearchParams();
			params.append("unreport", null);
			params.append("id", this.idToUnreport);
			this.$http
				.post(this.baseURL, params)
				.then(Response => {
					console.log(Response);
					console.log(Response.headers);
					this.reportedSnippets = this.reportedSnippets.filter(
						reportedSnippets => reportedSnippets.id != this.idToUnreport
					);
				})
				.catch(error => {
					console.log(error.data);
				});
		},
		handleUpvote(emittedUpvoteId){
			this.idToUpvote = emittedUpvoteId;
			const params = new URLSearchParams();
			params.append('upvote', null);
			params.append('id', this.idToUpvote);

			this.$http
			.post(this.baseURL, params)
			.then(Response => {
				console.log(Response);				
			})
			.catch(error => {
				console.log(error.data);						
			});
		},
		handleDownvote(emittedDownvoteId){
			this.idToDownvote = emittedDownvoteId;
			console.log('emitted id', this.idToDownvote);
			
			const params = new URLSearchParams();
			params.append('downvote', null);
			params.append('id', this.idToDownvote);

			this.$http
			.post(this.baseURL, params)
			.then(Response => {
				console.log(Response);				
			})
			.catch(error => {
				console.log(error.data);				
			})
		},
		handleAdd(emittedForm) {
			this.formFromChild = emittedForm;
			const params = new URLSearchParams();
			params.append("add", null);
			params.append("title", this.formFromChild.titleInput);
			params.append("content", this.formFromChild.contentInput);
			params.append("tags", "tag1");

			axios
				.post(this.baseURL, params)
				.then(Response => {
					console.log(Response.data);
					this.uploadMessage = "Snippet sucessfully uploaded!";
				})
				.catch(error => {
					console.log(error.data);
					this.uploadMessage = "An error has accrued" + error.data;
				});
		},
	},
};
</script>

<style>
.active{
	border: 3px solid blueviolet;
	padding: 0.3em 1em 0.3em;
	border-radius: 30px;
	margin-bottom: 1.5em;
}
.nav {
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
}
.nav > button {
	padding: 0.3em 1em 0.3em;
	border-radius: 30px;
	/* border: 3px solid lightgrey; */
	margin-bottom: 1.5em;
}
.nav > button:hover {
	cursor: pointer;
	border: 3px solid yellowgreen;
}
.getSnippets {
	text-align: center;
}
.getSnippets > button {
	padding: 1em 4em 1em;
	border-radius: 30px;
	border: 3px solid lightgrey;
}
.getSnippets > button:hover {
	cursor: pointer;
	border: 3px solid yellowgreen;
}

/* Loading animations below */

@keyframes opacity {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
@-moz-keyframes opacity {
	0% {
		opacity: 1;
	}
	100% {
		opacity: 0;
	}
}
#operationProgress {
	color: rgb(100, 255, 86);
	font-weight: 600;
}
#loading {
	text-align: center;
	margin: 100px 0 0 0;
	font-size: 1.5em;
}

#loading span {
	animation-name: opacity;
	animation-duration: 1s;
	animation-iteration-count: infinite;

	-moz-animation-name: opacity;
	-moz-animation-duration: 1s;
	-moz-animation-iteration-count: infinite;
}

#loading span:nth-child(2) {
	animation-delay: 100ms;
	-moz-animation-delay: 100ms;
}

#loading span:nth-child(3) {
	animation-delay: 300ms;
	-moz-animation-delay: 300ms;
}
@media (max-width: 230px){
	.getSnippets > button {
	padding: 1em 1.9em 1em;
	border-radius: 30px;
	border: 3px solid lightgrey;
}
	.getSnippets > button:hover {
		cursor: pointer;
		border: 3px solid yellowgreen;
	}
}

@media (max-width: 400px) {
	.nav {
		display: flex;
		flex-direction: column;
		justify-content: space-evenly;
	}
	.nav > button {
		padding: 0.3em 1em 0.3em;
		border-radius: 30px;
		/* border: 3px solid lightgrey; */
		margin-bottom: 1.5em;
	}
	.nav > button:hover {
		cursor: pointer;
		border: 3px solid yellowgreen;
	}
}

</style>