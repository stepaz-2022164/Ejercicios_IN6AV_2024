'use strict'

import express from 'express'
import {save} from './appointment.controller.js'
import { validateJwt } from '../middlewares/validate-jwt.js'

const api = express.Router()

//Rutas Privadas
api.post('/save',[validateJwt] ,save)

export default api