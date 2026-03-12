/**
 * WhatsApp Notification Service
 * 
 * This module handles sending order-related notifications via WhatsApp.
 * Currently uses a console-logging mock, ready for industry-standard API integration 
 * (Twilio, WhatsApp Business API, etc.)
 */

export async function sendWhatsAppNotification(phone: string, message: string) {
  console.log(`[WHATSAPP_NOTIFICATION] Sending to ${phone}: ${message}`);
  
  // In a real implementation, you would call a provider here:
  /*
  const res = await fetch('provider_api_url', {
    method: 'POST',
    body: JSON.stringify({ to: phone, message }),
    headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
  });
  return res.ok;
  */
  
  return true;
}

export function formatOrderConfirmationMessage(orderNumber: string, customerName: string) {
  return `Hello ${customerName}! 👋 
  
Thank you for your purchase from Kumbil. Your order ${orderNumber} has been received and is being processed. 🎁

You can track your order status and trace its origin here: 
https://kumbil.in/track?order=${orderNumber}

Thank you for choosing local and organic! 🌱`;
}
