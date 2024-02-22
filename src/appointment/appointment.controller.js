'use strict'

import Animal from '../animal/animal.model.js'
import Appointment from './appointment.model.js'

export const save = async(req, res) => {
    try {
        //Capturar el dato
        let data = req.body
        data.user = req.user._id
        //Verificar que exista el animal
        let animal = await Animal.findOne({_id: data.animal})
        if(!animal) return res.status(404).send({message: 'Animal not found'})
        //Validar que la mascota no tenga una cita activa

        //Validar si un animal o usuario ya tiene cita
        //Ejercicio -> el usuario solo puede tener una cita por dia
        let date = new Date(data.date)
        date.getDay()
        let appointmentExist = await Appointment.findOne({
            $or: [
                {
                    animal: data.animal,
                    user: data.user,
                },
                {
                    date: date,
                    user: data.user
                }
            ]
        })
        if(appointmentExist) return res.send({message: 'Appointment already exists'})
        //Guardar
        let appointment = new Appointment(data)
        await appointment.save()
        console.log(date)
        return res.send({message: `Appointment saved successfully, for the date ${appointment.date}`})
    } catch (error) {
        console.error(error)
        return res.status(500).send({message: 'Error saving'})
    }
}