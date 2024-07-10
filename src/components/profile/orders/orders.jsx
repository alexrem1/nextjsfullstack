import userOrders from "@/app/actions/userOrders/userOrders";
import styles from "./orders.module.css";
async function Orders({ userInfo }) {
  const userOrderInfo = await userOrders(userInfo.userId);
  return (
    <div className={styles.container}>
      <h1>User Orders</h1>
      <div className={styles.ordersList}>
        {userOrderInfo.map((order) => (
          <div key={order.id} className={styles.orderCard}>
            <div className={styles.orderDetails}>
              <p>
                <strong>Date:</strong> {order.date}
              </p>
              <p>
                <strong>Name:</strong> {order.name}
              </p>
              <p>
                <strong>Email:</strong> {order.email}
              </p>
              <p>
                <strong>Number:</strong> {order.number}
              </p>
              <p>
                <strong>Shipping Details:</strong> {order.shipping_details}
              </p>
              <p>
                <strong>Order Items:</strong> {order.orderItems}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Orders;
