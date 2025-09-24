const { default: mongoose } = require("mongoose");
const { Baremo } = require("../model/Baremo");

/**
 * Create a new baremo
 * @param {*} req
 * @param {*} res
 * @returns
 */
const addBaremo = async (req, res) => {
  try {
    //1. getting data from body
    const { name, tarifa, valor } = req.body;

    if (!name || !tarifa || !valor) {
      return res
        .status(400)
        .json({ message: "The are some values required." });
    }

    //2. checking if the baremo already exists
    const baremoExists = await Baremo.findOne({
      tarifa: tarifa,
      user: req.user,
    });
    if (baremoExists) {
      return res.status(409).json({ message: "The baremo already exists." });
    }

    //3. creating new baremo
    let newBaremo = new Baremo({
      name: name,
      tarifa: tarifa,
      valor: valor,
      user: req.user,
    });
    newBaremo = newBaremo.save();

    res.status(201).json(newBaremo);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Get all the baremos
 * @param {*} req
 * @param {*} res
 */
const getAllBaremos = async (req, res) => {
  try {
    const baremos = await Baremo.find();

    res.status(200).json(baremos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Edit a baremo
 * @param {*} req
 * @param {*} res
 * @returns
 */
const editBaremo = async (req, res) => {
  try {
    //1. getting data from body
    const { valor } = req.body;
    const { id } = req.params;

    if (!valor) {
      return res
        .status(400)
        .json({ message: "The are some values required." });
    }

    //2. checking if the baremo already exists
    let baremoExists = await Baremo.findOne({
      _id: id,
      user: req.user,
    });
    if (!baremoExists) {
      return res.status(400).json({ message: "The baremo doesn't exist." });
    }

    // Fecha actual
  const now = new Date();

// Formato similar a: "Tue Jul 08 2025 21:53:06 GMT-0300 (hora estándar de Argentina)"
  const formatted = now.toString();

//console.log(formatted);

// Guardar en tu objeto
//baremoExists.dateEdit = formatted;

    //3. update the baremo
    baremoExists.valor = valor;
    //baremoExists.dateEdit = new Date().toUTCString();
    baremoExists.dateEdit = formatted;
    
    await baremoExists.save();

    res.status(200).json({ message: "Baremo updated successfully." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  addBaremo,
  getAllBaremos,
  editBaremo
};
