import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Payroll } from "src/app/response/payroll/payroll.response";
import icUser  from "@iconify/icons-ic/twotone-category";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ListTableMenu } from "src/app/commons/list-table-menu.interface";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline";

const searchOptions = [
    {
        label: "employeeId",
        value: 1,
        placeholder: "Search employeeId",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "Solo se permite letras y numeros",
        min_length: 2,
    },
    {
        label: "periodStart", 
        value: 1,
        placeholder: "Search periodStart Payroll",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite letras en esta busqueda.",
        min_length: 2,
    },
    {
        label: "periodEnd", 
        value: 1,
        placeholder: "Search periodEnd Payroll",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite letras en esta busqueda.",
        min_length: 2,
    },
    {
        label: "totalEarned", 
        value: 1,
        placeholder: "Search totalEarned Payroll",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite letras en esta busqueda.",
        min_length: 2,
    },
    {
        label: "totalDeducted", 
        value: 1,
        placeholder: "Search totalDeducted Payroll",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite letras en esta busqueda.",
        min_length: 2,
    },
    {
        label: "totalToPay", 
        value: 1,
        placeholder: "Search totalToPay Payroll",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite letras en esta busqueda.",
        min_length: 2,
    }
]

const menuItems: ListTableMenu[] =[
    {
        type: "link",
        id: "all",
        icon: icViewHeadline,
        label: "Todos"
    }
]


const tableColumns: TableColumn<Payroll>[] = [
    {
        label: "payroll Id",
        property: "payrollId",
        type: "identificador",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "employee Id",
        property: "employeeId",
        type: "identificador",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "period Start",
        property: "periodStart",
        type: "text",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "period End",
        property: "periodEnd",
        type: "text",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "total Earned",
        property: "totalEarned",
        type: "currency",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "total Deducted",
        property: "totalDeducted",
        type: "currency",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "total ToPay",
        property: "totalToPay",
        type: "currency",
        cssClasses: ['font-medium', 'w-10']
    },
    
    {
        label: "",
        property: "menu",
        type: "buttonGroup",
        buttonItems: [
            {
                buttonLabel: "EDITAR",
                buttonAction: "edit",
                buttonCondition: null,
                disable: false
            },
            {
                buttonLabel: "ELIMINAR",
                buttonAction: "remove",
                buttonCondition: null,
                disable: false
            }
        ],
        cssClasses: ['font-medium', 'w-10']
    }
]

const filters ={
    numFilter: 0,
    textFilter: "",
    stateFilter: null
}

const inputs={
    numFilter: 0,
    textFilter: "",
    stateFilter: null
}


export const componentSettings = {
    icUser: icUser,
    menuOpen: false,
    tableColumns: tableColumns,
    initialSort: "payrollId",
    initialSortDir: "desc",
    getInputs: inputs,
    buttonLabel: "EDITAR",
    buttonLabel2: "ELIMINAR",
    // SEARCH FILTROS
    menuItems: menuItems,
    filters: filters,
    searchOptions: searchOptions,
    columnsFilter: tableColumns.map((column)=> {return {label: column.label, property: column.property, type: column.type}})
}