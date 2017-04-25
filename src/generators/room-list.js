let fs = require('fs');
const roomListData = require('./room-list-data')
// console.log(roomListData)

let roomList = []

const structure = {
    "index": "",
    "title": "",
    "position": {
        "deck": 0,
        "from": 0,
        "to": 0,
        "side": ""
    }
}

roomListData.forEach( (roomData) => {
    const minusPos = roomData.indexOf?roomData.indexOf('-'):-1
    if (minusPos === -1) {
        let room = Object.assign({},structure)
        room.position = Object.assign({}, structure.position)
        room.index = roomData + ''
        roomList.push(room)
    } else {
        const minIndex = roomData.split('-')[0]
        const maxIndex = roomData.split('-')[1]
        for (let i = minIndex; i <= maxIndex; i++) {
            let room = Object.assign({},structure)
            room.position = Object.assign({}, structure.position)
            room.index = i + ''
            roomList.push(room)
        }
    }
} )

// console.log(roomList)

const listLength = roomList.length
let currIndex = 0
let flag = false
let lineIndex = 0

var lineReader = require('readline').createInterface({
    input: require('fs').createReadStream('text.txt')
});

lineReader.on('line', function (line) {
    if (flag) {
        switch (lineIndex) {
            case 1: {
                const title = line.replace(/(^\s*)|(\s*)$/g, '')
                console.log('title: ' + title)
                roomList[currIndex].title = title
                break
            }
            case 2: {
                const side = line.replace(/(^\s*)|(\s*)$/g, '')
                console.log('side: ' + side)
                roomList[currIndex].position.side = side
                break
            }
            case 3: {
                const fromTo = line.replace(/(^\s*)|(\s*)$/g, '')
                const separators = ['-', '...', '÷']
                separators.forEach( (separ, index) => {
                    // console.log('from-to: ' + (fromTo.indexOf(separ) !== -1))
                    if (fromTo.indexOf(separ) !== -1) {
                        const from = fromTo.split(separ)[0]
                        const to = fromTo.split(separ)[1]
                        console.log('from: ' + from)
                        console.log('to: ' + to)
                        roomList[currIndex].position.from = from
                        roomList[currIndex].position.to = to
                    } else {
                        if (index === (separators.length - 1)) {
                            const from = fromTo
                            console.log('from: ' + from)
                            console.log('to: ' + 'null')
                            roomList[currIndex].position.from = from
                            roomList[currIndex].position.to = null
                        }
                    }
                } )
                break
            }
            case 4: {
                const deck = line.replace(/(^\s*)|(\s*)$/g, '')
                console.log('deck: ' + deck)
                roomList[currIndex].position.deck = deck
                break
            }
        }
        lineIndex++
        if (lineIndex > 4) {
            flag = false
            lineIndex = 0
            console.log(`[${currIndex - 1}]: `, roomList[currIndex - 1])
            console.log(`[${currIndex}]: `, roomList[currIndex])
            if (currIndex < listLength - 1)
                currIndex++
        }
        return
    }
    if (line.replace(/(^\s*)|(\s*)$/g, '') === roomList[currIndex].index) {
        flag = true
        lineIndex++
    }
    console.log(line.replace(/(^\s*)|(\s*)$/g, '') + ' === ' + roomList[currIndex].index + ' -> ' + (line.replace(/(^\s*)|(\s*)$/g, '') === roomList[currIndex].index))
});

lineReader.on('close', function () {
    console.log('done', roomList)
    fs.writeFile('room-list2.json', JSON.stringify(roomList, "", 4), function(err) {
        if(err) throw err;
        console.log('done');
    });
})