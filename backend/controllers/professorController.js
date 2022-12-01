const factory = require("./handlerFactory");
const Professor = require("../models/professorModel");

exports.getAllProfessors = factory.getAll(Professor);
exports.getProfessor = factory.getOne(Professor);
exports.createProfessor = factory.createOne(Professor);
exports.updateProfessor = factory.updateOne(Professor);
exports.deleteProfessor = factory.deleteOne(Professor);
