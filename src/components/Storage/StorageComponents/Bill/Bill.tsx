import React from 'react';
import st from '../../style/bill-style.module.css';
import { BillFooter } from './BillFooter';
import BillItemModel from '../../../../models/BillItemModel';
import { BillList } from './BillList';

// export const Bill: React.FC<{ checkedBookList: BookModel[]}> = (props) => {
//     const temp: BillItemModel[] = [];
//     const billItems : BillItemModel[] = [];
//     props.checkedBookList.map((data)=> {billItems.push(new BillItemModel(data, 1, 0))});
    


//     const checkOut = () => {
//         console.log(billItems);
//     }

//     const setQuantity = (id: number, quantity: number) =>{
        
//         for(let i: number = 0; i < billItems.length; i++){
//             if(billItems[i].book.id ===id){
//                 billItems[i].quantity = quantity;
//                 console.log(billItems[i]);
//                 break;
//             }
//         }
//     }

//     return (
//         <div className={st.billContainer}>
//             <BillList billItem={billItems} setQuantity={setQuantity}></BillList>
//             <BillFooter></BillFooter>
//         </div>
//     );
// }

export const Bill: React.FC<{ billItems: BillItemModel[], setQuantity:Function, checkOut:Function, removeBillItem: Function}> = (props) => {
    return (
        <div className={`${st.billContainer} card`}>
            <BillList billItem={props.billItems} setQuantity={props.setQuantity} removeBillItem={props.removeBillItem}></BillList>
            <BillFooter checkOut={props.checkOut} billItem={props.billItems}></BillFooter>
        </div>
    );
}