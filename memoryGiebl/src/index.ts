let cnt = 0;  //kontrollwert wei viele karten gerade aufgedeckt sind
let src1: string;     //bild aufgedeckte karte 1
let src2: string;     //bild aufgedeckte karte 2
let flipped1: HTMLElement;  //aufgedeckte karte 1
let flipped2: HTMLElement;  //ufgedeckte karte 2
let id1: string;      //id aufgedeckter karte 1
let found= 0;//anzahl gefundener paare
let turns = 1;  //anzahl der runden
let found1 = 0; //anzahl gefundener paare von spieler 1
let found2 = 0; //anzahl gefundener paare von spieler 2

interface card{
    id: string;
    imageFlipped: string;
}

interface cntChoice{
    value: string;
    text: string
}

const cards: card[] = [  //array der cards
    {
        id: "1",
        imageFlipped: "pics/dino2.png",
       
    },
    {
        id: "2",
        imageFlipped: "pics/dino2.png",
        
    },
    {
        id: "3",
        imageFlipped: "pics/dino3.png",
    },
    {
        id: "4",
        imageFlipped: "pics/dino3.png",
    },
    {
        id: "5",
        imageFlipped: "pics/dino1.png",
    },
    {
        id: "6",
        imageFlipped: "pics/dino1.png",
    },
    {
        id: "7",
        imageFlipped: "pics/dino4.png",
    },
    {
        id: "8",
        imageFlipped: "pics/dino4.png",
    },
    {
        id: "9",
        imageFlipped: "pics/dino5.png",
    },
    {
        id: "10",
        imageFlipped: "pics/dino5.png",
    },
    {
        id: "11",
        imageFlipped: "pics/dino6.png",
    },
    {
        id: "12",
        imageFlipped: "pics/dino6.png",
    },
    {
        id: "13",
        imageFlipped: "pics/dino7.png",
    },
    {
        id: "14",
        imageFlipped: "pics/dino7.png",
    },
    {
        id: "15",
        imageFlipped: "pics/dino8.png",
    },
    {
        id: "16",
        imageFlipped: "pics/dino8.png",
    },
    {
        id: "17",
        imageFlipped: "pics/dino9.png",
    },
    {
        id: "18",
        imageFlipped: "pics/dino9.png",
    },
    {
        id: "19",
        imageFlipped: "pics/dino10.png",
    },
    {
        id: "20",
        imageFlipped: "pics/dino10.png",
    }
];

const playingCards: card[] = [  //spieler waehlt anzahl der karten min 1
    {
        id: "1",
        imageFlipped: "pics/dino2.png",
    },
    {
        id: "2",
        imageFlipped: "pics/dino2.png",
    }
];

const flippedCards = [  //array der umgedrehten cards
     
];


const cntOptions: cntChoice[] = [
    {value: "1", text: "1"},
    {value: "2", text: "2"},
    {value: "3", text: "3"},
    {value: "4", text: "4"},
    {value: "5", text: "5"},
    {value: "6", text: "6"},
    {value: "7", text: "7"},
    {value: "8", text: "8"},
    {value: "9", text: "9"},
    {value: "10", text: "10"}
]

const container: HTMLElement = document.getElementById('game-board')!;
const input: HTMLElement = document.getElementById('input-field')!;
const scoreboard: HTMLElement = document.getElementById('score-board')!;

function cardnumberInput(){
    const newDiv: HTMLElement = document.createElement('div');
    newDiv.textContent = "Choose the number of pairs you want to play with!"; //gibt div mit auffordeung aus
    input.appendChild(newDiv);

    const select: HTMLSelectElement = document.createElement('select'); //gibt select mit möglichkeiten aus
    select.classList.add('mr-3');
    select.classList.add('ml-3');
    input.appendChild(select);
    cntOptions.forEach(option =>{ //nimmt moeglichkeiten fuer select aus cntOptions array
        const newOption = document.createElement('option');
        newOption.value = option.value;
        newOption.text = option.text;
        select.appendChild(newOption);
    })

    const submitChoice = document.createElement('button'); //erstellt button um auswahl zu bestaetigen
    submitChoice.classList.add('mr-3');
    submitChoice.classList.add('btn');
    submitChoice.classList.add('btn-primary');
    submitChoice.textContent = "choose";
    input.appendChild(submitChoice);

    submitChoice.addEventListener('click', ()=> { //liest value aus wenn button clicked
        const selected = select.value;
        let choice = Number(selected);
        choice = choice * 2;
        let i: number;
        for(i = 2; i < choice; i++){
            playingCards[i] = cards[i]; 
        }

        input.innerHTML = "";
        shuffle(playingCards); //mischt spielkarten
        generateCards();    //generiert spielkarten
    });
}

container.addEventListener('click', (e)=>{  //wenn clicked, pruefen welche karte geclicked
    let target = e.target as HTMLElement;
    let flipCard = target.parentElement as HTMLElement; //flipcard nötig fuer animation 
    let id: string = flipCard.id;
    changeImg(id, flipCard);
})

function changeImg(id: string, card: HTMLElement){
    if(cnt < 2 && id != id1){ //zwei karten pro runde, jede karte nur einmal
        card.classList.add('flipped'); //karte als flipped markieren fuer animation

        cnt += 1;
        if(cnt == 1){   //karte und id zwischenspeichern;
            flipped1  = card;
            id1 = id;
        }else if(cnt == 2){//karte und id zwischenspeichern;
            flipped2 = card;
            const flipSrc1 = flipped1.querySelector('.flip-card-back') as HTMLElement;
            const img1 = flipSrc1.childNodes[0] as HTMLImageElement;
            src1 = img1.src;    //pfad zu bild von karte
            const flipSrc2 = flipped2.querySelector('.flip-card-back') as HTMLElement;
            const img2 = flipSrc2.childNodes[0] as HTMLImageElement;
            src2 = img2.src;     //pfad zu bild von karte
            chkImg(src1, src2);
        }
    }
    
}


function chkImg(src1: string, src2: string){//pruefen ob bild das selbe
    if(src1 != src2){ //wenn ja wieder umdrehen und naechste rundencnt erhoehen
        setTimeout(changeBack, 1000);
        turns++;
    }else{  //wenn nein karten als matched markieren
        const flipBack1: HTMLElement = flipped1.querySelector('.flip-card-back')!;
        const flipBack2: HTMLElement = flipped2.querySelector('.flip-card-back')!;
        flipBack1.classList.add('matched');
        flipBack2.classList.add('matched');
        flippedCards.push(flipped1);
        flippedCards.push(flipped2);
        found += 1;
        cnt = 0;    //count und ids zuruesetzen
        id1 = "0";
        if(turns % 2 === 0) found2++; //gefundenen karten einzelner spieler tracken
        else found1++;

        if(playingCards.length === found * 2) //alle paare gefunden
        { 
            const endField: HTMLElement = document.getElementById("game-over")!;
            const newButton: HTMLElement = document.createElement('button'); //play again button erstellen
            newButton.classList.add('mt-3');
            newButton.classList.add('ml-3');
            newButton.classList.add('btn');
            newButton.classList.add('btn-primary');
            newButton.textContent = "play again";


            const msg: HTMLElement = document.createElement('div'); //nachricht am ende des spiels erstellen
            msg.classList.add('mt-4');
            msg.textContent = "Game Over! Press the button to play again.";
            endField.appendChild(msg);
            endField.appendChild(newButton);

            newButton.addEventListener('click', ()=>{ //reload button definieren
                location.reload();
            });

        }
    }
    displayPlayer(); //ausgeben welcher spieler dran ist 
}


function changeBack(){
    //karten nicht mehr als flipped markieren (umdrehen)
    flipped1.classList.remove('flipped'); 
    flipped2.classList.remove('flipped');

    cnt = 0;  //count und ids zuruesetzen
    id1 = "0";  
}


function generateCards() {
    displayPlayer();
    playingCards.forEach(item => {
        const card = document.createElement('div'); //erstellt für jede karte neues div
        card.classList.add('flip-card');

        const cardInner = document.createElement('div'); //erstellt für jede karte neues inner div
        cardInner.classList.add('flip-card-inner');
        cardInner.id = item.id;

        const cardFront = document.createElement('div'); //erstellt für jede karte neues front div
        cardFront.classList.add('flip-card-front');

        const cardBack = document.createElement('div'); //erstellt für jede karte neues back div
        cardBack.classList.add('flip-card-back'); 
        
        cardFront.innerHTML = `<img style="width:80%">`;
        cardBack.innerHTML = `<img src="${item.imageFlipped}" style="width:80%">`; //fügt das bild der card ein

        cardInner.appendChild(cardBack);
        cardInner.appendChild(cardFront);
        card.appendChild(cardInner);
        container.appendChild(card);
    });
}

function shuffle(cards: card[]) { //fisher-yates-shuffle

    for (let i = cards.length - 1; i > 0; i--) { //geht array von hinten druch

        const j = Math.floor(Math.random() * (i + 1)); //erzeugt random index
        //Math.random: zufallszahl 0-1, Math.floor: rundet ab -> j ist gültiger index in array


        [cards[i], cards[j]] = [cards[j], cards[i]]; //tauscht elemente
    }
    return cards;
}

function displayPlayer(){
    input.innerHTML = "";   //loescht andere einträge in input feld
    const displayPlayer: HTMLElement = document.createElement('div');
    let player: number;
    if(turns % 2 === 0) player = 2; //pruefen welcher spieler dran ist, wenn rundenzahl gerade = spieler 2
    else player = 1;
    displayPlayer.textContent = "it's your turn Player "+ player;
    input.appendChild(displayPlayer);
    displayScores();
}

function displayScores(){
    //spieler mit anzahl der gefundenen paare = punkte ausgeben
    scoreboard.innerHTML = ""; 
    const scores: HTMLElement = document.createElement('div');
    const score1: HTMLElement = document.createElement('p');
    score1.textContent = `Player 1: ${found1} points`;
    const score2: HTMLElement = document.createElement('p');
    score2.textContent = `Player 2: ${found2} points`;
    scores.appendChild(score1);
    scores.appendChild(score2);
    scoreboard.appendChild(scores);

    if(playingCards.length === found * 2){ //wenn alle karten gefunden
        displayWinner(scores);
    }
}

function displayWinner(scores: HTMLElement){
    input.innerHTML = "";
    let winner: number = 0;
    if(found1 > found2) winner = 1; //pruefen welcher spieler mehr paare gefunden hat
    else if(found2 > found1) winner = 2;

    const winnerMsg: HTMLElement = document.createElement('p');
    if(winner != 0){
        winnerMsg.textContent = `Congratulations Player ${winner}! You have won!`;
    }else{
        winnerMsg.textContent = "It's a tie!";
    }
    scores.appendChild(winnerMsg);
}

cardnumberInput();
