import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Th,
  Thead,
  Tr
} from "@chakra-ui/react";
import { Card, Col, Container, Row } from "react-bootstrap";
import styled from "styled-components";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Legend,
  Tooltip
} from "chart.js";
import { CompareTwoValuesBoxWithArrow } from "../../utils/components/CompareTwoValuesBoxWithArrow";
import { axiosPrivate } from "../../api/axios";
import BookModel from "../../models/BookModel";
import { useAxiosPrivate } from "../../api/useAxiosHook";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip
)



type MonthlyRevenue = {
  month: number,
  year: number,
  sum: number
}

type CustomerCount = {
  month: number,
  year: number,
  count: number
}

type OrderCount = {
  month: number,
  year: number,
  count: number
}

type MonthlyRevenueByYear = {
  revenue: number[]
}

const Statistic: React.FC<{}> = (props) => {
  const axiosPrivate = useAxiosPrivate();

  //REVENUE STATES
  const [revenueCurrentMonth, setRevenueCurrentMonth] = useState<number>(0);
  const [revenueLastMonth, setRevenueLastMonth] = useState<number>(0);
  //CUSTOMER COUNT STATES
  const [createdCusCurrentMonth, setCreatedCusCurrentMonth] = useState<number>(0);
  const [createdCusLastMonth, setCreatedCusLastMonth] = useState<number>(0);
  //ORDER COUNT STATES
  const [createdOrderCurrentMonth, setCreatedOrderCurrentMonth] = useState<number>(0);
  const [createdOrderLastMonth, setCreatedOrderLastMonth] = useState<number>(0);
  //CHART COUNT STATES
  const [yearRevenue, setYearRevenue] = useState<number[]>([]);


  const labels = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "2021",
        backgroundColor: "rgb(255, 99, 132)",
        borderColor: "rgb(255, 99, 132)",
        data: yearRevenue,
      },

    ],
  };

  //useEffect get revenue
  useEffect(() => {
    const getCurrentMonthRevenue = async () => {
      try {
        const currentDate = new Date();
        const url = `http://localhost:8081/orders/get-revenue-by-month-and-year?month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`;
        const response: MonthlyRevenue = await axiosPrivate.get(
          url
        )
        if (response !== undefined) {
          setRevenueCurrentMonth(response.sum);
        }
      } catch (e) {
        console.log(e);
      }
    }
    const getLastMonthRevenue = async () => {
      try {
        const currentDate = new Date();
        const month = currentDate.getMonth() == 0 ? 12 : currentDate.getMonth();
        const year = currentDate.getMonth() == 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
        const url = `http://localhost:8081/orders/get-revenue-by-month-and-year?month=${month}&year=${year}`;
        const response: MonthlyRevenue = await axiosPrivate.get(
          url
        )
        if (response !== undefined) {
          setRevenueLastMonth(response.sum);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCurrentMonthRevenue();
    getLastMonthRevenue()
  }, []);
  //useEffect get created customers
  useEffect(() => {
    const getCreatedCusCurrentMonth = async () => {
      try {
        const currentDate = new Date();
        const url = `http://localhost:8081/customers/count?month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`;
        const response: CustomerCount = await axiosPrivate.get(
          url
        )

        if (response !== undefined) {
          setCreatedCusCurrentMonth(response.count);
        }
      } catch (e) {
        console.log(e);
      }
    }
    const getCreatedCusLastMonth = async () => {
      try {
        const currentDate = new Date();
        const month = currentDate.getMonth() == 0 ? 12 : currentDate.getMonth();
        const year = currentDate.getMonth() == 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
        const url = `http://localhost:8081/customers/count?month=${month}&year=${year}`;
        const response: CustomerCount = await axiosPrivate.get(
          url
        )
        if (response !== undefined) {
          setCreatedCusLastMonth(response.count);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCreatedCusCurrentMonth();
    getCreatedCusLastMonth();
  }, []);
  //useEffect get created orders
  useEffect(() => {
    const getCreatedOrderCurrentMonth = async () => {
      try {
        const currentDate = new Date();
        const url = `http://localhost:8081/orders/count?month=${currentDate.getMonth() + 1}&year=${currentDate.getFullYear()}`;
        const response: OrderCount = await axiosPrivate.get(
          url
        )

        if (response !== undefined) {
          setCreatedOrderCurrentMonth(response.count);
        }
      } catch (e) {
        console.log(e);
      }
    }
    const getCreatedOrderLastMonth = async () => {
      try {
        const currentDate = new Date();
        const month = currentDate.getMonth() == 0 ? 12 : currentDate.getMonth();
        const year = currentDate.getMonth() == 0 ? currentDate.getFullYear() - 1 : currentDate.getFullYear();
        const url = `http://localhost:8081/orders/count?month=${month}&year=${year}`;
        const response: OrderCount = await axiosPrivate.get(
          url
        )
        if (response !== undefined) {
          setCreatedOrderLastMonth(response.count);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getCreatedOrderCurrentMonth();
    getCreatedOrderLastMonth();
  }, []);
  //useEffect get revenue by year
  useEffect(() => {
    const getMonthlyRevenueByYear = async () => {
      try {
        const year = (new Date()).getFullYear();
        const url = `http://localhost:8081/orders/get-monthly-revenue-by-year`;
        const response: MonthlyRevenueByYear = await axiosPrivate.get(
          url,
          {
            params: { "year": year }
          }
        )

        if (response !== undefined) {
          setYearRevenue(response.revenue);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getMonthlyRevenueByYear();
  }, []);


  return (
    <>
      <Container>
        <Card className="p-2">
          <Row>
            <Col>
              <CompareTwoValuesBoxWithArrow lable={'Month revenue'} currentValue={revenueCurrentMonth} oldValue={revenueLastMonth} />
            </Col>
            <Col>
              <CompareTwoValuesBoxWithArrow lable={'New customer'} currentValue={createdCusCurrentMonth} oldValue={createdCusLastMonth} />
            </Col>
            <Col>
              <CompareTwoValuesBoxWithArrow lable={'Order'} currentValue={createdOrderCurrentMonth} oldValue={createdOrderLastMonth} />
            </Col>
          </Row>
          <Row className="mt-2">
            <Col xs={8}>
              <Line data={data}></Line>
            </Col>
            <Col xs>
              {/* Table UI from Charkra */}
              <TableContainer>
                <Table variant={'simple'} size={'md'} overflow={'auto'}>
                  <TableCaption>This is table caption</TableCaption>
                  <Thead>
                    <Tr>
                      <Th>Title</Th>
                      <Th>Revenue</Th>
                      <Th>Sell</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    <Tr>
                      <Td>Java</Td>
                      <Td>$600</Td>
                      <Td>120</Td>
                    </Tr>
                    <Tr>
                      <Td>GO</Td>
                      <Td>$590</Td>
                      <Td>110</Td>
                    </Tr>
                    <Tr>
                      <Td>C++</Td>
                      <Td>$600</Td>
                      <Td>120</Td>
                    </Tr>
                    <Tr>
                      <Td>Java</Td>
                      <Td>$600</Td>
                      <Td>120</Td>
                    </Tr>
                  </Tbody>
                </Table>
              </TableContainer>
            </Col>
          </Row>
        </Card>
      </Container>
    </>
  );
};

export default Statistic;
