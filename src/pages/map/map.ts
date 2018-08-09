import { Component, ViewChild, ElementRef,NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation';
import { Geoposition, Geolocation } from '@ionic-native/geolocation';
// import {
//   GoogleMaps,
//   GoogleMap,
//   GoogleMapsEvent,
//   GoogleMapOptions,
//   CameraPosition,
//   MarkerOptions,
//   Marker
// } from '@ionic-native/google-maps';
declare var google : any;


@IonicPage()
@Component({
  selector: 'page-map',
  templateUrl: 'map.html',
})
export class MapPage {
  @ViewChild('map') mapElement: ElementRef;
  img:any
  map: any;
  start = 'chicago, il';
  end = 'chicago, il';
  co:any ={lat:0,lng:0}
  error:any = 'test'
  public watch: any;   
  public lat: number = 0;
  public lng: number = 0;
  // directionsService = new google.maps.DirectionsService;
  // directionsDisplay = new google.maps.DirectionsRenderer;
  constructor(public geolocation: Geolocation ,public zone: NgZone,navParams: NavParams,private backgroundGeolocation: BackgroundGeolocation,public toast:ToastController) {
    this.img = navParams.get('image')
   }

   async getLoc(){
     
//   // Background Tracking
 
//   let config = {
//     desiredAccuracy: 0,
//     stationaryRadius: 20,
//     distanceFilter: 10,
//     debug: true,
//     interval: 2000
//   };
 
//   this.backgroundGeolocation.configure(config).subscribe((location) => {
 
//     console.log('BackgroundGeolocation:  ' + location.latitude + ',' + location.longitude);
 
//     // Run update inside of Angular's zone
//     this.zone.run(() => {
//       this.lat = location.latitude;
//       this.lng = location.longitude;
//     });
 
//   }, (err) => {
 
//     console.log(err);
 
//   });
 
//   // Turn ON the background-geolocation system.
//   this.backgroundGeolocation.start();
 
 
//   // Foreground Tracking
 
// let options = {
//   frequency: 3000,
//   enableHighAccuracy: true
// };
 
// this.watch = this.geolocation.watchPosition(options).subscribe((position: Geoposition) => {
 
//   console.log(position);
 
//   // Run update inside of Angular's zone
//   this.zone.run(() => {
//     this.lat = position.coords.latitude;
//     this.lng = position.coords.longitude;
//   });
 
// });

  }

  ionViewDidLoad() {
    this.initMap();
  }
  initMap() {
    this.map = new google.maps.Map(this.mapElement.nativeElement, {
      zoom: 17,
      center:new google.maps.LatLng(this.img.lat,this.img.lng),
        draggable: false, zoomControl: false, scrollwheel: false
    });

    var marker = new google.maps.Marker({
      position:new google.maps.LatLng(this.img.lat,this.img.lng),
      map: this.map,
      title: 'Image Location'
    });
    
    // this.directionsDisplay.setMap(this.map);
  }

  // calculateAndDisplayRoute() {
  //   this.directionsService.route({
  //     origin: this.start,
  //     destination: this.end,
  //     travelMode: 'DRIVING'
  //   }, (response, status) => {
  //     if (status === 'OK') {
  //       this.directionsDisplay.setDirections(response);
  //     } else {
  //       window.alert('Directions request failed due to ' + status);
  //     }
  //   });
  // }


}
