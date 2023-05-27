export interface Payroll {
    payrollId: Number
    employeeId: Number
    periodStart: Date
    periodEnd: Date
    totalEarned: Number
    totalDeducted: Number
    totalToPay: Number
}

export interface PayrollApi{
    data: any
    totalRecords: number
}

