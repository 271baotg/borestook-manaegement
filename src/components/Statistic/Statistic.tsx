import React, { useEffect, useState } from "react";
import {
  Table,
  TableCaption,
  TableContainer,
  TagLabel,
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
import { YearRevenueChart } from "./components/YearRevenueChart";
import { TopBookTable } from "./components/TopBookTable";

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

type TopBookData = {
  book: BookModel,
  revenue: number,
  sold: number;
}

enum OrderBy {
  REVENUE,
  SOLD
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
  //TOP BOOK TABLE STATES
  const [listTopBook, setListTopBook] = useState<TopBookData[]>([]);
  const [orderBy, setOrderBy] = useState<OrderBy>(OrderBy.REVENUE);


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
  //useEffect get top book
  useEffect(() => {
    const getTopBook = async () => {
      try {
        const orderBySoldURL = 'top-sold-book';
        const orderByRevenueURL = 'top-revenue-book';

        const url = `http://localhost:8081/orders/${orderBy === OrderBy.SOLD ? orderBySoldURL : orderByRevenueURL}`

        const response: TopBookData[] = await axiosPrivate.get(url, { params: { "limit": 10 } })

        if (response !== undefined) {
          setListTopBook(response);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getTopBook();
  }, [])



  //useEffect get top book
  useEffect(() => {
    const getTopBook = async () => {
      try {
        const orderBySoldURL = 'top-sold-book';
        const orderByRevenueURL = 'top-revenue-book';
        const url = `http://localhost:8081/orders/${orderBy === OrderBy.SOLD ? orderBySoldURL : orderByRevenueURL}`
        const response: TopBookData[] = await axiosPrivate.get(url, { params: { "limit": 10 } })


        console.log(response);
        if (response !== undefined) {
          setListTopBook(response);
        }
      } catch (e) {
        console.log(e);
      }
    }
    getTopBook();
  }, [orderBy])


  return (
    <Container fluid className="p-5 pt-2">
      <Card className="p-2">
        <Row className="d-block d-sm-flex">
          <Col className="pt-1 pt-sm-0">
            <CompareTwoValuesBoxWithArrow
              lable={'Month Revenue'}
              currentValue={revenueCurrentMonth}
              oldValue={revenueLastMonth}
              icon={<i className="fa-solid fa-money-bill-transfer fa-2xl"></i>} />
          </Col>
          <Col className="pt-1 pt-sm-0">
            <CompareTwoValuesBoxWithArrow icon={<i className="fa-solid fa-user fa-2xl"></i>} lable={'New Customer'} currentValue={createdCusCurrentMonth} oldValue={createdCusLastMonth} />
          </Col>
          <Col className="pt-1 pt-sm-0">
            <CompareTwoValuesBoxWithArrow icon={<i className="fa-solid fa-cart-arrow-down fa-2xl "></i>} lable={'Order'} currentValue={createdOrderCurrentMonth} oldValue={createdOrderLastMonth} />
          </Col>
        </Row>
        <Row className="mt-2 h-100">
          <Col lg={8} md={7} sm={12}>
            <h2></h2>
            <h3> <i className="fa-solid fa-chart-line fa-xl"></i> Year Revenue</h3>
            <YearRevenueChart yearRevenue={yearRevenue} />
          </Col>
          <Col lg={4} md={5} className="mt-2">
            {/* Table UI from Charkra */}
            <h3><i className="fa-solid fa-book fa-xl"></i>{` Top Book`}</h3>
            <TopBookTable listTopBook={listTopBook} orderBy={orderBy} setOrderBy={setOrderBy} />
          </Col>
        </Row>
      </Card>
    </Container>

  );
};

export default Statistic;
