import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { OneSignal, OSNotificationPayload } from '@ionic-native/onesignal';
@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any = 'LoginPage';
  sender_id = '803535964844';
  oneSignalAppId = '69bfe474-d3a0-466b-ae86-01dd731c9ae8';
  constructor(private ok:OSNotificationPayload,platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen,private oneSignal: OneSignal) {
    platform.ready().then(() => {
      // if(platform.is('ios')){

      // }
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      if (this.isCordovaAvailable()){
        // this.oneSignal.setLogLevel(OneSignal.LOG_LEVEL.DEBUG);
        console.log(this.oneSignal.startInit(this.oneSignalAppId, this.sender_id))
        console.log(this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.Notification))
        console.log(this.oneSignal.handleNotificationReceived().subscribe(data => this.onPushReceived(data.payload)))
        console.log(this.oneSignal.handleNotificationOpened().subscribe(data => this.onPushOpened(data.notification.payload)))
        this.oneSignal.endInit();
      }
      statusBar.styleDefault();
      splashScreen.hide();
    });
  
  }
  private onPushReceived(payload: OSNotificationPayload) {
    alert('Push recevied:' + payload.body);
  }
  
  private onPushOpened(payload: OSNotificationPayload) {
    alert('Push opened: ' + payload.body);
  }
  isCordovaAvailable() {
    if (!(<any>window).cordova) {
      alert('This is a native feature. Please use a device');
      return false;
    }
    return true;
  }
}
