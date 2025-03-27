# API Documentation

## User Routes

### Signup

- **Endpoint:** `/signup`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "confirmPassword": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  }
  ```

### Login

- **Endpoint:** `/login`
- **Method:** `POST`
- **Description:** Login a user.
- **Request Body:**
  ```json
  {
    "email": "john@example.com",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "token": "jwt_token"
  }
  ```

### Change Password

- **Endpoint:** `/change-password`
- **Method:** `PATCH`
- **Description:** Change the user's password.
- **Request Body:**
  ```json
  {
    "currentPassword": "password123",
    "newPassword": "newpassword123",
    "confirmNewPassword": "newpassword123"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Password updated successfully"
  }
  ```

### Update User

- **Endpoint:** `/`
- **Method:** `PATCH`
- **Description:** Update user details.
- **Request Body:**
  ```json
  {
    "name": "John Doe Updated"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "id": "user_id",
        "name": "John Doe Updated"
      }
    }
  }
  ```

### Delete User

- **Endpoint:** `/`
- **Method:** `DELETE`
- **Description:** Deactivate the user account.
- **Response:**
  ```json
  {
    "status": "success",
    "message": "User deactivated successfully"
  }
  ```

### Get User

- **Endpoint:** `/:id`
- **Method:** `GET`
- **Description:** Get user details by ID.
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "user": {
        "id": "user_id",
        "name": "John Doe",
        "email": "john@example.com"
      }
    }
  }
  ```

## Image Routes

### Get Image

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Get all images.
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "images": [
        {
          "id": "image_id",
          "title": "Image Title",
          "description": "Image Description",
          "tags": ["tag1", "tag2"]
        }
      ]
    }
  }
  ```

### Create Image

- **Endpoint:** `/`
- **Method:** `POST`
- **Description:** Create a new image.
- **Request Body:**
  ```json
  {
    "title": "Image Title",
    "description": "Image Description",
    "tags": ["tag1", "tag2"]
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "image": {
        "id": "image_id",
        "title": "Image Title",
        "description": "Image Description",
        "tags": ["tag1", "tag2"]
      }
    }
  }
  ```

### Update Image

- **Endpoint:** `/`
- **Method:** `PATCH`
- **Description:** Update an image.
- **Request Body:**
  ```json
  {
    "title": "Updated Image Title"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "image": {
        "id": "image_id",
        "title": "Updated Image Title"
      }
    }
  }
  ```

### Delete Image

- **Endpoint:** `/`
- **Method:** `DELETE`
- **Description:** Delete an image.
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Image deleted successfully"
  }
  ```

## Comment Routes

### Create Comment

- **Endpoint:** `/`
- **Method:** `POST`
- **Description:** Create a new comment.
- **Request Body:**
  ```json
  {
    "image": "image_id",
    "content": "This is a comment"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "comment": {
        "id": "comment_id",
        "content": "This is a comment"
      }
    }
  }
  ```

### Update Comment

- **Endpoint:** `/:id`
- **Method:** `PATCH`
- **Description:** Update a comment.
- **Request Body:**
  ```json
  {
    "content": "Updated comment"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "comment": {
        "id": "comment_id",
        "content": "Updated comment"
      }
    }
  }
  ```

### Delete Comment

- **Endpoint:** `/`
- **Method:** `DELETE`
- **Description:** Delete a comment.
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Comment deleted successfully"
  }
  ```

## Like Routes

### Create Like

- **Endpoint:** `/`
- **Method:** `POST`
- **Description:** Like an image.
- **Request Body:**
  ```json
  {
    "image": "image_id"
  }
  ```
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "like": {
        "id": "like_id",
        "image": "image_id"
      }
    }
  }
  ```

### Get User Likes

- **Endpoint:** `/`
- **Method:** `GET`
- **Description:** Get all likes by the user.
- **Response:**
  ```json
  {
    "status": "success",
    "data": {
      "likes": [
        {
          "id": "like_id",
          "image": "image_id"
        }
      ]
    }
  }
  ```

### Delete Like

- **Endpoint:** `/:id`
- **Method:** `DELETE`
- **Description:** Remove a like.
- **Response:**
  ```json
  {
    "status": "success",
    "message": "Like removed successfully"
  }
  ```
