const cards = document.querySelectorAll('.card')

let cardOne, cardTwo;
let disableDeck = false;
let matchedCard = 0

function flipCard(e) {
    let clickedCard = e.target
    if (clickedCard != cardOne && !disableDeck) {
        clickedCard.classList.add('flip')
        flipSound()
        if (!cardOne) {
            return cardOne = clickedCard
        }
        cardTwo = clickedCard;
        disableDeck = true;
        let cardOneImg = cardOne.querySelector('img').src,
            cardTwoImg = cardTwo.querySelector('img').src
        matchCards(cardOneImg, cardTwoImg)
    }
}

function matchCards(img1, img2) {

    if (img1 === img2) {
        matchedCardSound()
        matchedCard++
        if (matchedCard === 8) {
            winSound()
            setTimeout(() => {
                return shuffleCard()
            }, 1000)

        }
        cardOne.removeEventListener('click', flipCard)
        cardTwo.removeEventListener('click', flipCard)
        cardOne = cardTwo = '';
        console.log('card matched')
        return disableDeck = false;
    } else {
        setTimeout(() => {
            errorSound()
            cardOne.classList.add('shake')
            cardTwo.classList.add('shake')
        }, 400)

        setTimeout(() => {
            cardOne.classList.remove('flip', 'shake')
            cardTwo.classList.remove('flip', 'shake')
            cardOne = cardTwo = '';
            disableDeck = false;
        }, 1200)
    }


}

function shuffleCard() {
    matchedCard = 0
    cardOne = cardTwo = ''
    disableDeck = false;
    let arr = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8,]
        .sort(() => Math.random() > 0.5 ? 1 : -1)
    cards.forEach((card, index) => {
        let imgTag = card.querySelector('img')
        imgTag.src = `images/img-${arr[index]}.png`
        card.classList.remove('flip')
        card.addEventListener('click', flipCard)
    })

}

shuffleCard()

cards.forEach(card => {
    card.addEventListener('click', flipCard)
})


function flipSound() {
    let audio = new Audio()
    audio.src = 'audio/card-flip.wav'
    audio.play();

}

function errorSound() {
    let audio = new Audio()
    audio.src = 'audio/error.wav'
    audio.play()
}

function matchedCardSound() {
    let audio = new Audio()
    audio.src = 'audio/matched-card.wav'
    audio.play()
}

function winSound() {
    let audio = new Audio()
    audio.src = 'audio/win.wav'
    audio.play()
}
