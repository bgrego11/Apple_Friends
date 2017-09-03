

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}


function deal(deck, num) {
        shuffle(deck);
        dealt = deck.slice(0,num)
        deck = deck.slice(num, deck.length - 1)
        return dealt

}





