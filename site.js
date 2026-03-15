
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
	//fetches the info from the url
	const questions = fetch(url)
		.then(results => results.json())
		//takes out the question and answers, shuffles the answers, and outputs them
		.then(json => {	const { question, correct_answer: correct, incorrect_answers: incorrect } = json.results[0]
			const answers = shuffle([ ...incorrect, correct ])
			return { question, answers, correct }})
	return questions
	}
	// todo: create your "renderQuestion" function
	const renderQuestion = ({ question, answers, correct }) => {
		//clearing the answers
		answersElement.innerHTML = " ";
		//outputting the question
		questionElement.textContent = decodeHtml(question)
		//creating the answer buttons
		answers.forEach(answers => {
			const bttn = document.createElement('button')
            bttn.textContent = answers
			answersElement.appendChild(bttn)
			//event listener for each button that checks if the answer was correct
			bttn.addEventListener("click", () => {
				const text = event.target.textContent;
				if (text === correct) {
				bttn.classList.add('correct')
				answersElement.querySelectorAll('button').forEach(b => b.disabled = true)
				alert('Correct!')
				return
				}
				bttn.disabled = true
				alert('Incorrect!')
			})
		})
	}
	//rendering the initial page
	renderQuestion(await getNextQuestion())
	// todo: add the event listener to the "nextQuestion" button

	nextQuestionElement.addEventListener("click", async() => {
		//renders a new question and timesout the next question button
		renderQuestion(await getNextQuestion())
		nextQuestionElement.disabled = true
		setTimeout(() => nextQuestionElement.disabled = false, 10000)
	})
})()

// mimic a click on the "nextQuestion" button to show the first question
nextQuestionElement.click()
