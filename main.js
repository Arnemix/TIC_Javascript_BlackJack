let card_list = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10,];

// Fonction pour shuffle les cartes
function shuffle(inputArray){
    inputArray.sort(()=> Math.random() - 0.5);
}

shuffle(card_list);

//On initialise les variables necessaires au bon fonctionnement du jeu
let winner = "";
let game_is_running = false;
let actual_player;
let player_cards = [];
let computer_cards = [];
let player_name;

// Cette fonction permet de lancer la partie et de la continuer tant que game_is_running est true == true
const startGame = () => {
    shuffle(card_list);
    player_name = prompt("Bienvenue dans le jeu du Blackjack ! Quel est votre nom?");
    game_is_running = true;
    actual_player = player_name;
    // Première distribution de cartes
    player_cards.push(pickCard());
    player_cards.push(pickCard());
    computer_cards.push(pickCard());
    //---- Début du de la partie ----//
    log("🎉 La partie de Blackjack commence ! 🎉");
    log(`👀 ${player_name}, voici vos cartes de départ : ${player_cards.join(', ')}`);
    log(`💡 Total de vos cartes : ${getSumOfCards(player_cards)}`);
    log('\n');
    log(`👀 La première carte du croupier : ${computer_cards[0]}`);
    log(`💡 Total des cartes du croupier : ${getSumOfCards([computer_cards[0]])}`);
    while (game_is_running) {
        if (getSumOfCards(player_cards) > 21) {
            winner = "croupier";
            showWinMessage();
            break;
        } else if (getSumOfCards(player_cards) === 21) {
            if (getSumOfCards(computer_cards) > 21 || getSumOfCards(computer_cards) < getSumOfCards(player_cards)) {
                winner = player_name;
            } else {
                winner = "égalité";
            }
            showWinMessage();
            break;
        }
        let player_want_to_pick = "oui";
        // Tant que le joueur veut piocher une carte, on lui demande
        while (player_want_to_pick != "non") {
            player_want_to_pick = prompt(`Voulez-vous piocher une carte?`).toLowerCase();
            if (player_want_to_pick == "oui") {
                let newCard = pickCard();
                player_cards.push(newCard);
                log(`🎲 Vous avez pioché : ${newCard}`);
                showGameStatus();
                if (getSumOfCards(player_cards) > 21) {
                    winner = "croupier";
                    log(`❌ Vous avez dépasser 21 en piochant une carte !`)
                    showWinMessage();
                    break;
                }
            }
        }

        if (getSumOfCards(computer_cards) > 21) {
            winner = player_name;
            log(`❌ Le croupier a dépassé 21 en piochant une carte !`)
            showWinMessage();
        } else if (getSumOfCards(player_cards) < 21) {
            while (getSumOfCards(computer_cards) <= 17 && getSumOfCards(computer_cards) <= getSumOfCards(player_cards)) {
                let newCard = pickCard();
                computer_cards.push(newCard);
                log(`🎲 Le croupier a pioché une carte : ${newCard}`);
                showGameStatus();
                if (getSumOfCards(computer_cards) >= 17 && getSumOfCards(computer_cards) <= getSumOfCards(player_cards)) {
                    break;
                }
            }

            if (getSumOfCards(computer_cards) > 21) {
                winner = player_name;
                log(`❌ Le croupier a dépassé 21 en piochant une carte !`)
                showWinMessage();
            } else if (getSumOfCards(computer_cards) > getSumOfCards(player_cards)) {
                winner = "croupier";
                log(`❌ Le croupier a une meilleure main que vous !`)
                showWinMessage();
            } else if (getSumOfCards(computer_cards) >= 17) {
                winner = player_name;
                log(`🏳 Le croupier déclare forfait`)
                showWinMessage();
            }
        }
    }
};

// Cette fonction permet de récupérer la somme des cartes d'un paquet

const getSumOfCards = (cards) => {
    let sum = 0;
    for (let i = 0; i < cards.length; i++) {
        sum += cards[i];
    }
    return sum;
};

// Cette fonction permet d'afficher le message de victoire avec des petites statistiques
const showWinMessage = () => {
    log("🏆 Résultat de la partie :");
    game_is_running = false;
    if (winner === "égalité") {
        log("C'est une égalité ! 😅");
    } else {
        log(`👑 Le joueur ${winner} remporte la victoire ! 🎉`);
    }
    log(`💡 Vos cartes : ${player_cards.join(', ')} (${getSumOfCards(player_cards)})`);
    log(`💡 Cartes du croupier : ${computer_cards.join(', ')} (${getSumOfCards(computer_cards)})`);
    log("🎉 Fin de la partie de Blackjack. Merci d'avoir joué !");
};

// fonction log pour afficher des logs plus facilement
const log = (message) => {
    console.log(message);
};

// cette fonction affiche le paquet du joueur ainsi que le total des cartes du croupier 
// (via getSumOfCards(computer_cards))

const showGameStatus = () => {
    log("-------------------------------");
    log(`👀 Votre main actuelle : ${player_cards.join(', ')}`);
    log(`💡 Total de vos cartes : ${getSumOfCards(player_cards)}`);
    log('\n');
    log(`👀 Total des cartes du croupier : ${getSumOfCards(computer_cards)}`);
    log("-------------------------------");
};

// Cette fonction permet de return une carte aléatoirement
const pickCard = () => {
    let random = Math.floor(Math.random() * card_list.length);
    let card = card_list[random];
    return card;
};

/* La fonction `startGame()` est appelée pour commencer la partie de Blackjack. Elle initialise les variables du jeu,
distribue les cartes initiales au joueur et au croupier, puis continue avec la logique du jeu. */
// startGame();
const play_button = document.getElementById('play-button');


// Cet event permet de lancer la partie lorsque l'utilisateur clique sur le bouton 'Jouer !'
play_button.addEventListener('click', () => {
    if(play_button.id == "replay-button"){
        location.reload();
    }
    if(!game_is_running){
        play_button.id = "replay-button";
        startGame();
    }
    
});
