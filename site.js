
// import the utility functions "decodeHtml" and "shuffle"
import { decodeHtml, shuffle } from './utils.js' 

// get the elements from the DOM
const questionElement = document.querySelector('#question')
const answersElement = document.querySelector('#answers')
const nextQuestionElement = document.querySelector('#nextQuestion')

// IIFE (so we can use async/await)
;(async () => {

	// todo: create your "getNextQuestion" function
	const getNextQuestion = async => { 
	const url = 'https://opentdb.com/api.php?amount=1&category=21&difficulty=easy&type=multiple'
	const json = JSON.parse(fetch(url))
		.then(response => response.json())
	const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
	const answers = shuffle([ ...incorrect, correct ])
	return { question, answers, correct }
	}
	console.log(await getNextQuestion())
	// // todo: create your "renderQuestion" function
	// const renderQuestion = ({ question, answers, correct }) => {
	// 	questionElement.textContent = decodeHtml(question)
	// 	answersElement.textContent = decodeHtml(answers)
	// 	console.log(correct)
	// }
	// todo: add the event listener to the "nextQuestion" button
})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
