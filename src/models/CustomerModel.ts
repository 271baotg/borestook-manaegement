
export class CustomerModel {
  id?: number;
  fullName?: string;
  phoneNumber?: string;
  ranking?: number;
  spent?: number;
  createDate?: Date;
  constructor(id: number, spent: number, phoneNumber: string, fullName: string, ranking: number, createDate: Date ) {
    this.id = id;
    this.spent = spent;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.ranking = ranking;
    this.createDate = createDate;
}
}
