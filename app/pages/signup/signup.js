import { Page, Alert, NavController } from 'ionic-angular';
import { HomeService } from '../../services/home';
import { UtilsFactory } from '../../factories/utils';

@Page({
    templateUrl: 'build/pages/signup/signup.html'
})
export class SignUpPage {

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

    create(event) {
        this.homeService
            .signUp(this.username, this.email, this.password)
            .subscribe(
                response => {
                    let user = response.data;

                    if (user) {
                        let alert = Alert.create({
                            title  : 'Success',
                            message: 'Account created, You can sign into your account on this device now.',
                            buttons: [{
                                text   : 'Ok',
                                handler: () => {
                                    this.nav.popToRoot();
                                }
                            }]
                        });

                        this.nav.present(alert);
                    }
                },
                error => {
                    let firstError = this.utilsFactory.firstError(error);

                    if (firstError !== "") {
                        let alert = Alert.create({
                            title  : 'Oops',
                            message: firstError,
                            buttons: ['Ok']
                        });

                        this.nav.present(alert);
                    }
                }
            )
    }

}
