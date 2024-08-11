<template>
  
  <div class="container">
    <!-- Contenedor fijo para la sumatoria de créditos y horas -->
    <div class="sticky-summary">
      <h2>TOTAL DE CRÉDITOS  {{    formData.total_creditos }}</h2>
      <h2>TOTAL DE HORAS     {{    formData.total_horas }}</h2>
    </div>
    <h1>AGREGAR ESPECIALIDAD</h1>
    <table class="data-table">
      <tr>
        <th>CETPRO:</th>
        <td colspan="3"><input v-model="formData.cetpro" type="text" readonly /></td>
      </tr>
      <tr>
        <th>Programa de Estudios:</th>
        <td colspan="3"><input v-model="formData.programa_estudios" type="text" @input="toUpperCase('programa_estudios')" /></td>
      </tr>
      <tr>
        <th>Ciclo Formativo:</th>
        <td><input v-model="formData.ciclo_formativo" type="text" @input="toUpperCase('ciclo_formativo')" /></td>
        <th>Modalidad:</th>
        <td><input v-model="formData.modalidad" type="text" readonly /></td>
      </tr>
      <tr>
        <th>Módulo Formativo:</th>
        <td colspan="3"><input v-model="formData.modulo_formativo" type="text" @input="toUpperCase('modulo_formativo')" /></td>
      </tr>
      <tr>
        <th>Unidad(es) de Competencia:</th>
        <td colspan="3"><textarea v-model="formData.unidades_competencia" @input="toUpperCase('unidades_competencia')"></textarea></td>
      </tr>
      <tr>
        <th>Docente:</th>
        <td colspan="3">
          <select v-model="formData.docente_id">
            <option v-for="docente in docentes" :key="docente.id" :value="docente.id">
              {{ docente.nombre }} {{ docente.apellido_paterno }} {{ docente.apellido_materno }}
            </option>
          </select>
        </td>
      </tr>
      <tr>
        <th>Periodo Académico:</th>
        <td><input v-model="formData.periodo_academico" type="text" readonly /></td>
        <th>Horas Semanales:</th>
        <td><input v-model="formData.horas_semanales" type="number" @input="toUpperCase('horas_semanales')" /></td>
      </tr>
      <tr>
        <th>Fecha de Inicio:</th>
        <td><input v-model="formData.fecha_inicio" type="date" /></td>
        <th>Fecha de Término:</th>
        <td><input v-model="formData.fecha_termino" type="date" /></td>
      </tr>
      <tr>
        <th>Sección:</th>
        <td><input v-model="formData.seccion" type="text" @input="toUpperCase('seccion')" /></td>
        <th>Turno:</th>
        <td>
          <select v-model="formData.turno_id">
            <option v-for="turno in turnos" :key="turno.id" :value="turno.id">
              {{ turno.descripcion }}
            </option>
          </select>
        </td>
      </tr>
    </table>

    <button @click="submitForm">Guardar</button>

    <h1>AGREGAR UNIDADES DIDÁCTICAS</h1>
    <div v-for="(unidad, index) in unidades" :key="index" class="unidad">
      <table class="data-table">
        <tr>
          <th>Nombre de la Unidad Didáctica:</th>
          <td><input v-model="unidad.nombre_unidad" type="text" placeholder="Ingrese el nombre de la unidad didáctica" @input="toUpperCase('nombre_unidad', index)" /></td>
        </tr>
        <tr>
          <th>Fecha de Inicio:</th>
          <td><input v-model="unidad.fechaInicio" type="date" /></td>
          <th>Fecha de Término:</th>
          <td><input v-model="unidad.fechaTermino" type="date" /></td>
        </tr>
        <tr>
          <th>Créditos:</th>
          <td><input v-model="unidad.creditos" type="number" placeholder="Ingrese los créditos" @input="actualizarTotales" /></td>
          <th>Horas:</th>
          <td><input v-model="unidad.horas" type="number" placeholder="Ingrese las horas" @input="actualizarTotales" /></td>
        </tr>
        <tr>
          <th>Capacidad de la Unidad Didáctica:</th>
          <td colspan="3"><textarea v-model="unidad.descripcion" placeholder="Descripción de la capacidad"></textarea></td>
        </tr>
        <tr>
          <th>Indicadores de Logro (I.L):</th>
          <td colspan="3">
            <div class="indicadores">
              <div v-for="(il, ilIndex) in unidad.indicadoresLogro" :key="ilIndex" class="indicador-item">
                <span>I.L {{ ilIndex + 1 }}:</span>
                <input v-model="il.indicador" type="text" placeholder="Ingrese el indicador de logro" @input="toUpperCase('indicador', index, ilIndex)" />
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
  </div>

</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      formData: {
        cetpro: 'CEPRO HUANCANÉ',
        programa_estudios: 'PELUQUERIA,BARBERIA',
        ciclo_formativo: 'AUXILIAR TECNICO',
        modalidad: 'PRESENCIAL',
        modulo_formativo: 'PELUQUERIA BARBERIA Y OTROS',
        unidades_competencia: 'Aca de Describe todo lo General Relacionado con La Especialidad',
        docente_id: null,
        periodo_academico: '2024 II',
        horas_semanales: 0,
        fecha_inicio: '',
        fecha_termino: '',
        total_horas: 0,
        total_creditos: 0,
        seccion: 'UNICO',
        turno_id: null
      },
      docentes: [],
      unidades: [
        { nombre_unidad: '', fechaInicio: '', fechaTermino: '', creditos: 0, horas: 0, descripcion: '', indicadoresLogro: [{}] }
      ],
      turnos: [
        { id: 1, descripcion: 'Mañana' },
        { id: 2, descripcion: 'Tarde' },
        { id: 3, descripcion: 'Noche' }
      ]
    };
  },
  created() {
    this.fetchDocentes();
  },
  methods: {
    async fetchDocentes() {
      try {
        const response = await axios.get('http://localhost:5000/api/docentes');
        this.docentes = response.data;
      } catch (error) {
        console.error('Error al recuperar los docentes:', error.response ? error.response.data : error.message);
      }
    },
    toUpperCase(field, index, ilIndex) {
      if (ilIndex !== undefined) {
        this.unidades[index].indicadoresLogro[ilIndex].indicador = this.unidades[index].indicadoresLogro[ilIndex].indicador.toUpperCase();
      } else {
        this.$set(this.unidades, index, {
          ...this.unidades[index],
          [field]: this.unidades[index][field].toUpperCase()
        });
      }
    },
    agregarIndicadorLogro(index) {
      this.unidades[index].indicadoresLogro.push({ indicador: '' });
    },
    eliminarIndicadorLogro(index, ilIndex) {
      this.unidades[index].indicadoresLogro.splice(ilIndex, 1);
    },
    agregarUnidad() {
      this.unidades.push({ nombre_unidad: '', fechaInicio: '', fechaTermino: '', creditos: 0, horas: 0, descripcion: '', indicadoresLogro: [{}] });
    },
    eliminarUnidad(index) {
      this.unidades.splice(index, 1);
    },
    actualizarTotales() {
      this.formData.total_horas = this.unidades.reduce((acc, unidad) => acc + (unidad.horas || 0), 0);
      this.formData.total_creditos = this.unidades.reduce((acc, unidad) => acc + (unidad.creditos || 0), 0);
    },
    async submitForm() {
      try {
        await axios.post('http://localhost:5000/api/especialidad', this.formData);
        alert('Especialidad guardada exitosamente!');
      } catch (error) {
        console.error('Error al guardar la especialidad:', error.response ? error.response.data : error.message);
      }
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

/* Estilo para la sección fija de la sumatoria de créditos y horas */
.sticky-summary {
  position: sticky;
  top: 0;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

/* Estilo para la sección fija de la sumatoria de créditos y horas */
.sticky-summary {
  position: sticky;
  top: 0;
  background-color: #f9f9f9;
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  margin-bottom: 20px;
  border: 1px solid #ddd;
}

/* Asegura que el texto de la sumatoria sea prominente */
.sticky-summary h2 {
  color: #424040;
  margin: 0;
}
</style>
