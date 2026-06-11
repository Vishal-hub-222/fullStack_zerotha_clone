import mongoose from "mongoose";
import OrderShema from "../schema/OrderShcema.js";
const OrderModel = mongoose.model("Order", OrderShema);
export default OrderModel;