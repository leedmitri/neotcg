# NeoTCG
A Neocities friendly setup for Colors TCG. 

# Automation Features
- Crayon counting
- Sketchpad marking
- Portfolio completed decks marking
- Sorting Cards by
     - Color
     - Search bar inputs
     - Trading & keeping piles
     - Newest traders and newest keeps
     - Alphabetically
     - Cards that start with 0-M, N-Z sections
     - Text form
- Levels
- Masteries
- All ISO decks displayed color coded with links to their Colors TCG deck page.
- Needed cards based on ISO decks decks
- Priority decks displayed in grid format with cards you own and placeholders
- Pending trades

An example setup can be seen [here](https://gloomlee.neocities.org/colorstcg/neotcgexample/).

# How to Use
The js files beginning with "UPDATE" are the files that a user needs to update and change as they play Colors TCG. These files control all of the pages, and must stay in their given format.

## UPDATEcolorstcgdeckdata.js
Contains a single variable "deckDictionary" that holds a dictionary of data scrapped from Colors TCG's [deck page](https://colors-tcg.eu/cards.php?view=alpha). This dictionary needs to be updated for new deck releases. A tool for getting an updated dictionary can be found at [Gloomlee's website](https://gloomlee.neocities.org/colorstcg/colorstcgscrapper.html), which will output the deckDictionary for you to copy and paste into the UPDATEcolorstcgdeckdata.js file.

The format for the dictionary is:
```
var deckDictionary = {
     "DECKNAME": ["SERIESNAME", "CHARACTERNAME", "DECKCOLOR"];
}
```


## UPDATEtradingcards.js
Contains a single variable "tradingcards" that holds a string of comma seperated card names. The cards names should be of cards the player owns and wants to trade, beginning with recently received cards.

The format for the variable is:
```
var tradingcards = "CARDNAME01, CARDNAME02, CARDNAME03";
```
For example, if the player owned cards obnoxious02, help06, and sturdy09, the format would be:
```
var tradingcards = "obnoxious02, help06, sturdy09";
```

## UPDATEtradingcards.js
Contains a single variable "tradingcards" that holds a string of comma seperated card names. The cards names should be of cards the player owns and wants to trade.

The format for the variable is:
```
var keepingcards = "card01, card02, card03";
```

## UPDATEkeepingcards.js
Contains a single variable "futurecards" that holds a string of comma seperated card names. The cards names should be cards of decks the player plans on collecting in the future.

The format for the variable is:
```
var keepingcards = "card01, card02, card03";
```


## UPDATElogs.js
Contains a single variable "logs" that holds a multi-line string of the player's Colors TCG log. The player is required to use specific keywords in order to enable functionality for some of the setup's pages.

The format for the variable is:
```
var logs = 
` 
    ---COMMAND: COMMAND RESULT;
OPTIONALDATE
`
```
available commands and their formats are:
**TRADING WITH A PLAYER**
traded to PLAYERNAME: card01, card02, card03 for card04, card05, card06

**GIFTING TO A PLAYER**
gifted to PLAYERNAME: card01, card02

**RECEIVING GIFTS FROM A PLAYER**
gifted by PLAYERNAME: card01, card02

**RECEIVING CARDS FROM GAMES/ SERVICES/ ETC.**
received from GAMENAME/ SERVICENAME: card01, card02

**USING CARDS/CRAYONS/SKETCHPADS AT GAMES/SERVICES**
lost to GAMENAME/SERVICENAME: card02, 1 blue crayon, 1 sketchpad etc.
   
**CRAYONS MUST BE WRITTEN OUT WITH A NUMBERED AMOUNT!**
    1 blue crayon or 2 blue crayons NOT blue crayon, 1 crayon rainbow, etc.


## UPDATEplayerinfo.js
Contains a multiple variables that control everything else of the setup besides what is already covered above. Here the user has the below variables


### pendingtrades
When you send trades, you'll want to take the cards you've offered out of your trade pile and save them seperately.
The cards listed here will not show under your for trade pile, but once you complete the trade, you must go remove those cards in UPDATEtradingcards!
The format for the variable is:
```
var pendingtrades = ["PLAYERNAME1: card01, card02", "PLAYERNAME2: card03, card04"]
```
### highprioritydecks, allisodecks, singlecards
HIGH PRIORITY DECKS:
 provide a list of decks that you are most seeking
 a placeholder card will be used if you do not have the deck's card00
 put the deck name, not card numbers (ie sakura, not sakura01)

 all ISO DECKS:
 all decks that you would like to be collecting INCLUDING high priority decks. 
 these will be displayed by just a link to the deck page.
 put the deck name, not card numbers (ie sakura, not sakura01)

 SINGLE CARDS:
 if you want specific cards and not the entire deck
 put the card name, not the deck name (ie sakura01, not sakura)
The format for the variable is:
```
var highprioritydecks = "deckone, decktwo, deckthree";
var allisodecks = "deckone, decktwo, deckthree, deckfour, deckfive";
var singlecards = "card01, card02, card03";
```
### coupons
List the path to the coupon image, total uses it has, and how many uses it has left
The format for the variable is:
```
var coupons = ["coupons/coupons1.gif, 5, 4", "coupons/coupons2.gif, 5, 5"]
```
### paletteportfoliopath, monochromeportfoliopath
change the portfolio paths to be your current portfolio, or else it will put the default one
The formats for the variables are:
```
var paletteportfoliopath = "portfolios/paletteportfolio.gif";
var monochromeportfoliopath = "portfolios/monochromeportfolio.gif";
```
### paletteportfoliodecks, monochromeportfoliodecks
change the porfolio deck strings to match what decks are on the respective portfolio
The formats for the variables are:
```
var paletteportfoliodecks = "reddeck, orangdeck, yellowdeck, greendeck, bluedeck, purpledeck, browndeck, graydeck"; //
var monochromeportfoliodecks = "deckone, decktwo, deckthree, deckfour, deckfive, decksix, deckseven, deckeight";
```
### sketchpadname
 sketchpads will automatically track based on your log.
 you can set a new sketchpad path here, or else it will put the default one
 you will need 21 images, numbered SKETCHPADNAME0.gif to SKETCHPAD20.gif
 images must be in the sketchpads folder
The format for the variable is:
```
var sketchpadname = "sketchpad";
```
### avatar, playername, headername, tradepost, trade tag
Variables used to customize the index.html home page. Avatar is a 80x80 avatar icon, headername displays at the top of all pages, trade post is a link to your Dreamwidth trade post, and trade tag is a link to your "player: PLAYERNAME" tag on the colorstcg-trade dreamwidth journal.
The format for the variable is:
```
var avatar = "websiteassets/avatar.jpg"; 
var playername = "PLAYERNAME";
var headername = "HEADERNAME";
var tradepost = "https://colors-trade.dreamwidth.org/";
var tradetag ="https://colors-trade.dreamwidth.org/tag/player:+PLAYERNAME";
```

# Changing Locations of Setup Items
Throughout the setup, there are containers in which data pulled from the UPDATE files are inserted into in order to be displayed. This connection is through a paticular function being called in a heading script tag, and the container being located on the given page. Setup item's can be moved around as long as the container is named the same, and the appropriate function is called in the heading script tag. 

If a setup item is removed from a paticular page, the corresponding function and it's container(s) must also be removed to prevent errors.

# Styling
Styling is completely up to change within the style.css object. Be careful of what is already there though, as some styling contributes to containers as mentioned.


