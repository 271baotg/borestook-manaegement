import { Card, Table } from "react-bootstrap";
import { SearchBar } from "../../../SearchBar/SearcherBar";
import customerIcon from '../../../../../../images/customer.png';
import { CustomerModel } from "../../../../../../models/CustomerModel";
import { useEffect, useState } from "react";
import { useDebounce } from "../../../../../../hooks/useDebounce";
import { axiosPrivate } from "../../../../../../api/axios";
import st from '../../../../style/customer-searching-styled.module.css'

export const CustomerSearching: React.FC<{onClickCustomer:Function}> = (props) => {
    const [customerList, setCustomerList] = useState<CustomerModel[]>([]);
    const [customerSearchKeyWord, setCustomerSearchKeyWord] = useState<string>("");
    const customerDebounce = useDebounce<string>(customerSearchKeyWord);
    
    //GET CUSTOMER HERE
    const loadAllCustomer = async () => {
        const url: string = 'http://localhost:8081/customers';
        try {
            const response: CustomerModel[] = await axiosPrivate({
                method: 'get',
                url: url,
            });
            setCustomerList(response);
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        const loadCustomerByQuery = async (query: string) => {
            const url: string = 'http://localhost:8081/customers/search';
            if (query === "" || query === null || query.trim() === "") {
                return;
            }

            try {
                const response: CustomerModel[] = await axiosPrivate({
                    method: 'get',
                    url: url,
                    params: {
                        query: query,
                    }
                })
                setCustomerList(response);
            } catch (error) {
                console.log(error);
            }
        }

        if (customerSearchKeyWord === "") {
            loadAllCustomer();
        }
        loadCustomerByQuery(customerSearchKeyWord);
    }, [customerDebounce])

    //Handle function HERE
    const onClickCustomer = (index:number) =>{
        props.onClickCustomer(customerList[index]);
    }

    return (
        <Card>
            <Card.Header className="d-flex align-items-center">
                <Card.Img variant="left" src={customerIcon} width={30} height='auto'></Card.Img>
                <Card.Title as='h5' className="ms-2">Customer</Card.Title>
            </Card.Header>
            <Card.Body className="p-0">
                <SearchBar searchKeyWord={customerSearchKeyWord} setSeachKeyWord={setCustomerSearchKeyWord}></SearchBar>
                <section className={st.table__body} style={{ overflow: 'auto', maxHeight: 'calc(30vh - 100px)' }}>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Phone</th>
                                <th>Ranking</th>
                                <th>Spent</th>
                            </tr>
                        </thead>
                        <tbody>
                            {customerList.map((cus, idx) => {
                                return (
                                    <tr role="button" key={idx} onClick={()=>onClickCustomer(idx)}>
                                        <td>{cus.fullName}</td>
                                        <td>{cus.phoneNumber}</td>
                                        <td>{cus.ranking}</td>
                                        <td>${cus.spent}</td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </Table>
                </section>
            </Card.Body>
        </Card>
    )
}