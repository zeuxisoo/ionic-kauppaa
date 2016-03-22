import querystring from 'querystring';

import { Http, Headers, URLSearchParams } from 'angular2/http';
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

        let token = localStorage.getItem('token');

        if (token !== "") {
            this.headers.append('Authorization', `Bearer ${token}`);
        }
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

    get(entryPoint, params) {
        let searchParams = new URLSearchParams();

        if (params) {
            Object.keys(params).forEach(key => {
                searchParams.set(key, params[key]);
            });
        }

        return this.http
                .get(this.api(entryPoint), {
                    headers: this.headers,
                    search : searchParams
                })
                .map(response => response.json())
    }

}
