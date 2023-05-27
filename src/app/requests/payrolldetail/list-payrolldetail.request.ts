import { params } from "src/app/commons/params-api.interface"

export class ListPayrollDetailRequest extends params {
    constructor(
        numPag: number,
        order: 'desc'|'asc',
        sort: string,
        records: 10 | 20 | 50,
        numFilter: number=0,
        textFilter: string ="",
        stateFilter: number = null
    ){
        super(
            true,
            numPag,
            order,
            sort,
            records,
            false,
            numFilter,
            textFilter,
            stateFilter
        )
    }
}