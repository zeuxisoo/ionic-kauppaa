import { Page } from 'ionic-angular';
import { NewsService } from '../../services/news';
import { UtilsFactory } from '../../factories/utils';
import { SpinnerComponent } from '../../directives/spinner/spinner';

@Page({
    templateUrl: 'build/pages/panel-news/news.html',
    directives : [SpinnerComponent]
})
export class PanelNewsPage {

    static get parameters() {
        return [
            [NewsService],
            [UtilsFactory]
        ];
    }

    constructor(newsService, utilsFactory) {
        this.newsService  = newsService;
        this.utilsFactory = utilsFactory;

        this.news = [];

        this.fetchNews()
    }

    fetchNews() {
        this.newsService
            .all()
            .subscribe(
                response => {
                    let news = response.data;

                    this.news = news;
                },
                error => {
                    let singleError = this.utilsFactory.singleError(error);
                    let message     = "";

                    if (singleError === "") {
                        message = firstError;
                    }

                    if (message !== "") {
                        let alert = Alert.create({
                            title  : 'Oops',
                            message: message,
                            buttons: ['Ok']
                        });

                        this.nav.present(alert);
                    }
                }
            )
    }

}
