import 'rxjs/add/operator/map';

import { Injectable } from 'angular2/core';
import { ApiService } from './api';

@Injectable()
export class ApplyService {

    static get parameters() {
        return [
            [ApiService]
        ];
    }

    constructor(apiService) {
        this.apiService = apiService;
    }

    createStep1(data) {
        return this.apiService.post("panel/apply/create/step1", data);
    }

}
