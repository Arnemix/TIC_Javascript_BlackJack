let card_list = [
    1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10,
    1,2,3,4,5,6,7,8,9,10,10,10,10,
]

let winner = "";
let game_is_running = true;
let actual_player;
let player_cards = [];
let computer_cards = [];

const player_name = prompt("Bienvenue dans le jeu du Blackjack !! Quel est votre nom?")

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
    while (game_is_running) {
        let player_want_to_pick = "oui";
        // Tant que le joueur veut piocher une carte on lui demande
        while(player_want_to_pick != "non") {
            player_want_to_pick = prompt(`Voulez-vous piochez une carte?`).toLowerCase();
            if(player_want_to_pick == "oui") {
                player_cards.push(pickCard());
                log(`🎲 Vous avez pioché : ${player_cards[player_cards.length - 1]}`)
                showGameStatus();
                if(getSumOfCards(player_cards) > 21) {
                    winner = "croupier"
                    showWinMessage();
                }
            }
        }
        
        while(getSumOfCards(computer_cards) <= 17 && getSumOfCards(computer_cards) < getSumOfCards(player_cards)) {
            computer_cards.push(pickCard());
            if(getSumOfCards(computer_cards) > 21) {
                break;
            }
            log(`Le croupier a pioche une carte : ${computer_cards[computer_cards.length - 1]}
            \n Total des cartes du croupier : ${getSumOfCards(computer_cards)}`);
        }

        if(getSumOfCards(computer_cards) > 21) {
            game_is_running = false;
            log('Le croupier a gagné! Victoire du joueur!')
        }
        // log(`Le croupier ne peut plus piocher !`)

        if(getSumOfCards(player_cards) > 21){
            game_is_running = false;
            log('Vous avez perdu ! Victoire du croupier!')
        }    
    }
}

const getSumOfCards = (cards) => {
    let sum = 0;
    for (let i = 0; i < cards.length; i++) {
        sum += cards[i];
    }
    return sum;
}

const showWinMessage = () => {
    log(`----------------------------------`)
    winner = actual_player;
    game_is_running = false;
    log(`Le joueur ${winner} a gagné! Victoire du joueur!`)
    log(`Votre main : ${player_cards} (${getSumOfCards(winner)})`)
    log(`La main du croupier : ${computer_cards} (${getSumOfCards(computer_cards)})`)
    log(`----------------------------------`)
}

const log = (message) => {
    console.log(message);
}

const showGameStatus = () => {
    log(`----------------------------------`)
    log(`👀 Votre main actuelle est : ${player_cards}`)
    log(`Total de cartes : ${getSumOfCards(player_cards)}`)
    log('\n')
    log(`👀 Total de cartes du croupier : ${getSumOfCards(computer_cards)}`)
    log(`---------------------------------`)
}


const pickCard = () => {
    let random = Math.floor(Math.random() * card_list.length);
    let card = card_list[random];
    return card;
}

/* The `startGame()` function is called to begin the game of Blackjack. It initializes the game
variables, distributes the initial cards to the player and the computer, and then proceeds with the
game logic. */
startGame();
