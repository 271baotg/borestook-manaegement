import { Hide, Table, Tbody, Td, Th, Thead, Tr, } from "@chakra-ui/react";
import Papa from "papaparse";
import { Button, Card, Col, Row } from "react-bootstrap";
import { ImportBookItem } from "./utils/ImportBookItem";
import { ImportModel } from "../../../models/ImportModel";
import { ImportDetailModel } from "../../../models/ImportDetailModel";
import { useState } from "react";
import st from '../style/import-bookt-styled.module.css';


const HEADER_NAME = {
    IndexHeader: "INDEX",
    BookIdHeader: "BOOK ID",
    BookTitleHeader: "BOOK TITLE",
    PriceHeader: "UNIT PRICE",
    QuantityHeader: "QTY",
    TotalHeader: "TOTAL",
    ProviderHeader: "PROVIDER"
}
export const ImportBook: React.FC<{ importList: ImportModel[], handleApplyImport: Function, userImportList: ImportBookItem[], setUserImportList: Function }> = (props) => {
    const [provider, setProvider] = useState<string>();
    const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];

            if (file.type !== 'text/csv') {
                console.log('>>>error file type not test/csv');
                return;
            } else {
                Papa.parse(file, {
                    complete: function (results) {
                        // console.log(this.header);
                        let rawCSV = results.data;
                        console.log("Finished:", rawCSV);
                        if (Array.isArray(rawCSV[0])) {
                            if (rawCSV[0][0] !== 'PROVIDER') {
                                alert("Provider is missing");
                                return;
                            }
                            setProvider(rawCSV[0][1]);
                        }
                        if (rawCSV) {
                            if (rawCSV.length < 2) {
                                alert("Data is missing");
                                return;
                            }
                            if (Array.isArray(rawCSV[1])) {
                                if (rawCSV[1].length !== 6) {
                                    alert("Data format is wrong");
                                    return;
                                }
                                if (rawCSV[1][0] != HEADER_NAME.IndexHeader
                                    || rawCSV[1][1] != HEADER_NAME.BookIdHeader
                                    || rawCSV[1][2] != HEADER_NAME.BookTitleHeader
                                    || rawCSV[1][3] != HEADER_NAME.PriceHeader
                                    || rawCSV[1][4] != HEADER_NAME.QuantityHeader
                                    || rawCSV[1][5] != HEADER_NAME.TotalHeader
                                ) {
                                    alert("Data header is wrong");
                                    return;
                                }
                            }


                            let finalData: ImportBookItem[] = [];
                            rawCSV.forEach((rowData, idx) => {
                                if (idx > 1) {
                                    if (Array.isArray(rowData)) {
                                        let isMissingProp = false;
                                        rowData.forEach((col) => {
                                            if (col.length == 0) {
                                                isMissingProp = true;
                                                return;
                                            }
                                        })
                                        if (isMissingProp) {
                                            return;
                                        }
                                        let tempObject: ImportBookItem = {
                                            idx: +rowData[0], //thêm dấu cộng để convert string to number
                                            book_id: +rowData[1],
                                            title: rowData[2],
                                            price: +rowData[3],
                                            qty: rowData[4],
                                            total: rowData[5]
                                        }
                                        finalData.push(tempObject);
                                    }
                                }
                            })
                            console.log(finalData);
                            props.setUserImportList(finalData);

                        } else {
                            alert("Can not get data");
                        }
                    }
                });
            }
        }

    }

    const handleOnClickApply = () => {
        if (props.userImportList.length === 0) {
            alert("Please upload file before APPLY");
            return;
        }
        const data: ImportDetailModel[] = props.userImportList.map((item, idx) => {
            return new ImportDetailModel(item.book_id, item.price, item.qty, item.title);
        })
        props.handleApplyImport(data, provider);
    }



    return (
        <Row className="mt-1">
            <Col>
                <Card className="p-3" style={{overflow: 'hidden'}}>
                    <Table style={{ borderRadius: '0.6rem', overflow: "hidden"}}>
                        <Thead>
                            <Tr>
                                <Th>ID</Th>
                                <Th>PROVIDER</Th>
                                <Th>CREATE DATE</Th>
                                <Th>TOTAL</Th>
                            </Tr>
                        </Thead>
                        <Tbody>
                            {props.importList.map((item, idx) => {
                                return (
                                    <Tr key={idx}>
                                        <Td>{item.id}</Td>
                                        <Td>{item.provider}</Td>
                                        <Td>{item.create_date?.slice(0, 10)}</Td>
                                        <Td>{item.total ?? 'NULL'}</Td>
                                    </Tr>
                                )
                            })}

                        </Tbody>
                    </Table>
                </Card>
            </Col>
            <Col>
                <Row>
                    <label className="btn btn-warning" style={{ minHeight: 200 }} htmlFor="import_input">
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%' }}>
                            <h3><i className="fa-solid fa-file-import"></i> IMPORT</h3>

                        </div>
                    </label>
                    <input type="file" id="import_input" hidden onChange={handleImportCSV} />
                </Row>
                <Row className="d-flex justify-content-end me-1 mt-4">
                    {props.userImportList.length === 0 ?
                        <>
                            <h1 style={{ textAlign: 'center' }}><i style={{ color: 'green' }} className={` ${st.animatedHand} fa-regular fa-hand-point-up fa-2xl pb-5 animated-hand`}></i></h1>
                            <h5 style={{ textAlign: 'center' }}>No data has been upload yet! Click here to upload data </h5>
                        </>
                        : <Card className="pt-2">
                            <Table size='md' style={{ borderRadius: '0.6rem', overflow: "hidden", minHeight: 100 }}>
                                <Thead>
                                    <Tr>
                                        <Th>STT</Th>
                                        <Th>BOOK ID</Th>
                                        <Th>TITLE</Th>
                                        <Th>UNIT PRICE</Th>
                                        <Th>QTY</Th>
                                        <Th>TOTAL</Th>
                                    </Tr>
                                </Thead>
                                <Tbody>
                                    {props.userImportList.map((item, idx) => {
                                        return (
                                            <Tr key={idx}>
                                                <Th>{item.idx}</Th>
                                                <Th>{item.book_id}</Th>
                                                <Th>{item.title}</Th>
                                                <Th>{item.price}</Th>
                                                <Th>{item.qty}</Th>
                                                <Th>{item.total}</Th>
                                            </Tr>)
                                    })}

                                </Tbody>
                            </Table>
                            <Card.Footer>
                                <Button onClick={handleOnClickApply} style={{ width: 'fit-content', }}>APPLY</Button>
                            </Card.Footer>
                        </Card>
                    }

                </Row>
            </Col>
        </Row>
    )
}