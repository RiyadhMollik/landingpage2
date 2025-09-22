// Test file to verify the API response structure
// This is just for demonstration - you can delete this file

const exampleApiResponse = {
  "orders": [
    {
      "id": 67,
      "customerName": "Riyadh Mollik",
      "customerAddress": "unknown",
      "customerMobile": "01710090043",
      "customerEmail": "mollikmdriyadh@gmail.com",
      "amount": "5.00",
      "paymentMethod": "eps",
      "paymentId": null,
      "merchantTransactionId": "EPS-1758127140735-846m9s2os",
      "gatewayTransactionId": "5131f3d4-af6c-49f5-82c0-fd9e0ef399be",
      "gateway": "eps",
      "productName": null,
      "paymentStatus": "pending",
      "orderStatus": "processing",
      "createdAt": "2025-09-17T16:38:49.000Z",
      "updatedAt": "2025-09-17T16:39:00.000Z",
      "userId": null,
      "productId": 1,
      "product": {
        "id": 1,
        "name": "সারা বাংলাদেশের মৌজা ম্যাপ",
        "description": "স্ক্যান হয়ে সার্ভারে আসা সব মৌজা ম্যাপ",
        "price": "399.00"
      }
    }
  ],
  "pagination": {
    "currentPage": 1,
    "totalItems": 67,
    "totalPages": 7,
    "itemsPerPage": 10,
    "hasNextPage": true,
    "hasPreviousPage": false
  }
};

console.log('Expected API Response Structure:', exampleApiResponse);