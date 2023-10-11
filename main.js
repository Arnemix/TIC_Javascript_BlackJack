let card_list = [
    1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10,
]

let winner = "";
let game_is_end = false;
let actual_player;
let player_cards = [];
let computer_cards = [];

const player_name = prompt("Bienvenue dans le jeu du Blackjack ! Quel est votre nom?")

const startGame = () => {
    actual_player = player_name;
    // Première distribution de cartes
    player_cards.push(pickCard());
    player_cards.push(pickCard());
    computer_cards.push(pickCard());
    //---- Début du de la partie ----//
    log(`La partie commence ! 🃏`)
    log(`👀 Voici votre main de départ : ${player_cards}`)
    log(`Total de cartes : ${getSumOfCards(player_cards)}`)
    log('\n')
    log(`👀 Voici la première carte du croupier : ${computer_cards[0]}`)
    log(`Total des cartes du croupier : ${getSumOfCards(computer_cards)}`)
    while (!game_is_end) {
        let player_want_to_pick;
        showGameStatus();
        // Tant que le joueur veut piocher une carte on lui demande
        do{
            player_want_to_pick = confirm(`Voulez vous piocher une carte ?`);
            if(player_want_to_pick) {
                player_cards.push(pickCard());
                showGameStatus()
            }
        } while(player_want_to_pick === true)
        
        while(getSumOfCards(computer_cards) <= 17 && getSumOfCards(computer_cards) < getSumOfCards(player_cards)) {
            computer_cards.push(pickCard());
            log(`Le croupier a pioche une carte : ${computer_cards[computer_cards.length - 1]}`)
        }
        log(`Le croupier ne peut plus piocher !`)

        }
        if(getSumOfCards(player_cards) > getSumOfCards(computer_cards)) {
            game_is_end = true;
            winner = player_name;
            showGameStatus();
            log(`La partie a été remportée par ${winner}`);
        }else if(getSumOfCards(player_cards) < getSumOfCards(computer_cards)){
            game_is_end = true;
            winner = computer_name;
            showGameStatus();
            log(`La partie a été remportée par ${winner}`);
        }else {
            game_is_end = true;
        }
}

const getSumOfCards = (cards) => {
    let sum = 0;
    for (let i = 0; i < cards.length; i++) {
        sum += cards[i];
    }
    return sum;
}

const log = (message) => {
    console.log(message);
}

const showGameStatus = () => {
    log(`------------------------------------------------`)
    log(`👀 Votre main actuelle est : ${player_cards}`)
    log(`Total de cartes : ${getSumOfCards(player_cards)}`)
    log('\n')
    log(`👀 Total de cartes du croupier : ${getSumOfCards(computer_cards)}`)
    log(`------------------------------------------------`)
}


const pickCard = () => {
    let random = Math.floor(Math.random() * card_list.length);
    let card = card_list[random];
    return card;
}

startGame();
