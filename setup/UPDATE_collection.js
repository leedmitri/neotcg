
/* PILES */

var piles = [
    {
        name: "collecting",
        series: ["Colors Universe"],
        decks: "artists",
        singles: ""
    },
    {
        name: "future",
        series: [],
        decks: "",
        singles: ""
    },
    {
        name: "hoard",
        series: [],
        decks: "",
        singles: ""
    }
]

var collecting = {
    series: ["Colors Universe"],
    decks: "artists",
    singles: ""
}

var future = {
    series: [],
    decks: "",
    singles: ""
}

var hoard = {
    series: [],
    decks: "",
    singles: ""
}

/* PILE ORGANIZATION */
var massdecks =
[
    {
        name: 'Colors Universe',
        image: 'colorsuniversemassdeck.jpg',
        series: ["Colors Universe"],
        decks: "",
        singles: "",
        pile: "collecting", // "collecting" OR "future" OR "hoard" OR "none"
    }
]

/* PORTFOLIOS */
var paletteportfolioname = "paletteportfolio"; // change if named different
var paletteportfoliodecks = "reddeck, orangdeck, yellowdeck, greendeck, bluedeck, purpledeck, browndeck, graydeck";

var monochromeportfolioname = "monochromeportfolio"; // change if named different
var monochromeportfoliodecks = "deckone, decktwo, deckthree, deckfour, deckfive, decksix, deckseven, deckeight";

/* SKETCHPAD */
var sketchpadname = "sketchpad"; // change if named different


export {collecting, future, hoard, massdecks, paletteportfolioname, paletteportfoliodecks, monochromeportfolioname, monochromeportfoliodecks, sketchpadname};