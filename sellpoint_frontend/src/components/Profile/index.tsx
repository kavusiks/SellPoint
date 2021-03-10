import React, { FunctionComponent } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { formatDate, LeftCenterRow, LeftTopRow } from "../styled";
import User from "../../models/user";
import default_avatar from "../../static/profile_picture_holder.png";
import "./index.css";

/**
 * Props for a profile field
 */
export interface ProfileFieldProps {
  /**
   * The title of the field, e. g. "Email"
   */
  title: string;
  /**
   * The content of the field, essentially its value
   */
  children?: React.ReactNode;
}

/**
 * Component for a field in a user profile
 *
 * @param props - The props
 */
export const ProfileField: FunctionComponent<ProfileFieldProps> = ({
  title,
  children,
}: ProfileFieldProps) => {
  return (
    <>
      <Row noGutters>
        <Col className="title">
          <p>
            <strong>{title}</strong>
          </p>
        </Col>
        <Col className="value">
          <p>{children}</p>
        </Col>
      </Row>
      <hr style={{ margin: "0" }} />
    </>
  );
};

/**
 * Profile display props
 */
export interface ProfileDisplayProps {
  /**
   * The user that owns this profile
   */
  user: User;
}

/**
 * A component for displaying a {@link User}s profile
 *
 * @param props - The props
 */
export const ProfileDisplay: FunctionComponent<ProfileDisplayProps> = ({
  user,
}: ProfileDisplayProps) => {
  return (
    <LeftTopRow className="profile-display" xs={12}>
      <Col xs={3}>
        <img style={{ width: "100%", height: "auto" }} alt="Profilbilde" src={default_avatar} />
      </Col>

      <Col xs={9}>
        <Container>
          <LeftCenterRow>
            <h2>{user.first_name + " " + user.last_name}</h2>
          </LeftCenterRow>

          <ProfileField title="Email">{user.email}</ProfileField>
          <ProfileField title="Telefonnummer">{user.phone_number}</ProfileField>
          <ProfileField title="Bruker opprettet">{formatDate(user.date_joined)}</ProfileField>
          <ProfileField title="Siste innlogging">{formatDate(user.last_login)}</ProfileField>
          <ProfileField title="Addresse">
            {user.address.line1}
            {user.address.line2 ? (
              <>
                <br /> {user.address.line2}
              </>
            ) : null}
            <br />
            {user.address.postalcode} {user.address.city} {user.address.country}
          </ProfileField>
        </Container>
      </Col>
    </LeftTopRow>
  );
};
