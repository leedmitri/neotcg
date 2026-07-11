import * as ArchiveInput from './UPDATE_archive.js';
import * as CollectionInput from '../UPDATE_collection.js';
import * as LogInput from '../UPDATE_logs.js';
import { ComponentLib } from './components.js';

var componentsLoc = 'neotcg/components';

var collection =
{
    piles: {
        all: [],
        collecting: strToArray(ArchiveInput.collectingCards),
        future: strToArray(ArchiveInput.futureCards),
        trading: strToArray(ArchiveInput.tradingCards),
    },
    crayons: ArchiveInput.crayons,

    collecting: {
        series: CollectionInput.collecting.series,
        decks: strToArray(CollectionInput.collecting.decks),
        singles: strToArray(CollectionInput.collecting. singles),
    },
    future: {
        series: CollectionInput.future.series,
        decks: strToArray(CollectionInput.future.decks),
        singles: strToArray(CollectionInput.future.singles),
    },
    hoard: {
        series: CollectionInput.hoard.series,
        decks: strToArray(CollectionInput.hoard.decks),
        singles: strToArray(CollectionInput.hoard.singles),
    },
    massdecks: CollectionInput.massdecks,

    sketchpadname: CollectionInput.sketchpadname,
    sketchpadPoints: ArchiveInput.sketchpadPoints,
    spentSketchpads: 0,
    completedSketchpads: ArchiveInput.completedSketchpads,

    paletteportfolioname: CollectionInput.paletteportfolioname,
    paletteportfoliodecks: strToArray(CollectionInput.paletteportfoliodecks),
    monochromeportfolioname: CollectionInput.monochromeportfolioname,
    monochromeportfoliodecks: strToArray(CollectionInput.monochromeportfoliodecks),

    errors: [],
}

//intial setup
setup();

// load components
window.onload = () => {
    // header
    fetch(componentsLoc + '/header.html')
    .then(data => {
        return data.text()
    })
    .then( data => {
        document.body.insertAdjacentHTML('afterbegin', data);
    })

    //footer
    fetch(componentsLoc + '/footer.html')
    .then(data => {
        return data.text();
    })
    .then( data => {
        document.body.insertAdjacentHTML('beforeend', data);
    })

    // any dynamic components
    const containers = document.querySelectorAll('.neotcg');
    containers.forEach( container => {
        try{
            var name = container.getAttribute("data-name");
            var input = container.getAttribute("data-input");
            var result = ComponentLib[name](collection, input);
            if (result || result === 0){
                container.innerHTML = result;
            }
            else{
                collection.errors.unshift('Container data-name "'+name+'" failed!')
            }
        } catch (error){
            collection.errors.unshift('Container data-name "'+name+'" does not exist!')
        }

    })

}

function setup(){
    //setup massdecks
    collection.massdecks = collection.massdecks.map( massdeck => {
        //fix vars
        massdeck.decks = strToArray(massdeck.decks);
        massdeck.singles = strToArray(massdeck.singles);

        return massdeck;
    })

    readLogs();
    sortPiles();

    //combine piles
    var piles = [collection.piles.collecting, collection.piles.future, collection.piles.trading];
    piles.forEach(pile => {
        if (pile.length > 0){
            collection.piles.all = collection.piles.all.concat(pile)
        }
    })
}

//functions
function editCollection(item, add=true){
    //ignore candies
    if (!item.endsWith(" candy") && !item.endsWith(" candies") && item != ''){
        //crayon
        if (item.endsWith(" crayon") || item.endsWith(" crayons")){
            editCrayons(item);
        }
        //turned in sketchpads
        else if (item.endsWith(" sketchpad") || item.endsWith(" sketchpads")){
            // get number of sketchpads turned in
            var seperatedSketchpad = item.split(" ")
            var numSketchpads = parseInt(seperatedSketchpad[0])
            collection.spentSketchpads += numSketchpads
        }
        //card
        else{
            if (add){
                collection.piles.all.push(item)
            }
            else{
                // find card to remove
                if (location){
                    var removeIndex = collection.piles.all.indexOf(item);
                    collection.piles.all.splice(removeIndex, 1)
                }
                else{
                    collection.errors.unshift('Log item "'+item+'" cannot be found.')
                }
            }
        }
    }
}

function editCrayons(log, neg=false){
    // get number of crayons traded
    var seperatedCrayon = log.split(" ")
    var numCrayons = parseInt(seperatedCrayon[0])
    if (neg) { numCrayons = -numCrayons}

    switch(seperatedCrayon[1]){
        case "red": 
            collection.crayons["red"] += numCrayons;
            break;
        case "orange": 
            collection.crayons["orange"] += numCrayons;
            break;
        case "yellow": 
            collection.crayons["yellow"] += numCrayons;
            break;
        case "green": 
            collection.crayons["green"] += numCrayons;
            break;
        case "blue": 
            collection.crayons["blue"] += numCrayons;
            break;
        case "purple": 
            collection.crayons["purple"] += numCrayons;
            break;
        case "brown": 
            collection.crayons["brown"] += numCrayons;
            break;
        case "gray": 
            collection.crayons["gray"] += numCrayons;
            break;
        case "grey": 
            collection.crayons["gray"] += numCrayons;
            break;
    }
}

function getCardDeckName(card){
    return card.substring(0, card.length - 2);
}

function getKeepingCards(){
    return (collection.piles.collecting).concat(collection.piles.future);
}

function isNeeded(card){
    var deck = getCardDeckName(card);

    var isHoard = collection.hoard.decks.includes(deck) || collection.hoard.singles.includes(card);
    var isCollect = (collection.collecting.decks.includes(deck) || collection.collecting.singles.includes(card)) && !collection.piles.collecting.includes(card);

    if (isHoard || isCollect){
        return [true, 'collecting'];
    }
    else if (CollectionInput.future.decks.includes(deck)){
        return [true, 'future'];
    }
    return [false, 'trading'];
}

function readLogs(){
    var logData = LogInput.logs.split("\n").reverse();
    logData.forEach(log => {
        log = log.toLowerCase()

        //scrape logs
        var receiveStart = log.indexOf(":") + 1;
        var receiveEnd = log.length;
        var lostStart = log.indexOf(":") + 1;
        var lostEnd = log.length;
        var received = [];
        var lost = [];
        var countForSketchpad = false;

        //read logs
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

            received = log.substring(receiveStart, receiveEnd).split(",");
            lost = log.substring(lostStart, lostEnd).split(",");
            countForSketchpad = true;
        }

        //edit collection
        received.forEach( tradeItem => {
            tradeItem = tradeItem.trim().toLowerCase();
            editCollection(tradeItem)
        })

        lost.forEach( tradeItem => {
            tradeItem = tradeItem.trim().toLowerCase();
            editCollection(tradeItem, false)
        });

        
        // add sketchpad points
        if (countForSketchpad){
            collection.sketchpadPoints += lost.length;
        }

    })

    //calculate sketchpads
    collection.completedSketchpads = Math.floor((collection.sketchpadPoints) / 20) - collection.spentSketchpads + collection.completedSketchpads;
    collection.sketchpadPoints = collection.sketchpadPoints % 20
}

function showPortfolio(type){
    
}

function sortPiles(){
    collection.piles.all.forEach( card => {
        var [needed, section] = isNeeded(card)
        collection.piles[section].unshift(card);
    })
}

function strToArray(cardString){
    var split = cardString.replaceAll(" ", "").split(",");
    if (split.length == 1 && split[0] == ''){
        return [];
    }
    return split;
}
