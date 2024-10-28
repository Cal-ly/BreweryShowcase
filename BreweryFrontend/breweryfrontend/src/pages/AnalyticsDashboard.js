// src/pages/AnalyticsDashboard.js
import React, { useEffect, useState } from 'react';
import analyticsService from '../services/analyticsService';
import { Table, Row, Col } from 'reactstrap';
import { Bar, Line, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

function AnalyticsDashboard() {
    const [topBeverages, setTopBeverages] = useState([]);
    const [totalSales, setTotalSales] = useState(0);
    const [topCustomers, setTopCustomers] = useState([]);
    const [monthlyRevenue, setMonthlyRevenue] = useState([]);
    const [salesBySize, setSalesBySize] = useState([]);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchAnalyticsData();
    }, []);

    const fetchAnalyticsData = async () => {
        try {
            const beveragesResponse = await analyticsService.getTopBeverages();
            setTopBeverages(beveragesResponse.data);

            const totalSalesResponse = await analyticsService.getTotalSales();
            setTotalSales(totalSalesResponse.data.totalSales);

            const customersResponse = await analyticsService.getTopCustomers();
            setTopCustomers(customersResponse.data);

            const revenueResponse = await analyticsService.getMonthlyRevenue();
            setMonthlyRevenue(revenueResponse.data);

            const sizeSalesResponse = await analyticsService.getSalesBySize();
            setSalesBySize(sizeSalesResponse.data);
        } catch (err) {
            setError("Failed to load analytics data.");
        }
    };

    // Data for the Top Beverages Bar Chart
    const topBeveragesData = {
        labels: topBeverages.map(b => b.beverageName),
        datasets: [
            {
                label: 'Total Quantity Sold',
                data: topBeverages.map(b => b.totalQuantity),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    // Data for the Monthly Revenue Line Chart
    const monthlyRevenueData = {
        labels: monthlyRevenue.map(rev => `${rev.month}/${rev.year}`),
        datasets: [
            {
                label: 'Monthly Revenue ($)',
                data: monthlyRevenue.map(rev => rev.revenue),
                fill: false,
                backgroundColor: 'rgba(54, 162, 235, 0.6)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 2,
            },
        ],
    };

    // Data for the Sales by Size Pie Chart
    const salesBySizeData = {
        labels: salesBySize.map(size => size.size),
        datasets: [
            {
                label: 'Sales by Size',
                data: salesBySize.map(size => size.totalSales),
                backgroundColor: [
                    'rgba(255, 99, 132, 0.6)',
                    'rgba(54, 162, 235, 0.6)',
                    'rgba(255, 206, 86, 0.6)',
                    'rgba(75, 192, 192, 0.6)',
                    'rgba(153, 102, 255, 0.6)',
                    'rgba(255, 159, 64, 0.6)',
                ],
                borderWidth: 1,
            },
        ],
    };

    return (
        <div className="container mt-5">
            <h2>Analytics Dashboard</h2>

            {error && <p className="text-danger">{error}</p>}

            {/* Row for Charts */}
            <Row className="mt-5">
                {/* Top Beverages Bar Chart */}
                <Col md={6} className="mb-4">
                    <h4>Top Beverages</h4>
                    <div className="chart-container" style={{ height: '400px' }}>
                        <Bar data={topBeveragesData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </Col>

                {/* Monthly Revenue Line Chart */}
                <Col md={6} className="mb-4">
                    <h4>Monthly Revenue Trends</h4>
                    <div className="chart-container" style={{ height: '400px' }}>
                        <Line data={monthlyRevenueData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </Col>

                {/* Sales by Size Pie Chart */}
                <Col md={6} className="mb-4">
                    <h4>Sales by Beverage Size</h4>
                    <div className="chart-container" style={{ height: '400px' }}>
                        <Pie data={salesBySizeData} options={{ responsive: true, maintainAspectRatio: false }} />
                    </div>
                </Col>

                {/* Total Sales */}
                <Col md={6}>
                    <h4>Total Sales</h4>
                    <p><strong>Total Revenue:</strong> ${totalSales.toFixed(2)}</p>
                </Col>
            </Row>

            {/* Top Customers */}
            <h3 className="mt-5">Top Customers</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th>Customer ID</th>
                        <th>Customer Name</th>
                        <th>Total Amount Spent</th>
                    </tr>
                </thead>
                <tbody>
                    {topCustomers.map(cust => (
                        <tr key={cust.customerId}>
                            <td>{cust.customerId}</td>
                            <td>{cust.customerName}</td>
                            <td>${cust.totalSpent.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Monthly Revenue Trends Table */}
            <h3 className="mt-5">Monthly Revenue Trends</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th>Year</th>
                        <th>Month</th>
                        <th>Revenue</th>
                    </tr>
                </thead>
                <tbody>
                    {monthlyRevenue.map(rev => (
                        <tr key={`${rev.year}-${rev.month}`}>
                            <td>{rev.year}</td>
                            <td>{rev.month}</td>
                            <td>${rev.revenue.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Sales by Size Table */}
            <h3 className="mt-5">Sales by Beverage Size</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th>Size</th>
                        <th>Total Sales</th>
                    </tr>
                </thead>
                <tbody>
                    {salesBySize.map(size => (
                        <tr key={size.size}>
                            <td>{size.size}</td>
                            <td>${size.totalSales.toFixed(2)}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default AnalyticsDashboard;
