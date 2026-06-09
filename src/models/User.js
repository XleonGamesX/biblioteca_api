import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true
    },

    password: {
      type: String,
      required: true,
      select: false
    },

    rol: {
      type: String,
      enum: ["admin", "librarian"],
      default: "librarian"
    }
  },
  {
    timestamps: true
  }
);

// ==========================
// HASH PASSWORD (CORREGIDO)
// ==========================
userSchema.pre("save", async function () {
  if (!this.isModified("password")) return;

  const salt = await bcrypt.genSalt(
    Number(process.env.BCRYPT_SALT_ROUNDS || 10)
  );

  this.password = await bcrypt.hash(this.password, salt);
});

// ==========================
// COMPARE PASSWORD
// ==========================
userSchema.methods.comparePassword = async function (passwordIngresada) {
  return await bcrypt.compare(passwordIngresada, this.password);
};

const User = mongoose.model("User", userSchema);

export default User;