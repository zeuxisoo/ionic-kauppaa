import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/panel-apply/step3/step3.html'
})
export class PanelApplyStep3Page {

    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav) {
        this.nav = nav;
    }

    submit() {
        console.log('submit called');
    }

}
