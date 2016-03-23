import { NavController } from 'ionic-angular';
import { Page } from 'ionic-angular';
import { PanelApplyStep2Page } from '../step2/step2';
import { StepDataFactory } from '../../../factories/data';

@Page({
    templateUrl: 'build/pages/panel-apply/step1/step1.html'
})
export class PanelApplyStep1Page {

    static get parameters() {
        return [
            [NavController],
            [StepDataFactory],
        ];
    }

    constructor(nav, stepDataFactory) {
        this.nav             = nav;
        this.stepDataFactory = stepDataFactory;
    }

    step2() {
        this.stepDataFactory.addData({
            chinese_name        : this.chinese_name,
            english_name        : this.english_name,
            hkid                : this.hkid,
            gender              : this.gender || 1,
            occupation          : this.occupation || 1,
            monthly_income      : this.monthly_income,
            property_ownership_1: this.property_ownership_1 || false, // private residential
            property_ownership_2: this.property_ownership_2 || false, // home ownership
            property_ownership_3: this.property_ownership_3 || false, // public home ownership
            property_ownership_4: this.property_ownership_4 || false, // village houses
            property_ownership_5: this.property_ownership_5 || false, // no property
            loan_type           : this.loan_type || 1,
            apply_amount        : this.apply_amount,
            loan_period         : this.loan_period,
            payroll             : this.payroll || 1,
            mpf                 : this.mpf || 1,
            once_bankruptcy     : this.once_bankruptcy || 1
        });

        this.nav.push(PanelApplyStep2Page);
    }

}
