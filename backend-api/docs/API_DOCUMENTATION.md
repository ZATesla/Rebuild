# API Documentation - Flow Definitions

This document outlines the CRUD API endpoints for managing flow definitions.

**Base Path:** `/api/flows`

**Note:** These are initial endpoint stubs. Further details such as full request/response schemas, authentication, and more detailed error handling will be specified in future updates.

---

## Flow Definition Endpoints

### 1. Create a new Flow Definition

-   **Method:** `POST`
-   **Endpoint:** `/api/flows`
-   **Description:** Creates a new flow definition.
-   **Request Body:**
    -   `Content-Type: application/json`
    ```json
    {
      "name": "string (required)",
      "diagram": "object (optional, JSON representing the flow structure)"
    }
    ```
-   **Success Response:**
    -   Code: `201 Created`
    -   Body: The created flow object.
    ```json
    {
      "message": "Flow created (stub)",
      "data": {
        "id": "generated_flow_id",
        "name": "My New Flow",
        "diagram": {
          "nodes": []
        }
        // ... other properties
      }
    }
    ```
-   **Error Response:**
    -   Code: `400 Bad Request` (e.g., if validation for `name` fails)
    ```json
    {
      "errors": [
        {
          "type": "field",
          "value": "",
          "msg": "Flow name is required",
          "path": "name",
          "location": "body"
        }
      ]
    }
    ```

### 2. Retrieve all Flow Definitions

-   **Method:** `GET`
-   **Endpoint:** `/api/flows`
-   **Description:** Retrieves a list of all flow definitions.
-   **Request Body:** None
-   **Success Response:**
    -   Code: `200 OK`
    -   Body: An array of flow objects.
    ```json
    {
      "message": "All flows retrieved (stub)",
      "data": [
        {
          "id": "flow_id_1",
          "name": "Flow 1",
          "diagram": {}
          // ... other properties
        },
        {
          "id": "flow_id_2",
          "name": "Flow 2",
          "diagram": {}
          // ... other properties
        }
      ]
    }
    ```
-   **Error Response:** None explicitly defined for stub (future: e.g., authentication errors).

### 3. Retrieve a specific Flow Definition

-   **Method:** `GET`
-   **Endpoint:** `/api/flows/:id`
-   **Description:** Retrieves a specific flow definition by its ID.
-   **Parameters:**
    -   `id` (string, URL parameter): The ID of the flow to retrieve.
-   **Request Body:** None
-   **Success Response:**
    -   Code: `200 OK`
    -   Body: The flow object.
    ```json
    {
      "message": "Flow retrieved (stub)",
      "data": {
        "id": "flow_id_1",
        "name": "Flow 1",
        "diagram": {}
        // ... other properties
      }
    }
    ```
-   **Error Response:**
    -   Code: `404 Not Found` (If the flow with the given ID doesn't exist. Note: Current stub may not fully implement this specific error for all cases).

### 4. Update an existing Flow Definition

-   **Method:** `PUT`
-   **Endpoint:** `/api/flows/:id`
-   **Description:** Updates an existing flow definition.
-   **Parameters:**
    -   `id` (string, URL parameter): The ID of the flow to update.
-   **Request Body:**
    -   `Content-Type: application/json`
    -   JSON object with fields to update. `name` and `diagram` are common.
    ```json
    {
      "name": "string (optional)",
      "diagram": "object (optional, JSON representing the flow structure)"
    }
    ```
-   **Success Response:**
    -   Code: `200 OK`
    -   Body: The updated flow object.
    ```json
    {
      "message": "Flow updated (stub)",
      "data": {
        "id": "flow_id_1",
        "name": "Updated Flow Name",
        "diagram": {
          "nodes": ["updated_node"]
        }
        // ... other properties
      }
    }
    ```
-   **Error Response:**
    -   Code: `400 Bad Request` (e.g., if validation for `name`, if provided, fails).
    -   Code: `404 Not Found` (If the flow with the given ID doesn't exist. Note: Current stub may not fully implement this).

### 5. Delete a Flow Definition

-   **Method:** `DELETE`
-   **Endpoint:** `/api/flows/:id`
-   **Description:** Deletes a specific flow definition by its ID.
-   **Parameters:**
    -   `id` (string, URL parameter): The ID of the flow to delete.
-   **Request Body:** None
-   **Success Response:**
    -   Code: `200 OK` (often with a confirmation message) or `204 No Content`. Current stub returns `200 OK`.
    ```json
    {
      "message": "Flow deleted (stub)",
      "data": {
        "success": true,
        "message": "Flow <id> deleted successfully"
      }
    }
    ```
    (Alternatively, a `204 No Content` response would have an empty body).
-   **Error Response:**
    -   Code: `404 Not Found` (If the flow with the given ID doesn't exist. Note: Current stub may not fully implement this).

---

**Future Enhancements:**
- Detailed request/response schemas (e.g., using OpenAPI specification).
- Authentication and authorization mechanisms (e.g., JWT-based).
- More granular error codes and messages.
- Pagination for list endpoints.
- Filtering and sorting options for list endpoints.

---

## Future Security Considerations

-   **Authentication:** The current API endpoints are not protected by any authentication mechanism. In a production environment, standard authentication (e.g., JWT, OAuth2) will be required to ensure that only authorized users can access the API.
-   **Authorization:** Granular authorization will be needed to control what actions authenticated users can perform (e.g., specific users might only be allowed to read flow definitions, while others can create or modify them).
-   **Input Sanitization:** While basic validation is in place, comprehensive input sanitization should be reviewed and enhanced to prevent injection attacks (e.g., SQL injection, NoSQL injection, XSS if any part of the data is rendered).
-   **Rate Limiting and Other Protections:** Consider implementing rate limiting, security headers (like Helmet.js), and other middleware to protect against common web vulnerabilities and abuse.
