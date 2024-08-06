<script>
export default {
    data() {
      return {
        matricula: {
          estudianteId: null,
          especialidadId: null,
          turnoId: null,
          docenteId: null,
          creditos: 1,
          condicionId: null,
          nroRecibo: ''
        },
        estudianteCodigo: '',
        estudiante: null
      };
    },
    methods: {
      async fetchEstudiante() {
        if (this.estudianteCodigo.length > 0) {
          // Llama a tu API para obtener los datos del estudiante usando el código
          try {
            const response = await fetch(`/api/estudiantes/${this.estudianteCodigo}`);
            if (response.ok) {
              this.estudiante = await response.json();
            } else {
              this.estudiante = null;
            }
          } catch (error) {
            console.error('Error fetching estudiante:', error);
            this.estudiante = null;
          }
        } else {
          this.estudiante = null;
        }
      },
      async submitMatricula() {
        try {
          const response = await fetch('/api/registrar-matricula', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.matricula)
          });
  
          if (response.ok) {
            // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
            alert('Matrícula registrada con éxito y PDF generado.');
          } else {
            console.error('Error al registrar matrícula');
          }
        } catch (error) {
          console.error('Error al registrar matrícula:', error);
        }
      }
    }
  };
</script>

<template>

    <div class="container">
        <h2 class="form-title">Registrar Matrícula</h2>

        <form @submit.prevent="submitMatricula" class="form">
            <!-- Estudiante -->
            <div class="form-row">
                <div class="form-group">
                    <label for="estudianteId" class="form-label">Estudiante</label>
                    <input v-model="estudianteCodigo" @input="fetchEstudiante" type="text" id="estudianteId"
                        class="form-input" placeholder="Ingrese código de estudiante (solo números)" pattern="\d*" />
                    <div v-if="estudiante" class="student-info">
                        <p><strong>Nombre:</strong> {{ estudiante.nombre }} {{ estudiante.apellidoPaterno }} {{
                            estudiante.apellidoMaterno }}</p>
                        <p><strong>Turno:</strong> {{ estudiante.turno }}</p>
                        <p><strong>Condición:</strong> {{ estudiante.condicion }}</p>
                    </div>
                </div>
            </div>

            <!-- Turno, Créditos y Condición -->
            <div class="form-row">
                <div class="form-group half-width">
                    <label for="turnoId" class="form-label">Turno</label>
                    <select v-model="matricula.turnoId" id="turnoId" class="form-select">
                        <option value="">Seleccionar Turno</option>
                        <!-- Opciones de turnos se deben cargar desde la base de datos -->
                    </select>
                </div>

                <div class="form-group half-width">
                    <label for="creditos" class="form-label">Créditos</label>
                    <input v-model.number="matricula.creditos" type="number" id="creditos" class="form-input"
                        placeholder="Número de créditos" min="1" max="6" />
                </div>

                <div class="form-group half-width">
                    <label for="condicionId" class="form-label">Condición</label>
                    <select v-model="matricula.condicionId" id="condicionId" class="form-select">
                        <option value="">Seleccionar Condición</option>
                        <!-- Opciones de condiciones se deben cargar desde la base de datos -->
                    </select>
                </div>
            </div>

            <!-- Especialidad -->
            <div class="form-row">
                <div class="form-group">
                    <label for="especialidadId" class="form-label">Especialidad</label>
                    <select v-model="matricula.especialidadId" id="especialidadId" class="form-select">
                        <option value="">Seleccionar Especialidad</option>
                        <!-- Opciones de especialidades se deben cargar desde la base de datos -->
                    </select>
                </div>
            </div>

            <!-- Docente -->
            <div class="form-row">
                <div class="form-group">
                    <label for="docenteId" class="form-label">Docente</label>
                    <select v-model="matricula.docenteId" id="docenteId" class="form-select">
                        <option value="">Seleccionar Docente</option>
                        <!-- Opciones de docentes se deben cargar desde la base de datos -->
                    </select>
                </div>
            </div>

            <!-- Número de Recibo -->
            <div class="form-row">
                <div class="form-group">
                    <label for="nroRecibo" class="form-label">Número de Recibo</label>
                    <input v-model="matricula.nroRecibo" type="text" id="nroRecibo" class="form-input"
                        placeholder="Número del recibo" />
                </div>
            </div>

            <button type="submit" class="form-button">Registrar Matrícula</button>
        </form>
    </div>

</template>


<style scoped>
.container {
    max-width: 650px;
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
    flex: 1;
    margin-right: 15px;
  }
  
  .form-group.half-width {
    flex: 1;
    max-width: 50%;
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
  
  .form-input, .form-select {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box;
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
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
  
  .student-info {
    margin-top: 10px;
  }

</style>