const roomsOnDecks = require('./rooms-on-decks-list.json')

let roomsPoints = []

roomsOnDecks.forEach((deck) => {
    const structure = {
        "deck": deck.index,
        "items": []
    }
    let rooms = deck.rooms
    const roomsFiltered = rooms.filter((room, index, rooms) => {
        return (rooms.indexOf(room, index + 1) === -1)
    })
    structure.items = roomsFiltered.map((room) => {
        return {
            "index": room + '',
            "points": ''
        }
    })
    roomsPoints.push(structure)
})

roomsPoints.reverse()

let fs = require('fs');
fs.writeFile('rooms-points.json', JSON.stringify(roomsPoints, "", 4), function(err) {
    if(err) throw err;
    console.log('done');
});