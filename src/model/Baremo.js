const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const baremoSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "-",
    },
    tarifa: {
      type: String,
      required: true,
    },
    valor: {
      type: Number,
      required: true,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
    dataEntry: {
      type: String,
      default: new Date(),
    },
    dateEdit: {
      type: String,
      default: new Date(),
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    toObject: {
      transform: (doc, ret) => {},
    },
    toJSON: {
      transform: (doc, ret) => {
      //  delete ret._id;
        //delete ret.dataEntry;
        delete ret.__v;
        //delete ret.payment;
      },
    },
  }
);

const Baremo = mongoose.model("Baremo", baremoSchema);
module.exports = { Baremo, baremoSchema };
