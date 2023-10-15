import React from 'react';
import { useEffect, useState } from "react";
import BookModel from "../../../../models/BookModel";
import styled from "styled-components";
import st from '../../style/bill-style.module.css';
import { BillFooter } from './BillFooter';
import BillItemModel from '../../../../models/BillItemModel';
import BillModel from '../../../../models/BillModel';
import { BillItem } from './BillItem';
import { BookList } from '../Book/BookList';
import { BillList } from './BillList';

export const Bill: React.FC<{ checkedBookList: BookModel[]}> = (props) => {
    const temp: BillItemModel[] = [];
    const billItems : BillItemModel[] = [];
    props.checkedBookList.map((data)=> {billItems.push(new BillItemModel(data, 1, 0))});
    


    const checkOut = () => {
        console.log(billItems);
    }

    const setQuantity = (id: number, quantity: number) =>{
        
        for(let i: number = 0; i < billItems.length; i++){
            if(billItems[i].book.id ===id){
                billItems[i].quantity = quantity;
                console.log(billItems[i]);
                break;
            }
        }
    }

    return (
        <div className={st.billContainer}>
            <BillList billItem={billItems} setQuantity={setQuantity}></BillList>
            <BillFooter></BillFooter>
        </div>
    );
}