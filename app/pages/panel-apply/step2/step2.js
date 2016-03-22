import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';
import { StepDataFactory } from '../../../factories/data';

@Page({
    templateUrl: 'build/pages/panel-apply/step2/step2.html'
})
export class PanelApplyStep2Page {

    static get parameters() {
        return [
            [NavController],
            [StepDataFactory]
        ];
    }

    constructor(nav, stepDataFactory) {
        this.nav             = nav;
        this.stepDataFactory = stepDataFactory;

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
        console.log(this.stepDataFactory.getData());

        console.log('submited');
    }

}
