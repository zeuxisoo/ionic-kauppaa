import querystring from 'querystring';

import { Headers } from 'angular2/http';

export default class {

    constructor() {
        this.headers = new Headers();
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded');
    }

    api(entryPoint) {
        return `http://localhost:8000/api/v1/${entryPoint}`;
    }

    querystring(dict) {
        return querystring.stringify(dict);
    }

}
