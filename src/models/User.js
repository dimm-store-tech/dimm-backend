import mongoose, { model } from "mongoose";

const userSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, unique: true },
    password: { type: String , required: true},
    
    //Personal data  
    picture : { type: String, default: null},
    first_name : { type: String , required: true },
    second_name : { type: String , required: true },
    paternal_surname: { type: String , required: true },
    maternal_surname : { type: String , required: true }, 
    dni: { type: String , required: true },
    roles: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

export default model("User", userSchema);
