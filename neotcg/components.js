import { deckDictionary } from './UPDATE_colorstcgdeckdata.js';

const levels = {
    14101: "Himalayan", 13801: "Puma", 13501: "Chartreux", 13201: "Russian Blue", 12901: "Panther", 12601: "Cheetah", 12301: "Tiger", 12001: "Lion",
    11701: "Metal", 11401: "Ground", 11101: "Darkness", 10801: "Water", 10501: "Nature", 10201: "Light", 9901: "Wind", 9601: "Fire",
    9301: "Mercury", 9001: "Jupiter", 8701: "Uranus", 8401: "Neptune", 8101: "Earth", 7801: "Venus", 7501: "Saturn", 7201: "Mars",
    6901: "Magnolia", 6601: "Chocolate Cosmos", 6301: "Lilac", 6001: "Hydrangea", 5701: "Clover", 5401: "Daffodil", 5101: "Tiger Lily", 4801: "Sakura",
    4501: "Silver", 4201: "Bronze", 3901: "Amethyst", 3601: "Sapphire", 3301: "Emerald", 3001: "Gold", 2701: "Amber", 2401: "Ruby",
    2201: "Dragon Fruit", 2001: "Apricot", 1801: "Grape", 1601: "Blueberry", 1401: "Lime", 1201: "Lemon", 1001: "Tangerine", 801: "Strawberry",
    701: "Gray", 601: "Brown", 501: "Purple", 401: "Blue", 301: "Green", 201: "Yellow", 101: "Orange", 1: "Red"
}
var pileNames = ["collecting", "future", "hoard"];

var assetsLoc = "neotcg/images-other/"
var cardsLoc = "neotcg/images-cards/"
var componentsLoc = 'neotcg/components';

export const ComponentLib = {
    cardcount: (collection, input) => {
        var [count, level] = getLevel(collection, input);
        document.querySelector("[data-name='cardcount']").innerHTML = count;
    },
    leveltext: (collection, input) => {
        var [count, level] = getLevel(collection, input);
        document.querySelector("[data-name='leveltext']").innerHTML = level;
    },
    levelimage: (collection, input) => {
        var [count, level] = getLevel(collection, input);
        level = level.replace(" ", "");
        var html =
        `
        <img src="${assetsLoc}/levels/level_${level}.gif" />
        `
        document.querySelector("[data-name='levelimage']").innerHTML = html;
    },

    currentsketchpadimage: (collection, input) => {
        document.querySelector("[data-name='currentsketchpadimage']").innerHTML =
        `
        <img src="${assetsLoc}/sketchpads/${collection.sketchpadname}${collection.sketchpadPoints}.gif" />
        `;
    },
    completedsketchpadimage: (collection, input) => {
        document.querySelector("[data-name='completedsketchpadimage']").innerHTML =
        `
        <img src="${assetsLoc}/sketchpads/${collection.sketchpadname}20.gif" />x${collection.completedSketchpads - collection.spentSketchpads}
        `;
    },

    paletteportfolioimage: (collection, input) => {
        document.querySelector("[data-name='paletteportfolioimage']").innerHTML =
        `
        <img src="${assetsLoc}/portfolios/${collection.paletteportfolioname}.gif" />
        `;
    },
    paletteportfoliodecks: (collection, input) => {
        document.querySelector("[data-name='paletteportfoliodecks']").innerHTML =
        `
        <p>${collection.paletteportfoliodecks.join(', ')}</p>
        `;
    },
    paletteportfoliochecklist: (collection, input) => {
        document.querySelector("[data-name='paletteportfoliochecklist']").innerHTML =
        `
        <div>
            <button class="portfoliobutton" onclick="showPortfolio('palette')" type="button"><b>Palette ▾</b></button>
            <div id="palettehidden" class="portfoliohidden">
                <span class="neotcg" data-name=""></span>
            </div> 
        </div>
        `;
    },
    monochromeportfolioimage: (collection, input) => {
        document.querySelector("[data-name='monochromeportfolioimage']").innerHTML =
        `
        <img src="${assetsLoc}/portfolios/${collection.monochromeportfolioname}.gif" />
        `;
    },
    monochromeportfoliodecks: (collection, input) => {
        document.querySelector("[data-name='monochromeportfoliodecks']").innerHTML =
        `
        <p>${collection.monochromeportfoliodecks.join(', ')}</p>
        `;
    },

    crayons: (collection, input) => {
        var html =
        `
        `;
        Object.keys(collection.crayons).forEach( crayon => {
            var count = collection.crayons[crayon];
            html +=
            `
            <div>
                <div>
                    <img src='${assetsLoc}/crayons/${crayon}crayon.gif'>
                </div>
                <p><b>${count}</b></p>
            </div>
            `;
        })
        document.querySelector("[data-name='crayons']").innerHTML = html;
    },

    neededdeckstextarea: (collection, input) => {
        var textarea = document.createElement("textarea");
        var decks = collection.piles.deckNeeds.join(", ")
        if (decks == '') { decks = "None." }
        textarea.innerHTML =
        `${decks}`
        document.querySelector("[data-name='neededdeckstextarea']").appendChild(textarea);
    },
    neededdeckscoloreddivs: (collection, input) => {
        var textarea = document.createElement("textarea");
        var div = displayNeededDecks(collection);

        document.querySelector("[data-name='neededdeckscoloreddivs']").appendChild(div);
    },

    neededsinglecardstext: (collection, input) => {
        var cards = collection.piles.singleNeeds.join(", ")
        if (cards == '') { cards = "None." }
        document.querySelector("[data-name='neededsinglecardstext']").innerHTML =
        `${cards}`
    },
    neededsinglecardstextarea: (collection, input) => {
        var textarea = document.createElement("textarea");
        var cards = collection.piles.singleNeeds.join(", ")
        if (cards == '') { cards = "None." }
        textarea.innerHTML =
        `${cards}`
        document.querySelector("[data-name='neededsinglecardstextarea']").appendChild(textarea);
    },

    neededcardstext: (collection, input) => {
        var cards = collection.piles.allNeeds.join(", ")
        if (cards == '') { cards = "None." }
        document.querySelector("[data-name='neededcardstext']").innerHTML =
        `${cards}`
    },
    neededcardstextarea: (collection, input) => {
        var textarea = document.createElement("textarea");
        var cards = collection.piles.allNeeds.join(", ")
        if (cards == '') { cards = "None." }
        textarea.innerHTML =
        `${cards}`
        document.querySelector("[data-name='neededcardstextarea']").appendChild(textarea);
    },

    logs: (collection, input) => {
        document.querySelector("[data-name='logs']").innerHTML =
        `
        <p>${collection.logs}</p>
        `;
    },


    signatures: (collection, input) => {
        var signatures = collection.piles.all.filter( card => card.startsWith("sig_"));
        signatures.forEach( signature => {
            document.querySelector("[data-name='signatures']").appendChild(displayCard(signature))
        })
    },

    masteries: (collection, input) => {
        var decksMastered = getMasteries(collection, input);
        decksMastered.forEach( mastery => {
            document.querySelector("[data-name='masteries']").appendChild(displayCard(mastery))
        })
    },

    deckgridowned: (collection, input) => {
        var span = document.querySelector("[data-name='deckgridowned'][data-input='"+input+"']")
        span.appendChild(displayDeck(collection, input));
    },
    deckgridownedwmaster: (collection, input) => {
        var span = document.querySelector("[data-name='deckgridownedwmaster'][data-input='"+input+"']")
        span.appendChild(displayDeck(collection, input, true));
    },


    pilecardsnew: (collection, input) => {
        var cards = collection.piles[input];
        var newest = cards.slice(cards.length - 100, cards.length);

        var div = document.createElement("div");
        div.classList.add("carddiv")
        newest.forEach( card => {
            div.appendChild(displayCard(card));
        })

        var span = document.querySelector("[data-name='pilecardsnew'][data-input='"+input+"']")
        span.appendChild(div);
    },

    paginatedpile: (collection, input) => {
        console.log(collection.piles.trading);
    },

    pileSearchBar: (collection, input) => {

    }


}

function displayCard(card){

    var img = document.createElement('img');
    img.setAttribute("src", cardsLoc + card + ".gif");
    img.setAttribute("onerror", "this.src='" + cardsLoc + "placeholdercard.gif'")
    img.setAttribute("alt", card);

    var deck = card;
    if (card.endsWith("master")){
        deck = card[0, card.length-6];
    }
    else{
        deck = card[0, card.length-2];
    }
    var deckInfo = getColorSeries(deck);

    img.setAttribute("title", card + " (" + deckInfo.character + " from " + deckInfo.series + ", " + deckInfo.color + ")");

    // add color class
    img.classList.add(deckInfo.color);
    img.classList.add(deckInfo.series.toString().replaceAll(" ", '_'));
    img.classList.add(deckInfo.character.toString().replaceAll(" ", '_'));

    //add lazy loading
    img.loading = "lazy";

    var div = document.createElement('div');
    div.appendChild(img);
    div.classList.add("carddiv");

    return div;
}

function displayDeck(collection, deck, master=false){
    // create elements
     var deckDiv = document.createElement("div");
     var deckHeader = document.createElement("p");
     var deckLink = document.createElement("a")
     var deckImgDiv = document.createElement("div")

     //set bg colors
     // r #ffdbdb | o #ffeee2 | y #fcfade | g #e2fce6| b #dff2fd | p #e3e3ff| br #e9d4b7 | gr #d4d4d4
     // check if deckdictionary had deck 
     var headerColor = getColorSeries(deck).color.toLowerCase();

     deckDiv.setAttribute("class", "deckdiv")
     deckHeader.setAttribute("class", "deckheader deck" + headerColor)
     deckLink.setAttribute("class", "decklink")
     deckLink.setAttribute("href", "https://colors-tcg.eu/viewcards.php?deck=" + deck)
     deckLink.innerHTML = deck
     deckImgDiv.setAttribute("class", "deckimgdiv")

     deckHeader.appendChild(deckLink)
     deckDiv.appendChild(deckHeader)

     var cardsOwned = collection.piles.all;

     // make card setup
     for (var index = 1; index < 21; index++){
         var cardNumber = ''
         if (index < 10){ cardNumber = "0"+index}
         else {cardNumber += index;}

         if (cardsOwned.includes(deck + cardNumber)){
             var imgTag = displayCard(deck+cardNumber)
             deckImgDiv.appendChild(imgTag)
         }
         else{
             var imgTag = document.createElement("img");
             imgTag.setAttribute("src", cardsLoc + deck + "00.gif")
             imgTag.setAttribute("onerror", "this.src='" + cardsLoc + "placeholdercard.gif'")
             imgTag.setAttribute("title", deck + "placeholdercard")
             imgTag.setAttribute("alt", deck + "placeholdercard")

             deckImgDiv.appendChild(imgTag)
         }
     }

     if (master){
        deckImgDiv.appendChild(displayCard(deck+"master"));
     } 

     deckDiv.appendChild(deckImgDiv)
     return deckDiv;
}

function displayNeededDecks(collection){
    var neededDecks = collection.piles.deckNeeds;
    
    var redDiv = document.createElement("div");
    var orangeDiv = document.createElement("div");
    var yellowDiv = document.createElement("div");
    var greenDiv = document.createElement("div");
    var blueDiv = document.createElement("div");
    var purpleDiv = document.createElement("div");
    var brownDiv = document.createElement("div");
    var grayDiv = document.createElement("div");
    var specialDiv = document.createElement("div");
    var notfoundDiv = document.createElement("div");

    //set bg colors
    // r #ffdbdb | o #ffeee2 | y #fcfade | g #e2fce6| b #dff2fd | p #e3e3ff| br #e9d4b7 | gr #d4d4d4
    redDiv.setAttribute("class", "deckred")
    orangeDiv.setAttribute("class", "deckorange")
    yellowDiv.setAttribute("class", "deckyellow")
    greenDiv.setAttribute("class", "deckgreen")
    blueDiv.setAttribute("class", "deckblue")
    purpleDiv.setAttribute("class", "deckpurple")
    brownDiv.setAttribute("class", "deckbrown")
    grayDiv.setAttribute("class", "deckgray")
    specialDiv.setAttribute("class", "deckspecial")
    notfoundDiv.setAttribute("class", "decknone")

    // if deck is not found in deck dictionary:
    var notfound = false;

    neededDecks.forEach( deck => {
        var deckLink = document.createElement("a");
        deckLink.setAttribute("href", "https://colors-tcg.eu/viewcards.php?deck=" + deck)
        deckLink.innerHTML = deck;

        var deckColor = getColorSeries(deck).color
        switch(deckColor){
            case "Red":
                redDiv.appendChild(deckLink)
                break;
            case "Orange":
                orangeDiv.appendChild(deckLink)
                break;
            case "Yellow":
                yellowDiv.appendChild(deckLink)
                break;
            case "Green":
                greenDiv.appendChild(deckLink)
                break;
            case "Blue":
                blueDiv.appendChild(deckLink)
                break;
            case "Purple":
                purpleDiv.appendChild(deckLink)
                break;
            case "Brown":
                brownDiv.appendChild(deckLink)
                break;
            case "Gray":
                grayDiv.appendChild(deckLink)
                break;
            case "Special":
                specialDiv.appendChild(deckLink)
                break;
            case "COLORNOTFOUND":
                notfound = true;
                notfoundDiv.appendChild(deckLink)
                break;
        }
    })

    var maindiv = document.createElement("div");
    maindiv.classList.add("neededdeckcolumns");

    maindiv.appendChild(redDiv)
    maindiv.appendChild(orangeDiv)
    maindiv.appendChild(yellowDiv)
    maindiv.appendChild(greenDiv)
    maindiv.appendChild(blueDiv)
    maindiv.appendChild(purpleDiv)
    maindiv.appendChild(brownDiv)
    maindiv.appendChild(grayDiv)
    maindiv.appendChild(specialDiv)
    if (notfound == true){
        maindiv.appendChild(notfoundDiv)
    }

    return maindiv;
}

function getColorSeries(deckName){
    // if deck dictionary has info
    if (Object.keys(deckDictionary).includes(deckName)){
        return deckDictionary[deckName];
    }
    return {series: "SERIESNOTFOUND", character: "CHARACTERNAMENOTFOUND", color: 'COLORNOTFOUND'};
}

function getDeckCards(deck){
    var cards = []
    for (var index = 1; index < 21; index++){
        var cardNumber = ''
        if (index < 10){ cardNumber = "0"+index}
        else {cardNumber += index;}

        cards.push(deck + cardNumber);
    }
    return cards;
}

function getDeckNeeds(collection, deck){
    var ownedCards = collection.piles.all.sort();
    var deckCards = getDeckCards(deck);
    var needs = deckCards.filter( card => !ownedCards.includes(card))

    return removeDuplicates(needs);
}

function getLevel(collection, input){
    var cardCount = collection.piles.all.length
    var level = "None";

    var limits = Object.keys(levels).reverse();
    var found = false;
    var index = 0;
    while (!found && index < limits.length){
        if (cardCount >= limits[index]){
            found = true;
        }
        index++
    }

    if (found){
        level = levels[limits[index - 1]];
    }
    return [cardCount, level];
}

function removeDuplicates(set){
    return [...new Set(set)]
}