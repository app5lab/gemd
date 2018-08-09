import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { DatePicker } from '@ionic-native/date-picker';


@IonicPage()
@Component({
  selector: 'page-trip-form',
  templateUrl: 'trip-form.html',
})
export class TripFormPage {
  alrt:any
  alrt2:any
  datee:any
  project:String = ''
  sector:String = ''
  constructor(private datePicker: DatePicker,public alert:AlertController,public navCtrl: NavController, public navParams: NavParams) {
    
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad TripFormPage');
  }

  date(){
    this.datePicker.show({
      date: new Date(),
      mode: 'date',
      androidTheme: this.datePicker.ANDROID_THEMES.THEME_HOLO_LIGHT
    }).then(
      date => this.datee = date,
      err => console.log('Error occurred while getting date: ', err)
    );
  }

  type(){ 
    this.alrt = this.alert.create({buttons:[{text:'Cancel',role:'cancel'},{text:'Select',handler:(data) => {this.project = data}}]})
    this.alrt.addInput({label:'Evaluation',value:'Evaluation',type:'radio'})
    this.alrt.addInput({label:'Monitoring',value:'Monitoring',type:'radio'})
    this.alrt.addInput({label:"TPV's",value:"TPV's",type:'radio'})
    this.alrt.addInput({label:'Inquiry',value:'Inquiry',type:'radio'})
    this.alrt.addInput({label:'Special Assignment',value:'Special Assignment',type:'radio'})
    this.alrt.addInput({label:'Other',value:'Other',type:'radio'})
    this.alrt.present()
  }
  sects(){
    this.alrt2 = this.alert.create({buttons:[{text:'Cancel',role:'cancel'},{text:'Select',handler:(data) => {this.sector = data}}]})
    this.alrt2.addInput({label:'Evaluation',value:'Evaluation',type:'checkbox'})
    this.alrt2.addInput({label:'Monitoring',value:'Monitoring',type:'checkbox'})
    this.alrt2.addInput({label:"TPV's",value:"TPV's",type:'checkbox'})
    this.alrt2.addInput({label:'Inquiry',value:'Inquiry',type:'checkbox'})
    this.alrt2.addInput({label:'Special Assignment',value:'Special Assignment',type:'checkbox'})
    this.alrt2.addInput({label:'Other',value:'Other',type:'checkbox'})
    this.alrt2.present()
  }

  submit(){
    this.alert.create({title:'Sent!',subTitle:'Request Submitted Successfully.',buttons:[{text:'OK',handler: ()=>{ this.navCtrl.pop()}}]}).present()
  }
}
