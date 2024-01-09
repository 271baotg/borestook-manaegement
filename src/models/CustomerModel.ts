export class CustomerModel {
  id?: number;
  fullName?: string;
  phoneNumber?: string;
  ranking?: number;
  spent?: number;
  createDate?: Date;
  constructor(
    fullName: string,
    spent: number,
    phoneNumber: string,
    ranking: number,
    createDate?: Date,
    id?: number
  ) {
    this.id = id;
    this.spent = spent;
    this.phoneNumber = phoneNumber;
    this.fullName = fullName;
    this.ranking = ranking;
    this.createDate = createDate;
  }
}
