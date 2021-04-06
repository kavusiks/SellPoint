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

## GET /auth/user/$id/

Returns the user with the given id

### Response

```json
{
    "email": "user@email.com",
    "first_name": "Firstname",
    "last_name": "Lastname",
    "phone_number": "+4799999998",
    "last_login": null,
    "address": {
        "line1": "Address line1",
        "line2": "Address line2 (optional)",
        "postalcode": "postalcode",
        "city": "City",
        "country": "Country",
        "geocode": {
            "lat": 59.9138688,
            "lng": 10.7522454
        }
    },
    "date_joined": "2021-03-31T22:00:53Z",
    "is_staff": false,
    "id": 2
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

## PUT ad/$id/

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

## DELETE ad/$id/

Delete the ad with given id

## GET ad/list/

Return a list of all ads

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

## GET ad/list-by-user/$id/

Return a list with all the ads created by given user

### Response

```json
{
        "id": 1,
        "owner": {
            "id": 1,
            "email": "user@email.com",
            "first_name": "user",
            "last_name": "account",
            "phone_number": "+4799999999"
        },
        "thumbnail": {
            "id": 1,
            "url": "http://localhost:8000/ad/image/1/",
            "description": null
        },
        "images": [
            {
                "id": 1,
                "url": "http://localhost:8000/ad/image/1/",
                "description": null
            }
        ],
        "distance": -1,
        "title": "dyr",
        "description": "Test1",
        "price": 100,
        "created_at": "2021-04-05T07:45:04.464893Z",
        "last_modified": "2021-04-05T07:45:04.464932Z",
        "is_sold": false,
        "category": 1
    },
    {
        "id": 1,
        "owner": {
            "id": 1,
            "email": "user@email.com",
            "first_name": "user",
            "last_name": "account",
            "phone_number": "+4799999999"
        },
        "thumbnail": {
            "id": 2,
            "url": "http://localhost:8000/ad/image/2/",
            "description": "21 gir"
        },
        "images": [
            {
                "id": 2,
                "url": "http://localhost:8000/ad/image/2/",
                "description": "god som ny"
            },
            {
                "id": 3,
                "url": "http://localhost:8000/ad/image/3/",
                "description": "ubrukt"
            }
        ],
        "distance": -1,
        "title": "Sykkel",
        "description": "Ubrukt sykkel",
        "price": 1000,
        "created_at": "2021-04-05T07:45:47.257834Z",
        "last_modified": "2021-04-05T07:45:47.257927Z",
        "is_sold": false,
        "category": 1
    },
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

## PUT ad/image/$id/

Update the description of an image. Accepts form data "description".

## DELETE ad/image/$id/

Delete the given image.


## GET ad/category/list/

Returns a list of all the possible categories.

### Response

```json
[
    {
        "id": 1,
        "name": "Bil"
    },
    {
        "id": 2,
        "name": "Fritid"
    },
    {
        "id": 3,
        "name": "Dyr"
    }
]
```

## GET ad/category/$id/

Returns the given category.

### Response

```json

{
    "id": 1,
    "name": "Bil"
}
```

## GET ad/favorite/list/

Returns a list of all exisiting favorited ads by user combination.

### Response

```json

[
    {
        "id": 1,
        "user": 7,
        "favorite_ad": 5
    },
        {
        "id": 2,
        "user": 5,
        "favorite_ad": 4
    }
]
```
