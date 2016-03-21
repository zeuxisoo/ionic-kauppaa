import { Page } from 'ionic-angular';

@Page({
    templateUrl: 'build/pages/signup/signup.html'
})
export class SignUpPage {

    create(event) {
        console.log('create Called');
        console.log(this.username);
        console.log(this.password);
        console.log(this.email);
    }

}
