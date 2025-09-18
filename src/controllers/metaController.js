const { default: mongoose } = require("mongoose");
const { Meta } = require("../model/Meta");

/**
 * Create a new baremo
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addMeta = async (req, res) => {
  try {
    //1. getting data from body
    const { name, number, valor } = req.body;

    if (!name || !number || !valor) {
      return res.status(400).json({ message: "The are some values required." });
    }

    //2. checking if the meta already exists
    const metaExists = await Meta.findOne({
      number: number,
      user: req.user,
    });
    if (metaExists) {
      return res.status(409).json({ message: "The meta already exists." });
    }

    //3. creating new meta
    let newMeta = new Meta({
      name: name,
      number: number,
      valor: valor,
      user: req.user,
    });
    newMeta = newMeta.save();

    res.status(201).json(newMeta);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all the metas
 * @param {*} req
 * @param {*} res
 */
const getAllMetas = async (req, res) => {
  try {
    const metas = await Meta.find();

    res.status(200).json(metas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addMeta,
  getAllMetas,
};
