import { NavController } from 'ionic-angular';
import { Page, Alert, Events } from 'ionic-angular';
import { SignUpPage } from '../signup/signup';
import { PanelPage } from '../panel/panel';
import { HomeService } from '../../services/home';
import { UtilsFactory } from '../../factories/utils';
import { StorageFactory } from '../../factories/storage';

@Page({
    templateUrl: 'build/pages/home/home.html'
})
export class HomePage {

    static get parameters() {
        return [
            [NavController],
            [Events],
            [HomeService],
            [UtilsFactory],
            [StorageFactory],
        ];
    }

    constructor(nav, events, homeService, utilsFactory, storageFactory) {
        this.nav            = nav;
        this.events         = events;
        this.homeService    = homeService;
        this.utilsFactory   = utilsFactory;
        this.storageFactory = storageFactory;
    }

    signIn(event) {
        this.homeService
            .signIn(this.username, this.password)
            .subscribe(
                response => {
                    let token = response.token;

                    if (token) {
                        this.storageFactory
                            .setItem('token', token)
                            .then(() => {
                                this.events.publish("token:set");

                                this.nav.setRoot(PanelPage);
                            });
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
