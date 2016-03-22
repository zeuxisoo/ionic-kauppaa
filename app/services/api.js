import querystring from 'querystring';

import { Http, Headers } from 'angular2/http';
import { Injectable } from 'angular2/core';

@Injectable()
export class ApiService {

    static get parameters() {
        return [
            [Http]
        ];
    }

    constructor(http) {
        this.http = http;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    api(entryPoint) {
        return `http://localhost:8000/api/v1/${entryPoint}`;
    }

    queryString(dict) {
        return querystring.stringify(dict);
    }

    post(entryPoint, data) {
        return this.http
                .post(this.api(entryPoint), this.queryString(data), {
                    headers: this.headers
                })
                .map(response => response.json())
    }

}
