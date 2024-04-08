const pool = require("../../db");

const queries = require("./Queries");

const getExercises = (req, res) =>{
    pool.query(queries.getExercises, (error, results)=>{
        if(error) throw error
        res.status(200).json(results.rows)
    })
};

const getExerciseById = (req, res) =>{
    const id = parseInt(req.params.id);
    if(!isNaN(id)){ 
        pool.query(queries.getExerciseById, [id], (error, results)=>{
            if(error) throw error;
            if(results.rowCount!==0) {res.status(200).json(results.rows);}
            else{res.status(404).send("id nao encontrado");}
        })
    }
};

const addExercise = (req, res) =>{
    const { name, reps, num_sets, target, description } = req.body;
    pool.query(queries.checkName, [name], (error, results)=>{
        if(results.rows.length) { res.status(400).send("esse nome ja existe"); }
        else{
            pool.query(queries.addExercise, [name, reps, num_sets, target, description], (error, results)=>{
                if(error) throw error;
                res.status(201).send("sucesso ao adicionar novo exercicio");
            }); 
        }
    });
};

const deleteById = (req, res) =>{
    const id = parseInt(req.params.id);
    pool.query(queries.getExerciseById, [id], (error, results)=>{
        const noIdFound = !results.rows.length;
        if(noIdFound){
            res.status(404).send("id nao encontrado");
        }
        else{
            pool.query(queries.deleteById, [id], (error, results)=>{
                if(error) throw error;
                res.status(200).send("exercicio removido com sucesso");
            });
        }
    });
};

const updateExercise = (req, res) =>{
    const id = parseInt(req.params.id);
    const { name, reps, num_sets, target, description } = req.body;
    pool.query(queries.getExerciseById, [id], (error, results)=>{
        const noIdFound = !results.rows.length;
        if(noIdFound){
            res.status(404).send("id nao encontrado");
        }
        else{
            pool.query(queries.checkName, [name], (error, results)=>{
                if(results.rows.length) { res.status(400).send("esse nome ja existe"); }
                else{
                    pool.query(queries.updateExercise, [name, reps, num_sets, target, description, id], (error, results)=>{
                        if(error) throw error;
                        res.status(201).send("sucesso ao atualizar novo exercicio");
                    }); 
                }
            });
        }
    });
};

module.exports = {
    getExercises,
    getExerciseById,
    addExercise,
    deleteById,
    updateExercise
};