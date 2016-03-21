import { Page } from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/panel/news/news.html'
})
export class PanelNewsPage {

    constructor() {
        this.news = [
            { title: "title 1", content: "content 1" },
            { title: "title 2", content: "content 2" },
            { title: "title 3", content: "content 3" },
        ]
    }

}
