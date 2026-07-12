
var pendingtrades =
[
    {
        playername: "PLAYERNAME1", 
        cardlist: "card01, card02"
    },
    {
        playername: "PLAYERNAME2", 
        cardlist: "card01, card02"
    }
]

/* PILES

You are able to organize your cards in piles based on type.
    keeping: cards that are unavailable to trade (and will not appear in trading defined areas)
    trading: cards you are interested in trading but you want to be seperated for display
        - ex: displayingduplicates of a series to trade for only needs within the same series
        - trading piles will only display cards not already sorted within keeping piles

    Cards not defined in any below piles are put in a general catch all "trading" pile that doesn't need to be defined
    Cards can be in multiple piles at once.
*/
var piles = [
    {
        name: 'High Priority',

        series: [], // [] or  ["Colors Universe", ...]
        decks: "artists", // deckone, decktwo
        cards: "", // card01, card02

        type: 'keeping',
            // if keeping, do you want to keep duplicates? below parameters ignored if type = 'trading'
            manageduplicates: {
                keepall: false, // true or false
                // if false, define which duplicates to keep (empty if none)
                series: [], // [] or  ["Colors Universe", ...]
                decks: "",
                cards: "",
            }
    },
    {
        name: 'Colors Universe Mass Deck',

        series: ["Colors Universe"], // [] or  ["Colors Universe", ...]
        decks: "", // deckone, decktwo
        cards: "", // card01, card02

        type: 'keeping',
            // if keeping, do you want to keep duplicates? below parameters ignored if type = 'trading'
            manageduplicates: {
                keepall: false, // true or false
                // if false, define which duplicates to keep (empty if none)
                series: [], // [] or  ["Colors Universe", ...]
                decks: "artists",
                cards: "bear01",
            }
    },
    {
        name: 'Colors Universe Duplicates For Trade',

        series: ["Colors Universe"], // [] or  ["Colors Universe", ...]
        decks: "", // deckone, decktwo
        cards: "", // card01, card02

        type: 'trading',
            // if keeping, do you want to keep duplicates? below parameters ignored if type = 'trading'
            manageduplicates: {
                keepall: false, // true or false
                // if false, define which duplicates to keep (empty if none)
                series: [], // [] or  ["Colors Universe", ...]
                decks: "",
                cards: "",
            }
    },

]

//ADD INTO LOGS
var coupons = 
[
    {
        filename: "coupons/coupons.gif", 
        totaluses: 5, 
        usesleft: 4
    },
    {
        filename: "coupons/coupons.gif", 
        totaluses: 5, 
        usesleft: 4
    }
]

/* PORTFOLIOS */
var paletteportfolioname = "paletteportfolio"; // change if named different
var paletteportfoliodecks = "reddeck, orangdeck, yellowdeck, greendeck, bluedeck, purpledeck, browndeck, graydeck";

var monochromeportfolioname = "monochromeportfolio"; // change if named different
var monochromeportfoliodecks = "deckone, decktwo, deckthree, deckfour, deckfive, decksix, deckseven, deckeight";

/* SKETCHPAD */
var sketchpadname = "sketchpad"; // change if named different


export {pendingtrades, piles, coupons, paletteportfolioname, paletteportfoliodecks, monochromeportfolioname, monochromeportfoliodecks, sketchpadname};