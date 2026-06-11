import mongoose from "mongoose";
import PositionsSchema from "../schema/PositionsSchema.js";
const PositionsModel = mongoose.model("Position", PositionsSchema);
export default PositionsModel;