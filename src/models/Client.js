import mongoose, { model } from "mongoose";

const clientSchema = new mongoose.Schema(
  {
    coupons : { type: Number ,default : 0},
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required : true
      }
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("Client", clientSchema);