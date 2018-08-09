import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { AndroidFingerprintAuth } from '@ionic-native/android-fingerprint-auth';
import { Validators, FormBuilder, FormGroup, FormControl } from '@angular/forms';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  validations_form: FormGroup;
  constructor(public formBuilder: FormBuilder,public navCtrl: NavController, public navParams: NavParams, public load: LoadingController, public alert:AlertController , private finger: AndroidFingerprintAuth) {
    var u = localStorage.getItem('dgme_user')
    this.validations_form = this.formBuilder.group({
      username: new FormControl('', Validators.compose([
        // Validators.pattern('(([a-zA-Z0-9])+(_|-| )[a-zA-Z0-9]*)*'),
        Validators.pattern('([a-zA-Z0-9]+|[a-zA-Z0-9]+[-_.][a-zA-Z0-9]+)'),
        Validators.required
      ])),
      password: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^(?=.*[a-zA-Z])(?=.*[0-9.])([a-zA-Z0-9])+$')
      ])),
      remember: new FormControl('')
    });
    console.log(u);
    
    if(u != null){
      this.validations_form.controls.username.setValue(JSON.parse(u).name)
      this.validations_form.controls.password.setValue(JSON.parse(u).password)
      this.validations_form.controls.remember.setValue(true)
    }
    this.finger.isAvailable().then((result)=> {
      if(result.isAvailable){
        // it is available

        this.finger.encrypt({ clientId: 'myAppName', username: 'myUsername', password: 'myPassword' })
          .then(result => {
            if (result.withFingerprint) {
              this.navCtrl.setRoot('TabsPage')
                console.log('Successfully encrypted credentials.');
                console.log('Encrypted credentials: ' + result.token);
            } else if (result.withBackup) {
              console.log('Successfully authenticated with backup password!');
            } else console.log('Didn\'t authenticate!');
          })
          .catch(error => {
            if (error === this.finger.ERRORS.FINGERPRINT_CANCELLED) {
              console.log('Fingerprint authentication cancelled');
            } else console.error(error)
          });

      } else {
        // fingerprint auth isn't available
        }
    })
    .catch(error => console.error(error));
  }

  submit(){
      var l = this.load.create({content:'Signing In...'})
      l.present();
      var user = {name:this.validations_form.controls.username.value,password:this.validations_form.controls.password.value}
      if(this.validations_form.controls.remember.value == true){
        localStorage.setItem('dgme_user',JSON.stringify(user))
      }
      else{
        localStorage.removeItem('dgme_user')
      }
      this.navCtrl.setRoot('TabsPage').then(() => {l.dismiss()})
  }

  forgot() {
    let a = this.alert.create({
      title: 'Reset Password',
      subTitle:'Enter Username to request password reset',
      inputs: [
        {
          name: 'username',
          placeholder: 'Username'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Send Request',
          handler: data => {
            if(data.username == ''){
              this.alert.create({title:'Invalid input!'}).present()
            }
            else{
              this.alert.create({title:'Request Sent!'}).present()
            }
          }
        }
      ]
    }); 
    a.present();
  }
  static validUsername(fc: FormControl){

    if(fc.value.toLowerCase() === "abc123" || fc.value.toLowerCase() === "123abc"){
      return {
        validUsername: true
      };
    } else {
      return null;
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LoginPage');
  }

  validation_messages = {
    'username': [
      { type: 'required', message: 'Username is required.' },
      { type: 'pattern', message: 'Your username must contain only numbers and letters.' },
    ],
    'password': [
      { type: 'required', message: 'Password is required.' },
      { type: 'pattern', message: 'Your password must contain only numbers and letters.' }
    ],
  }

}
