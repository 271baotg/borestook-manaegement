import { ImportDetailModel } from "./ImportDetailModel";

export class ImportModel {
    id?: number;
    createDate?: string;
    total: number;
    provider: string
    detailList: ImportDetailModel[];
    constructor(
        total: number,
        provider: string,
        detailList: ImportDetailModel[]
    ) {
        this.total = total;
        this.provider = provider;
        this.detailList = detailList;
    }

}