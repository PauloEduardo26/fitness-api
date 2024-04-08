const { Router } = require("express");
const controller = require("./Controller");

const router = Router();

router.get("/", controller.getExercises);
router.get("/:id", controller.getExerciseById);
router.post("/", controller.addExercise);
router.delete("/:id", controller.deleteById);
router.put("/:id", controller.updateExercise);

module.exports = router;