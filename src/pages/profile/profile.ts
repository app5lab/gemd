import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, Platform, AlertController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Geolocation } from '@ionic-native/geolocation';
import { NativeGeocoder, NativeGeocoderOptions, NativeGeocoderReverseResult } from '@ionic-native/native-geocoder';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Diagnostic } from '@ionic-native/diagnostic';


@IonicPage()
@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  imageLoc:any = {img:'',lat:0,lng:0}
  address:any = ''
  errors:any []= []
  location: Coordinates;
  constructor(private backgroundGeolocation: BackgroundGeolocation,private platform: Platform,public load:LoadingController, 
  public navCtrl: NavController, public navParams: NavParams,private camera: Camera,private geolocation: Geolocation,
  private nativeGeocoder: NativeGeocoder,private diagnostic: Diagnostic,private alert:AlertController) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ProfilePage');
  }
  async getLocation() {
    
  }

  takePhoto(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,

    }
    
    this.camera.getPicture(options).then((imageData) => {
      var l = this.load.create()
      // l.present()
     // imageData is either a base64 encoded string or a file URI
     // If it's base64 (DATA_URL): 'data:image/jpeg;base64,' +
     let base64Image =  imageData;
     this.imageLoc.img = base64Image;
     this.errors.push(this.imageLoc.img)
     this.getloc()
    }, (err) => {
     // Handle error, A world of possibilities
    });
  }

  d(){
    this.geolocation.getCurrentPosition({enableHighAccuracy:true,timeout:60000,maximumAge:30000}).then((resp) => {
      this.errors.push('in geoLoc',resp.coords.latitude)
      this.imageLoc.lat = resp.coords.latitude
      this.imageLoc.lng = resp.coords.longitude
      console.log(this.imageLoc);

    }).catch((error) => {
      this.errors.push(error)       
      console.log('Error getting location', error);
    });
  }
  async getloc(){
    this.errors.push('getLoc called')
    this.diagnostic.isLocationEnabled().then((state)=>{
      if(!state)
      {
        this.alert.create({title:'Location Disabled',subTitle:'Kindly turn on location from settings',buttons:[{text:'Cancel',role:'cancel'},{text:'Settings',handler: ()=>{
          this.diagnostic.switchToLocationSettings();
        }}]}).present()
      }
      else
      {
        this.geolocation.getCurrentPosition({enableHighAccuracy:false,timeout:60000,maximumAge:30000}).then((resp) => {
          this.errors.push('in geoLoc',resp.coords.latitude)
          this.imageLoc.lat = resp.coords.latitude
          this.imageLoc.lng = resp.coords.longitude
          console.log(this.imageLoc);
    
        }).catch((error) => {
          this.errors.push(error)       
          console.log('Error getting location', error);
        });
        this.errors.push('getLoc end')
    
        let options: NativeGeocoderOptions = {
          useLocale: true,
          maxResults: 5
      };
      this.nativeGeocoder.reverseGeocode(this.imageLoc.lat, this.imageLoc.lng, options)
        .then((result: NativeGeocoderReverseResult[]) => {
          this.address = (JSON.stringify(result[0]))
          this.errors.push('natgeo called')    
        })
        .catch((error: any) => this.errors.push(JSON.stringify(error)));
      }
    }).catch((errror) => {
      this.errors.push(this.errors)
      console.log(errror); 
    });
  }

  view(){
    this.errors.push(this.imageLoc.lat)
    this.errors.push(this.imageLoc.lng)
    this.navCtrl.push('MapPage',{image:this.imageLoc}).catch(r => {this.errors.push(r)})
  }
}
