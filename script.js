const grid = document.querySelector("#grid");

let electionCards = [];
let firstElection = "";
let secondElection = "";
let pairsFound = 0;

function randomImages(){
    let cards = [
        'cheeseburger','fries','hotdog','ice-cream','milkshake','pizza',
        'cheeseburger','fries','hotdog','ice-cream','milkshake','pizza'
    ];

    return cards.sort(() => Math.random() - 0.5);
}

function setupCards(){
    let cardImages = randomImages();

    for(let i = 0; i < 12; i++){
        grid.insertAdjacentHTML('beforeend', `
            <div class="card-container">
                <div class="faces">
                    <div class="front-face face">
                        <img src="./images/blank.png">
                    </div>
                    <div class="back-face face">
                        <img>
                    </div>
                </div>
            </div>
        `);
        let lastElement = grid.lastElementChild;
    
        lastElement.setAttribute('data-card', cardImages[i]);
        lastElement.addEventListener("click", flipCard);
        //Back face
        lastElement.firstElementChild.lastElementChild.firstElementChild
        .src = `./images/${cardImages[i]}.png`;
    };
};

function flipCard(e){
    e.currentTarget.classList.add('flipped');

    electionCards.push(e.currentTarget.dataset.card);
    if(electionCards.length < 2 && firstElection === ""){
        firstElection = {
            target: e.currentTarget,
            card: e.currentTarget.dataset.card
        };
    }else if(e.currentTarget !== firstElection.target){
        secondElection = {
            target: e.currentTarget,
            card: e.currentTarget.dataset.card
        };
        checkCards();
    };
};

function checkCards(){
    [firstElection.target, secondElection.target].forEach(election =>{
        if(firstElection.card === secondElection.card){
            election.removeEventListener("click", flipCard);
            pairsFound++;
        }else{
            setTimeout(()=>{
                election.classList.remove('flipped');
            }, 500);
        };
    });
    //New Game
    if(pairsFound === 12){
        setTimeout(()=>{
            cardAnimation();
        }, 1000);
    };
    //Reset
    firstElection = "";
    secondElection = "";
    electionCards = [];
};

function cardAnimation(){
    Array.from(grid.children).forEach(child =>{
        child.classList.remove('flipped');
    });

    setTimeout(()=>{
        grid.innerHTML = '';
        setupCards();
    }, 300);
};

document.addEventListener('DOMContentLoaded', ()=>{
    setupCards();
});

