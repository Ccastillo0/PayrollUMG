import {HttpHeaders} from "@angular/common/http"
export const endpoint ={
    //USER MODULE
    LIST_USER: 'User',
    LIST_SELECT_USER : 'User/Select',
    USER_BY_ID: 'User/',
    USER_REGISTER: 'User/Register',
    USER_EDIT: 'User/Edit/',
    USER_REMOVE: 'User/Remove/',
    //https://localhost:7281/api/User

    //AUTH
    GENERATE_TOKE: 'User/Generate/Token',


    //ALLOWANCE
    LIST_ALLOWANCE: 'Allowance',
    LIST_SELECT_ALLOWANCE : 'Allowance/Select',
    ALLOWANCE_BY_ID: 'Allowance/',
    ALLOWANCE_REGISTER: 'Allowance/Register',
    ALLOWANCE_EDIT: 'Allowance/Edit/',
    ALLOWANCE_REMOVE: 'Allowance/Remove/',
    
}

export const httpOptions={
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
}