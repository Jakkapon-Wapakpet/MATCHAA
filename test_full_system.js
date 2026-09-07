// MatchA Full-Stack End-to-End System Audit & Verification Suite
// Tests all endpoints, MongoDB Mongoose CRUD operations, validation rules, and aliases

const BASE_URL = 'http://localhost:5000/api';

async function request(endpoint, options = {}) {
  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers
  });
  const text = await res.text();
  let json;
  try {
    json = JSON.parse(text);
  } catch (e) {
    json = { raw: text };
  }
  return { status: res.status, ok: res.ok, body: json };
}

let passed = 0;
let failed = 0;

function assert(condition, testName, details = '') {
  if (condition) {
    console.log(`  ✅ [PASS] ${testName}`);
    passed++;
  } else {
    console.error(`  ❌ [FAIL] ${testName}`);
    if (details) console.error(`     Details: ${details}`);
    failed++;
  }
}

async function runFullAudit() {
  console.log('\n======================================================');
  console.log('🍵 MatchA Full-Stack E2E Audit & Verification Suite');
  console.log('======================================================\n');

  const testSuffix = Date.now().toString().slice(-4);
  const testSKU = `SKU-AUDIT-${testSuffix}`;
  const testUserId = `audit-user-${testSuffix}`;
  const testUserEmail = `audit-${testSuffix}@matcha.vip`;
  let createdProductId = null;
  let createdOrderId = null;
  let createdUserId = null;

  // 1. Health Check
  console.log('--- [1] Server Health & Info ---');
  const healthRes = await request('/health');
  assert(healthRes.status === 200 && healthRes.body.status === 'ok', 'GET /api/health returns 200 OK');

  // 2. Categories
  console.log('\n--- [2] Categories Pipeline ---');
  const catRes = await request('/categories');
  assert(catRes.status === 200 && Array.isArray(catRes.body.data) && catRes.body.data.length >= 4, 'GET /api/categories returns formatted categories');

  // 3. Products Catalog & Query Filters
  console.log('\n--- [3] Products Catalog & Query Filtering ---');
  const prodRes = await request('/products?category=Tops&limit=5');
  assert(prodRes.status === 200 && Array.isArray(prodRes.body.data), 'GET /api/products with category filter');
  assert(prodRes.body.pagination && typeof prodRes.body.pagination.total === 'number', 'GET /api/products returns pagination metadata');

  // 4. Product Validation (Task 10.3 / Failure Cases)
  console.log('\n--- [4] Product Validation (Task 10.3: Price > 0, Name >= 3 chars) ---');
  const invalidProdRes = await request('/products', {
    method: 'POST',
    body: JSON.stringify({
      name: 'X',
      description: 'Too short',
      price: -10,
      quantity: -5,
      tag: 'InvalidTag'
    })
  });
  assert(invalidProdRes.status === 400, 'POST /api/products rejects invalid payload with 400 Bad Request');

  // 5. Product Creation (Task 8.2: Valid Product)
  console.log('\n--- [5] Product Creation (Task 8.2: Valid 6-Field Payload) ---');
  const validProd = {
    id: testSKU,
    name: `MatchA Test Audit Hoodie ${testSuffix}`,
    description: 'A premium heavyweight matcha fleece hoodie for automated system verification',
    price: 95.00,
    quantity: 30,
    date: '2026-09-07',
    tag: 'Outerwear',
    category: 'Outerwear',
    color: 'Matcha Olive',
    colorHex: '#2D5A27',
    fit: 'Boxy Oversized',
    season: 'Autumn'
  };
  const createProdRes = await request('/products', {
    method: 'POST',
    body: JSON.stringify(validProd)
  });
  assert(createProdRes.status === 201 && createProdRes.body.success, 'POST /api/products creates product in MongoDB');
  if (createProdRes.body?.data?._id) createdProductId = createProdRes.body.data._id;

  // 6. Single Product Read (Task 8.1)
  console.log('\n--- [6] Single Product Read (Task 8.1) ---');
  const getSingleRes = await request(`/products/${testSKU}`);
  assert(getSingleRes.status === 200 && getSingleRes.body.data.name === validProd.name, `GET /api/products/${testSKU} returns correct product`);

  // 7. Product Update (Task 8.3)
  console.log('\n--- [7] Product Update (Task 8.3) ---');
  const updateProdRes = await request(`/products/${testSKU}`, {
    method: 'PUT',
    body: JSON.stringify({
      price: 110.00,
      stock: 45
    })
  });
  assert(updateProdRes.status === 200 && updateProdRes.body.data.price === 110 && updateProdRes.body.data.quantity === 45, `PUT /api/products/${testSKU} updates price and stock`);

  // 8. Admin Product Aliases (Sprint 2 Task 6.5 - 6.8)
  console.log('\n--- [8] Admin Product Aliases (Sprint 2 Task 6.5 - 6.8) ---');
  const adminGetRes = await request('/admin/products?limit=5');
  assert(adminGetRes.status === 200 && Array.isArray(adminGetRes.body.data), 'GET /api/admin/products alias works');

  const adminPutRes = await request(`/admin/products/${testSKU}`, {
    method: 'PUT',
    body: JSON.stringify({ stock: 50 })
  });
  assert(adminPutRes.status === 200 && adminPutRes.body.data.quantity === 50, `PUT /api/admin/products/${testSKU} alias updates stock`);

  // 9. Product Deletion (Task 8.4)
  console.log('\n--- [9] Product Deletion (Task 8.4) ---');
  const deleteProdRes = await request(`/products/${testSKU}`, { method: 'DELETE' });
  assert(deleteProdRes.status === 200 && deleteProdRes.body.success, `DELETE /api/products/${testSKU} removes product`);

  // Verify deletion
  const verifyDeleteRes = await request(`/products/${testSKU}`);
  assert(verifyDeleteRes.status === 404, `Verified product ${testSKU} is removed (404 Not Found)`);

  // 10. Cart CRUD (Task 8.5, 8.6, 8.7 & Task 6.1 - 6.4)
  console.log('\n--- [10] Cart Operations (Task 8.5, 8.6, 8.7 & Sprint 2 Task 6.1 - 6.4) ---');
  // Add item
  const cartItemId = `${testSKU}-L-Olive`;
  const addCartRes = await request('/cart', {
    method: 'POST',
    body: JSON.stringify({
      userId: testUserId,
      item: {
        itemId: cartItemId,
        productId: testSKU,
        name: 'MatchA Audit Shirt',
        price: 48.00,
        quantity: 2,
        size: 'L',
        color: 'Olive'
      }
    })
  });
  assert(addCartRes.status === 200 && addCartRes.body.data.items.length > 0, 'POST /api/cart adds item');

  // Read Cart (both query and param style)
  const getCartQueryRes = await request(`/cart?userId=${testUserId}`);
  assert(getCartQueryRes.status === 200 && getCartQueryRes.body.data.items.length > 0, 'GET /api/cart?userId=... returns cart');

  const getCartParamRes = await request(`/cart/${testUserId}`);
  assert(getCartParamRes.status === 200 && getCartParamRes.body.data.items.length > 0, 'GET /api/cart/:userId returns cart');

  // Update Cart Qty
  const updateCartRes = await request(`/cart/${cartItemId}`, {
    method: 'PUT',
    body: JSON.stringify({
      userId: testUserId,
      quantity: 5
    })
  });
  const updatedItem = updateCartRes.body?.data?.items?.find(i => i.itemId === cartItemId);
  assert(updateCartRes.status === 200 && updatedItem?.quantity === 5, 'PUT /api/cart/:itemId updates quantity to 5');

  // Delete Cart Item
  const deleteCartRes = await request(`/cart/${cartItemId}?userId=${testUserId}`, {
    method: 'DELETE'
  });
  assert(deleteCartRes.status === 200 && deleteCartRes.body.data.items.length === 0, 'DELETE /api/cart/:itemId removes item');

  // 11. Orders CRUD (Task 8.5 / Order Flow)
  console.log('\n--- [11] Orders Pipeline (Task 8.5 / Checkout Flow) ---');
  const orderPayload = {
    customer: {
      firstName: 'Audit',
      lastName: 'Tester',
      email: testUserEmail,
      phone: '081-000-9999',
      address: '123 Sukhumvit Road',
      city: 'Bangkok',
      zipCode: '10110'
    },
    items: [
      {
        productId: 'SPR-TOP-001',
        name: 'MatchA Signature Heavyweight Boxy Tee',
        price: 48.00,
        quantity: 2,
        size: 'L',
        color: 'Matcha Earth'
      }
    ],
    subtotal: 96.00,
    discount: 14.40,
    shippingFee: 0,
    total: 81.60,
    paymentMethod: 'visa',
    shippingOption: 'standard'
  };

  const createOrderRes = await request('/orders', {
    method: 'POST',
    body: JSON.stringify(orderPayload)
  });
  assert(createOrderRes.status === 201 && createOrderRes.body.data.orderId, 'POST /api/orders creates order in MongoDB');
  if (createOrderRes.body?.data?.orderId) createdOrderId = createOrderRes.body.data.orderId;

  // List Orders
  const listOrdersRes = await request('/orders');
  assert(listOrdersRes.status === 200 && Array.isArray(listOrdersRes.body.data) && listOrdersRes.body.data.length > 0, 'GET /api/orders lists all orders');

  // Single Order
  if (createdOrderId) {
    const getOrderRes = await request(`/orders/${createdOrderId}`);
    assert(getOrderRes.status === 200 && getOrderRes.body.data.orderId === createdOrderId, `GET /api/orders/${createdOrderId} returns order receipt`);
  }

  // 12. Users CRUD (Task 10.7 / Member Lounge)
  console.log('\n--- [12] Users & Members Pipeline (Task 10.7) ---');
  const userPayload = {
    name: 'Audit Connoisseur',
    email: testUserEmail,
    password: 'securepassword123',
    role: 'Member',
    tier: 'VIP Connoisseur',
    phone: '081-111-2222',
    address: 'MatchA Studio 4B'
  };

  const createUserRes = await request('/users', {
    method: 'POST',
    body: JSON.stringify(userPayload)
  });
  assert(createUserRes.status === 201 && createUserRes.body.data.email === testUserEmail, 'POST /api/users registers user in MongoDB');
  if (createUserRes.body?.data?._id) createdUserId = createUserRes.body.data._id;

  // List Users
  const listUsersRes = await request('/users');
  assert(listUsersRes.status === 200 && Array.isArray(listUsersRes.body.data), 'GET /api/users lists members');

  // Single User
  if (createdUserId) {
    const getUserRes = await request(`/users/${createdUserId}`);
    assert(getUserRes.status === 200 && getUserRes.body.data.email === testUserEmail, `GET /api/users/${createdUserId} returns user`);

    // Update User
    const updateUserRes = await request(`/users/${createdUserId}`, {
      method: 'PUT',
      body: JSON.stringify({ phone: '089-999-7777', tier: 'VIP Connoisseur' })
    });
    assert(updateUserRes.status === 200 && updateUserRes.body.data.phone === '089-999-7777', `PUT /api/users/${createdUserId} updates profile`);

    // Delete User
    const deleteUserRes = await request(`/users/${createdUserId}`, { method: 'DELETE' });
    assert(deleteUserRes.status === 200 && deleteUserRes.body.success, `DELETE /api/users/${createdUserId} removes user`);
  }

  // Summary
  console.log('\n======================================================');
  console.log(`📊 Audit Results: ${passed} PASSED, ${failed} FAILED`);
  console.log('======================================================\n');

  if (failed > 0) {
    process.exit(1);
  } else {
    console.log('🎉 All systems, MongoDB models, CRUD APIs, and validation guardrails are 100% VERIFIED!\n');
  }
}

runFullAudit().catch(err => {
  console.error('Fatal test error:', err);
  process.exit(1);
});
