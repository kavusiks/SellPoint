import React, { FunctionComponent, useEffect, useState } from "react";
import { Container, Tab, Nav, Col, Row, Button } from "react-bootstrap";
import { AdListView } from "../components/ads/AdListView";
import { ProfileDisplay } from "../components/Profile";
import { CenteredRow, DefaultSpinner } from "../components/styled";
import { useSessionContext } from "../context/Session";
import { Ad, FavoriteAd } from "../models/ad";
import AdAPI from "../core/api/ad";
import { useParams } from "react-router";

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

const SelfFavoriteAdsView: FunctionComponent = () => {
  const session = useSessionContext();
  const [favItems, setFavItems] = useState<Ad[]>([]);
  const [userId, setUserId] = useState<number>(0);

  useEffect(() => {
    AdAPI.getMyFavoriteAds().then((ads) => setFavItems(ads));
  }, []);
  /*
  useEffect(() => {
    if (session.user?.id) {
      setUserId(session.user.id);
    }
    AdAPI.getAllFavoriteAdsByUserId(userId).then((ads) => setFavItems(ads));
  }, favItems);
  */

  if (favItems.length === 0) {
    return (
      <Container>
        <CenteredRow>
          <h3 style={{ color: "lightgray" }}>Du har ikke lagt til noen favoritter</h3>
        </CenteredRow>
      </Container>
    );
  }

  return <AdListView perRow={1} ads={favItems} />;
};

interface ProfilePageParams {
  page: string;
}

const ProfilePage: FunctionComponent = () => {
  const session = useSessionContext();
  const { page } = useParams<ProfilePageParams>();

  const updateUrl = (key: string | null) => {
    if (!key) {
      return;
    }

    window.history.replaceState(null, "SellPoint", `/profile/${key}`);
  };

  return (
    <Tab.Container id="profile-tabs" defaultActiveKey={page ?? "personal"} onSelect={updateUrl}>
      <Row noGutters>
        <Col sm={2}>
          <Nav variant="pills" className="flex-column" style={{ margin: "5px" }}>
            <Nav.Item>
              <Nav.Link eventKey="personal">Personlig Informasjon</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="ads">Dine Annonser</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="favorites">Dine Favoritter</Nav.Link>
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
            <Tab.Pane eventKey="ads">
              <ProfilePageTab title="Dine Annonser">
                <SelfAdsView />
              </ProfilePageTab>
            </Tab.Pane>
            <Tab.Pane eventKey="favorites">
              <ProfilePageTab title="Dine Favoritter">
                <SelfFavoriteAdsView />
              </ProfilePageTab>
            </Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
  );
};

export default ProfilePage;
