class CustomerModel{
    id: number;
    spent: number;
    phoneNumber: string;
    fullName: string;
    ranking: number;
    createDate: string;


    constructor(id: number, spent: number, phoneNumber: string, fullName: string, ranking: number, createDate: string ) {
        this.id = id;
        this.spent = spent;
        this.phoneNumber = phoneNumber;
        this.fullName = fullName;
        this.ranking = ranking;
        this.createDate = createDate;
    }
}

export default CustomerModel;