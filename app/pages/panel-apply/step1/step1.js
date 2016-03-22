import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular';
import { PanelApplyStep2Page } from '../step2/step2';

@Page({
    templateUrl: 'build/pages/panel-apply/step1/step1.html'
})
export class PanelApplyStep1Page {

    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav) {
        this.nav = nav;
    }

    step2() {
        console.log('step2 clicked');

        this.nav.push(PanelApplyStep2Page);
    }

}
