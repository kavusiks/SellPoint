import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Tab, Nav, Col, Row, Button } from "react-bootstrap";
import { AdListView } from "../components/ads/AdListView";
import { ProfileDisplay } from "../components/Profile";
import { CenteredRow, DefaultSpinner } from "../components/styled";
import { useSessionContext } from "../context/Session";
import { Ad } from "../models/ad";
import AdAPI from "../core/api/ad";

interface ProfilePageTabProps {
  title: string;
  children: React.ReactNode;
}

const ProfilePageTab: FunctionComponent<ProfilePageTabProps> = ({ title, children }) => {
  return (
    <Container fluid style={{ margin: "10px 5px 5px 5px", overflow: "auto" }}>
      <h1>{title}</h1>
      <hr />
      {children}
    </Container>
  );
};

const SelfAdsView: FunctionComponent = () => {
  const [items, setItems] = useState<Ad[]>([]);

  useEffect(() => {
    AdAPI.getOwnAds().then((ads) => setItems(ads));
  }, []);

  if (items.length === 0) {
    return (
      <Container>
        <CenteredRow>
          <h3 style={{ color: "lightgray" }}>Du har ikke lagt ut noen annonser</h3>
        </CenteredRow>
        <CenteredRow style={{ marginTop: "30px" }}>
          <Button variant="outline-info" href="/ad/create">
            Lag ny annonse
          </Button>
        </CenteredRow>
      </Container>
    );
  }

  return <AdListView perRow={1} ads={items} self />;
};

const ProfilePage: FunctionComponent = () => {
  const session = useSessionContext();

  // TODO: Include active page in URL

  return (
    <Tab.Container id="profile-tabs" defaultActiveKey="personal">
      <Row noGutters>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column" style={{ margin: "5px" }}>
            <Nav.Item>
              <Nav.Link eventKey="personal">Personlig Info</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="self-ads">Dine Annonser</Nav.Link>
            </Nav.Item>
          </Nav>
        </Col>
        <Col sm={10}>
          <Tab.Content>
            <Tab.Pane eventKey="personal">
              <ProfilePageTab title="Personlig Informasjon">
                {session.user ? <ProfileDisplay user={session.user} /> : <DefaultSpinner />}
              </ProfilePageTab>
            </Tab.Pane>
            <Tab.Pane eventKey="self-ads">
              <ProfilePageTab title="Dine Annonser">
                <SelfAdsView />
              </ProfilePageTab>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ProfilePage;
