<template>
  <div class="container">
    <div class="header">
      <h1>DOCENTES</h1>
      <button class="agregar-btn" @click="agregarDocente">Agregar Docente</button>
    </div>
    <div class="search-container">
      <input type="text" v-model="busqueda" placeholder="Buscar por DNI o nombre" @input="buscarDocente" />
    </div>
    
    <div v-if="docentesFiltrados.length">
      <div v-for="(docente, index) in docentesFiltrados" :key="index" class="docente-card">
        <div class="card-content">
          <div class="imagen-docente">
            <img :src="docente.imagen || defaultImage" alt="Foto del docente">
          </div>
          <div class="detalle-container">
            <div class="detalle">
              <strong>Nombre:</strong>
              <span class="detalle-valor">
                {{ docente.nombre }} 
              </span>
            </div>
            <div class="detalle">
              <strong>Apellido:</strong>
              <span class="detalle-valor">
                 {{ docente.apellido_paterno }} {{ docente.apellido_materno }}
              </span>
            </div>
            <div class="detalle"><strong>DNI:</strong> <span class="detalle-valor">{{ docente.dni }}</span></div>
            <div class="detalle"><strong>Celular:</strong> <span class="detalle-valor">{{ docente.celular }}</span></div>
            <div class="detalle"><strong>Correo:</strong> <span class="detalle-valor">{{ docente.correo }}</span></div>
          </div>
        </div>
        <div class="acciones">
          <button class="accion-btn editar" @click="editarDocente(index)">Editar</button>
          <button class="accion-btn eliminar" @click="eliminarDocente(index)">Eliminar</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No se encontraron docentes con esa búsqueda.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      busqueda: '',
      defaultImage: '/img/profe1.jpg',
      docentes: [], // Cambia de una lista estática a un array vacío
      docentesFiltrados: []
    };
  },
  mounted() {
    this.obtenerDocentes();
  },
  methods: {
    obtenerDocentes() {
      fetch('http://127.0.0.1:8000/api/teacher')
        .then(response => response.json())
        .then(data => {
          this.docentes = data.teachers; // Accede al array de docentes en la respuesta
          this.docentesFiltrados = this.docentes;
        })
        .catch(error => {
          console.error('Error al obtener los docentes:', error);
        });
    },
    buscarDocente() {
      const busquedaLower = this.busqueda.trim().toLowerCase();
      this.docentesFiltrados = this.docentes.filter(docente =>
        (docente.dni && docente.dni.includes(busquedaLower)) ||
        (docente.nombre && docente.nombre.toLowerCase().includes(busquedaLower)) ||
        (docente.apellido_paterno && docente.apellido_paterno.toLowerCase().includes(busquedaLower)) ||
        (docente.apellido_materno && docente.apellido_materno.toLowerCase().includes(busquedaLower))
      );
    },
    editarDocente(index) {
      alert(`Editando docente: ${this.docentesFiltrados[index].nombre} ${this.docentesFiltrados[index].apellido_paterno} ${this.docentesFiltrados[index].apellido_materno}`);
    },
    eliminarDocente(index) {
      if (confirm(`¿Seguro que deseas eliminar al docente ${this.docentesFiltrados[index].nombre} ${this.docentesFiltrados[index].apellido_paterno} ${this.docentesFiltrados[index].apellido_materno}?`)) {
        this.docentesFiltrados.splice(index, 1);
      }
    },
    agregarDocente() {
      this.$router.push({ name: 'registerTeacher' });
    }
  }
}
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

.search-container {
  margin-bottom: 20px;
}

.search-container input {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

/* Estilos para la tarjeta de cada docente */
.docente-card {
  background-color: #fff;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 30px; /* Aumentado el padding para mayor espacio interno */
  margin-bottom: 25px; /* Aumentado el margen inferior */
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
}

.card-content {
  text-align: left;
  display: flex;
  align-items: center;
 
}

.imagen-docente {
  margin-right: 20px; /* Aumentar el margen entre la imagen y el contenido */
}

.imagen-docente img {
  width: 100px; /* Aumentado el tamaño de la imagen */
  height: 100px; /* Aumentado el tamaño de la imagen */
  border-radius: 50%;
  object-fit: cover;
}

.detalle-container {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Aumentado el espacio para las etiquetas */
  gap: 15px; /* Mayor espacio entre las filas */
  padding-left: 15px;
  width: 100%;
}

.detalle {
  color: rgba(16, 16, 16, 0.8);
  font-size: 1.2rem; /* Aumentado el tamaño del texto */
}

.detalle-valor {
  font-size: 1.3rem; /* Aumentado el tamaño del texto */
  font-weight: bold;
  color: #6a6a6a;
}

/* Botones de acción que aparecen al hacer hover */
.acciones {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: rgba(146, 23, 51, 0.8);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.docente-card:hover .acciones {
  opacity: 1;
}

.accion-btn {
  background-color: transparent;
  color: white;
  padding: 15px 20px;
  border: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;
  width: 100px;
  text-align: center;
  transition: background-color 0.2s ease;
}

.accion-btn:hover {
  background-color: rgba(0, 0, 0, 0.2);
}
</style>



sabes como quiero que apresca 
la estrucutra eso de los datos que extraes esta deforme 

nombre: .................  apellido............
dni: ...............   celular..............
correo..............