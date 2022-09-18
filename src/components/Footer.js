import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap'
import logo from '../assets/J-P web special_black.png';

const Footer = () => {

    return (
      <footer>
        <Container>
          <Row className="text-center py-3">
            <Col>
              <hr />
              <h1>J&P CANDLES</h1>

              <Col>
                <img src={logo} width="140" height="35" alt="Logo" />
              </Col>
            </Col>
          </Row>
        </Container>
      </footer>
    );

}

export default Footer;