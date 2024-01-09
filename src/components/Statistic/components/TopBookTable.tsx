import { Button, Table, TableCaption, TableContainer, Tbody, Td, Th, Thead, Tr } from "@chakra-ui/react"
import BookModel from "../../../models/BookModel";
import { Card } from "react-bootstrap";

type TopBookData = {
    book: BookModel,
    revenue: number,
    sold: number;
}

enum OrderBy {
    REVENUE,
    SOLD
}

export const TopBookTable: React.FC<{ listTopBook: TopBookData[],orderBy:OrderBy, setOrderBy: Function }> = (props) => {

    const handleOnClickRevenue = () => {
        props.setOrderBy(OrderBy.REVENUE);
    }
    const handleOnClickSold = () => {
        props.setOrderBy(OrderBy.SOLD);
    }
    return (
        <Card className="p-0">
            <TableContainer className="mt-3">
                <Table variant={'simple'} size={'sm'} textAlign={'center'}>
                    <Thead>
                        <Tr>
                            <Th className="pe-1"><Button variant={'none'}>Title</Button></Th>
                            <Th className="pe-1" onClick={handleOnClickRevenue}><Button textColor={'black'} colorScheme={props.orderBy == OrderBy.REVENUE ? "whiteAlpha":"none"} size={'md'}>Revenue</Button></Th>
                            <Th className="pe-1" onClick={handleOnClickSold}><Button textColor={'black'} colorScheme={props.orderBy == OrderBy.SOLD ? "whiteAlpha":"none"} size={'md'}>Sold</Button></Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {props.listTopBook.map((item, idx) => {
                            return (
                                <Tr key={idx}>
                                    <Td className="pe-1">{item.book.title}</Td>
                                    <Td className="pe-1">${item.revenue}</Td>
                                    <Td className="pe-1">{item.sold}</Td>
                                </Tr>
                            )
                        })}
                    </Tbody>
                </Table>
            </TableContainer>
        </Card>
    )
}