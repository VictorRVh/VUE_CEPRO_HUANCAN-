<script>
export default {
    data() {
        return {
            estudiante: {
                id: '', // Este campo se llenará con el ID generado por la base de datos después de la creación.
                nombre: '',
                apellidoPaterno: '',
                apellidoMaterno: '',
                dni: '',
                sexo: '',
                celular: '',
                correo: ''
            }
        };
    },
    methods: {
        async submitEstudiante() {
            try {
                // Aquí debes hacer una solicitud para guardar los datos en la base de datos.
                // Por ejemplo, usando fetch o axios para enviar los datos al backend:
                const response = await fetch('/api/estudiantes', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(this.estudiante)
                });

                if (!response.ok) {
                    throw new Error('Error al registrar el estudiante');
                }

                // Asignar el ID generado al campo 'id'
                const result = await response.json();
                this.estudiante.id = result.id;

                // Limpiar el formulario si es necesario
                // this.estudiante = { ... }; // Reiniciar los valores si es necesario
            } catch (error) {
                console.error('Error:', error);
            }
        }
    }
};
</script>

<template>
    <div class="container">
        <h2 class="form-title">Registrar Estudiante</h2>

        <form @submit.prevent="submitEstudiante" class="form">
            <!-- Nombre -->
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="nombre" class="form-label">Nombre</label>
                    <input v-model="estudiante.nombre" type="text" id="nombre" class="form-input"
                        placeholder="Nombre completo del estudiante" />
                </div>
            </div>

            <!-- Apellido Paterno -->
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="apellidoPaterno" class="form-label">Apellido Paterno</label>
                    <input v-model="estudiante.apellidoPaterno" type="text" id="apellidoPaterno" class="form-input"
                        placeholder="Apellido Paterno" />
                </div>
            </div>

            <!-- Apellido Materno -->
            <div class="form-row">
                <div class="form-group full-width">
                    <label for="apellidoMaterno" class="form-label">Apellido Materno</label>
                    <input v-model="estudiante.apellidoMaterno" type="text" id="apellidoMaterno" class="form-input"
                        placeholder="Apellido Materno" />
                </div>
            </div>

            <!-- DNI y Sexo -->
            <div class="form-row">
                <div class="form-group half-width">
                    <label for="dni" class="form-label">DNI</label>
                    <input v-model="estudiante.dni" type="text" id="dni" class="form-input"
                        placeholder="DNI del estudiante" />
                </div>

                <div class="form-group half-width">
                    <label for="sexo" class="form-label">Sexo</label>
                    <select v-model="estudiante.sexo" id="sexo" class="form-select">
                        <option value="">Seleccionar</option>
                        <option value="M">Masculino</option>
                        <option value="F">Femenino</option>
                    </select>
                </div>
            </div>

            <!-- Celular y Correo -->
            <div class="form-row">
                <div class="form-group half-width">
                    <label for="celular" class="form-label">Celular</label>
                    <input v-model="estudiante.celular" type="text" id="celular" class="form-input"
                        placeholder="Número de celular" />
                </div>

                <div class="form-group half-width">
                    <label for="correo" class="form-label">Correo</label>
                    <input v-model="estudiante.correo" type="email" id="correo" class="form-input"
                        placeholder="Correo electrónico" />
                </div>
            </div>

            <button type="submit" class="form-button">Registrar</button>

            <!-- Mostrar ID generado después del registro -->
            <div v-if="estudiante.id" class="form-row">
                <div class="form-group full-width">
                    <label for="id" class="form-label">ID del Estudiante</label>
                    <input :value="estudiante.id" type="text" id="id" class="form-input" readonly />
                </div>
            </div>
        </form>
    </div>
</template>


<style scoped>
.container {
    max-width: 500px;
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
</style>