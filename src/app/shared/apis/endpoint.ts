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

    //DEDUCTION
    LIST_DEDUCTION: 'Deduction',
    LIST_SELECT_DEDUCTION : 'Deduction/Select',
    DEDUCTION_BY_ID: 'Deduction/',
    DEDUCTION_REGISTER: 'Deduction/Register',
    DEDUCTION_EDIT: 'Deduction/Edit/',
    DEDUCTION_REMOVE: 'Deduction/Remove/',   
    
    //PAYROLL
    LIST_PAYROLL: 'Payroll',
    LIST_SELECT_PAYROLL: 'Payroll/Select',
    PAYROLL_BY_ID: 'Payroll/',
    PAYROLL_REGISTER: 'Payroll/Register',
    PAYROLL_EDIT: 'Payroll/Edit/',
    PAYROLL_REMOVE: 'Payroll/Remove/',
}
//fff
export const httpOptions={
    headers: new HttpHeaders({
        "Content-Type": "application/json"
    })
}