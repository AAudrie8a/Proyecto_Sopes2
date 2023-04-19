import React from 'react'
import {createRoot} from 'react-dom/client'
import './style.css'
// import App from './App'
// import Inicio from './Inicio'
import Rutas from './Rutas'

const container = document.getElementById('root')

const root = createRoot(container)

root.render(
    <Rutas/>
)
