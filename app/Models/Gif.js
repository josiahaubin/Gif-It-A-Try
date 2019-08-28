export default class Gif {
    constructor(data) {
        this.gifId = data.id || data.gifId
        this.title = data.title
        this.myUrl = data.myUrl || data.embed_url
    }

    get Template() {
        return `
            <div class="col-3">
                <p>${this.title}</p>
                <iframe src="${this.myUrl}" frameborder="0"></iframe>
                <button class="btn btn-success" onclick="app.controllers.gifController.display('${this.gifId}')">Select</button>
            </div>
        `
    }
}