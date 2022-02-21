const express = require("express");

const { validation, ctrlWrapper } = require("../../middlewares");
const { users: ctrl } = require("../../controllers");

const router = express.Router();

router.post("/signup", ctrlWrapper(ctrl.register));

/*router.get("/:id", ctrlWrapper(ctrl.getById));

router.post("/", validation(joiSchema), ctrlWrapper(ctrl.add));

router.delete("/:id", ctrlWrapper(ctrl.removeById));

router.put("/:id", validation(joiSchema), ctrlWrapper(ctrl.updateById));

router.patch(
  "/:id/favorite",
  validation(favoriteJoiSchema),
  ctrlWrapper(ctrl.updateFavorite)
);*/

module.exports = router;
