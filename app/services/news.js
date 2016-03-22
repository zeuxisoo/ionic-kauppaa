import 'rxjs/add/operator/map';

import { Injectable } from 'angular2/core';
import { ApiService } from './api';

@Injectable()
export class NewsService {

    static get parameters() {
        return [
            [ApiService]
        ];
    }

    constructor(apiService) {
        this.apiService = apiService;
    }

    all() {
        return this.apiService.get("panel/news/all");
    }

}
