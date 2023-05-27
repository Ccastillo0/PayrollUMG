import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Department } from "src/app/response/department/department.response";
import icUser  from "@iconify/icons-ic/twotone-category";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ListTableMenu } from "src/app/commons/list-table-menu.interface";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline";

const searchOptions = [
    {
        label: "Department  Name",
        value: 1,
        placeholder: "Search Department",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite letras en esta busqueda.",
        min_length: 2,
    },
   
]

const menuItems: ListTableMenu[] =[
    {
        type: "link",
        id: "all",
        icon: icViewHeadline,
        label: "Todos"
    }
]


const tableColumns: TableColumn<Department>[] = [
   
    {
        label: "Department Id",
        property: "departmentId",
        type: "identificador",
        cssClasses: ['font-medium', 'w-10']
    },

    {
        label: "Department Name",
        property: "departmentName",
        type: "text",
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
    initialSort: "departmentId",
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