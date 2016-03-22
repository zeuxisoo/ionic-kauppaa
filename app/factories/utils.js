import { Injectable } from 'angular2/core';

@Injectable()
export class UtilsFactories {

    firstError(error) {
        let body       = JSON.parse(error._body);
        let firstError = "";

        if (body.errors) {
            for(let field in body.errors) {
                firstError = body.errors[field][0];
                break;
            }
        }

        return firstError;
    }

}
