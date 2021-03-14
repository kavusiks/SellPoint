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

## POST ad/create/

Create an ad

### Request

```json
{
  "title": "test",
  "description": "test",
  "price": 100
  }
```

### Response

```json
{
    "id": 1,
    "owner": {
        "email": "test@test.org",
        "first_name": "test",
        "last_name": "test",
        "phone_number": "98989898"
    },
    "thumbnail": null,
    "images": [],
    "title": "test",
    "description": "test",
    "price": 100,
    "created_at": "2021-03-11T22:40:10.507173Z",
    "last_modified": "2021-03-11T22:40:10.507208Z",
    "is_sold": false,
    "category": null
}
```

## GET ad/$id/

Return the ad with given id

### Response

```json
{
    "id": 1,
    "owner": {
        "email": "test@test.no",
        "first_name": "test",
        "last_name": "test",
        "phone_number": "98989898"
    },
    "thumbnail": null,
    "images": [],
    "title": "test",
    "description": "test",
    "price": 100,
    "created_at": "2021-03-11T22:40:10.507173Z",
    "last_modified": "2021-03-11T22:40:10.507208Z",
    "is_sold": false,
    "category": null
}
```

## PUT ad/$id/update/

Update the ad with given id

### Request

```json
{
  "title": "test",
  "description": "test",
  "price": "100"
  }
```

### Response

```json
{
  "title": "test",
  "description": "test",
  "price": "100",
  "category": null
  }
```

## GET ad/list/

Return a list of all ads

### Response

```json
[{
    "id": 1,
    "owner": {
        "email": "test@test.no",
        "first_name": "test",
        "last_name": "test",
        "phone_number": "98989898"
    },
    "thumbnail": null,
    "images": [],
    "title": "test",
    "description": "test",
    "price": 100,
    "created_at": "2021-03-11T22:40:10.507173Z",
    "last_modified": "2021-03-11T22:40:10.507208Z",
    "is_sold": false,
    "category": null
},
  {
    "id": 2,
    "owner": {
        "email": "admin@admin.no",
        "first_name": "test",
        "last_name": "test",
        "phone_number": "98989898"
    },
    "thumbnail": null,
    "images": [],
    "title": "test",
    "description": "test",
    "price": 100,
    "created_at": "2021-03-11T22:40:10.507173Z",
    "last_modified": "2021-03-11T22:40:10.507208Z",
    "is_sold": true,
    "category": null
}
  ]

```

## GET ad/list/not-sold/

Return a list of not sold ads

### Response

The same as `ad/list/`, but filtered on `is_sold = False`.

## GET ad/list/self

Return a list with all the ads created by user logged in

### Response

```json
[
  {
    "id": 1,
    "owner": {
        "email": "test@test.no",
        "first_name": "test",
        "last_name": "test",
        "phone_number": "98989898"
    },
    "thumbnail": null,
    "images": [],
    "title": "test",
    "description": "test",
    "price": 100,
    "created_at": "2021-03-11T22:40:10.507173Z",
    "last_modified": "2021-03-11T22:40:10.507208Z",
    "is_sold": false,
    "category": null
},
{
    "id": 2,
    "owner": {
        "email": "test@test.no",
        "first_name": "test",
        "last_name": "test",
        "phone_number": "98989898"
    },
    "thumbnail": null,
    "images": [],
    "title": "test 1",
    "description": "test 1",
    "price": 100,
    "created_at": "2021-03-11T22:40:10.507173Z",
    "last_modified": "2021-03-11T22:40:10.507208Z",
    "is_sold": false,
    "category": null
}
]
```

## POST ad/create/image/$id/

Create an image

### Request

```json
{
  "image": "FILE.IMAGE",
  "ad": 1, 
  "description": "test"
}
```

### Response

```json
{
    "id": 1,
    "url": "http://localhost:8000/ad/image/1/",
    "description": "Test"
}
```

## GET ad/image/$id/

Return the image with given id

### Response

Returns `image/jpeg`

