import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

const Header = (props) => {
    return (
        <Container className="mt-3" style={{marginBottom:'55px',marginLeft:'100px',marginRight:'50px'}}>
            <Row>
                <Col xs={2}>
                    <img src={props.profilePic} alt="Profile" className="img-fluid rounded-circle" style={{ width: '80px', height: '80px' }} />
                </Col>
                <Col xs={8} className="d-flex flex-column justify-content-center">
                    <h2>{props.name}</h2>
                    <p>{props.email}</p>
                    {/* D'autres informations sur le profil peuvent être ajoutées ici */}
                </Col>
                <Col xs={2} className="d-flex align-items-center justify-content-end">
                    <Button variant="primary"><a href='accountsettings'>Edit Profile</a></Button>
                </Col>
            </Row>
            <hr></hr>
            <Row>
                <Col xs={6} style={{marginRight:'1000px'}}>
                    <p><b>Nom:</b> {props.name}</p>
                    <p><b>Email:</b> {props.email}</p>
                    <p><b>Meta Mask :</b> {props.metaMask}</p>
                </Col>
                <Col xs={6}></Col> {/* Colonne vide */}
            </Row>
        </Container>
    );
};

export default Header;
