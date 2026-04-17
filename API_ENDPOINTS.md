# API Endpoints Documentation

## Base URL
```
http://localhost:8000
```

---

## **1. Home Route**
### GET `/`
Shows the homepage with default API Response message.

```bash
curl http://localhost:8000/
```

---

## **2. Test Route** (Verify Server is Running)
### GET `/test`
Returns server status and MongoDB connection info.

```bash
curl http://localhost:8000/test
```

**Response:**
```json
{
  "success": true,
  "message": "Server is working correctly",
  "port": "8000",
  "mongoConnected": true
}
```

---

## **3. GET ALL USERS**
### GET `/api/users`
Fetch all users from the database.

```bash
curl http://localhost:8000/api/users
```

**Response:**
```json
{
  "success": true,
  "totalUsers": 3,
  "data": [
    {
      "_id": "69e1bcab2fd4d34e3be801f3",
      "name": "Superman",
      "email": "superman@example.com",
      "age": 28,
      "hobbies": ["reading"],
      "bio": "developer",
      "userId": "u001",
      "createdAt": "2026-04-17T04:52:59.649Z"
    }
  ],
  "message": "Users retrieved successfully"
}
```

---

## **4. CREATE USER**
### POST `/api/users`
Create a new user in the database.

```bash
curl -X POST http://localhost:8000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Iron Man",
    "email": "ironman@example.com",
    "age": 30,
    "hobbies": ["technology", "building"],
    "bio": "billionaire inventor"
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "69e1bcab2fd4d34e3be801f6",
    "name": "Iron Man",
    "email": "ironman@example.com",
    "age": 30,
    "hobbies": ["technology", "building"],
    "bio": "billionaire inventor",
    "userId": "auto-generated-uuid",
    "createdAt": "2026-04-17T05:00:00.000Z"
  }
}
```

---

## **5. GET USER BY ID**
### GET `/api/users/:id`
Fetch a specific user by their MongoDB ID.

```bash
curl http://localhost:8000/api/users/69e1bcab2fd4d34e3be801f3
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "69e1bcab2fd4d34e3be801f3",
    "name": "Superman",
    "email": "superman@example.com",
    "age": 28,
    "hobbies": ["reading"],
    "bio": "developer",
    "userId": "u001"
  }
}
```

---

## **6. UPDATE USER**
### PUT `/api/users/:id`
Update an existing user by their ID.

```bash
curl -X PUT http://localhost:8000/api/users/69e1bcab2fd4d34e3be801f3 \
  -H "Content-Type: application/json" \
  -d '{
    "age": 29,
    "hobbies": ["reading", "coding"]
  }'
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "69e1bcab2fd4d34e3be801f3",
    "name": "Superman",
    "email": "superman@example.com",
    "age": 29,
    "hobbies": ["reading", "coding"],
    "bio": "developer",
    "userId": "u001"
  }
}
```

---

## **7. DELETE USER**
### DELETE `/api/users/:id`
Delete a user by their ID.

```bash
curl -X DELETE http://localhost:8000/api/users/69e1bcab2fd4d34e3be801f3
```

**Response:**
```json
{
  "success": true,
  "message": "User deleted successfully"
}
```

---

## **FILTER & SEARCH ENDPOINTS**

### **8. TEXT SEARCH**
### GET `/api/users/search?q=<search_term>`
Search users by text in their bio field.

```bash
curl http://localhost:8000/api/users/search?q=developer
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Superman",
      "bio": "developer",
      ...
    }
  ]
}
```

---

### **9. SEARCH BY NAME**
### GET `/api/users/by-name?name=<name>`
Filter users by exact name match.

```bash
curl http://localhost:8000/api/users/by-name?name=Batman
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "69e1bcab2fd4d34e3be801f4",
      "name": "Batman",
      "email": "batman@example.com",
      "age": 35
    }
  ]
}
```

---

### **10. FILTER BY EMAIL AND AGE**
### GET `/api/users/filter?email=<email>&age=<age>`
Filter users by both email and age.

```bash
curl http://localhost:8000/api/users/filter?email=superman@example.com&age=28
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Superman",
      "email": "superman@example.com",
      "age": 28
    }
  ]
}
```

---

### **11. FILTER BY HOBBY**
### GET `/api/users/by-hobby?hobby=<hobby>`
Find users who have a specific hobby.

```bash
curl http://localhost:8000/api/users/by-hobby?hobby=reading
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "name": "Superman",
      "hobbies": ["reading"]
    },
    {
      "name": "Spiderman",
      "hobbies": ["reading"]
    }
  ]
}
```

---

### **12. GROUP BY AGE (AGGREGATION)**
### GET `/api/users/group-by-age`
Get count of users grouped by age.

```bash
curl http://localhost:8000/api/users/group-by-age
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": 22,
      "totalUsers": 1
    },
    {
      "_id": 28,
      "totalUsers": 1
    },
    {
      "_id": 35,
      "totalUsers": 1
    }
  ]
}
```

---

## **SAMPLE DATA**

The database contains 3 sample users (inserted from index-test.js):

```json
[
  {
    "name": "Superman",
    "email": "superman@example.com",
    "age": 28,
    "hobbies": ["reading"],
    "bio": "developer",
    "userId": "u001"
  },
  {
    "name": "Batman",
    "email": "batman@example.com",
    "age": 35,
    "hobbies": ["gaming"],
    "bio": "engineer",
    "userId": "u002"
  },
  {
    "name": "Spiderman",
    "email": "spiderman@example.com",
    "age": 22,
    "hobbies": ["reading"],
    "bio": "designer",
    "userId": "u003"
  }
]
```

---

## **ERROR RESPONSES**

All endpoints return errors in this format:

```json
{
  "success": false,
  "error": "Error message describing what went wrong"
}
```

---

## **NOTES**

- All endpoints except `/test` require a working MongoDB connection
- Sample data was inserted using `node index-test.js`
- To re-insert sample data, run: `node index-test.js`
- Indexes are automatically created on: `name`, `email`, `age`, `hobbies`, `bio` (text), and `userId`
- The `userId` field is auto-generated using UUID v4
- Documents have a TTL (Time To Live) of 3600 seconds (1 hour) and auto-delete
