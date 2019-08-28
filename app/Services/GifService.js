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
        return _state.gifsApi
    }
    get currentGif() {
        return new Gif(_state.currentGif)
    }
    //endregion
}
