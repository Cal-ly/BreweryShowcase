import React, { useEffect, useState } from 'react';
import beverageService from '../services/beverageService';
import orderService from '../services/orderService';
import { Button, Table, Form, FormGroup, Label, Input } from 'reactstrap';

function CustomerDashboard() {
    const [beverages, setBeverages] = useState([]);
    const [orderItems, setOrderItems] = useState([]);
    const [orderHistory, setOrderHistory] = useState([]);
    const [quantity, setQuantity] = useState(1);
    const [selectedBeverage, setSelectedBeverage] = useState('');
    const [error, setError] = useState('');

    // Fetch customer's order history
    const fetchOrderHistory = async () => {
        try {
            const response = await orderService.getMyOrders();
            setOrderHistory(response.data);
        } catch (err) {
            setError("Failed to load order history.");
        }
    };

    // Fetch available beverages
    useEffect(() => {
        async function fetchBeverages() {
            try {
                const response = await beverageService.getBeverages();
                setBeverages(response.data);
            } catch (err) {
                setError("Failed to load beverages.");
            }
        }
        fetchBeverages();
    }, []);

    // Call fetchOrderHistory on component mount to load order history
    useEffect(() => {
        fetchOrderHistory();
    }, []);

    // Handle order item addition
    const handleAddOrderItem = () => {
        if (!selectedBeverage) return;
        const beverage = beverages.find(b => b.id === selectedBeverage);
        setOrderItems([...orderItems, { ...beverage, quantity }]);
        setSelectedBeverage('');
        setQuantity(1);
    };

    // Place an order with selected items
    const handlePlaceOrder = async () => {
        try {
            const data = { items: orderItems.map(item => ({ beverageId: item.id, quantity: item.quantity })) };
            await orderService.placeOrder(data);
            setOrderItems([]);
            alert("Order placed successfully!");
            fetchOrderHistory(); // Call fetchOrderHistory after placing an order
        } catch (err) {
            setError("Failed to place order.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Available Beverages</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Size</th>
                    </tr>
                </thead>
                <tbody>
                    {beverages.map(bev => (
                        <tr key={bev.id}>
                            <td>{bev.name}</td>
                            <td>${bev.price}</td>
                            <td>{bev.size}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            <h3 className="mt-5">Place an Order</h3>
            <Form inline>
                <FormGroup>
                    <Label for="beverageSelect">Beverage</Label>
                    <Input
                        type="select"
                        id="beverageSelect"
                        value={selectedBeverage}
                        onChange={(e) => setSelectedBeverage(e.target.value)}
                    >
                        <option value="">Select a beverage</option>
                        {beverages.map(bev => (
                            <option key={bev.id} value={bev.id}>{bev.name}</option>
                        ))}
                    </Input>
                </FormGroup>
                <FormGroup>
                    <Label for="quantityInput" className="ml-3">Quantity</Label>
                    <Input
                        type="number"
                        id="quantityInput"
                        value={quantity}
                        min="1"
                        onChange={(e) => setQuantity(e.target.value)}
                    />
                </FormGroup>
                <Button className="ml-3" onClick={handleAddOrderItem}>Add Item</Button>
            </Form>

            <Button className="mt-3" color="primary" onClick={handlePlaceOrder}>Place Order</Button>

            <h3 className="mt-5">Order History</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th>Order ID</th>
                        <th>Date</th>
                        <th>Status</th>
                        <th>Total Amount</th>
                    </tr>
                </thead>
                <tbody>
                    {orderHistory.map(order => (
                        <tr key={order.id}>
                            <td>{order.id}</td>
                            <td>{new Date(order.orderDate).toLocaleDateString()}</td>
                            <td>{order.status}</td>
                            <td>${order.totalAmount}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {error && <p className="text-danger">{error}</p>}
        </div>
    );
}

export default CustomerDashboard;
