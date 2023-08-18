import mongoose, { model } from "mongoose";
const employeeSchema = new mongoose.Schema(
  {
    address: {type:String , required: true},
    agge: {type:String , required: true},
    phone: {type:String , required: true},
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

export default model("Employee", employeeSchema);
