<template>
  <div class="snippets">		
		<div class="containerItem" >
			<span class="pngButtons">
				<div class="item-1">
					<strong> Title: </strong> {{ snippetList.title }} 
				</div>
			<div class="item-2">
				<img src="https://lh3.googleusercontent.com/po8W-SGdfioV7CuxOB_7nrVYYJ6ENyGYr_VT0ys93YjOuC_KAMqVsUvB1oPl6mxmpWAH-rWMFpuUbdF7IYHXoCEvo-Jga0MrrpeAOpM1YzsSwPHC-WRpFcE7xM46C7EIGphDzgY3t1U=w2400" alt="trash" style="width:25px;height:25px;" @click="handleRemove" class="removeItem" :id="snippetList.id">
			</div>
			<div class="item-3">
				<img src="https://lh3.googleusercontent.com/P03ZHDA_k1hCUQCwalrhIpR9ZnvpbsAO7BjyqmoCLmTMoxA8sKvaSnnPU5FiLM_pLZ-3ZXtywh9k06E2hD6Tr8ggVFFuw8fB4dLRvZUDNEXytX1mt8kZhJMLD9i_4gMskE6NdPQBb9w=w2400" alt="Report snippet" style="width:10px;height:25px;" @click="handleReport"
				:id="snippetList.id"
				>
			</div>
			<div class="item-4"> 
				<img src="https://lh3.googleusercontent.com/3ox2JWHHFQ20YG_gZ6jrrWpPN1xdpUTd-QGGez-lLkbU_8azQtSWTCOK-LNl1nJ5HWD3FddztuVa_rjGe7fM7FbGvq40FP6dUte8sFRsQJ49Pvtzp6V30qcTUsunjk41lnL38cXNjyE=s225-p-k" alt="Thumb Up, Upvote" style="width:25px;height:25px;" :id="snippetList.id" v-debounce:2s="handleUpvote">
				{{ snippetList.score}} 
				<img v-debounce:2s="handleDownvote" :id="snippetList.id"   src="https://lh3.googleusercontent.com/vzinEGIlZUrW0zuVSO5uiMfbCwN6tzO2gibk_yB7VGzPi148W7-CZFu1Qjmr7Ox9AVD5c50KA3J7PCz34lCfulseHi5mcOQE0BUuArZv9-KAfzj-oqOVtR6C3Qqlf69eGbJndZwoMyc=s225-p-k" alt="Thumb down, Downvote" style="width:25px;height:25px;">
			</div>
			</span>
				<br> <hr> 
				<strong> Content: </strong> <p> 
				{{ snippetList.content}}  </p> 
		</div>
	</div>
</template>

<script src="https://unpkg.com/lodash.debounce@4.0.8/index.js"></script>
<script>
export default {
	name: 'ShowSnippets',
	props: {
		snippetList: Object(null),
	},
	data: () => ({
		snippetId: Number,
		toShow: false,		
	}),
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
		handleUpvote(thumbup, val, e){
			console.log(val.target.id);
			this.upvoteId = val.target.id;
			this.$emit('whatUpvote', this.upvoteId);
			this.snippetList.score += 1;			
		},
		handleDownvote(thumbdown, val, e){
			console.log(val.target.id);
			this.downvoteId = val.target.id;
			this.$emit('whatDownvote', this.downvoteId);
			this.snippetList.score -= 1;
		},	
	}
}
</script>

<style scoped>
/* texten i vita rutor */
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