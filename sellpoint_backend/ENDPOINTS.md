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