<template>
  <div>
    <h2>Cargar y Editar CSV</h2>
    <input type="file" @change="handleFileUpload" accept=".csv" />

    <div v-if="csvData.length" style="margin-top: 20px">
      <!-- Tabla con scroll -->
      <div style="overflow-x: auto">
        <table border="1" style="min-width: 600px">
          <thead>
            <tr>
              <th v-for="(header, index) in csvData[0]" :key="index">
                <input v-model="csvData[0][index]" />
                <button @click="deleteColumn(index)">🗑</button>
              </th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
              <td v-for="(cell, colIndex) in row" :key="colIndex">
                <input
                  v-model="
                    csvData[currentPage * rowsPerPage + rowIndex + 1][colIndex]
                  "
                />
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <!-- Control de visualización -->
      <div style="margin-top: 10px">
        Mostrar filas:
        <select v-model="rowsPerPage">
          <option :value="5">5</option>
          <option :value="10">10</option>
        </select>
      </div>

      <!-- Paginación -->
      <div style="margin-top: 10px">
        Página {{ currentPage + 1 }} de {{ totalPages }}
        <button @click="previousPage" :disabled="currentPage === 0">
          Anterior
        </button>
        <button @click="nextPage" :disabled="currentPage >= totalPages - 1">
          Siguiente
        </button>
      </div>

      <!-- Buscar y reemplazar -->
      <div style="margin-top: 20px">
        <h3>Buscar y Reemplazar</h3>
        <input v-model="searchTerm" placeholder="Buscar..." />
        <input v-model="replaceTerm" placeholder="Reemplazar con..." />
        <button @click="searchAndReplace">Reemplazar</button>
      </div>

      <!-- Botones -->
      <div style="margin-top: 20px">
        <button @click="undo" :disabled="!history.length">Deshacer</button>
        <button @click="downloadCSV">Descargar CSV</button>
      </div>
    </div>
  </div>

  <div class="botones-weka">
    <button @click="enviarAWEKA('j48')">Aplicar Árbol de Decisión (J48)</button>
    <button @click="enviarAWEKA('cluster')">
      Aplicar Clustering (K-Means)
    </button>
    <button @click="enviarAWEKA('perceptron')">
      Aplicar Perceptrón Multicapa
    </button>
  </div>

  <pre v-if="resultadoWeka">{{ resultadoWeka }}</pre>
</template>

<script>
import Papa from "papaparse";
import axios from "axios";
export default {
  data() {
    return {
      csvData: [],
      history: [],
      searchTerm: "",
      replaceTerm: "",
      currentPage: 0,
      rowsPerPage: 5,
      resultadoWeka: "",
    };
  },
  computed: {
    paginatedRows() {
      const start = this.currentPage * this.rowsPerPage + 1;
      const end = start + this.rowsPerPage;
      return this.csvData.slice(start, end);
    },
    totalPages() {
      return Math.ceil((this.csvData.length - 1) / this.rowsPerPage);
    },
  },
  methods: {
    handleFileUpload(event) {
      const file = event.target.files[0];
      Papa.parse(file, {
        complete: (results) => {
          this.history = [];
          this.csvData = results.data;
          this.currentPage = 0;
        },
      });
    },
    saveState() {
      this.history.push(JSON.parse(JSON.stringify(this.csvData)));
    },
    deleteColumn(colIndex) {
      this.saveState();
      this.csvData = this.csvData.map((row) => {
        const newRow = [...row];
        newRow.splice(colIndex, 1);
        return newRow;
      });
    },
    searchAndReplace() {
      if (!this.searchTerm) return;
      this.saveState();
      this.csvData = this.csvData.map((row) =>
        row.map((cell) =>
          typeof cell === "string" && cell.includes(this.searchTerm)
            ? cell.replaceAll(this.searchTerm, this.replaceTerm)
            : cell
        )
      );
    },
    undo() {
      if (this.history.length) {
        this.csvData = this.history.pop();
      }
    },
    downloadCSV() {
      const csv = Papa.unparse(this.csvData);
      const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.setAttribute("download", "archivo_editado.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    },
    nextPage() {
      if (this.currentPage < this.totalPages - 1) {
        this.currentPage++;
      }
    },
    previousPage() {
      if (this.currentPage > 0) {
        this.currentPage--;
      }
    },
    async enviarAWEKA(modelo) {
      if (!this.csvData || this.csvData.length === 0) {
        alert("Primero debes cargar o editar un archivo CSV.");
        return;
      }

      const csvContent = Papa.unparse(this.csvData);
      const blob = new Blob([csvContent], { type: "text/csv" });
      const formData = new FormData();
      formData.append("file", blob, "datos.csv");

      try {
        const response = await axios.post(
          `http://localhost:5000/api/weka/${modelo}`,
          formData,
          { headers: { "Content-Type": "multipart/form-data" } }
        );
        this.resultadoWeka = response.data;
      } catch (error) {
        console.error("Error al enviar a WEKA:", error);
        this.resultadoWeka = "Error al procesar el archivo.";
      }
    },
  },
};
</script>
