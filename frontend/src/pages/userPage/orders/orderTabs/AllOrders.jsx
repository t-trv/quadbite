import OrderCard from "../../../../components/OrderCard";

const AllOrders = ({ orders }) => {
  return (
    <div className="grid grid-cols-12 gap-4">
      {orders.map((order) => (
        <div key={order.orderId} className="col-span-12">
          <OrderCard order={order} />
        </div>
      ))}
    </div>
  );
};

export default AllOrders;
