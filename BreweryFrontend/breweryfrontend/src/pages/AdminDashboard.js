// src/pages/AdminDashboard.js
import React, { useEffect, useState } from 'react';
import customerService from '../services/customerService';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

function AdminDashboard() {
    const [customers, setCustomers] = useState([]);
    const [modal, setModal] = useState(false);           // Controls modal visibility
    const [editMode, setEditMode] = useState(false);     // Toggle between add and edit mode
    const [currentCustomer, setCurrentCustomer] = useState({
        id: '',
        name: '',
        email: '',
    });

    const [error, setError] = useState('');

    // Fetch all customers on component mount
    useEffect(() => {
        loadCustomers();
    }, []);

    const loadCustomers = async () => {
        try {
            const response = await customerService.getCustomers();
            setCustomers(response.data);
        } catch (err) {
            setError("Failed to load customers.");
        }
    };

    // Toggle modal for add/edit customer
    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setCurrentCustomer({ id: '', name: '', email: '' });
            setEditMode(false);
        }
    };

    // Handle input changes
    const handleChange = (e) => {
        setCurrentCustomer({ ...currentCustomer, [e.target.name]: e.target.value });
    };

    // Save customer (add or update)
    const handleSave = async () => {
        try {
            if (editMode) {
                // Update existing customer
                await customerService.updateCustomer(currentCustomer.id, currentCustomer);
            } else {
                // Add new customer
                await customerService.createCustomer(currentCustomer);
            }
            toggleModal();
            loadCustomers();
        } catch (err) {
            setError("Failed to save customer.");
        }
    };

    // Set customer to edit mode
    const handleEdit = (customer) => {
        setCurrentCustomer(customer);
        setEditMode(true);
        toggleModal();
    };

    // Delete customer
    const handleDelete = async (id) => {
        try {
            await customerService.deleteCustomer(id);
            loadCustomers();
        } catch (err) {
            setError("Failed to delete customer.");
        }
    };

    return (
        <div className="container mt-5">
            <h2>Admin Dashboard</h2>

            {error && <p className="text-danger">{error}</p>}

            {/* All Customers Section */}
            <h3 className="mt-5">All Customers</h3>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {customers.map(customer => (
                        <tr key={customer.id}>
                            <td>{customer.name}</td>
                            <td>{customer.email}</td>
                            <td>
                                <Button color="warning" size="sm" className="mr-2" onClick={() => handleEdit(customer)}>Edit</Button>
                                <Button color="danger" size="sm" onClick={() => handleDelete(customer.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add New Customer Button */}
            <Button color="primary" onClick={toggleModal}>Add New Customer</Button>

            {/* Modal for Adding and Editing Customers */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>{editMode ? 'Edit Customer' : 'Add New Customer'}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={currentCustomer.name} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="email" name="email" id="email" value={currentCustomer.email} onChange={handleChange} />
                        </FormGroup>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={handleSave}>{editMode ? 'Update' : 'Add'}</Button>{' '}
                    <Button color="secondary" onClick={toggleModal}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </div>
    );
}

export default AdminDashboard;
