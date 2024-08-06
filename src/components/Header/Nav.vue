<script>

</script>

<template>
    <header>

        <nav>
            <RouterLink to="/nomina">Agregar Especialidad</RouterLink>
            <RouterLink to="/matricula">Registrar Matrícula</RouterLink>
            <RouterLink to="/registroEstudiante">Registrar Estudiante</RouterLink>
            <RouterLink to="/registroDocente">Registrar Docente</RouterLink>
        </nav>

    </header>


</template>

<style>
header {
    background-color: #921733;
    padding: 20px;
}

nav {
    list-style-type: none;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
}

li {
    margin: 0 10px;
}

a {
    color: #fff;
    text-decoration: none;
    margin: 0px 10px 0 10px;
}

a:hover {
    text-decoration: underline;
    color: #ddd;
}
</style>