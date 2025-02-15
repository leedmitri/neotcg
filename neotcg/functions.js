//INITIAL SETUP

//previous collection
if (tradingcards != ''){
    tradingcards = tradingcards.replaceAll(" ", "").split(",");
}
else{ tradingcards = []; }
if (keepingcards != ''){
    keepingcards = keepingcards.replaceAll(" ", "").split(",");
}
else{ keepingcards = []; }
if (futurecards != ''){
    futurecards = futurecards.replaceAll(" ", "").split(",");
}
else{ futurecards = []; }

//collecting
if (highprioritydecks != ''){
    highprioritydecks = highprioritydecks.replaceAll(" ", "").split(",");
}
else{ highprioritydecks = []; }
if (allisodecks != ''){
    allisodecks = allisodecks.replaceAll(" ", "").split(",");
}
else{ allisodecks = []; }
if (singlecards != ''){
    singlecards = singlecards.replaceAll(" ", "").split(",");
}
else{ singlecards = []; }
if (allfuturedecks != ''){
    allfuturedecks = allfuturedecks.replaceAll(" ", "").split(",");
}
else{ allfuturedecks = []; }

singlecards.sort();
allfuturedecks.sort();

var crayons = additionalCrayons;
var currentsketchpad = additionalCurrentSketchpadPoints;
var completedsketchpads = additionalCompletedSketchpads;
var allneeds = [];
var collects = [];
var singles = [];
var futures = [];

readLogs();
generateNeededCards();

//END INITIAL SETUP



function cardNamesFromImgTags(imgTags){
    var imageTagsArray = imgTags.split('.gif');
    imageTagsArray.pop();

    // get just image names
    for (index = 0; index < imageTagsArray.length; index++){
        var firstLetter = imageTagsArray[index].lastIndexOf('/') + 1;
        var cardName = imageTagsArray[index].substring(firstLetter, imageTagsArray[index].length);
        imageTagsArray[index] = cardName;
    }

    imageTagsArray.sort();

    return imageTagsArray;
}

// NEEDS: text area input value with id searchbar
// INSERTS INTO: searchresultcontainer
function cardTextSearch(type){
    var searchInput = document.getElementById("searchbar").value;
    var searchArray = searchInput.replaceAll(" ", '').split(",");
    
    var searchingCards;
    if (type == "tradingcards") { searchingCards = getNeededCards()[0] }
    else { searchingCards = getTradingCards() }

    var result = getNeededCards();
    collects = result[1];
    singles = result[2];
    future = result[3];

    var collectFound = collects.filter(card => {
        return searchArray.some( input => {
            if (card.startsWith(input) && input != ''){
                return true;
            }
        })
    })
    var singlesFound = singles.filter(card => {
        return searchArray.some( input => {
            if (card.startsWith(input) && input != ''){
                return true;
            }
        })
    })
    var futureFound = future.filter(card => {
        return searchArray.some( input => {
            if (card.startsWith(input) && input != ''){
                return true;
            }
        })
    })

    document.getElementById("searchresultcontainer").innerHTML = '';
    document.getElementById("searchresultcontainer").innerHTML += "high priority: " + collectFound.length + "<br>" + collectFound.join(", ") + "<br><br>";
    document.getElementById("searchresultcontainer").innerHTML += "single cards: " + singlesFound.length + "<br>" + singlesFound.join(", ") + "<br><br>";
    document.getElementById("searchresultcontainer").innerHTML += "future: " + futureFound.length + "<br>" + futureFound.join(", ") + "<br>";
}

// INSERTS INTO: fullsetisocontainer
function createPriorityDecks(){
    var cardsOwned = getKeepingCards();
    var priorityNeeds = highprioritydecks;
    priorityNeeds.forEach( deck => {
        // create elements
        var deckDiv = document.createElement("div");
        var deckHeader = document.createElement("p");
        var deckLink = document.createElement("a")
        var deckImgDiv = document.createElement("div")

        //set bg colors
        // r #ffdbdb | o #ffeee2 | y #fcfade | g #e2fce6| b #dff2fd | p #e3e3ff| br #e9d4b7 | gr #d4d4d4
        // check if deckdictionary had deck 
        var headerColor = getColorSeries(deck)[2].toLowerCase();

        deckDiv.setAttribute("class", "deckdiv")
        deckHeader.setAttribute("class", "deckheader deck" + headerColor)
        deckLink.setAttribute("class", "decklink")
        deckLink.setAttribute("href", "https://colors-tcg.eu/viewcards.php?deck=" + deck)
        deckLink.innerHTML = deck
        deckImgDiv.setAttribute("class", "deckimgdiv")

        deckHeader.appendChild(deckLink)
        deckDiv.appendChild(deckHeader)

        // make card setup
        for (var index = 1; index < 21; index++){
            var cardNumber = ''
            if (index < 10){ cardNumber = "0"+index}
            else {cardNumber += index;}

            if (cardsOwned.includes(deck + cardNumber)){
                var imgTag = document.createElement("img");
                imgTag.setAttribute("src", "cards/" + deck + cardNumber + ".gif")
                imgTag.setAttribute("title", deck + cardNumber)
                imgTag.setAttribute("alt", deck + cardNumber)

                deckImgDiv.appendChild(imgTag)
            }
            else{
                var imgTag = document.createElement("img");
                imgTag.setAttribute("src", "cards/" + deck + "00.gif")
                imgTag.setAttribute("onerror", "this.src='cards/placeholdercard.gif'")
                imgTag.setAttribute("title", deck + "placeholdercard")
                imgTag.setAttribute("alt", deck + "placeholdercard")

                deckImgDiv.appendChild(imgTag)
            }
        }

        deckDiv.appendChild(deckImgDiv)
        document.getElementById("fullsetisocontainer").appendChild(deckDiv)
    })
}

// INSERTS INTO: couponcontainer div
function fillCoupons(){
    if (coupons.length < 1){
        document.getElementById("couponcontainer").innerHTML = "no coupons";
    }
    else{
        coupons.forEach( coupon => {
        var couponArray = coupon.replaceAll(" ","").split(",");
        var couponimg = document.createElement("img");
        var couponuses = document.createElement("p");
        
        couponimg.src = couponArray[0];
        couponuses.innerHTML = couponArray[2] + "/" + couponArray[1];
        
        document.getElementById("couponcontainer").innerHTML += "<div><img src='" + couponArray[0] + "'>" + couponArray[2] + "/" + couponArray[1] + "</div>";
        })
    }
}

// INSERTS INTO: avatarcontainer, playernamecontainer, tradepostcontainer, tradetagcontainer
function fillPlayerInfo(){
    document.getElementById("avatarcontainer").innerHTML = '<img id="avatar" src="' + avatar + '">'
    document.getElementById("playernamecontainer").innerHTML = playername;
    document.getElementById("tradepostcontainer").innerHTML = "<a href='" + tradepost + "' target='_blank'>here</a>";
    document.getElementById("tradetagcontainer").innerHTML = "<a href='" + tradetag + "' target='_blank'>here</a>";
}

// INSERTS INTO:
// paletteportfoliocontainer, monochromeportfoliocontainer divs and palettedeckscontainer, monochromedeckscontainer ps
function fillPortfolios(){
    document.getElementById("paletteportfoliocontainer").innerHTML = "<img class='marginimage' src ='" + paletteportfoliopath + "'>";
    document.getElementById("monochromeportfoliocontainer").innerHTML = "<img class='marginimage' src ='" + monochromeportfoliopath + "'>";
    
    var keepingCards = getKeepingCards();
    
    var paletteArray = paletteportfoliodecks.replaceAll(" ",'').split(",");
    var monochromeArray = monochromeportfoliodecks.replaceAll(" ",'').split(",");
    var palettep = '';
    var monochromep = '';
    var cardsFound = 0;
    paletteArray.forEach( deckName => {
        for (var index = 1; index < 21; index++){
            cardNum = index;
            if (index < 10){ cardNum = "0" + index; } 
            if (keepingCards.includes(deckName + cardNum)){ cardsFound += 1; }
        }
        if (cardsFound == 20){ palettep += "☒ " + deckName + "<br>"; }
        else{ palettep += "☐ " + deckName + "<br>"; }
        cardsFound = 0;
    })
    monochromeArray.forEach( deckName => {
        for (var index = 1; index < 21; index++){
            cardNum = index;
            if (index < 10){ cardNum = "0" + index; }
            if (keepingCards.includes(deckName + cardNum)){ cardsFound += 1; }
        }

        if (cardsFound == 20){ monochromep += "☒ " + deckName + "<br>"; }
        else{ monochromep += "☐ " + deckName + "<br>"; }
        cardsFound = 0;
    })
    document.getElementById("palettedeckscontainer").innerHTML = palettep;
    document.getElementById("monochromedeckscontainer").innerHTML = monochromep;
}

// INSERTS INTO: pendingtradescontainer div
function fillPendingTrades(){
    var pendingarray = pendingtrades; // from playerinfo
    if (pendingarray.length == 0){
        document.getElementById("pendingtradescontainer").innerHTML = "<p>none</p>";
    }
    else{
        pendingarray.forEach( pendingTrade => {
            pendingTrade = pendingTrade.trim()
            var nameandcards = pendingTrade.split(":")
            var playerName = nameandcards[0].replaceAll(" ",'');
            var cards = nameandcards[1].replaceAll(" ",'').split(",")

            var pendingSection = document.createElement("div")
            var imgTags = document.createElement("div")
            var playerNamep = document.createElement("p")

            pendingSection.setAttribute("class", "pendingsection")
            playerNamep.innerHTML = playerName;

            cards.forEach( card => {
                var img = document.createElement("img");
                img.setAttribute("src", "cards/" + card + ".gif");
                img.setAttribute("title", card)
                img.setAttribute("alt", card)
                imgTags.appendChild(img)
            })

            pendingSection.appendChild(playerNamep)
            pendingSection.appendChild(imgTags)

            document.getElementById("pendingtradescontainer").appendChild(pendingSection);
        })
    }
}

// INSERTS INTO currentsketchpadcontainer, completedsketchpadcontainer
function fillSketchpads(){
    document.getElementById("completedsketchpadscontainer").innerHTML = "<img class='marginimage' src='sketchpads/" + sketchpadname + "20.gif'>x" + completedsketchpads;
    document.getElementById("currentsketchpadcontainer").innerHTML = "<img class='marginimage' src='sketchpads/" + sketchpadname + currentsketchpad + ".gif'>";
}

// INSERTS INTO crayonscontainer
function fillCrayons(){
    var crayonsHolder = document.createElement("div")
    crayonsHolder.setAttribute("id", "crayonscontainer")
    
    crayonsHolder.innerHTML += "<div class='crayoncount'><div><img src='currency/redcrayon.gif'></div><p><b>" + (crayons["red"]) + '</b></p></div>';
    crayonsHolder.innerHTML += "<div class='crayoncount'><div><img src='currency/orangecrayon.gif'></div><p><b>" + (crayons["orange"]) + '</b></p></div>';
    crayonsHolder.innerHTML += "<div class='crayoncount'><div><img src='currency/yellowcrayon.gif'></div><p><b>" + (crayons["yellow"]) + '</b></p></div>';
    crayonsHolder.innerHTML += "<div class='crayoncount'><div><img src='currency/greencrayon.gif'></div><p><b>" + (crayons["green"]) + '</b></p></div>';
    crayonsHolder.innerHTML += "<div class='crayoncount'><div><img src='currency/bluecrayon.gif'></div><p><b>" + (crayons["blue"]) + '</b></p></div>';
    crayonsHolder.innerHTML += "<div class='crayoncount'><div><img src='currency/purplecrayon.gif'></div><p><b>" + (crayons["purple"]) + '</b></p></div>';
    crayonsHolder.innerHTML += "<div class='crayoncount'><div><img src='currency/browncrayon.gif'></div><p><b>" + (crayons["brown"]) + '</b></p></div>';
    crayonsHolder.innerHTML += "<div class='crayoncount'><div><img src='currency/graycrayon.gif'></div><p><b>" + (crayons["gray"]) + '</b></p></div>';
    document.getElementById("crayonscontainer").appendChild(crayonsHolder);
}

function fillLogs(){
    document.getElementById("collectionlogcontainer").innerHTML = logs + "\n" + unformattedlogs;
}

// INSERTS INTO totalcardscontainer
function fillTotalCards(){
    var totalcards = getKeepingCards().length + getTradingCards().length + getFutureCards().length;
    var levelString = "";
    if (totalcards > 14401){
        var modifier = Math.floor((totalCards % 14401) / 3) ;
        levelString += "rainbow " + modifier + " (" + totalcards + " cards)";
    }
    else if (totalcards > 14101){ levelString += "himalayan (" + totalcards + " cards)"; }
    else if (totalcards > 14101){ levelString += "himalayan (" + totalcards + " cards)"; }
    else if (totalcards > 13801){ levelString += "puma (" + totalcards + " cards)"; }
    else if (totalcards > 13501){ levelString += "chartreux (" + totalcards + " cards)"; }
    else if (totalcards > 13201){ levelString += "russian blue (" + totalcards + " cards)"; }
    else if (totalcards > 12901){ levelString += "panther (" + totalcards + " cards)"; }
    else if (totalcards > 12601){ levelString += "cheetah (" + totalcards + " cards)"; }
    else if (totalcards > 12301){ levelString += "tiger (" + totalcards + " cards)"; }
    else if (totalcards > 12001){ levelString += "lion (" + totalcards + " cards)"; }

    else if (totalcards > 11701){ levelString += "metal (" + totalcards + " cards)"; }
    else if (totalcards > 11401){ levelString += "ground (" + totalcards + " cards)"; }
    else if (totalcards > 11101){ levelString += "darkness (" + totalcards + " cards)"; }
    else if (totalcards > 10801){ levelString += "water (" + totalcards + " cards)"; }
    else if (totalcards > 10501){ levelString += "nature (" + totalcards + " cards)"; }
    else if (totalcards > 10201){ levelString += "light (" + totalcards + " cards)"; }
    else if (totalcards > 9901){ levelString += "wind (" + totalcards + " cards)"; }
    else if (totalcards > 9601){ levelString += "fire (" + totalcards + " cards)"; }

    else if (totalcards > 9301){ levelString += "mercury (" + totalcards + " cards)"; }
    else if (totalcards > 9001){ levelString += "jupiter (" + totalcards + " cards)"; }
    else if (totalcards > 8701){ levelString += "uranus (" + totalcards + " cards)"; }
    else if (totalcards > 8401){ levelString += "neptune (" + totalcards + " cards)"; }
    else if (totalcards > 8101){ levelString += "earth (" + totalcards + " cards)"; }
    else if (totalcards > 7801){ levelString += "venus (" + totalcards + " cards)"; }
    else if (totalcards > 7501){ levelString += "saturn (" + totalcards + " cards)"; }
    else if (totalcards > 7201){ levelString += "mars (" + totalcards + " cards)"; }

    else if (totalcards > 6901){ levelString += "magnolia (" + totalcards + " cards)"; }
    else if (totalcards > 6601){ levelString += "chocolate cosmos (" + totalcards + " cards)"; }
    else if (totalcards > 6301){ levelString += "lilac (" + totalcards + " cards)"; }
    else if (totalcards > 6001){ levelString += "hydrangea (" + totalcards + " cards)"; }
    else if (totalcards > 5701){ levelString += "clover (" + totalcards + " cards)"; }
    else if (totalcards > 5401){ levelString += "daffodil (" + totalcards + " cards)"; }
    else if (totalcards > 5101){ levelString += "tiger lily (" + totalcards + " cards)"; }
    else if (totalcards > 4801){ levelString += "sakura (" + totalcards + " cards)"; }

    else if (totalcards > 5401){ levelString += "silver (" + totalcards + " cards)"; }
    else if (totalcards > 4201){ levelString += "bronze (" + totalcards + " cards)"; }
    else if (totalcards > 3901){ levelString += "amethyst (" + totalcards + " cards)"; }
    else if (totalcards > 3601){ levelString += "sapphire (" + totalcards + " cards)"; }
    else if (totalcards > 3301){ levelString += "emerald (" + totalcards + " cards)"; }
    else if (totalcards > 3001){ levelString += "gold (" + totalcards + " cards)"; }
    else if (totalcards > 2701){ levelString += "amber (" + totalcards + " cards)"; }
    else if (totalcards > 2401){ levelString += "ruby (" + totalcards + " cards)"; }

    else if (totalcards > 2201){ levelString += "dragon fruit (" + totalcards + " cards)"; }
    else if (totalcards > 2001){ levelString += "apricot (" + totalcards + " cards)"; }
    else if (totalcards > 1801){ levelString += "grape (" + totalcards + " cards)"; }
    else if (totalcards > 1601){ levelString += "blueberry (" + totalcards + " cards)"; }
    else if (totalcards > 1401){ levelString += "lime (" + totalcards + " cards)"; }
    else if (totalcards > 1201){ levelString += "lemon (" + totalcards + " cards)"; }
    else if (totalcards > 1001){ levelString += "tangerine (" + totalcards + " cards)"; }
    else if (totalcards > 801){ levelString += "strawberry (" + totalcards + " cards)"; }

    else if (totalcards > 701){ levelString += "gray (" + totalcards + " cards)"; }
    else if (totalcards > 601){ levelString += "brown (" + totalcards + " cards)"; }
    else if (totalcards > 501){ levelString += "purple (" + totalcards + " cards)"; }
    else if (totalcards > 401){ levelString += "blue (" + totalcards + " cards)"; }
    else if (totalcards > 301){ levelString += "green (" + totalcards + " cards)"; }
    else if (totalcards > 201){ levelString += "yellow (" + totalcards + " cards)"; }
    else if (totalcards > 101){ levelString += "orange (" + totalcards + " cards)"; }
    else if (totalcards > 1){ levelString += "red (" + totalcards + " cards)"; }
    else if (totalcards >= 0){ levelString += "0"; }

    document.getElementById("totalcardscontainer").innerHTML = levelString;
}

function fillNeededCardsPage(){
    var neededData = getNeededCards();
    var neededCards = neededData[0];

    // make elements
    var cards = document.createElement('div');
    var cardsp = document.createElement('p');
    cardsp.innerHTML = neededCards.join(", ")
    cards.appendChild(cardsp)

    cardsString = neededCards.join(", ")


    document.getElementById("cardstextcontainer").appendChild(cardsp);
    document.getElementById("cardstextareacontainer").value = cardsString;
}

function fillNewCardsContainer(type){
    var newcardscontainer = document.getElementById("newcardscontainer")
    var cardsFromType;
    var numCardsShown;
    
    if (type == "keep"){ cardsFromType = getKeepingCards(false); }
    else if ( type == "trading") { cardsFromType = getTradingCards(false); }
    else { cardsFromType = getFutureCards(false); }

    if (cardsFromType.length < 100){
        numCardsShown = cardsFromType.length;
    }
    else{
        numCardsShown = 100;
    }
    
    for (var index = 0; index < numCardsShown; index++){
        var img = document.createElement("img")
        img.setAttribute("src", "cards/" + cardsFromType[index] + ".gif")
        img.setAttribute("title", cardsFromType[index])
        img.setAttribute("alt", cardsFromType[index])
        img.setAttribute("class", "cardimage")
        newcardscontainer.appendChild(img)
    }
}

// INSERTS INTO signaturescontainer
function fillSignatures(){
    var keepingArray = getKeepingCards();
    var signaturesArray = keepingArray.filter( card => card.includes("sig_"));
    
    if (signaturesArray.length != 0){
        document.getElementById("signaturescontainer").innerHTML = "";
        signaturesArray.forEach( signatureCard => {
            var img = document.createElement("img");
            img.src = "cards/" + signatureCard + ".gif";
            img.alt = signatureCard;
            img.title = signatureCard;
            document.getElementById("signaturescontainer").appendChild(img);
        })
    }
    else{
        document.getElementById("signaturescontainer").innerHTML = "none";
    }
}

function fillMasteries(){
    var keepingArray = getKeepingCards();
    var keepingDeckDictionary = getDeckNames(keepingArray);

    if (Object.keys(keepingDeckDictionary).length != 0){
        document.getElementById("masteriescontainer").innerHTML = "";
        Object.keys(keepingDeckDictionary).forEach( keepingDeck => {
            // remove duplicates 
            var cardsOwnedFromDeck = keepingDeckDictionary[keepingDeck];
            cardsOwnedFromDeck = cardsOwnedFromDeck.filter( (card, index) => cardsOwnedFromDeck.indexOf(card) == index )
            if (cardsOwnedFromDeck.length >= 20){
                var img = document.createElement("img");
                img.src = "cards/" + keepingDeck + "master.gif";
                img.alt = keepingDeck + "master";
                img.title = keepingDeck + "master";
                document.getElementById("masteriescontainer").appendChild(img);
            }
        })
        // if no masteries found
        if (document.getElementById("masteriescontainer").innerHTML == ""){
            document.getElementById("masteriescontainer").innerHTML = "none";
        }
    }
    else{
        document.getElementById("masteriescontainer").innerHTML = "none";
    }
}

function fillTradingCardsTextPage(){
    //alphabetize
    var fortradeArray = getTradingCards();

    // make elements
    var cards = document.createElement('div');
    var cardsp = document.createElement('p');
    cardsp.innerHTML = fortradeArray.join(", ")
    cards.appendChild(cardsp)

    //find duplicates
    duplicates = fortradeArray.filter((card, index) => fortradeArray.indexOf(card) != index)

    allCardsString = fortradeArray.join(", ")

    document.getElementById("cardstextcontainer").appendChild(cardsp);
    document.getElementById("cardstextareacontainer").value = allCardsString
    document.getElementById("duplicatestextarea").value = duplicates.join(", ")
}

function filter(){
    // get inputs
    var showAllInput = document.getElementById("showAll");
    var showRedInput = document.getElementById("showRed");
    var showOrangeInput = document.getElementById("showOrange");
    var showYellowInput = document.getElementById("showYellow");
    var showGreenInput = document.getElementById("showGreen");
    var showBlueInput = document.getElementById("showBlue");
    var showPurpleInput = document.getElementById("showPurple");
    var showBrownInput = document.getElementById("showBrown");
    var showGreyInput = document.getElementById("showGrey");
    var showSpecialInput = document.getElementById("showSpecial");
    /*var sortByColor = document.getElementById("sortbycolors");
    var sortBySeries = document.getElementById("sortbycolors");
    var sortByAll = document.getElementById("sortbyall"); */


    //filter colors
    if (showAllInput.checked){
        showHideClass("Red", "SHOW"); 
        showHideClass("Orange", "SHOW"); 
        showHideClass("Yellow", "SHOW"); 
        showHideClass("Green", "SHOW"); 
        showHideClass("Blue", "SHOW");
        showHideClass("Purple", "SHOW");  
        showHideClass("Brown", "SHOW"); 
        showHideClass("Gray", "SHOW"); 
        showHideClass("Special", "SHOW");  
    }
    else{
        if (showRedInput.checked){
            showHideClass("Red", "SHOW");  
        }
        else if (showRedInput.checked == false){
            showHideClass("Red", "HIDE"); 
        }

        if (showOrangeInput.checked){
            showHideClass("Orange", "SHOW");  
        }
        else if (showOrangeInput.checked == false){
            showHideClass("Orange", "HIDE");  
        }

        if (showYellowInput.checked){
            showHideClass("Yellow", "SHOW");  
        }
        else if (showYellowInput.checked == false){
            showHideClass("Yellow", "HIDE"); 
        }

        if (showGreenInput.checked){
            showHideClass("Green", "SHOW");  
        }
        else if (showGreenInput.checked == false){
            showHideClass("Green", "HIDE");  
        }

        if (showBlueInput.checked){
            showHideClass("Blue", "SHOW");  
        }
        else if (showBlueInput.checked == false){
            showHideClass("Blue", "HIDE");  
        }

        if (showPurpleInput.checked){
            showHideClass("Purple", "SHOW");  
        }
        else if (showPurpleInput.checked == false){
            showHideClass("Purple", "HIDE");  
        }

        if (showBrownInput.checked){
            showHideClass("Brown", "SHOW");  
        }
        else if (showBrownInput.checked == false){
            showHideClass("Brown", "HIDE");  
        }

        if (showGreyInput.checked){
            showHideClass("Gray", "SHOW"); 
        }
        else if (showGreyInput.checked == false){
            showHideClass("Gray", "HIDE");  
        }

        if (showSpecialInput.checked){
            showHideClass("Special", "SHOW");  
        }
        else if (showSpecialInput.checked == false){
            showHideClass("Special", "HIDE");  
        }
    }

    // search bar
    if (document.getElementById("searchbar").value != ''){
        searchShowing();   
    }

}

function getColorSeries(deckName){
    // if deck dictionary has info
    if (deckName in deckDictionary){
        return deckDictionary[deckName];
    }
    return ["SERIESNOTFOUND", "CHARACTERNAMENOTFOUND", 'COLORNOTFOUND'];
}

function getDeckNames(keepingArray){
    var key = '';
    var value = [];
    var decks = {};

    if (keepingArray.length != 0){
        for (let index=0; index < keepingArray.length; index++){
              // get card and decknames
              var currentCard = keepingArray[index];
              var currentDeck = currentCard.substring(0, currentCard.length-2);

              // check if we have moved onto a different deck and reset
              if (key != '' && currentDeck != key){
                  decks[key] = value; 
                  value = [];
              }

              // log current card in current deck
              key = currentDeck;
              value.push(currentCard + ".gif");

          }
          // push last value
          decks[key] = value;
    }
    
    return decks;
}

function getKeepingCards(sort = true){
    if (sort){
        keepingcards.sort();
        return keepingcards;
    }
    return keepingcards;
}

function getFutureCards(sort = true){
    if (sort){
        futurecards.sort();
        return futurecards;
    }
    
    return futurecards;
}

function getNeededCards(){
    return [allneeds, collects, singles, futures];
}

function generateNeededCards(){

    //find deck needed cards
    allisodecks.forEach( deckName => {
        for (var index = 1; index < 21; index++){
            var cardNumber = ''
            if (index < 10){ cardNumber = "0"+index}
            else {cardNumber += index;}

            if (!keepingcards.includes(deckName + cardNumber)){
                collects.push(deckName + cardNumber);
            }
        }

    })

    //find future needed cards
    allfuturedecks.forEach( deckName => {
        for (var index = 1; index < 21; index++){
            var cardNumber = ''
            if (index < 10){ cardNumber = "0"+index}
            else {cardNumber += index;}

            if (!futurecards.includes(deckName + cardNumber)){
                futures.push(deckName + cardNumber);
            }
        }

    })

    // find needed single cards
    singles = singlecards.filter(card => !keepingcards.includes(card))

    allneeds = collects.concat(singles)
    allneeds.sort();
    collects.sort();
    singles.sort();
    futures.sort();
}

function getTradingCards(sort = true){
    if (sort){
        tradingcards.sort();
        return tradingcards;
    }
    
    return tradingcards;
}

function insertImages(type, cardsection){
    //alphabetize
    var ZEROM = "0123456789abcdefghijklm";
    var NZ = "nopqrstuvwxyz";
    var cardsArray;
    if (type == "keeping"){ 
        cardsArray = getKeepingCards();
        if (cardsArray.length != 0){
            cardsArray.sort()
        
            if (cardsection == "0M"){
                cardsArray = cardsArray.filter(card => ZEROM.includes(card[0].toLowerCase()));
            }
            else if (cardsection == "NZ"){
                cardsArray = cardsArray.filter(card => NZ.includes(card[0].toLowerCase()));
            }

            keepingimgtagstext = makeImgTags(cardsArray, "keep")
            // make elements
            var cards = document.createElement('div');
            cards.innerHTML = keepingimgtagstext;
            document.getElementById("fullcollectioncontainer").appendChild(cards)
        }
    }
    else if (type == "trading"){ 
        cardsArray = getTradingCards();
        if (cardsArray.length != 0){
            if (cardsection == "0M"){
            cardsArray = cardsArray.filter(card => ZEROM.includes(card[0].toLowerCase()));
            }
            else if (cardsection =="NZ"){
                cardsArray = cardsArray.filter(card => NZ.includes(card[0].toLowerCase()));
            }  

            cardsArray.sort()
            tradingimgtagstext = makeImgTags(cardsArray, "trade");
            // make elements
            var cards = document.createElement('div');
            cards.innerHTML = tradingimgtagstext;
            document.getElementById("fullcollectioncontainer").appendChild(cards);
        }
    }
    else{
        cardsArray = getFutureCards();
        if (cardsArray.length != 0){
            if (cardsection == "0M"){
            cardsArray = cardsArray.filter(card => ZEROM.includes(card[0].toLowerCase()));
            }
            else if (cardsection =="NZ"){
                cardsArray = cardsArray.filter(card => NZ.includes(card[0].toLowerCase()));
            }  

            cardsArray.sort()
            tradingimgtagstext = makeImgTags(cardsArray, "trade");
            // make elements
            var cards = document.createElement('div');
            cards.innerHTML = tradingimgtagstext;
            document.getElementById("fullcollectioncontainer").appendChild(cards);
        }
    }

    //find duplicates
    duplicates = cardsArray.filter((card, index) => cardsArray.indexOf(card) != index)
    document.getElementById("duplicatestextarea").value = duplicates.join(", ")
}

function makeImgTags(deckNames, keeptradeidentifier){
    var deckName;
    var img;
    var tagsText = '';

    // add keeping class
    for (let index = 0; index < deckNames.length; index++){
        cardName = deckNames[index];
        deckName = cardName.substring(0, cardName.length-2)
        img = document.createElement('img');
        img.setAttribute("src", "cards/" + cardName + ".gif")
        img.setAttribute("alt", cardName);

        if (keeptradeidentifier == "keep"){
            img.classList.add("keep");
        }
        else if (keeptradeidentifier == "trade"){
            img.classList.add("trade");
        }

        var result = getColorSeries(deckName);
        var color = result[2];
        var character = result[1];
        var series = result[0];

        img.setAttribute("title", cardName + " (" + character + " from " + series + ", " + color + ")");

        // add color class
        img.classList.add(color);
        img.classList.add(series.toString().replaceAll(" ", '_'));
        img.classList.add(character.toString().replaceAll(" ", '_'));

        //add lazy loading
        img.loading = "lazy";

        tagsText += img.outerHTML;

    }

    return tagsText;

}

function readLogs(){
    var totalCardsTraded = 0;
    var spentSketchpads = 0;
    keepingcards = getKeepingCards();
    tradingcards = getTradingCards();
    futurecards = getFutureCards();

    var completedDeckCounts = {};

    var logData = logs.split("\n");

    logData.forEach(log => {
        log = log.toLowerCase()

        var receiveStart = log.indexOf(":") + 1;
        var receiveEnd = log.length;
        var lostStart = log.indexOf(":") + 1;
        var lostEnd = log.length;
        var received = [];
        var lost = [];
        var countForSketchpad = false;
        var needsSorting = false;


        if (log.includes("received from") || (log.includes("gifted by"))){
            received = log.substring(receiveStart, receiveEnd).split(",");
        }
        else if (log.includes("gifted to")){
            lost = log.substring(lostStart, lostEnd).split(",");
            countForSketchpad = true;
        }
        else if (log.includes("lost to")){
            lost = log.substring(lostStart, lostEnd).split(",");
        }
        else if (log.includes("traded to")){
            var breakIndex = log.lastIndexOf(" for ");
            lostStart = log.indexOf(":") + 1;
            lostEnd = breakIndex;
            receiveStart = breakIndex + 5;
            receiveEnd = log.length;

            countForSketchpad = true;
        }

        received.forEach( tradeItem => {
            tradeItem = tradeItem.trim().toLowerCase();
    
            //crayons
            if (tradeItem.endsWith(" crayon") || tradeItem.endsWith(" crayons")){
                // get number of crayons traded
                var seperatedCrayon = tradeItem.split(" ")
                var numCrayons = parseInt(seperatedCrayon[0])

                switch(seperatedCrayon[1]){
                    case "red": 
                        crayons[0] += numCrayons;
                        break;
                    case "orange": 
                        crayons[1] += numCrayons;
                        break;
                    case "yellow": 
                        crayons[2] += numCrayons;
                        break;
                    case "green": 
                        crayons[3] += numCrayons;
                        break;
                    case "blue": 
                        crayons[4] += numCrayons;
                        break;
                    case "purple": 
                        crayons[5] += numCrayons;
                        break;
                    case "brown": 
                        crayons[6] += numCrayons;
                        break;
                    case "gray": 
                        crayons[7] += numCrayons;
                        break;
                }
            }
            // ignore candies
            else if (!tradeItem.endsWith(" candy") && !tradeItem.endsWith(" candies") && tradeItem != ''){
                var deck = tradeItem.substring(0, tradeItem.length - 2);
                if (highprioritydecks.includes(deck) || allisodecks.includes(deck)){
                    keepingcards.unshift(tradeItem);
                    //count cards in keeping deck
                    if (deck in completedDeckCounts){
                        completedDeckCounts[deck]++;
                        //check if deck completed - remove from collecting isos
                        if (completedDeckCounts[deck] >= 20){
                            allisodecks = allisodecks.filter(element => element !== deck);
                            delete completedDeckCounts[deck];
                        }
                    }else{
                        completedDeckCounts[deck] = 1;
                    }
                }
                else if (singlecards.includes(tradeItem)){
                    keepingcards.unshift(tradeItem);
                    singlecards = singlecards.filter(element => element != tradeItem);
                }
                else if (allfuturedecks.includes(deck)){
                    futurecards.unshift(tradeItem);
                }
                else{
                    tradingcards.unshift(tradeItem);
                }
            }
        })

        lost.forEach( tradeItem => {
            tradeItem = tradeItem.trim().toLowerCase();
    
            //crayons
            if (tradeItem.endsWith(" crayon") || tradeItem.endsWith(" crayons")){
                // get number of crayons traded
                var seperatedCrayon = tradeItem.split(" ")
                var numCrayons = parseInt(seperatedCrayon[0])

                switch(seperatedCrayon[1]){
                    case "red": 
                        crayons[0] -= numCrayons;
                        break;
                    case "orange": 
                        crayons[1] -= numCrayons;
                        break;
                    case "yellow": 
                        crayons[2] -= numCrayons;
                        break;
                    case "green": 
                        crayons[3] -= numCrayons;
                        break;
                    case "blue": 
                        crayons[4] -= numCrayons;
                        break;
                    case "purple": 
                        crayons[5] -= numCrayons;
                        break;
                    case "brown": 
                        crayons[6] -= numCrayons;
                        break;
                    case "gray": 
                        crayons[7] -= numCrayons;
                        break;
                }
            }
            else if (tradeItem.endsWith(" sketchpad") || tradeItem.endsWith(" sketchpads")){
                // get number of sketchpads turned in
                var seperatedSketchpad = tradeItem.split(" ")
                var numSketchpads = parseInt(seperatedSketchpad[0])
                spentSketchpads += numSketchpads
            }
            // assume card
            else {
                if (countForSketchpad){
                    totalCardsTraded++;
                }
                tradingcards = tradingcards.filter(element => element !== tradeItem);
            }
        })

    })

    completedsketchpads = Math.floor((totalCardsTraded + currentsketchpad) / 20) - spentSketchpads + currentsketchpad;
    currentsketchpad = (totalCardsTraded + currentsketchpad) % 20
}

function searchShowing(){
    var cardImages = document.getElementById("fullcollectioncontainer").getElementsByTagName('img');
    var searchBarInput = document.getElementById("searchbar").value.toLowerCase();
    var cardSeriesName;
    var cardName;
    var card;
    var cardShowing;

    for (let index = 0; index < cardImages.length; index++){
        card = cardImages[index];
        cardSeriesName = card.className.toLowerCase().split(" ")[2].replaceAll('_', ' ')
        cardName = card.src.substring(card.src.lastIndexOf('/') + 1, card.src.lastIndexOf('.gif'))

        // if the card is visible but does not match the search term,
        if (card.style.display != "none" && !(cardName.includes(searchBarInput)) && !(cardSeriesName.includes(searchBarInput))){
            card.style.display = "none";
        }
    }
}

function setCredits(){
    document.getElementById("creditscontainer").innerHTML = 
        `
        <p><a href="https://github.com/leedmitri/neotcg">neotcg</a> by <a href="https://gloomlee.neocities.org/">gloomlee</a></p>
        `;
}

function setWebsiteHeader(){
    document.getElementById("websiteheadercontainer").innerHTML = 
        `
        <div id="websiteheader">
            <h1><span id="headername"></span>'s colortcg</h1>
            <div id="navbar">
                <a href="index.html" class="navbutton">home</a>
                <a href="collecting.html" class="navbutton">collecting</a>
                <a href="neededcards.html" class="navbutton">needed</a>
                <a href="futurecards.html" class="navbutton">future</a>
                <a href="keepingcards.html" class="navbutton">keeping</a>
                <a href="tradingcards.html" class="navbutton">trading</a>
                <a href="log.html" class="navbutton">logs</a>
            </div>
        </div>
        `;
    document.getElementById("headername").innerHTML = headername;
}

function showHideClass(className, showOrHide){
    var cardImages = document.getElementsByClassName(className);
    for (let index = 0; index < cardImages.length; index++){
        var card = cardImages[index];
        if (showOrHide == "SHOW"){
            card.style.display = "inline-block";
        }
        else if (showOrHide == "HIDE"){
            card.style.display = "none";
        }
    }
}

function showPortfolio(type){
    if (type == "palette"){
        if (document.getElementById("palettehidden").style.display == "none"){
            document.getElementById("palettehidden").style.display = "block";
        }
        else{
            document.getElementById("palettehidden").style.display = "none";
        }
    }
    else{
        if (document.getElementById("monochromehidden").style.display == "none"){
            document.getElementById("monochromehidden").style.display = "block";
        }
        else{
            document.getElementById("monochromehidden").style.display = "none";
        }
    }
}

function sortNeededDecks(){
    var neededDecks = allisodecks;
    
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
    redDiv.setAttribute("class", "neededdeckcolumn deckred")
    orangeDiv.setAttribute("class", "neededdeckcolumn deckorange")
    yellowDiv.setAttribute("class", "neededdeckcolumn deckyellow")
    greenDiv.setAttribute("class", "neededdeckcolumn deckgreen")
    blueDiv.setAttribute("class", "neededdeckcolumn deckblue")
    purpleDiv.setAttribute("class", "neededdeckcolumn deckpurple")
    brownDiv.setAttribute("class", "neededdeckcolumn deckbrown")
    grayDiv.setAttribute("class", "neededdeckcolumn deckgray")
    specialDiv.setAttribute("class", "neededdeckcolumn deckspecial")
    notfoundDiv.setAttribute("class", "neededdeckcolumn decknone")

    // if deck is not found in deck dictionary:
    var notfound = false;

    neededDecks.forEach( deck => {
        var deckLink = document.createElement("a");
        deckLink.setAttribute("href", "https://colors-tcg.eu/viewcards.php?deck=" + deck)
        deckLink.innerHTML = deck;

        var deckColor = getColorSeries(deck)[2]
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

    document.getElementById("neededdeckscontainer").appendChild(redDiv)
    document.getElementById("neededdeckscontainer").appendChild(orangeDiv)
    document.getElementById("neededdeckscontainer").appendChild(yellowDiv)
    document.getElementById("neededdeckscontainer").appendChild(greenDiv)
    document.getElementById("neededdeckscontainer").appendChild(blueDiv)
    document.getElementById("neededdeckscontainer").appendChild(purpleDiv)
    document.getElementById("neededdeckscontainer").appendChild(brownDiv)
    document.getElementById("neededdeckscontainer").appendChild(grayDiv)
    document.getElementById("neededdeckscontainer").appendChild(specialDiv)
    if (notfound == true){
        document.getElementById("neededdeckscontainer").appendChild(notfoundDiv)
    }
}

function sortSingleCards(){
    var singleCardsArray = singlecards
    singleCardsArray.sort()
    var cardLinks = "<p>";
    singleCardsArray.forEach( card => {
        deckName = card.substring(0, card.length-2)
        cardLinks += '<a href="https://colors-tcg.eu/viewcards.php?deck=' + deckName + '" target="_blank">' + card + "</a>, "
    })
    if (singleCardsArray.length > 0){
        document.getElementById("singlecardscontainer").innerHTML = cardLinks.substring(0, cardLinks.length-2) + "</p>"
    }
    else{
        document.getElementById("singlecardscontainer").innerHTML = cardLinks + "</p>"
    }
}
