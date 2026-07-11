//ADD INTO LOGS
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

var logs = 
`
received from gloomlee: artists01, 1 green crayon
traded to gloomlee: 1 brown crayon
received from gloomlee: 2 brown crayons
`;

export {pendingtrades, coupons, logs};