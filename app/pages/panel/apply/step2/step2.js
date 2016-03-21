import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular';
import { PanelApplyStep3Page } from '../step3/step3';

@Page({
    templateUrl: 'build/pages/panel/apply/step2/step2.html'
})
export class PanelApplyStep2Page {

    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav) {
        this.nav = nav;
    }

    step3() {
        console.log("step3 called");

        this.nav.push(PanelApplyStep3Page);
    }

}
