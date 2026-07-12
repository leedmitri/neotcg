import * as ArchiveInput from './UPDATE_archive.js';
import * as CollectionInput from './UPDATE_collection.js';
import * as LogInput from './UPDATE_logs.js';
import { deckDictionary } from './UPDATE_colorstcgdeckdata.js';
import { ComponentLib } from './components.js';

var componentsLoc = 'neotcg/components';

var collection =
{
    piles: {
        all: [],
        trading: [],
        keeping: [],
        bypile: {},
        piledefs: CollectionInput.piles
    },

    crayons: ArchiveInput.crayons,

    sketchpadname: CollectionInput.sketchpadname,
    sketchpadPoints: ArchiveInput.sketchpadPoints,
    spentSketchpads: 0,
    completedSketchpads: ArchiveInput.completedSketchpads,

    paletteportfolioname: CollectionInput.paletteportfolioname,
    paletteportfoliodecks: strToArray(CollectionInput.paletteportfoliodecks),
    monochromeportfolioname: CollectionInput.monochromeportfolioname,
    monochromeportfoliodecks: strToArray(CollectionInput.monochromeportfoliodecks),

    logs: LogInput.logs + "\n" + ArchiveInput.logs,

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

    document.querySelector('#toolscraperprocess')?.addEventListener('click', () => {
        scrapeColorsTCGData();
    });

    document.querySelector('#toolresetoutput')?.addEventListener('click', () => {
        resetToolOutput();
    });

}

function setup(){

    // fix input piles
    collection.piles.piledefs.forEach( piledef => {
        piledef.cards = strToArray(piledef.cards);
        piledef.decks = strToArray(piledef.decks);
    })

    readLogs();
    sortPiles();

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

function getDeckSeriesName(deck){
    return deckDictionary[deck].series;
}

function getKeepingCards(){
}

function getLogs(){
    return collection.logs;
}

function isNeeded(card){
    var deck = getCardDeckName(card);
    var series = getDeckSeriesName(deck);

    var piles = collection.piles.piledefs.filter( pile => {
        if (pile.series.includes(series) || pile.decks.includes(deck) || pile.cards.includes(card)){
            return true;
        }
        return false;
    })

    if (piles.length > 0){
        var pileNames = piles.map( pile => pile.name)

        if (!collection.piles.all.includes(card)){
            return [true, pileNames]
        }
        return [false, pileNames]
    }
    return [false, ['trading']]

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

function resetToolOutput(){
    document.getElementById('tooloutput').innerHTML = '';
}

async function scrapeColorsTCGData(){
            var data = await document.getElementById("htmlinput").files[0].text();
            var converter = document.createElement('div');
            converter.innerHTML = data;
            
            // grab data row
            var colorsTable = converter.querySelector("#colors")
            var dataRows = colorsTable.getElementsByTagName("tr");
            
            //create dictionary
            var newDeckDictionary = {};
            for (var index = 1; index < dataRows.length; index++){ // remove color series etc table header
                var dataRow = dataRows[index]
                var dataCells = dataRow.getElementsByTagName("td");
                var seriesName = dataCells[0].innerText;
                var characterName = dataCells[1].innerText;
                var deckName = dataCells[2].innerText.toLowerCase().replaceAll(" ", '').replace(/[àáâãäå]/g,"a")
                                                                                        .replace(/[èéêë]/g,"e")
                                                                                        .replace(/[ìíîï]/g,"i")
                                                                                        .replace(/[òóôöõ]/g,"o")
                                                                                        .replace(/[ùúûü]/g,"u")
                                                                                        .replace(/[ýÿ]/g,"u")
                                                                                        .replace(/[ç]/g,"c")
                                                                                        .replace(/[ñ]/g,"n")
                                                                                        .replace(/[^a-z0-9-]/g,'');
                var color = dataCells[3].innerText;
                // add to dictionary deckname: [seriesname, color, charactername]
                newDeckDictionary[deckName] = 
                {
                    series: seriesName, 
                    character: characterName, 
                    color: color
                }
            }
            
            
            //display
            var resulttextarea = document.createElement('textarea')
            resulttextarea.value = "export var deckDictionary = " + JSON.stringify(newDeckDictionary);
            // pretty output ver: resulttextarea.value = "var deckDictionary = " + JSON.stringify(deckDictionary, null, 1);
            
            document.getElementById("tooloutput").appendChild(resulttextarea)
        }

function showPortfolio(type){
    
}

function sortPiles(){
    collection.piles.all.forEach( card => {
        var [needed, pilenames] = isNeeded(card)
        pilenames.forEach( pileName => {
            if (pileName != 'trading'){
                if (collection.piles.bypile[pileName] === undefined){
                    collection.piles.bypile[pileName] = [];
                }
                collection.piles.bypile[pileName].unshift(card);
                collection.piles.keeping.unshift(card);
            }
            else{
                collection.piles.trading.unshift(card);
            }
        })
    })
    return collection.piles;
}

function strToArray(string){
    var split = string.replaceAll(" ", "").split(",");
    if (split.length == 1 && split[0] == ''){
        return [];
    }
    return split;
}
