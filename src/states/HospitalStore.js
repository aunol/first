import { action, makeObservable, observable } from "mobx";
import { hospitals } from "views/Hospital";

class Hospital {
    
    no;
    name;
    address;
    phone;
    species;
    type;
    lati;
    longi;

    constructor(no, name, address, phone, species, type, lati, longi) {
        this.no = no;
        this.name = name;
        this.address = address;
        this.phone = phone;
        this.species = species;
        this.type = type;
        this.lati = lati;
        this.longi = longi;
    }

}

export class HospitalStore {
    rootStore;

    hospitals = [];

    constructor(root){
        makeObservable(this,{
            Hospitals: observable,
        })

        this.rootStore = root;

        this.hospitals = [
            new hospital(1, "Hospital 1", "Jalan Raya", "08123456789", "Kucing", "Rumah Sakit", -6.283111, 106.845111),
            new hospital(2, "Hospital 2", "Jalan Raya", "08123456789", "Kucing", "Rumah Sakit", -6.283111, 106.845111),
            new hospital(3, "Hospital 3", "Jalan Raya", "08123456789", "Kucing", "Rumah Sakit", -6.283111, 106.845111), 
        ]
    }

}