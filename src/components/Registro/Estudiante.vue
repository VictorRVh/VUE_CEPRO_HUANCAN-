<template>
    <div class="container">
      <h2 class="form-title">Registrar Estudiante</h2>
  
      <form @submit.prevent="submitEstudiante" class="form">
        <!-- Nombre -->
        <div class="form-row">
          <div class="form-group full-width">
            <label for="nombre" class="form-label">Nombre</label>
            <input v-model="estudiante.nombre" type="text" id="nombre" class="form-input" placeholder="Nombre completo del estudiante" required />
          </div>
        </div>
  
        <!-- Apellido Paterno -->
        <div class="form-row">
          <div class="form-group full-width">
            <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
            <input v-model="estudiante.apellido_paterno" type="text" id="apellidoPaterno" class="form-input" placeholder="Apellido Paterno" required />
          </div>
        </div>
  
        <!-- Apellido Materno -->
        <div class="form-row">
          <div class="form-group full-width">
            <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
            <input v-model="estudiante.apellido_materno" type="text" id="apellidoMaterno" class="form-input" placeholder="Apellido Materno" />
          </div>
        </div>
  
        <!-- DNI, Sexo y Fecha de Nacimiento -->
        <div class="form-row">
          <div class="form-group third-width">
            <label for="dni" class="form-label">DNI</label>
            <input v-model="estudiante.dni" type="text" id="dni" class="form-input" placeholder="DNI del estudiante" required />
          </div>
  
          <div class="form-group third-width">
            <label for="sexo" class="form-label">Sexo</label>
            <select v-model="estudiante.sexo" id="sexo" class="form-select" required>
              <option value="">Seleccionar</option>
              <option value="M">Masculino</option>
              <option value="F">Femenino</option>
            </select>
          </div>
  
          <div class="form-group third-width">
            <label for="fechaNacimiento" class="form-label">Fecha de Nacimiento</label>
            <input v-model="estudiante.fecha_nacimiento" type="date" id="fechaNacimiento" class="form-input" />
          </div>
        </div>
  
        <!-- Celular y Correo -->
        <div class="form-row">
          <div class="form-group half-width">
            <label for="celular" class="form-label">Celular</label>
            <input v-model="estudiante.celular" type="text" id="celular" class="form-input" placeholder="Número de celular" />
          </div>
  
          <div class="form-group half-width">
            <label for="correo" class="form-label">Correo</label>
            <input v-model="estudiante.correo" type="email" id="correo" class="form-input" placeholder="Correo electrónico" required />
          </div>
        </div>
  
        <button type="submit" class="form-button">Registrar</button>
  
        <!-- Mostrar Código de Estudiante generado después del registro -->
        <div v-if="estudiante.codigo_estudiante" class="form-row">
          <div class="form-group full-width">
            <label for="codigoEstudiante" class="form-label">Código de Estudiante</label>
            <input :value="estudiante.codigo_estudiante" type="text" id="codigoEstudiante" class="form-input" readonly />
          </div>
        </div>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        estudiante: {
          id: '', // Este campo se llenará con el ID generado por la base de datos después de la creación.
          codigo_estudiante: '', // Este campo se llenará con el código de estudiante generado automáticamente.
          nombre: '',
          apellido_paterno: '',
          apellido_materno: '',
          dni: '',
          sexo: '', // 'M' para Masculino y 'F' para Femenino
          celular: '',
          correo: '',
          fecha_nacimiento: '' // Añadido el campo de fecha de nacimiento
        }
      };
    },
    methods: {
      async submitEstudiante() {
        try {
          const response = await fetch('http://localhost:5000/api/estudiantes', { // Asegúrate de que la URL coincide con tu backend
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.estudiante)
          });
  
          if (!response.ok) {
            throw new Error('Error al registrar el estudiante');
          }
  
          const result = await response.json();
          // Asignar el ID y código de estudiante generado al formulario
          this.estudiante.id = result.id;
          this.estudiante.codigo_estudiante = result.codigo_estudiante;
  
          // Limpiar los campos del formulario, excepto el código de estudiante
          this.estudiante = {
            id: '',
            codigo_estudiante: this.estudiante.codigo_estudiante,
            nombre: '',
            apellido_paterno: '',
            apellido_materno: '',
            dni: '',
            sexo: '', // Restablecer al valor inicial
            celular: '',
            correo: '',
            fecha_nacimiento: ''
          };
  
          alert('Estudiante registrado exitosamente');
        } catch (error) {
          console.error('Error:', error);
          alert(`Error: ${error.message}`);
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  .form-title {
    color: #921733;
    margin-bottom: 20px;
  }
  
  .form {
    display: flex;
    flex-direction: column;
  }
  
  .form-row {
    display: flex;
    margin-bottom: 15px;
  }
  
  .form-group {
    margin-right: 15px;
    display: flex;
    flex-direction: column;
  }
  
  .form-group.full-width {
    flex: 1;
  }
  
  .form-group.half-width {
    flex: 1;
  }
  
  .form-group.third-width {
    flex: 1;
    max-width: 33%;
  }
  
  .form-group:last-child {
    margin-right: 0;
  }
  
  .form-label {
    display: block;
    margin-bottom: 5px;
    font-weight: bold;
    color: #2c3e50;
  }
  
  .form-input,
  .form-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
    text-transform: uppercase; /* Convertir el texto a mayúsculas */
  }
  
  .form-button {
    background-color: #921733;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  .form-button:hover {
    background-color: #800f2c;
  }
  </style>
  