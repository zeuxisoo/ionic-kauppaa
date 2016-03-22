import 'rxjs/add/operator/map';

import { Injectable } from 'angular2/core';
import { ApiService } from './api';

@Injectable()
export class HomeService {

    static get parameters() {
        return [
            [ApiService]
        ];
    }

    constructor(apiService) {
        this.apiService = apiService;
    }

    signUp(username, email, password) {
        return this.apiService.post("home/signup", {
            username: username,
            email   : email,
            password: password,
        });
    }

}
