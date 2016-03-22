import { Injectable } from 'angular2/core';
import localforage from 'localforage';

@Injectable()
export class StorageFactory {

    constructor() {
        localforage.config({
            driver      : localforage.LOCALSTORAGE,
            name        : 'kauppaa',
            version     : 1.0,
            size        : 4980736,          // Size of database, in bytes. WebSQL-only for now.
            storeName   : 'kauppaa',        // Should be alphanumeric, with underscores.
            description : ''
        });
    }

    setItem(name, value, callback) {
        return localforage.setItem(name, value);
    }

    getItem(name, callback) {
        return localforage.getItem(name);
    }

}
