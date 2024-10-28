import React, { useEffect, useState } from 'react';
import beverageService from '../services/beverageService';
import { Table, Button, Modal, ModalHeader, ModalBody, ModalFooter, Form, FormGroup, Label, Input } from 'reactstrap';

function Beverages() {
    const [beverages, setBeverages] = useState([]);
    const [modal, setModal] = useState(false);           // Controls modal visibility
    const [editMode, setEditMode] = useState(false);     // Toggles between add/edit mode
    const [currentBeverage, setCurrentBeverage] = useState({
        id: '',
        name: '',
        description: '',
        price: '',
        size: ''
    });

    // Fetch beverages on component mount
    useEffect(() => {
        loadBeverages();
    }, []);

    const loadBeverages = async () => {
        try {
            const response = await beverageService.getBeverages();
            setBeverages(response.data);
        } catch (error) {
            console.error("Failed to load beverages:", error);
        }
    };

    // Toggle modal visibility
    const toggleModal = () => {
        setModal(!modal);
        if (!modal) {
            setCurrentBeverage({ id: '', name: '', description: '', price: '', size: '' });
            setEditMode(false);
        }
    };

    // Handle changes in form inputs
    const handleChange = (e) => {
        setCurrentBeverage({ ...currentBeverage, [e.target.name]: e.target.value });
    };

    // Handle save (either add or update)
    const handleSave = async () => {
        if (editMode) {
            // Update existing beverage
            await beverageService.updateBeverage(currentBeverage.id, currentBeverage);
        } else {
            // Add new beverage
            await beverageService.createBeverage(currentBeverage);
        }
        toggleModal();
        loadBeverages();  // Refresh the list after update
    };

    // Set beverage for editing and open modal
    const handleEdit = (bev) => {
        setCurrentBeverage(bev);
        setEditMode(true);
        toggleModal();
    };

    // Delete a beverage
    const handleDelete = async (id) => {
        await beverageService.deleteBeverage(id);
        loadBeverages();  // Refresh the list after deletion
    };

    return (
        <div className="container mt-5">
            <h2>Beverages</h2>
            <Table striped>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Price</th>
                        <th>Size</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {beverages.map(bev => (
                        <tr key={bev.id}>
                            <td>{bev.name}</td>
                            <td>{bev.description}</td>
                            <td>${bev.price}</td>
                            <td>{bev.size}</td>
                            <td>
                                <Button color="warning" size="sm" className="mr-2" onClick={() => handleEdit(bev)}>Edit</Button>
                                <Button color="danger" size="sm" onClick={() => handleDelete(bev.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>

            {/* Add New Beverage Button */}
            <Button color="primary" onClick={toggleModal}>Add New Beverage</Button>

            {/* Modal for Adding and Editing */}
            <Modal isOpen={modal} toggle={toggleModal}>
                <ModalHeader toggle={toggleModal}>{editMode ? 'Edit Beverage' : 'Add New Beverage'}</ModalHeader>
                <ModalBody>
                    <Form>
                        <FormGroup>
                            <Label for="name">Name</Label>
                            <Input type="text" name="name" id="name" value={currentBeverage.name} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="description">Description</Label>
                            <Input type="text" name="description" id="description" value={currentBeverage.description} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="price">Price</Label>
                            <Input type="number" name="price" id="price" value={currentBeverage.price} onChange={handleChange} />
                        </FormGroup>
                        <FormGroup>
                            <Label for="size">Size</Label>
                            <Input type="select" name="size" id="size" value={currentBeverage.size} onChange={handleChange}>
                                <option value="">Select Size</option>
                                <option value="SmallBottle">Small Bottle</option>
                                <option value="MediumBottle">Medium Bottle</option>
                                <option value="LargeBottle">Large Bottle</option>
                                <option value="XLargeBottle">Extra Large Bottle</option>
                                <option value="SmallCan">Small Can</option>
                                <option value="MediumCan">Medium Can</option>
                            </Input>
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

export default Beverages;
