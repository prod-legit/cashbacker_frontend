export interface Task {
    id: number;
    brand_id: string; // Brand ID
    clientsFileKey: string; // S3 Link
    open_date: string; // FMT - "YYYY-MM-DD"
    cb_percent: number; // Cashback percentage
    is_completed: boolean;
}

export interface BudgetCalculation {
    gmv: number;
    purchaseCount: number;
    totalCashback: number;
}
