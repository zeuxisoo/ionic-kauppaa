import 'rxjs/add/operator/map';

import ApiService from './api';

import { Injectable } from 'angular2/core';
import { Http, Headers } from 'angular2/http';

@Injectable()
export class HomeService extends ApiService {

    static get parameters() {
        return [
            [Http]
        ];
    }

    constructor(http) {
        super();

        this.http = http;
    }

    signUp(username, email, password) {
        let data = this.querystring({
            username: username,
            email   : email,
            password: password,
        });

        return this.http
                .post(this.api("home/signup"), data, {
                    headers: this.headers
                })
                .map(response => response.json())
    }

}
