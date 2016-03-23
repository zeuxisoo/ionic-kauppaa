import querystring from 'querystring';

import { Http, Headers, URLSearchParams } from 'angular2/http';
import { Injectable } from 'angular2/core';
import { StorageFactory } from '../factories/storage';
import { Events } from 'ionic-angular';

@Injectable()
export class ApiService {

    static get parameters() {
        return [
            [Http],
            [StorageFactory],
            [Events]
        ];
    }

    constructor(http, storageFactory, events) {
        this.http           = http;
        this.storageFactory = storageFactory;
        this.events         = events;

        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');

        this.events.subscribe('token:set', () => {
            this.storageFactory
                .getItem('token')
                .then(token => {
                    if (token !== "") {
                        this.headers.append('Authorization', `Bearer ${token}`);
                    }
                });
        });
    }

    api(entryPoint) {
        return `https://ku.comma.party/api/v1/${entryPoint}`;
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
