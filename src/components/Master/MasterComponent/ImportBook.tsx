import { Input, Table, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { cp } from "node:fs";
import { isTypedArray } from "node:util/types";
import Papa from "papaparse";
import { Button, Col, Row } from "react-bootstrap";
import { ImportBookItem } from "./utils/ImportBookItem";


const HEADER_NAME = {
    IndexHeader: "STT",
    BookIdHeader: "BOOK ID",
    BookTitleHeader: "BOOK TITLE",
    PriceHeader: "UNIT PRICE",
    QuantityHeader: "QTY",
    TotalHeader: "TOTAL",
    ProviderHeader:"PROVIDER"
}
export const ImportBook: React.FC<{ userImportList: ImportBookItem[], setUserImportList: Function }> = (props) => {
    const handleImportCSV = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target && e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            console.log(file);
            if (file.type !== 'text/csv') {
                console.log('>>>error file type not test/csv');
                return;
            } else {
                Papa.parse(file, {
                    complete: function (results) {
                        // console.log(this.header);
                        let rawCSV = results.data;
                        console.log("Finished:", rawCSV);
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

    return (
        <Row>
            <Col lg={6}>1</Col>
            <Col>
                <Row>
                    <label className="btn btn-warning" htmlFor="import_input">
                        <i className="fa-solid fa-file-import"></i>
                        IMPORT
                    </label>
                    <input type="file" id="import_input" hidden onChange={handleImportCSV} />
                </Row>
                <Row className="d-flex justify-content-end me-1 mt-4">
                    <Table>
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
                    <Button style={{ width: 'fit-content', }}>APPLY</Button>
                </Row>
            </Col>
        </Row>
    )
}