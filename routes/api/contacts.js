const express = require("express");
const contacts = require("../../models/contacts.json");
const { v4 } = require("uuid");
const joi = require("joi");

const schema = joi.object({
  name: joi.string().required(),
  email: joi.string().email({ minDomainSegments: 2 }).required(),
  phone: joi.number().required(),
});

const router = express.Router();

router.get("/", (req, res) => {
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
  });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((item) => item.id === id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  res.json({ status: "success", code: 200, data: { result: contact } });
});

router.post("/", (req, res) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).json({ status: validationResult.error.details });
  }
  const newContact = {
    id: v4(),
    ...req.body,
  };
  contacts.push(newContact);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: newContact },
  });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;
  const contact = contacts.find((item) => item.id === id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  const newArrContacts = contacts.filter((item) => item.id !== id);
  res.json({
    status: "success",
    code: 200,
    data: { result: newArrContacts },
    message: `Contact with id=${id} deleted`,
  });
});

router.put("/:id", (req, res) => {
  const validationResult = schema.validate(req.body);

  if (validationResult.error) {
    res.status(400).json({ status: validationResult.error.details });
  }
  const { id } = req.params;
  const contact = contacts.find((item) => item.id === id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  const updateContact = {
    id,
    ...req.body,
  };
  res.json({
    status: "success",
    code: 200,
    data: { result: updateContact },
    message: `Contact with id=${id} updated`,
  });
});

module.exports = router;
