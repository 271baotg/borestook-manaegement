import { ImportDetailModel } from "./ImportDetailModel";

export class ImportModel {
    id?: number;
    create_date?: string;
    total?: number;
    provider: string
    detailList: ImportDetailModel[];
    
    constructor(
        provider: string,
        detailList: ImportDetailModel[]
    ) {
        this.provider = provider;
        this.detailList = detailList;
        let tempTotal = 0;
        detailList.forEach((item) =>{
            tempTotal += item.quantity * item.unitPrice;
        })
        this.total = tempTotal;
    }
    

}