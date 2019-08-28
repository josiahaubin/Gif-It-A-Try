import Gif from "../Models/Gif.js";

//Private
let _state = {
    gifsApi: [],
    myGifs: [],
    currentGif: {}
}

//NOTE methods to run when a given property in state changes
let _subscribers = {
    gifsApi: [],
    myGifs: [],
    currentGif: []
}

// @ts-ignore
let _giphyApi = axios.create({
    baseURL: 'https://api.giphy.com/v1/gifs/trending?api_key=zqo7deG8hwC9AbA1cmJwEdt0dwi4ya1J'
})

// @ts-ignore
let _sandboxApi = axios.create({
    baseURL: 'http://bcw-sandbox.herokuapp.com/api/Josiah/gifs'
})

function _setState(propName, data) {
    //NOTE add the data to the state
    _state[propName] = data
    //NOTE run every subscriber function that is watching that data
    _subscribers[propName].forEach(fn => fn());
}

//Public
export default class GifService {
    //NOTE adds the subscriber function to the array based on the property it is watching
    addSubscriber(propName, fn) {
        _subscribers[propName].push(fn)
    }

    //#region Getters
    get myGif() {
        return _state.myGifs.map(g => new Gif(g))
    }
    get apiGif() {
        return _state.gifsApi.map(g => new Gif(g))
    }
    get currentGif() {
        return new Gif(_state.currentGif)
    }
    //endregion

    //Get Giphy API All
    getTrendingGifs() {
        _giphyApi.get()
            .then(res => {
                _setState("gifsApi", res.data.data)
                console.log(res.data.data)
            })
            .catch(err => {
                console.error(err)
            })
    }

    //Get Sandbox Api
    getMyGifs() {
        _sandboxApi.get()
            .then(res => {
                _setState("myGifs", res.data.data)
                console.log(res.data.data);

            })
            .catch(err => {
                console.error(err);
            })
    }

    //Put trending gif into my gifs
    addGif(title) {
        _sandboxApi.post('', _state.currentGif)
            .then(res => {
                _state.myGifs.push(new Gif(res.data.data))
                _setState("myGifs", _state.myGifs)
            })
            .catch(err => {
                console.error(err);
            })
    }

    display(id) {
        //find id in the list of api gifs
        //set active
        let gif = _state.gifsApi.find(g => g.id == id)
        _setState("currentGif", gif)
    }
}
