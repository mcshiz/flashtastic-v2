<template>
<div class="content" v-if="workingDeck">
	<div class="row">
		<div class="col-12">
			<h1>{{workingDeck.name}}</h1>
		</div>
	</div>
	<div class="row">
		<div class="col-12 col-md-10 col-lg-6">
			<ul class="row scoreCards justify-content-center mb-0">
				<li @click="goToCardNumber(index)" v-for="(card, index) in scoreCards" v-bind:key="index"  v-bind:class="{'active': currentIndex === index, 'm-2': true}">
					<div v-if="card.result === 'correct'" ><i class="text-success fa fa-check align-self-center"></i></div>
					<div v-else-if="card.result === 'incorrect'"><i class=" text-danger fa fa-close align-self-center"></i></div>
					<div v-else></div>
				</li>
			</ul>
			<card :cards="workingDeck.cards" :currentIndex="currentIndex" :currentKey="currentKey" :markScore="markScore" :goToCardNumber="goToCardNumber" :showAnswer="showAnswer" @flip-card="flipCard"></card>
		</div>
		<div class="col-12 col-md-2">
			<score v-bind:score="{correct: score.correct, incorrect: score.incorrect}" :scores="workingDeck.scores"></score>
			<button class='btn ripple btn-danger' v-on:click="reset()"><i class="fa fa-refresh" aria-hidden="true"></i>Reset</button>
		</div>
	</div>
	<div class="modal fade" id="quizCompleteModal" tabindex="-1" role="dialog"  aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title">All Done</h5>
				</div>
				<div class="modal-body">
					<div>Correct - {{score.correct}}</div>
					<div>Incorrect - {{score.incorrect}}</div>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn ripple btn-secondary" @click="goToDeckList">Deck List</button>
					<button type="button" class="btn ripple btn-primary save" @click="reset">Retry</button>
				</div>
			</div>
		</div>
	</div>
</div>
<div class="loading" v-else>Loading...</div>
</template>
<script>
import Score from './Score'
import Card from './Card'
import { mapState } from 'vuex'
import $ from 'jquery'
export default {
	name: 'Quiz',
	props: ['id', 'name', 'deck'],
	data() {
		return {
			showAnswer: false,
			currentIndex: 0,
			scoreCards: {}
		}
	},
	mounted() {
		let tmp = Object.assign({}, this.workingDeck.cards)
		this.scoreCards = Object.keys(tmp).map((key) => {
			tmp[key].result = ''
			this.$set(tmp[key], 'result', '')
			return tmp[key]
		})
	},
	computed: {
		...mapState(['workingDeck', 'authenticated']),
		score: function() {
			let correct = 0
			let incorrect = 0
			for(let key in this.scoreCards) {
				let card = this.scoreCards[key]
				card.result === 'correct' && correct++
				card.result === 'incorrect' && incorrect++
			}
			return {'correct': correct, 'incorrect': incorrect}
		},
		deckLength: function() {
			return Object.keys(this.workingDeck.cards).length
		},
		currentKey: function() {
			return Object.keys(this.workingDeck.cards)[this.currentIndex]
		}
	},
	methods: {
		flipCard: function(value) {
			this.showAnswer = value
		},
		goToDeckList: function() {
			$('#quizCompleteModal').modal('hide')
			this.$router.push({name: 'Home'})
		},
		goToCardNumber: function(index) {
			if(Object.keys(this.workingDeck.cards)[index] !== 'undefined') {
				this.currentIndex = index
			}
		},
		markScore: function(result) {
			this.$set(this.scoreCards[this.currentIndex], 'result', result)
			this.scoreCards = Object.assign({}, this.scoreCards)
			let totalScored = 0
			for(let key in this.scoreCards) {
				if(this.scoreCards[key].result !== '') {
					totalScored++
				}
				if(totalScored === this.deckLength && this.authenticated) {
					this.$store.dispatch('SAVE_SCORE', this.score)
					$('#quizCompleteModal').modal()
				}
			}
		},
		reset: function() {
			this.currentIndex = 0
			for(let key in this.scoreCards) {
				this.scoreCards[key].result = ''
			}
			this.score.correct = 0
			this.score.incorrect = 0
			this.showAnswer = false
			$('#quizCompleteModal').modal('hide')
		}
	},
	components: {
		'score': Score,
		'card': Card
	}
}
</script>
<style>
.score.incorrect {
	background: red !important;
}
.score.correct {
	background: green !important;
}
.card-nav {
	width: 5em;
}
.scoreCards{
	list-style-type: none;
}
.scoreCards li {
	height: 30px;
	width:30px;
	border:1px solid black;
	cursor: pointer
}
.scoreCards li div {
	display: flex;
	height: 100%;
}
.scoreCards li div i {
	font-size: 30px;
	display: flex;
	justify-content: center;
	align-content: center;
	width: 100%;
}

.scoreCards li.active{
	background-color: #d8ffe6;

}
</style>
