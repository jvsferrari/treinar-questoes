const txt = document.querySelector('#txt');
const folder = document.querySelector('#folder');
const menu = document.querySelector('#menu');
const iniciar = document.querySelector('#iniciar');
const quiz = document.querySelector('#quiz');
const imageField = document.querySelector('#imageField');
const alternativas = document.querySelectorAll('.alternativa');
const back = document.querySelector('#back');
const next = document.querySelector('#next');
const numberDisplay = document.querySelector('#numberDisplay');

const questions = [];
let answers = [];
const tries = [];
let imageFiles = [];
let currentQuestion = 0;
let hasAnswered = false;

const genQuestion = (index, image, answer) => {
	return {
		index: index,
		number: index + 1,
		image: image,
		answer: answer,
		try: '',
		wasAnswered: false,
		isCorrect: false,
	};
};

alternativas.forEach((alternativa) => {
	alternativa.addEventListener('click', () => {
		questions[currentQuestion].try = alternativa.innerText;
		questions[currentQuestion].hasAnswered = true;
		if (alternativa.style.backgroundColor == 'rgb(235, 94, 40)') {
			alternativa.style.backgroundColor = '#403d39';
			questions[currentQuestion].try = '';
			questions[currentQuestion].wasAnswered = false;
			return;
		}
		alternativas.forEach((alternativa) => {
			alternativa.style.backgroundColor = '#403d39';
		});
		alternativa.style.backgroundColor = '#EB5E28';
		questions[currentQuestion].wasAnswered = true;
	});
});

txt.addEventListener('change', (event) => {
	const answersFile = event.target.files[0];
	if (!answersFile) {
		return;
	}
	const reader = new FileReader();

	reader.onload = (e) => {
		const fullText = e.target.result;

		answers = fullText.split(/\s+/).filter((word) => word.trim() !== '');
	};
	reader.readAsText(answersFile);
});

folder.addEventListener('change', (event) => {
	//target é quem recebeu a ação, o input
	imageFiles = event.target.files;
});

const refreshQuestion = () => {
	imageField.replaceChildren();
	imageField.appendChild(questions[currentQuestion].image);
	alternativas.forEach((alternativa) => {
		alternativa.style.backgroundColor = '#403D39';
	});
	questions[currentQuestion].try = '';
};

const refreshDisplay = () => {
	numberDisplay.innerText = currentQuestion + 1;
};

const goBack = () => {
	if (currentQuestion > 1) {
		currentQuestion--;
		refreshQuestion();
		refreshDisplay();
	}
};

const goForward = () => {
	if (currentQuestion < questions.length) {
		currentQuestion++;
		refreshQuestion();
		refreshDisplay();
	}
};

const start = () => {
	if (folder.files.length == 0 || txt.files.length == 0) {
		alert('Envie as respostas e as questões primeiro!');
		return;
	}
	numberDisplay.style.display = 'block';
	Array.from(imageFiles).forEach((imageFile, index) => {
		let imageElement = document.createElement('img');
		imageElement.src = URL.createObjectURL(imageFile);
		imageElement.title = imageFile.name;
		questions.push(genQuestion(index, imageElement, answers[index]));
	});
	quiz.style.display = 'flex';
	menu.style.display = 'none';
	refreshQuestion();
};

iniciar.addEventListener('click', start);

next.addEventListener('click', goForward);

back.addEventListener('click', goBack);

document.addEventListener('keydown', (e) => {
	if (menu.style.display == 'none' && quiz.style.display == 'flex')
		switch (e.key) {
			case 'ArrowLeft':
				currentQuestion--;
				refreshQuestion();
				break;
			case 'ArrowRight':
				currentQuestion++;
				refreshQuestion();
				break;
		}
});
