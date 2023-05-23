import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { User } from "src/app/response/user/user.response";
import icUser  from "@iconify/icons-ic/twotone-category";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ListTableMenu } from "src/app/commons/list-table-menu.interface";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline";

const searchOptions = [
    {
        label: "Name",
        value: 1,
        placeholder: "Search Name",
        validation: [GenericValidators.defaultName],
        validation_desc: "Solo se permite letras en esta busqueda.",
        min_length: 2,
    },
    {
        label: "e-mail",
        value: 1,
        placeholder: "Search e-mail",
        validation: [GenericValidators.defaultDescription],
        validation_desc: "Solo se permite letras y numeros",
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


const tableColumns: TableColumn<User>[] = [
    {
        label: "User Name",
        property: "username",
        type: "text",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "Email",
        property: "email",
        type: "text",
        cssClasses: ['font-medium', 'w-10']  
    },
    {
        label: "Password",
        property: "password",
        type: "text",
        cssClasses: ['font-medium', 'w-10']  
    },
    {
        label: "Create AT",
        property: "createdAt",
        type: "datetime",
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
    initialSort: "userId",
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