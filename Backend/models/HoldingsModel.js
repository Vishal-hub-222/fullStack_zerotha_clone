import mongoose from "mongoose";
import HoldingsSchema from "../schema/HoldingsSchema.js";

const HoldingsModel = mongoose.model("Holding", HoldingsSchema);

export default HoldingsModel;