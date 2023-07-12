# NeoTCG
A Neocities friendly setup for Colors TCG.  
See more about Colors TCG and NeoTCG updates [here](https://gloomlee.neocities.org/neotcg/neotcg.html).  
Please make sure to not overwrite your files by pulling from the github, especially your UPDATE files.

# Automation Features
- Crayon counting
- Sketchpad marking
- Portfolio completed decks marking
- Sorting Cards by
     - Color
     - Search bar inputs
     - Trading, keeping, and future piles
     - Newest traders, newest keeps, and newest future cards
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
Contains a single variable "deckDictionary" that holds a dictionary of data scrapped from Colors TCG's [deck page](https://colors-tcg.eu/cards.php?view=alpha). This dictionary needs to be updated for new deck releases. In order to update, go to (https://colors-tcg.eu/cards.php?view=alpha) and right click -> save as, and you will get an html. Then upload the file on [Gloomlee's website](https://gloomlee.neocities.org/colorstcg/colorstcgscrapper.html), which will output the deckDictionary variable for you to copy and paste into the UPDATEcolorstcgdeckdata.js file. Overwrite the contents of UPDATEcolorstcgdeckdata.js, don't append to it.

**This will need to be updated every month and/or for every new Colors TCG deck release, in order to get the series, character name, and color data for the new decks. This data is used for displaying the deck colors on the collecting page, sorting by color on your collection pages, and searching by series name/ character name on your collection pages.**

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
For example, if the player had cards obnoxious02, help06, and sturdy09 for trade, the format would be:
```
var tradingcards = "obnoxious02, help06, sturdy09";
```

## UPDATEkeepingcards.js
Contains a single variable "tradingcards" that holds a string of comma seperated card names. The cards names should be of cards the player owns and wants to trade.

The format for the variable is:
```
var keepingcards = "card01, card02, card03";
```
For example, if the player owned and wanted to keep the cards obnoxious02, help06, and sturdy09, the format would be:
```
var keepingcards = "obnoxious02, help06, sturdy09";
```


## UPDATEfuturecards.js
Contains a single variable "futurecards" that holds a string of comma seperated card names. The card names should be cards of decks the player plans on collecting in the future.

The format for the variable is:
```
var futurecards = "card01, card02, card03";
```
For example, if the player had the cards obnoxious02, help06, and sturdy09, and wanted to collect their respective decks in the future, the format would be:
```
var futurecards = "obnoxious02, help06, sturdy09";
```


## UPDATElogs.js
Contains two variables, "logs" and "unformattedlogs", that holds multi-line strings of the player's Colors TCG log. The player is required to use specific keywords in order to enable functionality for some of the setup's pages, such as crayon counting and sketchpad marking

Important Notes:  
    - The bolded inputs can be formatted however you want, as long as it comes after the proper command and before the colon (:)  
    - Crayons **must** be written with a numbered amount. ex: 1 blue crayon or 2 blue crayons not blue crayon, 1 crayon rainbow, etc.  

There is no format for the "unformattedlogs" variable, as it is to be used if the player already has unformatted logs when starting to use neotcg.
The format for the "logs" variable is:
```
var logs = 
` 
    ---COMMAND: COMMAND RESULT;
OPTIONALDATE
`
```
Available commands and their formats are:  
**TRADING WITH A PLAYER**  
traded to **playername**: yourcard01, yourcard02 for theircard04, theircard05  
    ex: traded to gloomlee: anklets01, anklets03 for obnoxious01, obnoxious02  

**GIFTING TO A PLAYER**  
 gifted to **playername**: card01, card02  
    ex: gifted to gloomlee: obnoxious01, obnoxious02  

**RECEIVING GIFTS FROM A PLAYER**  
gifted by **playername**: card01, card02  
    ex: gifted by gloomlee: anklets01, anklets03  

**RECEIVING CARDS FROM GAMES/ SERVICES/ ETC.**  
 received from **game name/ service name**: card01, card02, 1 blue crayon  
    ex: received from silly blanks 126: obnoxious01, obnoxious02, 2 blue crayona, 1 orange crayon  

**USING CARDS/CRAYONS/SKETCHPADS AT GAMES/SERVICES**  
lost to **game name/ service name**: card02, 1 blue crayon, 1 sketchpad etc.  
    ex: lost to silly blanks 126: evil02, menace06  
    ex: lost to art shop: 3 sketchpads, 1 blue crayon  

## UPDATEplayerinfo.js
Contains a multiple variables that control everything else of the setup besides what is already covered above. Here the user has the below variables

### pendingtrades
When you send trades, you'll want to take the cards you've offered out of your trade pile and save them seperately.  
**The cards entered in pendingtrades will still show up in your for trade pile, you must go remove them from your fortrade variable in UPDATEtradingcards manually**.  
Once you complete the trade, you can delete the player's name and cards within the pending trades variable.
The format for the variable is:
```
var pendingtrades = ["PLAYERNAME1: card01, card02", "PLAYERNAME2: card03, card04"]
```
### highprioritydecks, allisodecks, singlecards
**HIGH PRIORITY DECKS**  
 provide a list of decks that you are most seeking
 a placeholder card will be used to represent the cards you do not own from the deck (emptycard.png)
 *put the deck name, not card numbers (ie sakura, not sakura01)*

 **all ISO DECKS**  
 all decks that you would like to be collecting INCLUDING high priority decks. 
 these will be displayed by just a link to the deck page.
 *put the deck name, not card numbers (ie sakura, not sakura01)*

 **SINGLE CARDS**  
 if you want specific cards and not the entire deck, list them here
 *put the card name, not the deck name (ie sakura01, not sakura)*  
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
Change the portfolio paths to be your current portfolio, or else it will put the default one
The formats for the variables are:
```
var paletteportfoliopath = "portfolios/paletteportfolio.gif";
var monochromeportfoliopath = "portfolios/monochromeportfolio.gif";
```
### paletteportfoliodecks, monochromeportfoliodecks
Change the porfolio deck strings to match what decks are on the respective portfolio
The formats for the variables are:
```
var paletteportfoliodecks = "reddeck, orangdeck, yellowdeck, greendeck, bluedeck, purpledeck, browndeck, graydeck"; //
var monochromeportfoliodecks = "deckone, decktwo, deckthree, deckfour, deckfive, decksix, deckseven, deckeight";
```
### sketchpadname
 Sketchpads will automatically track based on your log, if the commands are used correctly.
 You can set a new sketchpad path here, or else it will put the default one.  
 You will need 21 images, numbered SKETCHPADNAME0.gif to SKETCHPADNAME20.gif, with the respective marks ticked on the image.  
 The sketchpad images must be in a "sketchpads" folder.  
The format for the variable is:
```
var sketchpadname = "sketchpad";
```
### avatar, playername, headername, tradepost, trade tag
Variables used to customize the index.html home page. Avatar is a 80x80 avatar icon, headername displays at the top of all pages, trade post is a link to your Dreamwidth trade post, and trade tag is a link to your "player: PLAYERNAME" tag on the colorstcg-trade Dreamwidth journal.
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

# FAQ & Debugging
**Where do I put signatures?**  
Signatures can be listed in UPDATEkeepingcards.js, and their image placed in your cards folder as if a normal card.

**Where do I put mastery images?**  
Mastery images go in your cards folder as if a normal card. When you master a deck, it will automatically put the mastery image on your home page.

**My collecting page is not showing all of the decks I entered as high priority, what should I do?**  
If the collecting page breaks, its likely due to not having your UPDATEcolorstcgdeckdata.js file updated. If you have a recently released deck entered as high priority, but do not have an updated UPDATEcolorstcgdeckdata.js file, it will not be able to find its color data, and will break. Try updating the file by downloading Color TCG's [deck html page](https://colors-tcg.eu/cards.php?view=alpha) by right clicking and saving, then upload the .htm file at [Gloomlee's website](https://gloomlee.neocities.org/colorstcg/colorstcgscrapper.html). Copy and paste the resulting deck dictionary variable in your UPDATEcolorstcgdeckdata.js, overwriting what is already there. If you still have issues, make sure the deck names do not have spelling errors.  
**UPDATE 12/16/2022**: This has been fixed. make sure you have an updated functions.js file from the github, and check out the [neoTCG update page](https://gloomlee.neocities.org/neotcg/updates.html) to see the changes.

