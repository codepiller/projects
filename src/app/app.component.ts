import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import {NgForm} from '@angular/forms';
import { Global } from '../config/global';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

    locations = [];
    showForm = false;
    disabled = false;
    showUpdateForm = false;
    name = '';
    city = '';
    state = '';
    zip = '';
    location_id = '';
    longitude = '';
    latitude = '';
    apiUrl:string = Global.BASE_API_URL;
    imageUrl:string = Global.IMAGE_URL;
    userId:string = Global.USER_ID;
    

    constructor(private app_service : AppService){
      console.log(this.apiUrl);
    }

    showAddLocationForm(){
      this.showForm = !this.showForm;
    }

    showAddUpdateForm(location){
      this.showUpdateForm = !this.showUpdateForm;
      this.name = location.name;
      this.city = location.city;
      this.state = location.state;
      this.zip = location.zip;
      this.location_id = location._id;
    }

    getLocations(){
      this.app_service.getLocations().subscribe(res =>  {
        this.locations = res;
        console.log(this.locations);
      });
    }

    ngOnInit()
    {
      this.getLocations();
    }

    addLocation(form:NgForm, longitude, latitude, user_id)
    {
      const data = form.value;
      data.longitude = longitude;
      data.latitude = latitude;
      data.user_id = user_id;
      this.disabled = true;

      return this.app_service.addLocation(data).subscribe(res =>  {
        this.disabled = false;
        // console.log(res);
        this.getLocations();
        this.showForm = !this.showForm;
      });
    }

    deleteLocation(location){
      this.disabled = true;
      return this.app_service.deleteLocation(location).subscribe(res =>  {
        this.getLocations();
        this.disabled = false;
      });
    }

    updateLocation(form: NgForm){
      this.disabled = true;
      return this.app_service.updateLocation(form.value).subscribe(res =>  {
        this.showUpdateForm = !this.showUpdateForm;
        this.getLocations();
        this.disabled = false;
      });
    }

    addToFavorite(location){
      this.disabled = true;
      return this.app_service.addToFavorite(location).subscribe(res =>  {
        this.getLocations();
        this.disabled = false;
      });
    }

    filterLocations(min, max){
      this.disabled = true;
      this.app_service.filterLocations(min, max).subscribe(res =>  {
        this.locations = res;
        this.disabled = false;
      });
    }

    upload(fileInput,location) {

      const exts = ['jpg','jpeg','png','gif'];
      const formData = new FormData();
      const photo = fileInput.target.files[0];
      const name = photo['name'];
      const ext = name.substring(name.lastIndexOf(".") + 1, name.length).toLowerCase();
      
      if(exts.indexOf(ext) == -1){
        alert("please choose a valid file");
      }else{
        formData.append("photo", photo);
        formData.append('location_id',location);
  
        this.disabled = true;
  
        this.app_service.uploadPhoto(formData)
          .subscribe(res =>{
            console.log(res);
            this.disabled = false;
            if(res.status == true){
              this.getLocations();
            }
          });
      }
    }

    

}
