import React, { useContext } from "react";
import { UserContext } from "../context/user-context";
import { Container, Row, Col } from "react-bootstrap";

export const Profile = () => {
  const { user } = useContext(UserContext);

  return user ? (
    <Container className="mb-5">
      <Row className="align-items-center profile-header mb-5 text-center text-md-left">
        <Col md={2}>
          <img
            src="https://pickaface.net/gallery/avatar/unr_standard_180203_0234_y7cln.png"
            alt={user.usName}
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
        <Col md>
          <pre>
            <h2>User: {user.usName} {user.usLastName}</h2>
          </pre>
          <pre>
            <p className="lead text-muted">Email: {user.usEmail}</p>
          </pre>
          <pre>
            <p className="lead text-muted">Role: {user.usRole}</p>
          </pre>
          <pre>
            <i className="lead text-muted">Powered by</i>
          </pre>
          <img
            src="data:image/png;base64,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"
            alt="FIWARE"
            className="rounded-circle img-fluid profile-picture mb-3 mb-md-0"
          />
        </Col>
      </Row>
    </Container>
  ) : (
    ""
  );
};

export default Profile;
