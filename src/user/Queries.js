const getExercises = "SELECT * FROM exercises order by id";
const getExerciseById = "select * from exercises where id = $1";
const checkName = "select s from exercises s where s.name ILIKE $1";
const addExercise = "insert into exercises (name, reps, num_sets, target, description) values ($1, $2, $3, $4, $5)";
const deleteById = "delete from exercises where id = $1";
const updateExercise = "update exercises set name = $1, reps = $2, num_sets = $3, target = $4, description = $5 where id = $6";

module.exports = {
    getExercises,
    getExerciseById,
    checkName,
    addExercise,
    deleteById,
    updateExercise
}