// server.js
const express = require("express");
const cors = require("cors");
const multer = require("multer");
const csv = require("csv-parser");
const fs = require("fs");
const { exec } = require("child_process");

exec('java -version', (err, stdout, stderr) => {
  if (err) {
    console.error('Error ejecutando java -version:', err);
    return;
  }
  console.log('Versión de Java en backend:');
  console.log(stderr); // java -version escribe en stderr
});


const path = require("path");
const conexion = require("./db"); // Conexión MySQL
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Configuración de multer para subir archivos
const upload = multer({ dest: "uploads/" });

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
app.post("/upload-csv", upload.single("file"), (req, res) => {
  const results = [];
  fs.createReadStream(req.file.path)
    .pipe(csv())
    .on("data", (data) => results.push(data))
    .on("end", () => {
      fs.unlinkSync(req.file.path); // eliminar archivo temporal
      res.json(results);
    });
});

/*=========================
     WEKA - Java Backend
===========================*/

// Ejecutar modelo de WEKA (j48, cluster, perceptron)
// Modifica la ruta de WEKA en server.js
  app.post("/api/weka/:modelo", upload.single("file"), async (req, res) => {
    const modelo = req.params.modelo.toLowerCase();
    const filePath = req.file.path;

    try {
      // Ejecutar el modelo WEKA y obtener resultados
      const wekaResult = await executeWekaModel(modelo, filePath);
      
      // Procesar resultados para gráficas
      const graphData = processWekaResults(modelo, wekaResult);
      
      fs.unlink(filePath, () => {});
      
      res.json({
        textResult: wekaResult,
        graphData: graphData
      });
    } catch (error) {
      console.error(`Error: ${error}`);
      fs.unlink(filePath, () => {});
      res.status(500).json({ 
        error: "Error al ejecutar WEKA", 
        detalle: error.message 
      });
    }
  });

  // Función para ejecutar WEKA
  function executeWekaModel(modelo, filePath) {
    return new Promise((resolve, reject) => {
      const classpathSeparator = process.platform === "win32" ? ";" : ":";
      const javaCommand = `java -cp weka-stable-3-8-6.jar${classpathSeparator}java WekaModels ${modelo} ${filePath}`;

      exec(javaCommand, { maxBuffer: 1024 * 1024 * 10 }, (error, stdout) => {
        if (error) {
          reject(error);
        } else {
          resolve(stdout);
        }
      });
    });
  }

  // Función para procesar resultados de WEKA y generar datos para gráficas
  function processWekaResults(modelo, wekaResult) {
    switch(modelo) {
      case 'j48':
        return processJ48Results(wekaResult);
      case 'cluster':
        return processClusterResults(wekaResult);
      case 'perceptron':
        return processPerceptronResults(wekaResult);
      default:
        return null;
    }
  }

  // Procesar resultados del árbol J48
  function processJ48Results(result) {
    const lines = result.split('\n').filter(line => line.trim().length > 0);
    if (lines.length === 0) return { type: 'tree', data: { name: "Empty Tree" } };

    const root = {
      name: lines[0].trim(),
      children: []
    };

    const stack = [{ node: root, depth: 0 }];

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i];
      const depth = (line.match(/\|/g) || []).length;
      const text = line.trim().replace(/\|/g, '').trim();
      const isLeaf = line.includes(":");

      const newNode = {
        name: text,
        value: isLeaf ? text.split(":")[1].trim() : "",
        itemStyle: {
          color: isLeaf ? '#4ECDC4' : '#be8b08'
        }
      };

      if (!isLeaf) {
        newNode.children = [];
      }

      // Encontrar el padre correcto
      while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
        stack.pop();
      }

      // Añadir el nuevo nodo como hijo del nodo actual
      if (stack.length > 0) {
        const parent = stack[stack.length - 1].node;
        if (!parent.children) {
          parent.children = [];
        }
        parent.children.push(newNode);
      }

      // Solo apilar nodos que no son hojas
      if (!isLeaf) {
        stack.push({ node: newNode, depth: depth });
      }
    }

    return {
      type: 'tree',
      data: root
    };
  }

  
  // Procesar resultados de clustering
  function processClusterResults(result) {
    // Extraer información de clusters
    const lines = result.split('\n');
    const clusters = [];
    
    lines.forEach(line => {
      if (line.includes("Cluster") && line.includes(":")) {
        const clusterInfo = line.split(":");
        const clusterId = parseInt(clusterInfo[0].replace("Cluster", "").trim());
        const instances = clusterInfo[1].trim();
        
        clusters.push({
          cluster: clusterId,
          instances: parseInt(instances)
        });
      }
    });
    
    return {
      type: 'bar',
      data: clusters
    };
  }

  // Procesar resultados del perceptrón
  function processPerceptronResults(result) {
    // Extraer información de la red neuronal
    const lines = result.split('\n');
    const networkInfo = {
      layers: [],
      connections: []
    };
    
    lines.forEach(line => {
      if (line.includes("Sigmoid Node") || line.includes("Linear Node")) {
        const nodeType = line.includes("Sigmoid") ? "hidden" : "output";
        networkInfo.layers.push({
          type: nodeType,
          id: line.split("[")[1].split("]")[0]
        });
      } else if (line.includes("Weights")) {
        const parts = line.split("Weights")[1].trim().split(" ");
        networkInfo.connections.push({
          from: parts[0].replace(/[\[\]]/g, ""),
          to: parts[2].replace(/[\[\]]/g, ""),
          weight: parseFloat(parts[4])
        });
      }
    });
    
    return {
      type: 'network',
      data: networkInfo
    };
  }

/*=========================
      INICIAR SERVIDOR
===========================*/

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
