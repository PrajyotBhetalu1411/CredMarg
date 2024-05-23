import { useState, useEffect } from 'react';
import { Button, Form, Container, Row, Col, Table, Alert, Card, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function Vendors() {
    const [vendors, setVendors] = useState([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [upi, setUpi] = useState('');
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        axios.get('http://localhost:8085/api/vendors')
            .then(response => {
                setVendors(response.data);
                setLoading(false);
            })
            .catch(error => {
                setError("Error fetching vendors");
                setLoading(false);
            });
    }, []);

    const createVendor = () => {
        if (!name || !email || !upi) {
            setError("All fields are required");
            return;
        }

        setLoading(true);
        axios.post('http://localhost:8085/api/vendors', { name, email, upi })
            .then(response => {
                setVendors([...vendors, response.data]);
                setName('');
                setEmail('');
                setUpi('');
                setError(null);
                setLoading(false);
            })
            .catch(error => {
                setError("Error creating vendor: " + (error.response ? error.response.data.message : error.message));
                setLoading(false);
            });
    };

    return (
        <Container>
            <h1 className="my-4 text-center">Vendors</h1>
            {error && <Alert variant="danger">{error}</Alert>}
            <Row className="justify-content-center mb-4">
                <Col md={6}>
                    <Card>
                        <Card.Header>
                            <h4 className="mb-0">Add Vendor</h4>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="formName">
                                            <Form.Label>Name</Form.Label>
                                            <Form.Control type="text" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                    <Col>
                                        <Form.Group controlId="formEmail">
                                            <Form.Label>Email</Form.Label>
                                            <Form.Control type="email" placeholder="Enter email" value={email} onChange={e => setEmail(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Row className="mb-3">
                                    <Col>
                                        <Form.Group controlId="formUpi">
                                            <Form.Label>UPI</Form.Label>
                                            <Form.Control type="text" placeholder="Enter UPI" value={upi} onChange={e => setUpi(e.target.value)} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                                <Button variant="primary" onClick={createVendor} disabled={loading}>
                                    {loading ? <Spinner as="span" animation="border" size="sm" /> : "Add Vendor"}
                                </Button>
                            </Form>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <h2 className="my-4">Vendor List</h2>
            {loading ? <Spinner animation="border" /> : (
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Email</th>
                            <th>UPI</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors.map(vendor => (
                            <tr key={vendor.email}>
                                <td>{vendor.name}</td>
                                <td>{vendor.email}</td>
                                <td>{vendor.upi}</td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Container>
    );
}