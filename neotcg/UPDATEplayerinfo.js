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
   a placeholder card will be used if you do not have the deck's card00
   put the deck name, not card numbers (ie sakura, not sakura01)
   
   all ISO DECKS:
   all decks that you would like to be collecting INCLUDING high priority decks. 
   these will be displayed by just a link to the deck page.
   put the deck name, not card numbers (ie sakura, not sakura01)
   
   SPECIFIC CARDS:
   if you want specific cards and not the entire deck
   put the card name, not the deck name (ie sakura01, not sakura)
   
   there is no limit to how many decks or cards you would like to put in each
   
   ex: "deckone, decktwo, deckthree" or "card01, card02, card03"
*/
var highprioritydecks = "clamp, earring, elegance, honorific, jingling, labcoat, oranges, tune, vest"; // "deckone, decktwo, deckthree..."
var allisodecks = ""; // "deckone, decktwo, deckthree..."
var singlecards = ""; // "card01, card02, card03..."


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
   ADDING CRAYONS, CURRENT SKETCHPAD TRADES, COMPLETED SKETCHPADS:
   if you ever want to archive/ delete part of your log, or are starting the log format while already having a different format log, set these variables.
   the below variables will be ADDED to the num crayons/ sketchpad count/ completed sketchpads computed from log
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


/*
    below should be one and done or infrequent changes
*/
var avatar = "websiteassets/avatar.jpg"; // path to avatar picture, should be 80x80px
var playername = "PLAYERNAME"; // colors tcg name
var headername = "HEADERNAME"; // in case you want it to be different from player name
var tradepost = "https://colors-trade.dreamwidth.org/"; // dream width trade post link (where people can comment to trade with you)
var tradetag ="https://colors-trade.dreamwidth.org/tag/player:+PLAYERNAME"; // dreamwidth player tag (in colors-tcg, given to you when you join)
