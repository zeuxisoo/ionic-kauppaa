import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';
import { StepDataFactory } from '../../../factories/data';
import { StorageFactory } from '../../../factories/storage';

@Page({
    templateUrl: 'build/pages/panel-apply/step2/step2.html'
})
export class PanelApplyStep2Page {

    static get parameters() {
        return [
            [NavController],
            [StepDataFactory],
            [StorageFactory],
        ];
    }

    constructor(nav, stepDataFactory, storageFactory) {
        this.nav             = nav;
        this.stepDataFactory = stepDataFactory;
        this.storageFactory  = storageFactory;

        this.hkid    = "http://placehold.it/300x300";
        this.address = "http://placehold.it/300x300";
        this.income  = "http://placehold.it/300x300";
    }

    take(type) {
        Camera.getPicture({
            quality           : 90,
            destinationType   : navigator.camera.DestinationType.FILE_URI,
            sourceType        : navigator.camera.PictureSourceType.CAMERA,
            allowEdit         : false,
            encodingType      : navigator.camera.EncodingType.JPEG,
            saveToPhotoAlbum  : false,
            correctOrientation: true,
        }).then((imageData) => {
            this[type] = imageData;
        });
    }

    pick(type) {
        Camera.getPicture({
            quality           : 90,
            destinationType   : navigator.camera.DestinationType.FILE_URI,
            sourceType        : navigator.camera.PictureSourceType.PHOTOLIBRARY,
            allowEdit         : false,
            encodingType      : navigator.camera.EncodingType.JPEG,
            mediaType         : navigator.camera.MediaType.PICTURE,
            saveToPhotoAlbum  : false,
            correctOrientation: true,
        }).then((imageData) => {
            this[type] = imageData;
        });
    }

    backToStep1() {
        this.nav.pop();
    }

    submit() {
        this.storageFactory.getItem('token').then(token => {
            let fileUploadOptions = new FileUploadOptions();
            let fileTransfer      = new FileTransfer();

            fileUploadOptions.fileKey     = "file";
            fileUploadOptions.fileName    = this.hkid.substr(this.hkid.lastIndexOf('/') + 1);
            fileUploadOptions.mimeType    = "image/jpeg";
            fileUploadOptions.chunkedMode = false;
            fileUploadOptions.headers     = {
                'Connection'   : "close",
                'Authorization': `Bearer ${token}`
            };
            fileUploadOptions.params      = this.stepDataFactory.getData();

            fileTransfer.upload(this.hkid, encodeURI("http://10.0.1.2:8000/api/v1/panel/apply/create"), response => {
                console.log('response >>');
                console.log(response);
            }, error => {
                console.log('error >>');
                console.log(error);
            }, fileUploadOptions);
        });
    }

}
