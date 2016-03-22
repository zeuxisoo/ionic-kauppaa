import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';
import { Page } from 'ionic-angular';
import 'rxjs/add/operator/map';
import querystring from 'querystring';

@Injectable()
export class HomeService {

    static get parameters() {
        return [
            [Http]
        ];
    }

    constructor(http) {
        this.http    = http;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    signUp(username, email, password) {
        let body = querystring.stringify({
            username: username,
            email   : email,
            password: password,
       });

        return this.http
                   .post("http://localhost:8000/api/v1/home/signup", body, {
                        headers: this.headers
                   })
                   .map(response => response.json());
    }

}
