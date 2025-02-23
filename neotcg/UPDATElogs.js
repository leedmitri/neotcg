/*
    logs
    logs are used to track your sketchpads and crayon numbers, so please make sure inputs are correct!
    each log item must be on its own seperate line with one of the following formats.
    NOTES: 
        - inputs in brackets can be formatted however you want, as long as it comes after the proper command and before the colon (:)
        - CRAYONS MUST BE WRITTEN OUT WITH A NUMBERED AMOUNT! ex: 1 blue crayon or 2 blue crayons NOT blue crayon, 1 crayon rainbow, etc.
    
    TRADING WITH A PLAYER
    traded to [playername]: yourcard01, yourcard02 for theircard04, theircard05
    ex: traded to gloomlee: anklets01, anklets03 for obnoxious01, obnoxious02
    
    GIFTING TO A PLAYER
    gifted to [playername]: card01, card02
    ex: gifted to gloomlee: obnoxious01, obnoxious02
    
    RECEIVING GIFTS FROM A PLAYER
    gifted by [playername]: card01, card02
    ex: gifted by gloomlee: anklets01, anklets03
    
    RECEIVING CARDS FROM GAMES/ SERVICES/ ETC.
    received from [game name/ service name]: card01, card02, 1 blue crayon
    ex: received from silly blanks 126: obnoxious01, obnoxious02, 2 blue crayona, 1 orange crayon
    
    USING CARDS/CRAYONS/SKETCHPADS AT GAMES/SERVICES
    lost to [game name/ service name]: card02, 1 blue crayon, 1 sketchpad etc.
    ex: lost to silly blanks 126: evil02, menace06
    ex: lost to art shop: 3 sketchpads, 1 blue crayon
    
    everything else doesnt matter; you can change the beginning of each line and reformat the dates if you want!
    ex: `
             ---traded to player: card01, 1 blue crayon for card03
        nov 2nd, 2022
            --received from game: card01, card02, 1 blue crayon
            --started playing
        nov 1st, 2022
        `
    ex: `
        traded to player: card01, 1 blue crayon for card03
        nov-2-2022
        received from game: card01, card02, 1 blue crayon
        started playing
        nov-1-2022
        `
    ex: `
         - traded to player: card01, 1 blue crayon for card03
        11/2/2022
         - received from game: card01, card02, 1 blue crayon
         - started playing
        11/1/2022
        `
*/
/* 
  unformatted logs
  if you already have logs when beginning to use this tool, or would like to archive your logs, insert the logs in the unformattedlogs variable.
  Then set what your number of crayons, current sketchpad, and completed number of sketchpads were based on those logs in UPDATEplayerinfo at the ADDING CRAYONS, CURRENT SKETCHPAD TRADES, COMPLETED SKETCHPADS section.
  
  Once you've done that, begin putting your new correctly formatted logs in the logs variable.
*/
var logs = 
`
-- received from reading between the lines 435: code0402, equable15, blackwhite16, playthehero07, extreme13, lynx15
-- received from puzzle chains 352: gifted09, hachiko09, exitdoor09, novels10, forensics07, amikke08, seaborg14, luxuria06, pipe03, truth08, belittled09, rushingboar16, skycasino10, allheavens07, versicolor12, dawnoffice04, ten-nil12, wolf02, 12years05, wolffang10, repairs05, g-1217, esaka17, taozi15, psync14, playing20, eight16, pherae20, sticks14, cookpal17, 1 orange crayon
-- traded to cherry: archetypes01, mutt09, hoppity15, harborlands01, musicians03, witches10, scar18 for active10, arkrome07, bestsenpai01, bungee04, connected03, connected12, darklord08
-- gifted by cherry: darklord18, drops08, exorcist08, 2 red crayons, 2 orange crayons, 2 yellow crayons, 2 green crayons, 2 blue crayons, 2 purples crayons, 2 gray crayons, 2 brown crayons
22 feb 2025

-- received from level up rewards: appearance03, aloofness16, shameless03, killerbee17, wayward07, omaruza12, 1 blue crayon, 1 gray crayon
-- gifted by aru: indecision17, regarding06, deesse20, bebop01, cataclysm17, catnoir16, joyful11, curepassion03, blueknights03
-- gifted by aru: revival11, wallachia12, witchtrials01, witchtrials09, witchtrials13, witchtrials15, darklord02, forest13
-- gifted by aru: forgemaster12, forgemaster13, bride02, bigbanana04, ferocity17, gamble05, hacker18, mushrooms03, headache12
-- gifted by aru: generation05, arkrome02, automail03, babble20, housewife09, housewife17, copycat16, cruelest16, levincia12 
-- gifted by aru: levincia15, levincia20, puppy17, lascivious15, icequeen18, flame18, ishval02, scavenger14, drops02, iwa-chan15
-- gifted by aru: toss15, thebrain01, thebrain09, mattsun12, libero07, setter02, bestsenpai12, bestsenpai14, guessing10, villagerb13
-- gifted by aru: connected02, bungee13, needles08, villainess11, villainess15, shootingstar06, shootingstar16, exorcist07, exorcist20
-- gifted by aru: eros17, luckycharm05, miraculous09, anklet20, glider16, nidothing03, nidothing14, nidothing18, nidothing19, frauperle19
-- gifted by aru: frauplatin01, frausaphir14, frausaphir15, fraurubin03, ponzu08, noble07, lostones17, onii-san04, watchful15, rayquaza03
-- gifted by aru: rayquaza16, rayquaza20, terapagos16, toxapex09, toxapex19, submissive08, swoons09, pikequeen06, pikequeen13, pikequeen19
-- gifted by aru: pikequeen16, financial13, zidian19, otherworld17, needcool11, vex11, trusty08, catemperor05, bishoujo16, ayaka18, badpun13
-- gifted by aru: fight14, bigbrother10, rip-off05, reunion07, cryoblood15, aimstalker18, dee-dee05, 80pitches03, unkillable09, angerpunch17
-- gifted by aru: curly14, hillock20, connect06, harborlands01, emeraldhair14, fantasize06, witches10, agile01, catapult13, zombies03, mutt09
20 feb 2025

-- received from coloring book 348: musicians03, hoppity15, origin18, toytoy01, steak09, ninjamaid10, scar18, self-hatred12, pyramidking12, defensive05, archetypes01, photonrifle11, excellion17, satella10, refined06, issachar03
-- lost to coloring book 348: 1 green crayon
-- received from most wanted 157: musician05, mercury11, seele18, astraltrain17, tabris02
-- gifted by lex: odette04, etincelle19, mindset20, noble05, submissive08, 2 red crayons, 2 orange crayons, 2 yellow crayons, 2 green crayons, 2 blue crayons, 2 purple crayons, 2 brown crayons, 2 gray crayons

18 feb 2025

-- received from little spell academia 353: starclip06, etincelle10, odette10, crownclip07, terapagos15, copycat04, determinater09, etincelle01, twirling13, mindset04, witchtrials08
17 feb 2025

(changed formatting so topmost note is always the most recent)

15 feb 2025
-- gifted by J (birdwrong): 2 red crayons, 2 orange crayons, 2 yellow crayons, 2 green crayons, 2 blue crayons, 2 purple crayons, 2 brown crayons, 2 gray crayons
14 feb 2025
started playing
-- received from joining: odette07, odette11, wirukun10, archwizard17, lemurian16, references06, elemia17
-- received from release 177: notaman10, swoons11, fostermom02, salonmaiden12, essentia01, pikequeen17, toxapex02, lastevil06, villa03, jobhunt03, meals09, noble15, mindset13, hacker13
-- traded to lenga: references06 for lastevil10
-- gifted by lenga: 12 gray crayons
-- lost to shopping street: 12 gray crayons
-- received from shopping street: 48 gray candies
-- received from little spell academia: odette01, jobhunt05, appearance09, submissive16, noble11, hacker02, jobhunt20, villa05, appearance01,terapagos03, etincelle12, mindset06
-- gifted by jellie: odette20, fostermom12, fostermom20, pikequeen03, salonmaiden03, salonmaiden18
-- received from joining: bernardelli17, ultrasouls17
-- received from recycled art: darklord05, doves07, medic07, mindset12, osa-p08, osa-p14, revival19, tonedeaf12, tonedeaf14, active03, active12, live03, live06, wallachia15, wallachia16


-- traded to J: hyzante06 for toxapex08
-- received from joining: hyzante06
`;

var unformattedlogs =
`
`;
