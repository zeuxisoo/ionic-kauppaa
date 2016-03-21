import { Platform } from 'ionic-angular';
import { Page } from 'ionic-angular';
import { PanelNewsPage } from './news/news';
import { PanelApplyPage } from './apply/apply';
import { PanelAboutPage } from './about/about';

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
