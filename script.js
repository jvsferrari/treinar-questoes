txt = document.querySelector('#txt');
folder = document.querySelector('#folder');
menu = document.querySelector('#menu');
iniciar = document.querySelector('#iniciar');
quiz = document.querySelector('#quiz');

let questions = [];
let answers = [];
let imageFiles = [];

const genQuestion = (index, image, answer) => {
	return {
		index: index,
		number: index + 1,
		image: image,
		answer: answer,
	};
};

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

iniciar.addEventListener('click', () => {
	if (folder.files.length == 0 || txt.files.length == 0) {
		alert('Envie as respostas e as questões primeiro!');
		return;
	}
	Array.from(imageFiles).forEach((imageFile, index) => {
		let imageElement = document.createElement('img');
		imageElement.src = URL.createObjectURL(imageFile);
		imageElement.title = imageFile.name;
		questions.push(genQuestion(index, imageElement, answers[index]));
	});
	quiz.style.display = 'flex';
	menu.style.display = 'none';
});
