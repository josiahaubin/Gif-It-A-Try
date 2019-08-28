import GifService from "../Services/GifService.js";

//Private
let _gifService = new GifService()

function _drawTrendingGifs() {
    let template = ``
    let trendGifs = _gifService.apiGif
    trendGifs.forEach(tG => {
        template += tG.Template
    })

    document.getElementById('trending-gifs').innerHTML = template
}

function _drawCurrentGif() {
    let template = ``
    document.getElementById('current-gif').innerHTML = _gifService.currentGif.Template
}

//Public
export default class GifController {
    constructor() {
        //NOTE Register all subscribers
        _gifService.addSubscriber("gifsApi", _drawTrendingGifs)
        _gifService.addSubscriber("currentGif", _drawCurrentGif)
        //NOTE Retrieve data
        _gifService.getTrendingGifs()
    }

    display(id) {
        _gifService.display(id)
    }
}