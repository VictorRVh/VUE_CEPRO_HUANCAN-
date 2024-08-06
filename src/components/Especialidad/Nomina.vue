<template>
    <div class="container">
      <h1>AGREGAR ESPECIALIDAD</h1>
      <table class="data-table">
        <tr>
          <th>CETPRO:</th>
          <td colspan="3"><input v-model="formData.cetpro" type="text" readonly /></td>
        </tr>
        <tr>
          <th>Programa de Estudios:</th>
          <td colspan="3">
            <select v-model="formData.programaDeEstudios" @change="fetchDocente">
              <option v-for="especialidad in especialidades" :key="especialidad.id" :value="especialidad.nombre">
                {{ especialidad.nombre }}
              </option>
            </select>
          </td>
        </tr>
        <tr>
          <th>Ciclo Formativo:</th>
          <td><input v-model="formData.cicloFormativo" type="text" readonly /></td>
          <th>Modalidad:</th>
          <td><input v-model="formData.modalidad" type="text" readonly /></td>
        </tr>
        <tr>
          <th>Módulo Formativo:</th>
          <td colspan="3"><input v-model="formData.moduloFormativo" type="text" readonly /></td>
        </tr>
        <tr>
          <th>Unidad(es) de Competencia:</th>
          <td colspan="3"><textarea v-model="formData.unidadesDeCompetencia"></textarea></td>
        </tr>
        <tr>
          <th>Docente:</th>
          <td colspan="3"><input v-model="formData.docente" type="text" readonly /></td>
        </tr>
        <tr>
          <th>Periodo Académico:</th>
          <td><input v-model="formData.periodoAcademico" type="text" readonly /></td>
          <th>Horas Semanales:</th>
          <td><input v-model="formData.horasSemanales" type="number" /></td>
        </tr>
        <tr>
          <th>Fecha de Inicio:</th>
          <td><input v-model="formData.fechaInicio" type="date" /></td>
          <th>Fecha de Término:</th>
          <td><input v-model="formData.fechaTermino" type="date" /></td>
        </tr>
        <tr>
          <th>Total de Horas:</th>
          <td><input v-model="formData.totalDeHoras" type="number" readonly /></td>
          <th>Total de Créditos:</th>
          <td><input v-model="formData.totalDeCreditos" type="number" readonly /></td>
        </tr>
        <tr>
          <th>Sección:</th>
          <td><input v-model="formData.seccion" type="text" /></td>
          <th>Turno:</th>
          <td>
            <select v-model="formData.turno">
              <option>MAÑANA</option>
              <option>TARDE</option>
              <option>NOCHE</option>
            </select>
          </td>
        </tr>
      </table>
  
      <!-- Sección de Unidades Didácticas -->
      <h2>Unidades Didácticas</h2>
      <div v-for="(unidad, index) in unidades" :key="index" class="unidad">
        <table class="data-table">
          <tr>
            <th>Nombre de la Unidad Didáctica:</th>
            <td><input v-model="unidad.nombre" type="text" placeholder="Ingrese el nombre de la unidad didáctica"></td>
          </tr>
          <tr>
            <th>Fecha de Inicio:</th>
            <td><input v-model="unidad.fechaInicio" type="date"></td>
            <th>Fecha de Término:</th>
            <td><input v-model="unidad.fechaTermino" type="date"></td>
          </tr>
          <tr>
            <th>Créditos:</th>
            <td><input v-model="unidad.creditos" type="number" placeholder="Ingrese los créditos" @input="actualizarTotales"></td>
            <th>Horas:</th>
            <td><input v-model="unidad.horas" type="number" placeholder="Ingrese las horas" @input="actualizarTotales"></td>
          </tr>
          <tr>
            <th>Capacidad de la Unidad Didáctica:</th>
            <td colspan="3"><textarea v-model="unidad.capacidad" placeholder="Descripción de la capacidad"></textarea></td>
          </tr>
          <tr>
            <th>Indicadores de Logro (I.L):</th>
            <td colspan="3">
              <div class="indicadores">
                <div v-for="(il, ilIndex) in unidad.indicadoresLogro" :key="ilIndex" class="indicador-item">
                  <span>I.L {{ ilIndex + 1 }}:</span>
                  <input v-model="il.texto" type="text" placeholder="Ingrese el indicador de logro" />
                  <button @click="eliminarIndicadorLogro(index, ilIndex)" v-if="unidad.indicadoresLogro.length > 1">
                    Eliminar
                  </button>
                </div>
                <button @click="agregarIndicadorLogro(index)" v-if="unidad.indicadoresLogro.length < 7">
                  Agregar
                </button>
              </div>
            </td>
          </tr>
        </table>
        <button @click="eliminarUnidad(index)" v-if="unidades.length > 1">Eliminar Unidad</button>
      </div>
      <button @click="agregarUnidad" v-if="unidades.length < 7">Agregar Unidad</button>
      <button @click="submitForm">Guardar</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        formData: {
          cetpro: 'CEPRO HUANCANÉ',
          programaDeEstudios: '',
          cicloFormativo: 'AUXILIAR TÉCNICO',
          modalidad: 'PRESENCIAL',
          moduloFormativo: 'CORTE DE CABELLO, DISEÑO DE BARBA, PEINADO',
          unidadesDeCompetencia: '',
          docente: '',
          periodoAcademico: '2024-II',
          horasSemanales: 0,
          fechaInicio: '',
          fechaTermino: '',
          totalDeHoras: 0,
          totalDeCreditos: 0,
          seccion: 'UNICA',
          turno: 'MAÑANA'
        },
        especialidades: [],
        unidades: [
          {
            nombre: '',
            fechaInicio: '',
            fechaTermino: '',
            creditos: 0,
            horas: 0,
            capacidad: '',
            indicadoresLogro: [{ texto: '' }]
          }
        ]
      };
    },
    created() {
      this.fetchEspecialidades();
    },
    methods: {
      async fetchEspecialidades() {
        try {
          const response = await axios.get('http://localhost:3000/especialidades');
          this.especialidades = response.data;
        } catch (error) {
          console.error('Error al recuperar las especialidad:', error);
        }
      },
      async fetchDocente() {
        try {
          const response = await axios.get(`http://localhost:3000/docentes/${this.formData.programaDeEstudios}`);
          this.formData.docente = response.data.nombre;
        } catch (error) {
          console.error('Error al recuperar el docente:', error);
        }
      },
      async submitForm() {
        try {
          await axios.post('http://localhost:3000/especialidadesRoutes', this.formData);
          alert('Datos guardados correctamente');
        } catch (error) {
          console.error('Error al guardar los datos:', error);
          alert('Error al guardar los datos');
        }
      },
      agregarUnidad() {
        this.unidades.push({
          nombre: '',
          fechaInicio: '',
          fechaTermino: '',
          creditos: 0,
          horas: 0,
          capacidad: '',
          indicadoresLogro: [{ texto: '' }]
        });
        this.actualizarTotales();
      },
      eliminarUnidad(index) {
        this.unidades.splice(index, 1);
        this.actualizarTotales();
      },
      agregarIndicadorLogro(index) {
        if (this.unidades[index].indicadoresLogro.length < 7) {
          this.unidades[index].indicadoresLogro.push({ texto: '' });
        }
      },
      eliminarIndicadorLogro(uIndex, ilIndex) {
        this.unidades[uIndex].indicadoresLogro.splice(ilIndex, 1);
      },
      actualizarTotales() {
        let totalCreditos = 0;
        let totalHoras = 0;
        this.unidades.forEach(unidad => {
          totalCreditos += parseFloat(unidad.creditos) || 0;
          totalHoras += parseFloat(unidad.horas) || 0;
        });
        this.formData.totalDeCreditos = totalCreditos;
        this.formData.totalDeHoras = totalHoras;
      }
    },
    watch: {
      unidades: {
        handler: 'actualizarTotales',
        deep: true
      }
    }
  };
  </script>
  
  <style scoped>
  /* Estilos de la aplicación */
  .container {
    max-width: 1200px; /* Ampliado un 10% de 800px */
    margin: 0 auto;
    padding: 20px;
    background-color: #f9f9f9;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  }
  
  h1, h2 {
    color: #921733;
    margin-bottom: 20px;
  }
  
  .data-table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;
  }
  
  .data-table th, .data-table td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  
  .data-table th {
    background-color: #921733;
    color: white;
  }
  
  .data-table td input,
  .data-table td select,
  .data-table td textarea {
    width: 100%; /* Asegura que los elementos se ajusten al 100% del ancho de su celda */
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    box-sizing: border-box; /* Incluye el padding y el borde en el cálculo del ancho */
  }
  
  textarea {
    min-height: 100px; /* Ajusta la altura mínima para las áreas de texto */
    resize: vertical; /* Permite redimensionar verticalmente */
  }
  
  button {
    background-color: #921733;
    color: white;
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-top: 20px;
  }
  
  button:hover {
    background-color: #a02c40;
  }
  
  .unidad {
    margin-bottom: 30px;
  }
  
  /* Nuevos estilos para los indicadores de logro */
  .indicadores {
    display: flex;
    flex-direction: column;
    gap: 10px; /* Espacio entre los inputs */
  }
  
  .indicador-item {
    display: flex;
    align-items: center;
    gap: 10px; /* Espacio entre el número, input y botón */
  }
  
  .indicador-item span {
    flex-shrink: 0; /* No permite que el texto se reduzca */
  }
  </style>
  