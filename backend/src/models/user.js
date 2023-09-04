const mongoose = require("../db/conn");
const { Schema } = mongoose;

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: false,
    },
    phone: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre('save', async function(next){
  this.password = await bcrypt.hash(this.password, 10);
})

const User = mongoose.model("User", UserSchema);

module.exports = User;
