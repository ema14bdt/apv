import Paciente from '../models/Paciente.js';

const agregarPaciente = async (req, res) => {
    const paciente = new Paciente(req.body);
    paciente.veterinario = req.veterinario._id;
    try {
        const pacieteAlmacenado = await paciente.save();
        res.status(201).json({
            message: 'Paciente agregado correctamente',
            data: pacieteAlmacenado,
        });
    } catch (error) {
        console.error(error);
    }
};

const obtenerPacientes = async (req, res) => {
    const pacientes = await Paciente.find().where('veterinario').equals(req.veterinario._id);

    res.json({
        message: `Pacientes de ${req.veterinario.nombre}`,
        data: pacientes,
    });
};

const obtenerPaciente = async (req, res) => {
    const {id} = req.params;
    const paciente = await Paciente.findById(id);

    if(!paciente) {
        res.status(404).json({
            message: 'Paciente no encontrado',
        });
    }

    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
        res.status(401).json({
            message: 'No autorizado',
        });
    }

    if (paciente) {
        res.json({
            message: `Hola ${req.veterinario.nombre}, estos son los datos del paciente ${paciente.nombre}.`,
            data: paciente,
        });
    }
};

const editarPaciente = async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
        res.status(404).json({
            message: 'Paciente no encontrado',
        });
    }

    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
        res.status(401).json({
            message: 'No autorizado',
        });
    }

    paciente.nombre = req.body.nombre || paciente.nombre;
    paciente.propietario = req.body.propietario || paciente.propietario;
    paciente.email = req.body.email || paciente.email;
    paciente.fecha = req.body.fecha || paciente.fecha;
    paciente.sintomas = req.body.sintomas || paciente.sintomas;

    try {
        const pacienteEditado = await paciente.save();
        res.json({
            message: `Paciente ${pacienteEditado.nombre} editado correctamente`,
            data: pacienteEditado,
        });

    } catch (error) {
        console.error(error);
    }
};

const eliminarPaciente = async (req, res) => {
    const paciente = await Paciente.findById(req.params.id);

    if (!paciente) {
        res.status(404).json({
            message: 'Paciente no encontrado',
        });
    }

    if (paciente.veterinario._id.toString() !== req.veterinario.id.toString()) {
        res.status(401).json({
            message: 'No autorizado',
        });
    }

    try {
        await paciente.remove();
        res.json({
            message: `Paciente ${paciente.nombre} eliminado correctamente`,
        });
    } catch (error) {
        console.error(error);
    }
};

export {agregarPaciente, obtenerPacientes, obtenerPaciente, editarPaciente, eliminarPaciente};
