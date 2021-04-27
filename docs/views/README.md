---
title: 概览
sidebar: true
date: 2020-03-21
sidebarDepth: 0
isShowComments: true
---

<div style="height: 120px">
	<Boxx :changeTime='changeTime' />
</div>

<div id='category'>

[【分类】](/categories/)

</div>

<div id='tag'>

[【标签】](/tag/)

</div>

<div id='fj'>

[【电子设计类】](/views/ee/star.html) | [【AI及大数据类】](/views/AI/2020baidustar.html)| [【计算机技术类】](/views/cs/GlimmerOS.html) 

</div>

<div id='se'>

 [【游戏设计类】](/views/game/16.html) | [【笔记类】](/views/notes/git.html)|[【杂谈】](/views/freetalk/wsl.html)|[【算法类】](/views/algorithm/otsu.html)

</div>

<script>
	export default {
		data() {
			return {
                changeTime: '2000',
                index: 2,
			}
		},
		mounted() {
			this.updateTime(this.changeTime);
		},
		methods: {
			updateTime(time) {
				setInterval(() => {
			      if (this.index%2 == 0) {
			      	this.changeTime = '300'
			      }
			      if (this.index%2 != 0) {
			      	this.changeTime = time
			      }
			      this.index++;
			    }, 6000)
			}
		}

	}
</script>

<style lang='stylus' scoped> 
	.content__default:not(.custom) img {
	    max-width: 20% !important;
	    margin-top: -10px;
	    //padding-left: 26%;
	}
	#category {
		width:100px;
		height:100px;
		float: right;
		background:#ffff0059;
		transition:width 2s;
		-moz-transition:width 2s; /* Firefox 4 */
		-webkit-transition:width 2s; /* Safari and Chrome */
		-o-transition:width 2s; /* Opera */
	}

	#category:hover {
		width:300px;
	}
	
	#tag {
		width:100px;
		height:100px;
		float: right;
		background:#ffff0059;
		transition:width 2s, height 2s;
		-moz-transition:width 2s, height 2s, -moz-transform 2s; /* Firefox 4 */
		-webkit-transition:width 2s, height 2s, -webkit-transform 2s; /* Safari and Chrome */
		-o-transition:width 2s, height 2s, -o-transform 2s; /* Opera */
	}
	
	#tag:hover {
		width:100px;
		height:100px;
		transform:rotate(360deg);
		-moz-transform:rotate(360deg); /* Firefox 4 */
		-webkit-transform:rotate(360deg); /* Safari and Chrome */
		-o-transform:rotate(360deg	); /* Opera */
	}
	
	#category p,#tag p {
		    margin: 0;
		    padding-top: 35px;
		    padding-left: 15px;
		    /*padding-right: 15px;*/
		    font-size: 16px;
	}
	
	#fj,#se {
		margin-top: 27px;
	}
	
	@media screen and (max-width: 960px){
		.content__default:not(.custom) img {
		    max-width: 35% !important;
		    margin: 17px;
		    padding-left: 26%;
		}
		#fj {
			font-size: 14px;
			margin-top: 28px;
		}
		#se {
			font-size: 14px;
		}
		#category {
			width:100px;
			height:100px;
			float: right;
			background:#ffff0059;
			transition:width 2s, height 2s;
			-moz-transition:width 2s, height 2s, -moz-transform 2s; /* Firefox 4 */
			-webkit-transition:width 2s, height 2s, -webkit-transform 2s; /* Safari and Chrome */
			-o-transition:width 2s, height 2s, -o-transform 2s; /* Opera */
		}
		#category:hover {
			width:100px;
			height:100px;
			transform:rotate(360deg);
			-moz-transform:rotate(360deg); /* Firefox 4 */
			-webkit-transform:rotate(360deg); /* Safari and Chrome */
			-o-transform:rotate(360deg	); /* Opera */
		}
	}
	
	@media screen and (max-width: 360px){
		#fj {
			font-size: 12px;
			margin-top: 28px;
		}
		#se {
			font-size: 12px;
		}
	}
	@media screen and (max-width: 320px){
		#fj {
			font-size: 12px;
			margin-top: 26px;
		}
		#se {
			font-size: 12px;
			margin-top: -10px;
		}
	}
</style>


