import mongoose, { model } from "mongoose";
import bcrypt from 'bcrypt'
const userSchema = new mongoose.Schema(
  {
    user: { type: String, required: true, unique: true },
    password: { type: String , required: true},
    
    //Personal data  
    picture : { type: String, default: null},
    name : { type: String , required: true },
    paternal_surname: { type: String , required: true },
    maternal_surname : { type: String , required: true }, 
    dni: { type: String , required: true },
    phone: {type:String , required: true},
    role:        {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
    },
    permissions: [
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

userSchema.statics.encryptPassword = async (password) => {
  const salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

userSchema.statics.comparePassword = async (password, receivedPassword) => {
  return await bcrypt.compare(password, receivedPassword)
}

userSchema.pre("save", async function (next) {
  const user = this;
  if (!user.isModified("password")) {
    return next();
  }
  const hash = await bcrypt.hash(user.password, 10);
  user.password = hash;
  next();
})

export default model("User", userSchema);
