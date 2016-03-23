import { NavController } from 'ionic-angular';
import { Page, Alert } from 'ionic-angular';
import { Camera, CameraOptions } from 'ionic-native';
import { ApiService } from '../../../services/api';
import { ApplyService } from '../../../services/apply';
import { StepDataFactory } from '../../../factories/data';
import { StorageFactory } from '../../../factories/storage';
import { UtilsFactory } from '../../../factories/utils';

@Page({
    templateUrl: 'build/pages/panel-apply/step2/step2.html'
})
export class PanelApplyStep2Page {

    static get parameters() {
        return [
            [NavController],
            [ApiService],
            [ApplyService],
            [StepDataFactory],
            [StorageFactory],
            [UtilsFactory],
        ];
    }

    constructor(nav, apiService, applyService, stepDataFactory, storageFactory, utilsFactory) {
        this.nav             = nav;
        this.apiService      = apiService;
        this.applyService    = applyService;
        this.stepDataFactory = stepDataFactory;
        this.storageFactory  = storageFactory;
        this.utilsFactory    = utilsFactory;

        this.hkid    = "build/images/preview_for_hkid.png";
        this.address = "build/images/preview_for_address.png";
        this.income  = "build/images/preview_for_income.png";

        this.submitText = "Submit";
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
        let photoFields = ['hkid', 'address', 'income'];

        for(let key in photoFields) {
            if (this[photoFields[key]].startsWith('build/images/preview_for')) {
                let alert = Alert.create({
                    title  : 'Ooops',
                    message: `Please take or pick ${photoFields[key]} to upload`,
                    buttons: ['Ok']
                });

                this.nav.present(alert);

                return;
            }
        }

        let data = this.stepDataFactory.getData();

        this.submitText = "Submitting";

        this.applyService
            .createStep1(data)
            .subscribe(
                response => {
                    let apply = response.data;

                    Promise.all([
                        this.submitPhoto(apply.id, 'hkid'),
                        this.submitPhoto(apply.id, 'address'),
                        this.submitPhoto(apply.id, 'income')
                    ]).then(
                        values => {
                            let alert = Alert.create({
                                title  : 'Success',
                                message: 'Your information has been successfully submitted. we will contact you soon.',
                                buttons: ['Ok']
                            });

                            this.nav.present(alert);
                        },
                        error => {
                            this.handleError(error);
                            return;
                        }
                    );
                },
                error => {
                    this.handleError(error)
                },
                () => this.submitText = "Submit"
            );
    }

    submitPhoto(apply_id, category) {
        return new Promise((resolve, reject) => {
            this.storageFactory.getItem('token').then(token => {
                let fileUploadOptions = new FileUploadOptions();
                let fileTransfer      = new FileTransfer();
                let fileUri           = this[category];

                fileUploadOptions.fileKey     = "file";
                fileUploadOptions.fileName    = fileUri.substr(fileUri.lastIndexOf('/') + 1);
                fileUploadOptions.mimeType    = "image/jpeg";
                fileUploadOptions.chunkedMode = false;
                fileUploadOptions.headers     = {
                    'Connection'   : "close",
                    'Authorization': `Bearer ${token}`
                };
                fileUploadOptions.params      = {
                    apply_id: apply_id,
                    category: category
                };

                fileTransfer.upload(fileUri, encodeURI(this.apiService.api("panel/apply/create/step2")), response => {
                    resolve(response);
                }, error => {
                    reject(error);
                }, fileUploadOptions);
            });
        });
    }

    handleError(error) {
        // Handle for FileTransferError without error._body
        if (!error._body && error.body) {
            error._body = error.body;
        }

        let firstError  = this.utilsFactory.firstError(error);
        let singleError = this.utilsFactory.singleError(error);
        let message     = "";

        if (firstError !== "") {
            message = firstError;
        }else{
            message = singleError;
        }

        if (message !== "") {
            let alert = Alert.create({
                title  : 'Oops',
                message: message,
                buttons: ['Ok']
            });

            this.nav.present(alert);
        }
    }

}
