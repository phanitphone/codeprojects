class WarGame{
    constructor(){
        this.suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades']
        this.rankValues = {
            '2': 0,
            '3': 1,
            '4': 2,
            '5': 3,
            '6': 4,
            '7': 5,
            '8': 6,
            '9': 7,
            '10': 8,
            'Jack': 9,
            'Queen': 10,
            'King': 11,
            'Ace': 12,
        }
        this.player1 = new Player('Cody');
        this.player2 = new Player('Phanit');
        this.deck = new Deck(this.suits, this.rankValues);
        this.deck.shuffle();
    
    }

    play(){
        this.dealCards();

        while(this.player1.hand.length > 0 && this.player2.hand.length > 0){
            let p1card = this.player1.hand.shift();
            let p2card = this.player2.hand.shift();
            if ( p1card.getValue(this.rankValues) > p2card.getValue(this.rankValues) ){
                this.player1.addPoint();
                console.log(`${this.player1.name} wins the round`);
            }
            else if ( p2card.getValue(this.rankValues) > p1card.getValue(this.rankValues)){
                this.player2.addPoint();
                console.log(`${this.player2.name} wins the round`);
            }
            else{
                console.log(`It was a Tie!`);
            }
        }



    //    for(let card of this.player1.hand){
    //         console.log(card.getName());

    //     }

        console.log("...........");

        console.log(this.player1.describe());
        console.log(this.player2.describe());

        if (this.player1.score > this.player2.score){
            console.log(`${this.player1.name} wins!`);
        }
        
        else if(this.player2.score > this.player1.score){
            console.log(`${this.player2.name} wins!`);
        }
        else{
            console.log(`It was a tie!`);
        }


    //     for(let card of this.player2.hand){
    //         console.log(card.getName());

    //     }


        
    }

    dealCards(){
        let currentPlayer = this.player1;
        while (this.deck.cards.length > 0 ){
            let card = this.deck.cards.shift();

            currentPlayer.addCard(card);
            if (currentPlayer == this.player1){
                currentPlayer = this.player2;
                
            }
            else {
                currentPlayer = this.player1;
            }
        

        }
    }
}

class Card{
    constructor(suit, rank) {
        this.suit = suit;
        this.rank = rank;
    }

    getName(){
        return `${this.rank} of ${this.suit}.`;
    }

    getValue(rankValues){
        return rankValues[this.rank];    
    }
}

class Deck {
    constructor(suits, rankValues){
        this.cards = [];
        for (let suit of suits){
            for (let rank of Object.keys(rankValues)){
                this.cards.push(new Card(suit, rank));
            }
        }
    }

    shuffle() {
        let tempArray = [];
        let sortedArray = [];

        for (let element of this.cards) {
            tempArray.push([Math.random(), element]);
        }
        tempArray.sort();
        for (let element of tempArray) {
            sortedArray.push(element[1])
        }

        this.cards = sortedArray;
    }
}    

class Player{
    constructor(name){
        this.name = name;
        this.hand = [];
        this.score = 0;
    }

    addPoint(){
        this.score = this.score + 1 
    }

    describe(){
        return`this is ${this.name}, he has ${this.score} points`;
        
    }

    addCard(card){
        this.hand.push(card);
    }
}





let wargame = new WarGame();
wargame.play();