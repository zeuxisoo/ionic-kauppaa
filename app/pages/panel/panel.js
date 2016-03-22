import { Platform } from 'ionic-angular';
import { Page } from 'ionic-angular';
import { PanelNewsPage } from '../panel-news/news';
import { PanelApplyPage } from '../panel-apply/apply';
import { PanelAboutPage } from '../panel-about/about';

@Page({
    templateUrl: 'build/pages/panel/panel.html'
})
export class PanelPage {

    static get parameters() {
        return [
            [Platform]
        ];
    }

    constructor(platform) {
        this.tabNews  = PanelNewsPage;
        this.tabApply = PanelApplyPage;
        this.tabAbout = PanelAboutPage;
    }

}
