<template>
    <div class="container">
      <h1>ESPECIALIDADES</h1>
      <div v-if="especialidades.length">
        <div v-for="(especialidad, index) in especialidades" :key="index" class="especialidad-card">
          <div class="card-content">
            <h2>{{ especialidad.nombre }}</h2>
            <div class="detalle-container">
              <div class="detalle"><strong>Ciclo Formativo:</strong></div>
              <div class="detalle-valor">{{ especialidad.cicloFormativo }}</div>
              <div class="detalle"><strong>Docente:</strong></div>
              <div class="detalle-valor">{{ especialidad.docente }}</div>
              <div class="detalle"><strong>Total de Horas:</strong></div>
              <div class="detalle-valor">{{ especialidad.totalHoras }}</div>
              <div class="detalle"><strong>Total de Créditos:</strong></div>
              <div class="detalle-valor">{{ especialidad.totalCreditos }}</div>
            </div>
          </div>
          <div class="acciones">
            <button @click="editarEspecialidad(index)">Editar</button>
            <button @click="eliminarEspecialidad(index)">Eliminar</button>
            <button @click="agregarEspecialidad">Agregar</button>
          </div>
        </div>
      </div>
      <div v-else>
        <p>No hay especialidades registradas.</p>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        especialidades: [
          {
            nombre: 'Peluquería',
            cicloFormativo: 'Auxiliar Técnico',
            docente: 'Juan Pérez',
            totalHoras: 180,
            totalCreditos: 15
          },
          // Más especialidades pueden agregarse aquí
        ]
      };
    },
    methods: {
      editarEspecialidad(index) {
        alert(`Editando especialidad: ${this.especialidades[index].nombre}`);
      },
      eliminarEspecialidad(index) {
        if (confirm(`¿Seguro que deseas eliminar la especialidad ${this.especialidades[index].nombre}?`)) {
          this.especialidades.splice(index, 1);
        }
      },
      agregarEspecialidad() {
        alert('Agregar una nueva especialidad');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos generales */
  .container {
    max-width: 1000px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1 {
    color: #921733;
    margin-bottom: 20px;
    font-size: 1.8rem;
    font-weight: bold;
    text-align: left;
  }
  
  /* Estilos para la tarjeta de cada especialidad */
  .especialidad-card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
    padding: 15px;
    margin-bottom: 15px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  .especialidad-card:hover {
    transform: scale(1.01);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
  }
  
  .card-content {
    text-align: left;
    margin-bottom: 10px;
  }
  
  .especialidad-card h2 {
    color: #921733;
    margin-bottom: 10px;
    font-size: 1.5rem;
    font-weight: bold;
    text-transform: uppercase;
  }
  
  .detalle-container {
    display: grid;
    grid-template-columns: 150px 1fr;
    gap: 8px;
    padding-left: 10px;  /* Añade un pequeño margen interior a la izquierda */
  }
  
  .detalle {
    color: rgba(16, 16, 16, 0.8);
    font-size: 1.1rem;
  }
  
  .detalle-valor {
    font-size: 1.2rem;
    font-weight: bold;
    color: #6a6a6a;
  }
  
  .acciones {
    display: flex;
    justify-content: space-between;  /* Distribuye los botones a lo largo del contenedor */
    width: 100%;
  }
  
  button {
    background-color: #921733;
    color: white;
    padding: 10px 15px;
    border: none;
    border-radius: 3px;
    cursor: pointer;
    font-size: 0.9rem;
    font-weight: bold;
    transition: background-color 0.2s ease;
    flex-grow: 1;
    margin: 0 5px;  /* Espacio entre los botones */
  }
  
  button:hover {
    background-color: #a02c40;
  }
  </style>
  