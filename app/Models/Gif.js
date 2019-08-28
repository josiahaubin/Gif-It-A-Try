export default class Gif {
    constructor(data) {
        this.title = data.title
    }

    get Template() {
        return this.title
    }
}