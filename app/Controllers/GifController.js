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
    let template = `<form onsubmit="app.controllers.gifController.addGif(event)">
    <div class="form-group">
    <label for="title">Title</label>
    <input type="text" class="form-control" id="title" placeholder="Enter gif title">
    </div>
    <button class="btn btn-success">Add Gif</button>
    </form>
    `
    document.getElementById('current-gif').innerHTML = template += _gifService.currentGif.Template
}

function _drawMyGif() {
    let template = ``
    let myG = _gifService.myGif
    myG.forEach(mG => {
        template += mG.Template
    })

    document.getElementById('my-gifs').innerHTML = template
}

//Public
export default class GifController {
    constructor() {
        //NOTE Register all subscribers
        _gifService.addSubscriber("gifsApi", _drawTrendingGifs)
        _gifService.addSubscriber("currentGif", _drawCurrentGif)
        _gifService.addSubscriber("myGifs", _drawMyGif)
        //NOTE Retrieve data
        _gifService.getTrendingGifs()
        _gifService.getMyGifs()
    }

    display(id) {
        _gifService.display(id)
    }

    addGif(event) {
        event.preventDefault()
        let form = event.target

        let title = {
            title: form.title.value
        }
        _gifService.addGif(title)
    }
}