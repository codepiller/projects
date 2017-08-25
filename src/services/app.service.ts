import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Global } from '../config/global';

@Injectable()

export class AppService
{
    apiUrl:string = Global.BASE_API_URL;
    userId:string = Global.USER_ID;
    constructor(private _http : Http) {}

    getLocations(){
      return  this._http.get(this.apiUrl+'places?user_id='+this.userId+'&lng=77.13&lat=28.7').map(res    =>  res.json());
    }

    filterLocations(min, max){
      return  this._http.get(this.apiUrl+'places?user_id='+this.userId+'&lng=77.13&lat=28.7&min='+min+'&max='+max).map(res    =>  res.json());
    }
    

    addLocation(data){
      return this._http.post(this.apiUrl+'place', data).map(res  => res.json());
    }

    deleteLocation(location){
      return this._http.delete(this.apiUrl+'place/'+location).map(res  => res.json());
    }
    
    updateLocation(data){
      return this._http.put(this.apiUrl+'place/'+data.location_id, data).map(res  => res.json());
    }

    addToFavorite(id){
      return this._http.post(this.apiUrl+'place/favorite/', {location_id:id}).map(res  => res.json());
    }

    uploadPhoto(data){
      return this._http.post(this.apiUrl+'upload/', data)
        .map(res  => res.json());
    }
}