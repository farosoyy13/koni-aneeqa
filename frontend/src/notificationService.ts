// خدمة إرسال التنبيهات لمالك أناقة CHIC لحماية قاعدة البيانات من الامتلاء
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

    // ربط فوري ومجاني عبر الـ Webhook (لا يستهلك قاعدة بيانات الموقع)
    const response = await fetch('YOUR_FREE_WEBHOOK_URL_HERE', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: message })
    });

    return true;
  } catch (error) {
    console.error("فشل إرسال التنبيه الخارجي:", error);
    return false;
  }
};
