export interface OrderDetails {
  orderId: string;
  customerName: string;
  customerPhone: string;
  totalAmount: number;
}

export const sendOrderNotification = async (order: OrderDetails): Promise<boolean> => {
  try {
    const message = `
👑 NEW ORDER IN ANAQATY CHIC!
------------------------
Order ID: ${order.orderId}
Customer: ${order.customerName}
Phone: ${order.customerPhone}
Total: ${order.totalAmount} SAR
    `;

    console.log("جاري إرسال التنبيه الخارجي...", message);

    // إرسال التنبية إلى قناة تيليجرام @FA7A0 عبر بوتك الخاص
    const response = await fetch('https://api.telegram.org/bot<YOUR_BOT_TOKEN>/sendMessage', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: '@FA7A0',
        text: message,
        parse_mode: 'Markdown'
      })
    });

    return true;
  } catch (error) {
    console.error("فشل إرسال التنبيه الخارجي:", error);
    return false;
  }
};