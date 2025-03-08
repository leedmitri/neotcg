/*
    PENDING TRADES/ CARDS ON HOLD:
    when you send trades, you'll want to take the cards you've offered out of your trade pile and save them seperately
    the cards listed here will not show under your for trade pile, but once you complete the trade, you must go remove those cards in UPDATEtradingcards!
    
    ex: ["PLAYERNAME1: card01, card02", "PLAYERNAME2: card03, card04"]
*/
var pendingtrades = [];


/*
   HIGH PRIORITY DECKS:
   provide a list of decks that you are most seeking
   these decks must be defined within allisoseries or allisodecks to sort into keeping
   a placeholder card will be used if you do not have the deck's card00
   put the deck name, not card numbers (ie sakura, not sakura01)
   
   ALL ISO SERIES:
   all series decks that you would like to be collecting
   series must be exactly as written on colors-tcg.eu

   ALL ISO DECKS:
   all decks that you would like to be collecting
   you do not need to include decks already defined within an allisoseries
   put the deck name, not card numbers (ie sakura, not sakura01)
   
   SPECIFIC CARDS:
   if you want specific cards and not the entire deck
   put the card name, not the deck name (ie sakura01, not sakura)

   FUTURE DECKS:
   cards that will not pop up under needed, but you'd like to save for
   collecting in the future
   put the deck name, not card numbers (ie sakura, not sakura01)
   
   there is no limit to how many decks or cards you would like to put in each
   
   ex: "deckone, decktwo, deckthree" or "card01, card02, card03"
*/
var highprioritydecks = "clamp, earring, elegance"; // "deckone, decktwo, deckthree..."
var allisoseries = ["Colors Universe"] // ["Series Name 1", "Series Name 2", ...]
var allisodecks = "halloween, christmas"; // "deckone, decktwo, deckthree..."
var singlecards = "brothers01"; // "card01, card02, card03..."
var allfuturedecks = "artists"; // "deckone, decktwo, deckthree..."


/*
    MASS DECKS
    povide a list of collections containing series(s), deck(s), and/or single card(s)
    you define the mass deck name, and then different media series, decks, and single cards you
    want to include. if you don't have any input, leave the array ([]) or string ("") blank.
    place mass deck images in the massdecks folder with the name you have written

    ex:
    [
        {
            name: 'Disney',
            image: 'disney.png',
            series: ["Kingdom Hearts", "Kingdom Come"],
            decks: "onceupon, my beloved",
            singles: "adaptations08, season06"
        },

        {
            name: 'Mass Deck 2',
            image: 'massdeck2.png',
            series: ["Series Name", "Other Series Name"],
            decks: "deck, otherdeck",
            singles: "card01, othercard02"
        },

        {
            name: 'Mass Deck 3',
            image: 'massdeck3.png',
            series: [],
            decks: "deck, otherdeck",
            singles: ""
        }
    ]
*/
var massdecks = 
[
    {
        name: 'Colors Universe',
        image: 'colorsuniversemassdeck.jpg',
        seriesnames: ["Colors Universe"],
        decks: "",
        singles: ""
    },
        
]

/* 
    COUPONS:
    list the path to the coupon image, total uses it has, and how many uses it has left
    
    ex: ["coupons/coupons.gif, 5, 4"]
*/
var coupons = [];


/*
   PORTFOLIO DATA:
   change the portfolio paths to be your current portfolio, or else it will put the default one
   change the porfolio deck strings to match what decks are on the respective portfolio
   
   ex: "reddeck, orangdeck, yellowdeck, greendeck, bluedeck, purpledeck, browndeck, graydeck"
*/
var paletteportfoliopath = "portfolios/paletteportfolio.gif"; // change if named different
var monochromeportfoliopath = "portfolios/monochromeportfolio.gif"; // change if named different

var paletteportfoliodecks = "reddeck, orangdeck, yellowdeck, greendeck, bluedeck, purpledeck, browndeck, graydeck"; //
var monochromeportfoliodecks = "deckone, decktwo, deckthree, deckfour, deckfive, decksix, deckseven, deckeight";


/*
   SKETCHPAD DATA:
   sketchpads will automatically track based on your log.
   you can set a new sketchpad path here, or else it will put the default one
   you will need 21 images, numbered SKETCHPADNAME0.gif to SKETCHPAD20.gif
   images must be in the sketchpads folder
   
   ex: "sketchpad" if your images are sketchpad0.gif, sketchpad1.gif etc.
*/
var sketchpadname = "sketchpad";

/*
   SET STARTING COLLECTION
   if you ever want to archive/ delete part of your log, or are starting the log format while already having a different format log, set these variables.
   This will represent your starting point that the log works off of.
   ALSO SET starting keeping, trading, and future cards in the UPDATEkeeping.js, UPDATEtrading.js, and UPDATEfuture.js files
*/
var additionalCrayons = {
    "red": 0,
    "orange": 0,
    "yellow": 0,
    "green": 0,
    "blue": 0,
    "purple": 0,
    "brown": 0,
    "gray": 0
};
var additionalCurrentSketchpadPoints = 0;
var additionalCompletedSketchpads = 0;
var signatures = ""; // sig_1, sig_2, sig_3...

/*
    below should be one and done or infrequent changes
*/
var avatar = "websiteassets/avatar.jpg"; // path to avatar picture, should be 80x80px
var playername = "PLAYERNAME"; // colors tcg name
var headername = "HEADERNAME"; // in case you want it to be different from player name
var tradepost = "https://colors-trade.dreamwidth.org/"; // dream width trade post link (where people can comment to trade with you)
var tradetag ="https://colors-trade.dreamwidth.org/tag/player:+PLAYERNAME"; // dreamwidth player tag (in colors-tcg, given to you when you join)
