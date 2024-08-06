import { HospitalStore } from "./HospitalStore";


export class RootStore{
    hospitalStore;

    constructor(){
        this.hospitalStore = new HospitalStore(this);
    }

    
}