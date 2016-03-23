import { Page } from 'ionic-angular';
import { PanelApplyStep1Page } from './step1/step1';

@Page({
    templateUrl: 'build/pages/panel-apply/apply.html'
})
export class PanelApplyPage {

    constructor() {
        this.rootPage = PanelApplyStep1Page;
    }

}
