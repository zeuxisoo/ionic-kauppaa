import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { PanelPage } from '../panel/panel';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    static get parameters() {
        return [
            [NavController]
        ];
    }

    constructor(nav) {
        this.nav = nav;
    }

    signIn(event) {
        console.log('signIn Called');
        console.log(this.username);
        console.log(this.password);

        this.nav.push(PanelPage);
    }

    signUp(event) {
        this.nav.push(SignUpPage);
    }

}
