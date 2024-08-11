<template>
  <div class="container">
    <div class="header">
      <h1>ESPECIALIDADES</h1>
      <input 
        type="text" 
        v-model="searchTerm" 
        placeholder="Buscar por Programa de Estudio" 
        class="search-input"
      />
      <button class="agregar-btn" @click="agregarEspecialidad">Agregar Especialidad</button>
    </div>
    <div v-if="filteredEspecialidades.length">
      <div v-for="(especialidad, index) in filteredEspecialidades" :key="index" class="especialidad-card">
        <div class="card-content">
          <h2>{{ especialidad.programa_estudio }}</h2>
          <div class="detalle-container">
            <div class="detalle"><strong>Docente:</strong> <span class="detalle-valor">{{ especialidad.docente_id }}</span></div>
            <div class="detalle"><strong>Ciclo Formativo:</strong> <span class="detalle-valor">{{ especialidad.ciclo_formativo }}</span></div>
            <div class="detalle"><strong>Total de Horas:</strong> <span class="detalle-valor">{{ especialidad.hora_semanal }}</span></div>
            <div class="detalle"><strong>Modalidad:</strong> <span class="detalle-valor">{{ especialidad.modalidad }}</span></div>
            <div class="detalle"><strong>Descripción:</strong> <span class="detalle-valor">{{ especialidad.descripcion_especialidad }}</span></div>
            <div class="detalle"><strong>Periodo Académico:</strong> <span class="detalle-valor">{{ especialidad.periodo_academico }}</span></div>
            <div class="detalle"><strong>Sección:</strong> <span class="detalle-valor">{{ especialidad.seccion }}</span></div>
          </div>
        </div>
        <div class="acciones">
          <button class="accion-btn imprimir" @click="imprimirNomina(index, 'normal')">Imprimir Nómina Normal</button>
          <button class="accion-btn imprimir" @click="imprimirNomina(index, 'ugel')">Imprimir Nómina UGEL</button>
          <button class="accion-btn editar" @click="editarEspecialidad(index)">Editar</button>
          <button class="accion-btn eliminar" @click="eliminarEspecialidad(index)">Eliminar</button>
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
      especialidades: [],
      searchTerm: '' // Valor para el término de búsqueda
    };
  },
  computed: {
    filteredEspecialidades() {
      return this.especialidades.filter(especialidad =>
        especialidad.programa_estudio.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  },
  methods: {
    fetchEspecialidades() {
      const url = `http://127.0.0.1:8000/api/especialidad`;
      fetch(url)
        .then(response => response.json())
        .then(data => {
          this.especialidades = data.especialidades;
        })
        .catch(error => {
          console.error('Error fetching especialidades:', error);
        });
    },
    editarEspecialidad(index) {
      alert(`Editando especialidad: ${this.filteredEspecialidades[index].programa_estudio}`);
    },
    eliminarEspecialidad(index) {
      if (confirm(`¿Seguro que deseas eliminar la especialidad ${this.filteredEspecialidades[index].programa_estudio}?`)) {
        this.filteredEspecialidades.splice(index, 1);
      }
    },
    agregarEspecialidad() {
      this.$router.push({ name: 'nomina' });
    },
    imprimirNomina(index, formato) {
      alert(`Imprimiendo nómina de la especialidad ${this.filteredEspecialidades[index].programa_estudio} en formato ${formato}`);
      // Aquí podrías implementar la lógica para generar e imprimir el archivo PDF en el formato deseado
    }
  },
  mounted() {
    this.fetchEspecialidades(); // Cargar especialidades cuando el componente se monta
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

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

h1 {
  color: #921733;
  font-size: 1.8rem;
  font-weight: bold;
  text-align: left;
}

.agregar-btn {
  background-color: #921733;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.2s ease;
}

.agregar-btn:hover {
  background-color: #a02c40;
}

/* Estilo del input de búsqueda */
.search-input {
  padding: 8px 12px;
  font-size: 1rem;
  border-radius: 3px;
  border: 1px solid #ccc;
  flex-grow: 1; /* Hace que el input tome todo el espacio disponible */
  margin-right: 10px; /* Espacio entre el input y el botón */
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1); /* Sombra interna */
  transition: border-color 0.3s ease;
}

.search-input:focus {
  border-color: #921733;
  outline: none; /* Elimina el borde por defecto al enfocar */
}

/* Estilos para la tarjeta de cada especialidad */
.especialidad-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 20px;
  margin-bottom: 25px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.card-content {
  text-align: left;
  margin-bottom: 10px;
}

.especialidad-card h2 {
  color: #921733;
  margin-bottom: 20px;
  font-size: 1.7rem;
  font-weight: bold;
}

.detalle-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 15px;
}

.detalle {
  color: rgba(16, 16, 16, 0.8);
  font-size: 1.2rem;
}

.detalle-valor {
  font-size: 1.3rem;
  font-weight: bold;
  color: #6a6a6a;
}

/* Botones de acción que aparecen al hacer hover */
.acciones {
  position: absolute;
  top: 10px;
  right: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: rgba(146, 23, 51, 0.8);
  opacity: 0;
  transition: opacity 0.3s ease;
  padding: 10px;
  border-radius: 4px;
}

.especialidad-card:hover .acciones {
  opacity: 1;
}

.accion-btn {
  background-color: #921733;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  text-align: center;
  transition: background-color 0.2s ease;
  margin-bottom: 8px; /* Ajusta la separación entre botones */
  box-sizing: border-box; /* Asegura que el padding no afecte el tamaño total del botón */
}

.accion-btn:hover {
  background-color: #a02c40;
}
</style>
