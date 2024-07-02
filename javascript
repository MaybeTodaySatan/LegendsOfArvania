const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const dialogueBox = document.getElementById('dialogue-box');
const dialogueText = document.getElementById('dialogue-text');
const choice1 = document.getElementById('choice1');
const choice2 = document.getElementById('choice2');

const player = {
    x: canvas.width / 2,
    y: canvas.height / 2,
    width: 32,
    height: 32,
    color: 'blue'
};

const npc = {
    x: 200,
    y: 200,
    width: 32,
    height: 32,
    color: 'red',
    dialogue: "Welcome to Arvania! Will you help us?",
    choices: ["Yes", "No"]
};

function drawCharacter(character) {
    ctx.fillStyle = character.color;
    ctx.fillRect(character.x, character.y, character.width, character.height);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawGame() {
    clearCanvas();
    drawCharacter(player);
    drawCharacter(npc);
}

function showDialogue(dialogue, choices) {
    dialogueText.textContent = dialogue;
    dialogueBox.classList.remove('hidden');
    choice1.textContent = choices[0];
    choice2.textContent = choices[1];
    choice1.classList.remove('hidden');
    choice2.classList.remove('hidden');
}

function hideDialogue() {
    dialogueBox.classList.add('hidden');
    choice1.classList.add('hidden');
    choice2.classList.add('hidden');
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            player.y -= 10;
            break;
        case 'ArrowDown':
            player.y += 10;
            break;
        case 'ArrowLeft':
            player.x -= 10;
            break;
        case 'ArrowRight':
            player.x += 10;
            break;
    }
    drawGame();
});

canvas.addEventListener('click', (event) => {
    const rect = canvas.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    
    if (x >= npc.x && x <= npc.x + npc.width && y >= npc.y && y <= npc.y + npc.height) {
        showDialogue(npc.dialogue, npc.choices);
    }
});

choice1.addEventListener('click', () => {
    hideDialogue();
    alert('You chose: ' + npc.choices[0]);
});

choice2.addEventListener('click', () => {
    hideDialogue();
    alert('You chose: ' + npc.choices[1]);
});

drawGame();
