# Endpoints

## GET /admin

Administration panel endpoint

## POST /auth/token/

Authentication endpoint for retrieving a set of access tokens using username and password.

### Request

Accepts `application/json`.

```json
{
  "email": "your@email.com",
  "password": "password"
}
```

### Response

Returns a JWT access and refresh token on the form

```json
{
  "refresh": "REFRESH.TOKEN",
  "access": "ACCESS.TOKEN"
}
```

Refresh token is valid for 90 days, access token is valid for 30 minutes.

## POST /auth/refresh/

Authentication endpoint for refreshing your access token when it expires using the refresh token from `/auth/token/`.

### Request

Accepts `application/json`.

```json
{
  "refresh": "REFRESH.TOKEN"
}
```

### Response

Returns a new JWT access token valid for 30 minutes.

```json
{
  "access": "ACCESS.TOKEN"
}
```

## POST /auth/register/

Register a new user

### Request

```json
{
  "email": "your@email.com",
  "first_name": "First Name",
  "last_name": "Last Name",
  "phone_number": "+4799999999",
  "password": "Password",
  "address": {
    "line1": "Address line 1",
    "line2": "Address line 2 (Optional)",
    "postalcode": "1234",
    "city": "City",
    "country": "Country"
  }
}
```

### Response

```json
{
  "user": {
    "email": "your@email.com",
    "first_name": "First Name",
    "last_name": "Last Name",
    "phone_number": "+4799999999",
    "last_login": null,
    "address": {
      "line1": "Address line 1",
      "line2": "Address line 2 (Optional)",
      "postalcode": "1234",
      "city": "City",
      "country": "Country"
    }
  },
  "message": "User Created Successfully.  Now perform Login to get your token"
}
```

## GET auth/self/

Fetch information about the currently logged in user.

### Response

```json
{
  "email": "your@email.com",
  "first_name": "First Name",
  "last_name": "Last Name",
  "phone_number": "Phone Number",
  "last_login": "2021-02-17T14:59:08.337785Z",
  "address": {
    "line1": "Address line 1",
    "line2": "Address line 2 (Optional)",
    "postalcode": "1234",
    "city": "City",
    "country": "Country"
  }
}
```
