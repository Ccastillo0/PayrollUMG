import { TableColumn } from "src/@vex/interfaces/table-column.interface";
import { Allowance } from "src/app/response/allowance/allowance.response";
import icallowance  from "@iconify/icons-ic/twotone-category";
import { GenericValidators } from "@shared/validators/generic-validators";
import { ListTableMenu } from "src/app/commons/list-table-menu.interface";
import icViewHeadline from "@iconify/icons-ic/twotone-view-headline";
const searchOptions = [
    {
        label: "Description",
        value: 1,
        placeholder: "Search Description",
        validation: [GenericValidators.defaultDescription],
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


const tableColumns: TableColumn<Allowance>[] = [
    {
        label: "ID Allowance",
        property: "allowanceId",
        type: "identificador",
        cssClasses: ['font-medium', 'w-10']
    },
    {
        label: "Description",
        property: "description",
        type: "text",
        cssClasses: ['font-medium', 'w-10']  
    },
    {
        label: "Amount",
        property: "amount",
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
    icallowance: icallowance,
    menuOpen: false,
    tableColumns: tableColumns,
    initialSort: "allowanceId",
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