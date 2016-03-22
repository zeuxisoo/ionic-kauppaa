import { Injectable } from 'angular2/core';

@Injectable()
export class StepDataFactory {

    constructor() {
        this.data = {};
    }

    addData(data) {
        this.data = Object.assign(this.data, data);
    }

    getData() {
        return this.data;
    }

}
