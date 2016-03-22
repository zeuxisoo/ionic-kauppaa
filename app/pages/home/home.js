import { NavController } from 'ionic-angular';
import { Page, Alert } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { PanelPage } from '../panel/panel';
import { HomeService } from '../../services/home';
import { UtilsFactory } from '../../factories/utils';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    static get parameters() {
        return [
            [NavController],
            [HomeService],
            [UtilsFactory]
        ];
    }

    constructor(nav, homeService, utilsFactory) {
        this.nav            = nav;
        this.homeService    = homeService;
        this.utilsFactory = utilsFactory;
    }

    signIn(event) {
        this.homeService
            .signIn(this.username, this.password)
            .subscribe(
                response => {
                    let token = response.token;

                    if (token) {
                        localStorage.setItem('token', token);

                        this.nav.setRoot(PanelPage);
                    }
                },
                error => {
                    let firstError  = this.utilsFactory.firstError(error);
                    let singleError = this.utilsFactory.singleError(error);
                    let message     = "";

                    if (firstError !== "") {
                        message = firstError;
                    }else{
                        message = singleError;
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
            );
    }

    signUp(event) {
        this.nav.push(SignUpPage);
    }

}
