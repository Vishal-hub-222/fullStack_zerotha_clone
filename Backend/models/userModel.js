import mongoose from 'mongoose';
import usershema from '../schema/user.js';
const userModel = mongoose.model("User", usershema);
export default userModel; 