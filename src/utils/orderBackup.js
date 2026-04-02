// Order Backup System - WhatsApp + LocalStorage + Email

/**
 * Save order to localStorage as backup
 */
export const saveOrderLocally = (orderData) => {
  try {
    const orders = JSON.parse(localStorage.getItem('pending_orders') || '[]');
    const order = {
      ...orderData,
      id: 'local_' + Date.now(),
      status: 'pending_sync',
      created_at: new Date().toISOString(),
      backup_method: 'localStorage'
    };
    orders.push(order);
    localStorage.setItem('pending_orders', JSON.stringify(orders));
    console.log('✅ Order saved locally:', order);
    return order;
  } catch (error) {
    console.error('❌ Failed to save order locally:', error);
    return null;
  }
};

/**
 * Get all pending orders from localStorage
 */
export const getPendingOrders = () => {
  try {
    return JSON.parse(localStorage.getItem('pending_orders') || '[]');
  } catch (error) {
    console.error('Error reading pending orders:', error);
    return [];
  }
};

/**
 * Clear pending orders after successful sync
 */
export const clearPendingOrders = () => {
  localStorage.removeItem('pending_orders');
};

/**
 * Send order via WhatsApp
 */
export const sendOrderViaWhatsApp = (orderData) => {
  try {
    const phoneNumber = '919270295943'; // Your WhatsApp number
    
    const message = `
🛒 *NEW ORDER* 🛒

👤 *Customer Details:*
Name: ${orderData.name}
Phone: ${orderData.phone}
Address: ${orderData.address}

📦 *Product Details:*
Product: ${orderData.product_title}
Product ID: ${orderData.product_id}
Quantity: ${orderData.quantity || 1}
Amount: ₹${orderData.total_amount}

⏰ *Order Time:*
${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

📝 *Note:* This order was sent via WhatsApp backup system.

---
SSKCW - Shree Samarth Krupa Centre Wada
    `.trim();

    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    
    console.log('📱 Opening WhatsApp with order details...');
    window.open(whatsappUrl, '_blank');
    
    return true;
  } catch (error) {
    console.error('❌ Failed to send via WhatsApp:', error);
    return false;
  }
};

/**
 * Send order via Email (using mailto)
 */
export const sendOrderViaEmail = (orderData) => {
  try {
    const email = 'adityaghoghari01@gmail.com'; // Your email
    
    const subject = `New Order - ${orderData.product_title}`;
    
    const body = `
NEW ORDER RECEIVED

Customer Details:
-----------------
Name: ${orderData.name}
Phone: ${orderData.phone}
Address: ${orderData.address}

Product Details:
----------------
Product: ${orderData.product_title}
Product ID: ${orderData.product_id}
Quantity: ${orderData.quantity || 1}
Amount: ₹${orderData.total_amount}

Order Time:
-----------
${new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' })}

Note: This order was sent via Email backup system.

---
SSKCW - Shree Samarth Krupa Centre Wada
    `.trim();

    const mailtoUrl = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    console.log('📧 Opening email client with order details...');
    window.location.href = mailtoUrl;
    
    return true;
  } catch (error) {
    console.error('❌ Failed to send via Email:', error);
    return false;
  }
};

/**
 * Complete backup system - tries all methods
 */
export const backupOrder = async (orderData) => {
  console.log('🔄 Starting backup process for order...');
  
  const results = {
    localStorage: false,
    whatsapp: false,
    email: false
  };

  // 1. Save to localStorage
  const localOrder = saveOrderLocally(orderData);
  results.localStorage = !!localOrder;

  // 2. Send via WhatsApp
  results.whatsapp = sendOrderViaWhatsApp(orderData);

  // 3. Send via Email (optional - user can choose)
  // Uncomment if you want automatic email
  // results.email = sendOrderViaEmail(orderData);

  console.log('✅ Backup results:', results);
  
  return results;
};

/**
 * Retry syncing pending orders to API
 */
export const retryPendingOrders = async (createOrderFn) => {
  const pendingOrders = getPendingOrders();
  
  if (pendingOrders.length === 0) {
    console.log('No pending orders to sync');
    return { success: true, synced: 0 };
  }

  console.log(`🔄 Retrying ${pendingOrders.length} pending orders...`);
  
  let synced = 0;
  const failed = [];

  for (const order of pendingOrders) {
    try {
      await createOrderFn(order);
      synced++;
      console.log(`✅ Synced order: ${order.id}`);
    } catch (error) {
      console.error(`❌ Failed to sync order ${order.id}:`, error);
      failed.push(order);
    }
  }

  // Keep only failed orders
  if (failed.length > 0) {
    localStorage.setItem('pending_orders', JSON.stringify(failed));
  } else {
    clearPendingOrders();
  }

  return {
    success: synced > 0,
    synced,
    failed: failed.length,
    total: pendingOrders.length
  };
};

const orderBackupUtils = {
  saveOrderLocally,
  getPendingOrders,
  clearPendingOrders,
  sendOrderViaWhatsApp,
  sendOrderViaEmail,
  backupOrder,
  retryPendingOrders
};

export default orderBackupUtils;
