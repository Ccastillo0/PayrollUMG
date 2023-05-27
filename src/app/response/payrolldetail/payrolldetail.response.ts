export interface PayrollDetail {
    detailId: Number
    payrollId: Number
    conceptId: Number
    conceptType: string
    amount: Number
}
export interface PayrollDetailApi{
    data: any
    totalRecords: number
}
