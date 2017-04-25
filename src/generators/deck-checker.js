const roomList = require('./room-list2.json')
const roomsOnDecks = require('./rooms-on-decks-list.json')

roomList.forEach((room) => {
    const roomIndex = isNaN(+room.index)?room.index:(+room.index)
    const decks = roomsOnDecks.map((deck) => {
        return (deck.rooms.indexOf(roomIndex) !== -1) ? deck.index : null
    })
    console.log(`${roomIndex}: ${decks}`)
    const deck = Math.max.apply(null, decks)
    room.position.deck = deck
})

const roomListWithoutZeros = roomList.filter((room) => {
    return room.position.deck !== 0
})

let fs = require('fs');
fs.writeFile('room-list3.json', JSON.stringify(roomListWithoutZeros, "", 4), function(err) {
    if(err) throw err;
    console.log('done');
});