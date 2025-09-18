const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const metaSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      default: "-",
    },
    number: {
      type: Number,
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
        delete ret._id;
        //delete ret.dataEntry;
         delete ret.__v;
        //delete ret.payment;
      },
    },
  }
);

const Meta = mongoose.model("Meta", metaSchema);
module.exports = { Meta, metaSchema };
