const express = require("express");
const { joiSchema, favoriteJoiSchema } = require("../../models/contact");
const { Contact } = require("../../models/contact");

const router = express.Router();

router.get("/", async (req, res) => {
  const contacts = await Contact.find({});
  res.json({
    status: "success",
    code: 200,
    data: { result: contacts },
  });
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findById(id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  res.json({ status: "success", code: 200, data: { result: contact } });
});

router.post("/", async (req, res) => {
  const validationResult = joiSchema.validate(req.body);
  console.log(req.body);

  if (validationResult.error) {
    res.status(400).json({ status: validationResult.error.details });
  }
  const contact = await Contact.create(req.body);
  res.status(201).json({
    status: "success",
    code: 201,
    data: { result: contact },
  });
});

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const contact = await Contact.findByIdAndRemove(id);
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: contact },
    message: `Contact with id=${id} deleted`,
  });
});

router.put("/:id", async (req, res) => {
  const validationResult = joiSchema.validate(req.body);

  if (validationResult.error) {
    res.status(400).json({ status: validationResult.error.details });
  }

  const { id } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateContact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: updateContact },
    message: `Contact with id=${id} updated`,
  });
});

router.patch("/:id/favorite", async (req, res) => {
  const { favorite } = req.body;
  const validationResult = favoriteJoiSchema.validate({ favorite });

  if (validationResult.error) {
    res.status(400).json({ status: validationResult.error.details });
  }

  const { id } = req.params;
  const contact = await Contact.findByIdAndUpdate(
    id,
    { favorite },
    {
      new: true,
    }
  );
  if (!contact) {
    res.status(404).json({
      status: "error",
      code: 404,
      message: `Contact with id=${id} not found`,
    });
  }
  res.json({
    status: "success",
    code: 200,
    data: { result: contact },
    message: `Contact with id=${id} updated`,
  });
});

module.exports = router;
