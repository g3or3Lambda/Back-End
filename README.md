## Water-My-Plants - Back End

### Heroku

https://tt46-plants.herokuapp.com/

## Endpoint Summary

| Method | Endpoint                | Description            |
| ------ | ----------------------- | ---------------------- |
| POST   | /api/register           | Register user          |
| POST   | /api/login              | Login                  |
| GET    | /api/plants             | Get all plants         |
| PUT    | /api/user               | To update a user
| GET    | /api/plants/:id         | Gets plant by id       |
| POST   | /api/plants             | Add a new plant        |
| PUT    | /api/plants/:id         | Edit a plant           |
| DELETE | /api/plants/:id         | Delete a plant         |

## Registration

**POST to /api/register**

```
{
    "username": "string", //required, unique
    "password": "string" //required
    "phoneNumber": "string" //required
}
```

returns an object containing the created user data and a token

## Login

**POST to /api/login**

```
{
    "username": "string", //required
    "password": "string" //required
}
```

\*returns an object containing the username and a token

## View All Plants

**GET from /api/plants**

\*returns an array containing the details of each plant as an object

## View a Specific Plant

**GET from /api/plants/:id**

\*returns an object containing the details of the specified plant

## Adding a Plant

**POST to /api/plants**

```
{
    "nickname": "string",
    "species": "string", //required
    "h2oFrequency": "string", //required
    "instructions": "text", //required
    "user_id": "number" //optional
}
```

\*returns an object showing the details of the newly created plant

## Editing a Plant

**PUT on /api/plants/:id**

\*returns an object with new details if successful

## Deleting a Plant

**DELETE from /api/plants/:id**

\*returns the message "Plant deleted" if successful
