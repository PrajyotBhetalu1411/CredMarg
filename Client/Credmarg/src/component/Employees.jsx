import { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Table, Alert, Card } from 'react-bootstrap';
import axios from 'axios';

export default function Employees() {
    const [employees, setEmployees] = useState([]);
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [ctc, setCtc] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState(null);

    useEffect(() => {
        // Fetch employees when the component mounts
        axios.get('http://localhost:8085/api/employees')
            .then(response => setEmployees(response.data))
            .catch(error => setError("Error fetching employees"));
    }, []); // Empty dependency array means this effect runs only once, on component mount

    const createEmployee = () => {
        axios.post('http://localhost:8085/api/employees', { name, designation, ctc, email })
            .then(response => setEmployees([...employees, response.data]))
            .catch(error => setError("Error creating employee"));
    };

    return (
        <Container>
            <h1 className="my-4 text-center">Employees</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="justify-content-center mb-4">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h4 className="mb-0">Add Employee</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter name" onChange={e => setName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formDesignation">
                                            <Form.Label>Designation</Form.Label>
                                            <Form.Control type="text" placeholder="Enter designation" onChange={e => setDesignation(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="formCtc">
                                            <Form.Label>CTC</Form.Label>
                                            <Form.Control type="number" placeholder="Enter CTC" onChange={e => setCtc(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" onChange={e => setEmail(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" onClick={createEmployee}>Add Employee</Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h2 className="my-4">Employee List</h2>
            <Table striped bordered hover>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Designation</th>
                        <th>CTC</th>
                        <th>Email</th>
                    </tr>
                </thead>
                <tbody>
                    {employees.map(emp => (
                        <tr key={emp.id}>
                            <td>{emp.name}</td>
                            <td>{emp.designation}</td>
                            <td>{emp.ctc}</td>
                            <td>{emp.email}</td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </Container>
    );
}