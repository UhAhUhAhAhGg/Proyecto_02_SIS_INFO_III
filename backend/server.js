// server.js
const express = require("express");
const cors = require("cors");
const multer = require('multer');
const csv = require('csv-parser');
const fs = require('fs');
const { exec } = require("child_process");
const path = require("path");
const conexion = require("./db"); // Conexión MySQL
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuración de multer para subir archivos
const upload = multer({ dest: 'uploads/' });

/*=========================
  RUTAS BÁSICAS DE USUARIOS
===========================*/

// Ruta principal
app.get("/", (req, res) => {
    res.send("¡Servidor funcionando correctamente! 🚀");
});

// Obtener todos los usuarios
app.get("/api/usuarios", (req, res) => {
    conexion.query("SELECT * FROM usuarios", (err, resultados) => {
        if (err) return res.status(500).send(err);
        res.json(resultados);
    });
});

// Crear nuevo usuario
app.post("/api/usuarios", (req, res) => {
    const { nombre, email } = req.body;
    const sql = "INSERT INTO usuarios (nombre, email) VALUES (?, ?)";
    conexion.query(sql, [nombre, email], (err, resultado) => {
        if (err) return res.status(500).send(err);
        res.json({ id: resultado.insertId, nombre, email });
    });
});

// Eliminar usuario
app.delete("/api/usuarios/:id", (req, res) => {
    const id = req.params.id;
    conexion.query("DELETE FROM usuarios WHERE id = ?", [id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: "Usuario eliminado" });
    });
});

// Actualizar usuario
app.put("/api/usuarios/:id", (req, res) => {
    const id = req.params.id;
    const { nombre, email } = req.body;
    const sql = "UPDATE usuarios SET nombre = ?, email = ? WHERE id = ?";
    conexion.query(sql, [nombre, email, id], (err) => {
        if (err) return res.status(500).send(err);
        res.json({ mensaje: "Usuario actualizado" });
    });
});

/*=========================
   CARGA Y LECTURA DE CSV
===========================*/

// Leer CSV como JSON para pruebas
app.post('/upload-csv', upload.single('file'), (req, res) => {
    const results = [];
    fs.createReadStream(req.file.path)
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            fs.unlinkSync(req.file.path); // eliminar archivo temporal
            res.json(results);
        });
});

/*=========================
     WEKA - Java Backend
===========================*/

// Ejecutar modelo de WEKA (j48, cluster, perceptron)
app.post('/api/weka/:modelo', upload.single('file'), (req, res) => {
    const modelo = req.params.modelo.toLowerCase();
    const filePath = req.file.path;

    // ⚠️ IMPORTANTE: Usa ; en Windows, : en Linux/Mac
    const classpathSeparator = process.platform === 'win32' ? ';' : ':';
    const javaCommand = `java -cp weka-stable-3-8-6.jar${classpathSeparator}java WekaModels ${modelo} ${filePath}`;

    exec(javaCommand, (error, stdout, stderr) => {
        fs.unlink(filePath, () => {}); // eliminar CSV temporal

        if (error) {
            console.error(`Error: ${stderr}`);
            return res.status(500).json({ error: 'Error al ejecutar WEKA', detalle: stderr });
        }

        res.json({ resultado: stdout });
    });
});

/*=========================
      INICIAR SERVIDOR
===========================*/

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
