import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { GoogleMapsModule } from '@angular/google-maps';
import { extractCoordinates } from '../../utils/extractCoordinates';


@Component({
  selector: 'app-google-maps',
  standalone: true,
  imports: [CommonModule, GoogleMapsModule],

  templateUrl: './google-maps.component.html',
  styleUrls: ['./google-maps.component.css']
})
export class MapComponent {
  @Input() location!: string;
  lat: number = 0
  lng: number = 0
  // Define your map center coordinates
  center: google.maps.LatLngLiteral = {
    lat: 42.65498250506911,  // Set your latitude
    lng: 23.32394684286538 // Set your longitude
  };

  // Define zoom level
  zoom = 18;

  mapOptions: google.maps.MapOptions = {
    disableDefaultUI: false,
    mapTypeId: 'hybrid',  // Disables default map controls (zoom, etc.)
    styles: [               // Custom styles for map elements
      {
        featureType: 'poi',
        elementType: 'labels',
        stylers: [{ visibility: 'on' }]
      }
    ]
  };


  ngOnInit(): void {
    console.log(this.location)
    const coordinates = extractCoordinates(this.location)

    if (coordinates) {
      this.center = {
        lat: coordinates.lat,
        lng: coordinates.lng
      }
    }
  }
}