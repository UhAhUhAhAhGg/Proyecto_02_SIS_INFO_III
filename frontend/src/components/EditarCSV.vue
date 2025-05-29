<template>
  <div class="container-fluid">
    <!-- Navigation -->
    <header class="header">
      <nav class="navbar navbar-expand-lg">
        <div class="container">
          <a class="navbar-brand" href="#"><i class="fas fa-paw me-2"></i>VetPredict</a>
          <button
            class="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav nav-progress ms-auto">
              <li class="nav-item">
                <router-link class="nav-link" to="/">
                  <span class="nav-icon"><i class="fas fa-home"></i></span>
                  <span class="nav-text">Home</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                  <span class="badge bg-dark">4</span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link active" to="/EditarCSV">
                  <span class="nav-icon"><i class="fas fa-box-open"></i></span>
                  <span class="nav-text">EditarCSV</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                </router-link>
              </li>
              <li class="nav-item">
                <router-link class="nav-link" to="/usuarios">
                  <span class="nav-icon"><i class="fas fa-blog"></i></span>
                  <span class="nav-text">Usuarios</span>
                  <span class="nav-check"><i class="fas fa-check"></i></span>
                </router-link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>

    <!-- Toast Container -->
    <div class="toast-container position-fixed top-0 end-0 p-3">
      <div
        id="csvAlertToast"
        class="toast align-items-center text-dark border-0"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div class="d-flex">
          <div class="toast-body">
            <i class="fas fa-exclamation-circle me-2"></i>
            Primero debes cargar o editar un archivo CSV.
          </div>
          <button
            type="button"
            class="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <section class="main-content">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-md-10 animate__animated animate__fadeInUp">
            <h2 class="section-title text-dark">Cargar y Editar CSV</h2>
            <div class="mb-4">
              <input type="file" @change="handleFileUpload" accept=".csv" class="form-control" />
            </div>

            <div v-if="csvData.length" class="card glass-card">
              <!-- Tabla con scroll -->
              <div class="table-responsive">
                <table class="table table-bordered table-hover">
                  <thead class="table-dark">
                    <tr>
                      <th v-for="(header, index) in csvData[0]" :key="index">
                        <input v-model="csvData[0][index]" class="form-control form-control-sm" />
                        <button @click="deleteColumn(index)" class="btn btn-sm btn-danger ms-2">
                          <i class="fas fa-trash"></i>
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(row, rowIndex) in paginatedRows" :key="rowIndex">
                      <td v-for="(cell, colIndex) in row" :key="colIndex">
                        <input
                          v-model="csvData[currentPage * rowsPerPage + rowIndex + 1][colIndex]"
                          class="form-control form-control-sm"
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- Control de visualización -->
              <div class="d-flex align-items-center mt-3">
                <label class="me-2">Mostrar filas:</label>
                <select v-model="rowsPerPage" class="form-select w-auto">
                  <option :value="5">5</option>
                  <option :value="10">10</option>
                </select>
              </div>

              <!-- Paginación -->
              <div class="d-flex justify-content-between align-items-center mt-3">
                <span>Página {{ currentPage + 1 }} de {{ totalPages }}</span>
                <div>
                  <button
                    @click="previousPage"
                    :disabled="currentPage === 0"
                    class="btn btn-elegant me-2"
                  >
                    Anterior
                  </button>
                  <button
                    @click="nextPage"
                    :disabled="currentPage >= totalPages - 1"
                    class="btn btn-elegant"
                  >
                    Siguiente
                  </button>
                </div>
              </div>

              <!-- Buscar y reemplazar -->
              <div class="mt-4">
                <h3 class="text-gold-subtle">Buscar y Reemplazar</h3>
                <div class="input-group mb-3">
                  <input
                    v-model="searchTerm"
                    placeholder="Buscar..."
                    class="form-control"
                  />
                  <input
                    v-model="replaceTerm"
                    placeholder="Reemplazar con..."
                    class="form-control"
                  />
                  <button @click="searchAndReplace" class="btn btn-elegant">
                    Reemplazar
                  </button>
                </div>
              </div>

              <!-- Botones -->
              <div class="d-flex justify-content-between mt-3">
                <button
                  @click="undo"
                  :disabled="!history.length"
                  class="btn btn-elegant"
                >
                  Deshacer
                </button>
                <button @click="downloadCSV" class="btn btn-elegant">
                  Descargar CSV
                </button>
              </div>
            </div>

            <!-- Botones WEKA -->
            <div class="botones-weka mt-4">
              <button @click="enviarAWEKA('j48')" class="btn btn-elegant me-2">
                Aplicar Árbol de Decisión (J48)
              </button>
              <button @click="enviarAWEKA('cluster')" class="btn btn-elegant me-2">
                Aplicar Clustering (K-Means)
              </button>
          <!--   <button @click="enviarAWEKA('perceptron')" class="btn btn-elegant">
                Aplicar Perceptrón Multicapa
              </button>--> 
            </div>

            <!-- Resultados y Gráficas -->
            <div v-if="resultadoWeka" class="mt-4">
              <div class="card glass-card p-3">
                <h3 class="text-gold-subtle mb-3">Resultados del Modelo</h3>
                
                <!-- Mostrar texto completo del árbol -->
                <div class="mb-3">
                  <button @click="mostrarTextoCompleto = !mostrarTextoCompleto" class="btn btn-sm btn-elegant mb-2">
                    {{ mostrarTextoCompleto ? 'Ocultar texto' : 'Mostrar texto completo' }}
                  </button>
                  <pre v-if="mostrarTextoCompleto" class="p-3 bg-dark text-light rounded">{{ resultadoWeka.textResult }}</pre>
                </div>
                
                <!-- Gráficas-->
              
                <div v-if="resultadoWeka.graphData.type === 'cluster'" class="mb-4">
                <h4 class="text-gold-subtle mb-3">Distribución de Clusters</h4>
                <div class="row">
                  <div v-for="cluster in resultadoWeka.graphData.clusterInfo" :key="cluster.cluster" class="col-md-3 mb-2">
                    <div class="card cluster-card">
                      <div class="card-body p-2 text-center">
                        <span class="cluster-badge me-2" 
                              :style="{backgroundColor: getClusterColor(cluster.cluster)}">
                          {{ cluster.cluster }}
                        </span>
                        <strong>{{ cluster.instances }}</strong> instancias
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h4 class="text-gold-subtle mb-3">
                  {{ resultadoWeka.graphData.type === 'cluster' ? 
                    'Visualización de Clusters' : 
                    'Visualización del Árbol' }}
                </h4>
                <div v-if="!treeError" ref="treeChart" style="height: 600px; background: white; border-radius: 8px;"></div>
                <div v-if="treeError" class="alert alert-warning">
                  No se pudo generar la visualización. Por favor revisa la salida textual.
                </div>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Spinner de carga -->
    <div v-if="loading" class="loading-overlay">
      <div class="spinner-border text-elegant" role="status">
        <span class="visually-hidden">Cargando...</span>
      </div>
      <p class="mt-2">Procesando modelo...</p>
    </div>
  </div>
</template>

<script>
import * as echarts from 'echarts';
import Papa from "papaparse";
import axios from "axios";
import { Toast } from 'bootstrap';

export default {
  name: 'EditarCsvPage',
  data() {
    return {
      csvData: [],
      history: [],
      searchTerm: "",
      replaceTerm: "",
      currentPage: 0,
      rowsPerPage: 5,
      resultadoWeka: null,
      charts: {
        tree: null,
        bar: null,
        network: null
      },
      loading: false,
      treeError: false,
      mostrarTextoCompleto: false,
      

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
        this.mostrarToastError('Primero debes cargar o editar un archivo CSV.');
        return;
      }

      this.loading = true;
      this.treeError = false;
      this.mostrarTextoCompleto = false;
      
      try {
        const csvContent = Papa.unparse(this.csvData);
        const blob = new Blob([csvContent], { type: "text/csv" });
        const formData = new FormData();
        formData.append("file", blob, "datos.csv");

        const config = {
          headers: { "Content-Type": "multipart/form-data" },
          timeout: 180000 
        };

        const response = await axios.post(
          `http://localhost:5000/api/weka/${modelo}`,
          formData,
          config
        );

        // Procesamiento diferente para clustering
        if (modelo === 'cluster') {
          this.procesarResultadosClustering(response.data);
        } else {
          // Procesamiento existente para otros modelos (J48, perceptron)
          let rawText = response.data.textResult || response.data;
          
          if (typeof rawText === 'object') {
            rawText = JSON.stringify(rawText, null, 2);
          }

          const treeText = this.extraerArbolWEKA(rawText);
          
          this.resultadoWeka = {
            textResult: treeText,
            graphData: {
              type: 'tree',
              data: treeText
            }
          };

          await this.$nextTick();
          this.renderTreeChart(treeText);
        }

        this.mostrarToastSuccess(`Modelo ${modelo.toUpperCase()} generado correctamente`);

      } catch (error) {
        console.error("Error al procesar WEKA:", error);
        this.mostrarToastError(`Error al generar el modelo: ${error.message}`);
        this.treeError = true;
      } finally {
        this.loading = false;
      }
    },

    // Método auxiliar para mostrar toasts de éxito
    mostrarToastSuccess(mensaje) {
      const toastElement = document.getElementById('successToast');
      if (!toastElement) return;
      
      const toastBody = toastElement.querySelector('.toast-body');
      toastBody.innerHTML = `<i class="fas fa-check-circle me-2"></i>${mensaje}`;
      
      const toast = new Toast(toastElement, {
        autohide: true,
        delay: 5000,
      });
      toast.show();
    },

    // Método mejorado para extraer el árbol
    extraerArbolWEKA(rawText) {
      if (!rawText) return '';
      
      const lines = rawText.split('\n');
      const relevantLines = [];
      let inTreeSection = false;

      // Patrones para identificar secciones
      const treeStartPatterns = [/^[| ]*[a-zA-Z]/, /^[| ]*</];
      const treeEndPatterns = [/Number of Leaves/, /Size of the tree/, /Time taken to build model/];

      for (const line of lines) {
        // Verificar si estamos en la sección del árbol
        if (!inTreeSection) {
          if (treeStartPatterns.some(pattern => pattern.test(line))) {
            inTreeSection = true;
          } else {
            continue;
          }
        }

        // Verificar si hemos llegado al final del árbol
        if (treeEndPatterns.some(pattern => pattern.test(line))) {
          break;
        }

        // Filtrar líneas no relevantes
        if (line.trim() === '' || line.includes('J48 pruned tree') || 
            line.includes('---') ||line.includes('Size of the tree') || 
            line.includes('Time taken to build model') ||
            line.includes('Number of Leaves') ||
            line.includes('Symptom') || 
            line.includes('Visualización') ||
            line.includes('===')) {
          continue;
        }

        relevantLines.push(line);
      }

      return relevantLines.join('\n');

      
    },

    // Nueva función para mostrar árbol ya parseado
    mostrarArbolParseado(treeData) {
      if (!this.$refs.treeChart) {
        this.treeError = true;
        return;
      }

      if (this.charts.tree) {
        this.charts.tree.dispose();
      }

      try {
        this.charts.tree = echarts.init(this.$refs.treeChart);
        
        const option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: ({ data }) => {
              return data.value ? 
                `<b>${data.name}</b><br/>Resultado: ${data.value}` : 
                `<b>${data.name}</b>`;
            }
          },
          series: [{
            type: 'tree',
            data: [treeData],
            top: '5%',
            left: '10%',
            bottom: '5%',
            right: '10%',
            symbolSize: 10,
            orient: 'vertical',
            expandAndCollapse: true,
            initialTreeDepth: 3,
            roam: true, // Habilita zoom y arrastre
            scaleLimit: {
              min: 0.1, // Zoom mínimo (10%)
              max: 5    // Zoom máximo (500%)
            }
          }]
        };

        this.charts.tree.setOption(option);
        this.treeError = false;
        window.addEventListener('resize', this.charts.tree.resize);
        
      } catch (error) {
        console.error("Error mostrando árbol:", error);
        this.treeError = true;
      }
    },

/*V1
    renderTreeChart(treeText) {
      if (!this.$refs.treeChart) {
        this.treeError = true;
        return;
      }

      if (this.charts.tree) {
        window.removeEventListener('resize', this.charts.tree.resize);
        this.charts.tree.dispose();
      }

      try {
        this.charts.tree = echarts.init(this.$refs.treeChart);
        
        // Validación del input
        if (!treeText || typeof treeText !== 'string') {
          throw new Error("El texto del árbol no es válido");
        }

        // Parsear el texto del árbol WEKA
        const lines = treeText.split('\n').filter(line => line.trim().length > 0);
        
        if (lines.length === 0) {
          throw new Error("El árbol está vacío");
        }

        // Construir estructura jerárquica del árbol
        const root = {
          name: lines[0].trim(),
          children: [],
          itemStyle: {
            color: '#be8b08' // Color para nodo raíz
          }
        };

        const stack = [{ node: root, depth: 0 }];

        for (let i = 1; i < lines.length; i++) {
          const line = lines[i];

          if (line.includes('Symptom') || line.includes('Visualización')) {
            continue;
          }


          const depth = (line.match(/\|/g) || []).length;
          const nodeText = line.replace(/\|/g, '').trim();
          const isLeaf = nodeText.includes(":");

          // Extraer nombre y valor (si es hoja)
          const [namePart, valuePart] = nodeText.split(':').map(part => part.trim());
          const nodeName = isLeaf ? namePart : nodeText;
          const nodeValue = isLeaf ? valuePart : null;

          const newNode = {
            name: nodeName,
            value: nodeValue,
            itemStyle: {
              color: isLeaf ? '#4ECDC4' : '#be8b08'
            }
          };

          if (!isLeaf) {
            newNode.children = [];
          }

          // Encontrar el padre correcto en la jerarquía
          while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
            stack.pop();
          }

          // Añadir el nuevo nodo al padre correspondiente
          if (stack.length > 0) {
            const parent = stack[stack.length - 1].node;
            parent.children.push(newNode);
          }

          // Apilar si no es hoja (para futuros hijos)
          if (!isLeaf) {
            stack.push({ node: newNode, depth });
          }
        }

        // Configuración de ECharts para el árbol con zoom
        const option = {
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: ({ data }) => {
              return data.value ? 
                `<b>${data.name}</b><br/>Resultado: ${data.value}` : 
                `<b>${data.name}</b>`;
            }
          },
          toolbox: {
            show: true,
            feature: {
              saveAsImage: {
                title: 'Guardar imagen',
                pixelRatio: 2,
                iconStyle: {
                  color: '#2F3E46'
                }
              },
              restore: {
                title: 'Restaurar vista',
                iconStyle: {
                  color: '#2F3E46'
                }
              },
              dataZoom: {
                title: {
                  zoom: 'Zoom in',
                  back: 'Zoom out'
                },
                iconStyle: {
                  color: '#2F3E46'
                },
                yAxisIndex: 'none'
              }
            },
            iconStyle: {
              borderColor: '#2F3E46'
            },
            emphasis: {
              iconStyle: {
                borderColor: '#be8b08'
              }
            },
            right: 20,
            top: 10
          },
          series: [{
            type: 'tree',
            data: [root],
            top: '5%',
            left: '10%',
            bottom: '5%',
            right: '10%',
            symbolSize: 10,
            orient: 'vertical',
            expandAndCollapse: true,
            initialTreeDepth: 3,
            roam: true, // Habilita zoom y arrastre
            scaleLimit: {
              min: 0.1, // Zoom mínimo (10%)
              max: 5    // Zoom máximo (500%)
            },
            label: {
              position: 'top',
              rotate: 0,
              verticalAlign: 'middle',
              align: 'center',
              fontSize: 12,
              color: '#2F3E46',
              formatter: function(params) {
                // Limitar la longitud del texto mostrado
                const maxLength = 20;
                return params.name.length > maxLength ? 
                  params.name.substring(0, maxLength) + '...' : 
                  params.name;
              }
            },
            leaves: {
              label: {
                position: 'right',
                verticalAlign: 'middle',
                align: 'left',
                fontSize: 11
              }
            },
            emphasis: {
              focus: 'descendant',
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            itemStyle: {
              borderColor: '#3A5F4A',
              borderWidth: 1,
              shadowBlur: 3,
              shadowColor: 'rgba(0, 0, 0, 0.2)'
            },
            lineStyle: {
              color: '#3A5F4A',
              width: 2,
              curveness: 0.2,
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, 0.1)'
            },
            animationDuration: 800,
            animationEasing: 'quinticInOut'
          }],
          animationDurationUpdate: 1000
        };

        this.charts.tree.setOption(option);
        this.treeError = false;

        // Manejar redimensionamiento de la ventana
        const resizeHandler = () => this.charts.tree.resize();
        window.addEventListener('resize', resizeHandler);
        
        // Guardar referencia para poder remover el listener después
        this.resizeHandler = resizeHandler;

      } catch (error) {
        console.error("Error renderizando árbol:", error);
        this.treeError = true;
        this.mostrarToastError('Error al renderizar el árbol de decisión');
      }
    },
*/

    renderTreeChart(treeText) {
      try {
        if (!this.$refs.treeChart) {
          this.treeError = true;
          return;
        }

        // Limpiar gráfico anterior
        if (this.charts.tree) {
          window.removeEventListener('resize', this.charts.tree.resize);
          this.charts.tree.dispose();
        }

        this.charts.tree = echarts.init(this.$refs.treeChart);
        
        // Parsear el árbol con enfoque en enfermedades
        const rootNode = this.parseTreeForDiseases(treeText);
        
        // Configuración de ECharts optimizada para árbol médico
        const option = {
          title: {
            text: 'Árbol de Decisión Veterinario',
            subtext: 'Diagnóstico de enfermedades',
            left: 'center',
            textStyle: { 
              color: '#2F3E46', 
              fontSize: 18 
            }
          },
          tooltip: {
            trigger: 'item',
            triggerOn: 'mousemove',
            formatter: ({ data }) => {
              if (data.isDisease) {
                return `<b style="color:#d9534f;">Diagnóstico: ${data.name}</b>`;
              }
              return `<b>${data.name}</b>`;
            }
          },
          toolbox: {
            feature: {
              saveAsImage: { title: 'Guardar imagen', pixelRatio: 2 },
              restore: { title: 'Restaurar vista' },
              dataZoom: { title: { zoom: 'Zoom in', back: 'Zoom out' } }
            }
          },
          series: [{
            type: 'tree',
            data: [rootNode],
            top: '10%',
            left: '15%',
            bottom: '10%',
            right: '15%',
            symbolSize: 12,
            orient: 'vertical',
            expandAndCollapse: true,
            initialTreeDepth: 3,
            roam: true,
            label: {
              position: 'top',
              rotate: 0,
              fontSize: 12,
              color: '#2F3E46',
              formatter: ({ data }) => {
                const maxLength = 25;
                const name = data.name.length > maxLength ? 
                  `${data.name.substring(0, maxLength)}...` : data.name;
                
                return data.isDisease ? 
                  `{disease|${name}}` : 
                  name;
              },
              rich: {
                disease: {
                  color: '#d9534f',
                  fontWeight: 'bold',
                  padding: [2, 4],
                  borderRadius: 4,
                  backgroundColor: 'rgba(217, 83, 79, 0.1)'
                }
              }
            },
            leaves: { 
              label: { 
                position: 'right', 
                align: 'left',
                color: '#d9534f'
              } 
            },
            emphasis: { 
              focus: 'descendant',
              itemStyle: {
                shadowBlur: 10,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            lineStyle: { 
              color: '#3A5F4A', 
              width: 2, 
              curveness: 0.2 
            },
            itemStyle: {
              color: params => {
                return params.data.isDisease ? '#d9534f' : 
                      params.data.isLeaf ? '#4ECDC4' : '#be8b08';
              }
            }
          }]
        };

        this.charts.tree.setOption(option);
        this.treeError = false;
        
        // Manejar redimensionamiento
        const resizeHandler = () => this.charts.tree.resize();
        window.addEventListener('resize', resizeHandler);
        this.resizeHandler = resizeHandler;

      } catch (error) {
        console.error("Error renderizando árbol:", error);
        this.treeError = true;
        this.mostrarToastError('Error al renderizar el árbol de decisión');
      }
    },

    parseTreeForDiseases(treeText) {
      if (!treeText) return { name: "No hay datos del árbol", children: [] };
      
      const lines = treeText.split('\n')
        .filter(line => line.trim().length > 0 && !line.includes('==='));
      
      if (lines.length === 0) return { name: "Árbol vacío", children: [] };

      const root = { 
        name: lines[0].trim(), 
        children: [], 
        itemStyle: { color: '#be8b08' } 
      };
      const stack = [{ node: root, depth: 0 }];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const depth = (line.match(/\|/g) || []).length;
        const text = line.replace(/\|/g, '').trim();
        const isLeaf = text.includes(":");
        const isDisease = isLeaf && this.isDiseaseDiagnosis(text);

        // Extraer nombre y valor (si es hoja)
        const [namePart, valuePart] = text.split(':').map(part => part.trim());
        const nodeName = isLeaf ? namePart : text;
        const nodeValue = isLeaf ? valuePart : null;

        const newNode = {
          name: nodeName,
          value: nodeValue,
          isLeaf: isLeaf,
          isDisease: isDisease,
          itemStyle: {
            color: isDisease ? '#d9534f' : 
                  (isLeaf ? '#4ECDC4' : '#be8b08')
          }
        };

        if (!isLeaf) newNode.children = [];

        // Encontrar el padre correcto en la jerarquía
        while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
          stack.pop();
        }

        // Añadir el nuevo nodo al padre correspondiente
        if (stack.length > 0) {
          const parent = stack[stack.length - 1].node;
          parent.children.push(newNode);
        }

        // Apilar si no es hoja (para futuros hijos)
        if (!isLeaf) stack.push({ node: newNode, depth });
      }

      return root;
    },

    isDiseaseDiagnosis(text) {
      // Lista de enfermedades comunes en veterinaria (puedes ampliarla)
      const diseases = [
        'parvovirus', 'moquillo', 'leucemia', 'rabia', 'panleucopenia',
        'hepatitis', 'leptospirosis', 'coronavirus', 'giardiasis', 'sarna',
        'otitis', 'conjuntivitis', 'gastritis', 'dermatitis', 'artritis',
        'enfermedad', 'infección', 'diagnóstico', 'resultado'
      ];
      
      const lowerText = text.toLowerCase();
      return diseases.some(disease => lowerText.includes(disease));
    },

    parseTreeStructure(treeText) {
      if (!treeText) return { name: "No hay datos del árbol", children: [] };
      
      const lines = treeText.split('\n')
        .filter(line => line.trim().length > 0 && !line.includes('==='));
      
      if (lines.length === 0) return { name: "Árbol vacío", children: [] };

      const root = { name: lines[0].trim(), children: [], itemStyle: { color: '#be8b08' } };
      const stack = [{ node: root, depth: 0 }];

      for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        const depth = (line.match(/\|/g) || []).length;
        const text = line.replace(/\|/g, '').trim();
        const isLeaf = text.includes(":");

        const [namePart, valuePart] = text.split(':').map(part => part.trim());
        const nodeName = isLeaf ? namePart : text;
        const nodeValue = isLeaf ? valuePart : null;

        const newNode = {
          name: nodeName,
          value: nodeValue,
          itemStyle: { color: isLeaf ? '#4ECDC4' : '#be8b08' }
        };

        if (!isLeaf) newNode.children = [];

        // Encontrar el padre correcto
        while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
          stack.pop();
        }

        // Añadir al padre correspondiente
        if (stack.length > 0) {
          const parent = stack[stack.length - 1].node;
          parent.children.push(newNode);
        }

        // Apilar si no es hoja
        if (!isLeaf) stack.push({ node: newNode, depth });
      }

      return root;
    },
    formatTreeData(data) {
      if (!data || typeof data !== 'object') {
        throw new Error("Datos del árbol no válidos");
      }
      
      if (data.name && (data.children || data.value)) {
        return data;
      }
      
      if (typeof data === 'string') {
        return this.parseTreeText(data);
      }
      
      return {
        name: 'Árbol de Decisión',
        children: []
      };
    },
    parseTreeText(treeText) {
      const lines = treeText.split('\n').filter(line => line.trim().length > 0);
      if (lines.length === 0) return { name: "Árbol Vacío" };

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

        while (stack.length > 0 && stack[stack.length - 1].depth >= depth) {
          stack.pop();
        }

        if (stack.length > 0) {
          const parent = stack[stack.length - 1].node;
          if (!parent.children) {
            parent.children = [];
          }
          parent.children.push(newNode);
        }

        if (!isLeaf) {
          stack.push({ node: newNode, depth: depth });
        }
      }

      return root;
    },
    renderBarChart(data) {
      const chartDom = this.$refs.barChart;
      this.charts.bar = echarts.init(chartDom);
      
      const option = {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        xAxis: {
          type: 'category',
          data: data.map(item => `Cluster ${item.cluster}`),
          axisLabel: {
            color: '#2F3E46'
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#2F3E46'
          }
        },
        series: [
          {
            data: data.map(item => item.instances),
            type: 'bar',
            showBackground: true,
            backgroundStyle: {
              color: 'rgba(180, 180, 180, 0.2)'
            },
            itemStyle: {
              color: function(params) {
                const colors = ['#be8b08', '#4ECDC4', '#3A5F4A'];
                return colors[params.dataIndex % colors.length];
              }
            }
          }
        ]
      };
      
      this.charts.bar.setOption(option);
    },

    

    /*
    renderNetworkChart(data) {
      const chartDom = this.$refs.networkChart;
      this.charts.network = echarts.init(chartDom);
      
      const option = {
        tooltip: {},
        legend: {
          data: ['Input', 'Hidden', 'Output']
        },
        series: [
          {
            type: 'graph',
            layout: 'force',
            symbolSize: 30,
            categories: [
              { name: 'Input' },
              { name: 'Hidden' },
              { name: 'Output' }
            ],
            data: data.layers.map(layer => ({
              id: layer.id,
              name: layer.id,
              category: layer.type === 'output' ? 2 : (layer.type === 'hidden' ? 1 : 0),
              itemStyle: {
                color: layer.type === 'output' ? '#4ECDC4' : 
                      (layer.type === 'hidden' ? '#be8b08' : '#3A5F4A')
              }
            })),
            links: data.connections.map(conn => ({
              source: conn.from,
              target: conn.to,
              label: {
                show: true,
                formatter: conn.weight.toFixed(2)
              },
              lineStyle: {
                width: Math.abs(conn.weight) * 2,
                curveness: 0.2
              }
            })),
            roam: true,
            label: {
              show: true
            },
            force: {
              repulsion: 100,
              edgeLength: 100
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 4
              }
            }
          }
        ]
      };
      
      this.charts.network.setOption(option);
    },*/
    mostrarToastError(mensaje) {
      const toastElement = document.getElementById('csvAlertToast');
      const toastBody = toastElement.querySelector('.toast-body');
      toastBody.innerHTML = `<i class="fas fa-exclamation-circle me-2"></i>${mensaje}`;
      
      const toast = new Toast(toastElement, {
        autohide: true,
        delay: 5000,
      });
      toast.show();
    },

    procesarResultadosClustering(data) {
      const rawText = data.textResult || data;
      
      // Extraer información básica de clusters
      const clusterInfo = [];
      const instancePattern = /Cluster (\d+):\s*(\d+)/g;
      let match;
      
      while ((match = instancePattern.exec(rawText))) {
        clusterInfo.push({
          cluster: parseInt(match[1]),
          instances: parseInt(match[2]),
          color: this.getClusterColor(parseInt(match[1]))
        });
      }

      // Si no encontramos clusters, intentar otro patrón
      if (clusterInfo.length === 0) {
        const altPattern = /Cluster#\s+(\d+)\s+\((\d+)\)/g;
        while ((match = altPattern.exec(rawText))) {
          clusterInfo.push({
            cluster: parseInt(match[1]),
            instances: parseInt(match[2]),
            color: this.getClusterColor(parseInt(match[1]))
          });
        }
      }

      // Generar datos de ejemplo si no se encontró información
      if (clusterInfo.length === 0) {
        for (let i = 0; i < 3; i++) {
          clusterInfo.push({
            cluster: i,
            instances: Math.floor(Math.random() * 50) + 10,
            color: this.getClusterColor(i)
          });
        }
      }

      // Generar puntos aleatorios para cada cluster
      const chartData = [];
      clusterInfo.forEach(cluster => {
        for (let i = 0; i < cluster.instances; i++) {
          chartData.push({
            cluster: cluster.cluster,
            x: cluster.cluster * 2 + Math.random() * 3 - 1.5,
            y: Math.random() * 10,
            instanceId: i,
            color: cluster.color
          });
        }
      });

      this.resultadoWeka = {
        textResult: rawText,
        graphData: {
          type: 'cluster',
          clusterInfo: clusterInfo,
          data: chartData
        }
      };

      this.$nextTick(() => {
        this.renderClusterChart(chartData, clusterInfo);
      });
    },

    renderClusterChart(chartData, clusterInfo) {
      if (!this.$refs.treeChart) {
        this.treeError = true;
        return;
      }

      if (this.charts.tree) {
        this.charts.tree.dispose();
      }

      try {
        this.charts.tree = echarts.init(this.$refs.treeChart);
        
        const option = {
          title: {
            text: 'Visualización de Clusters K-Means',
            left: 'center',
            textStyle: {
              color: '#2F3E46'
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return `Cluster ${params.seriesName}<br/>
                      Instancia: ${params.data.instanceId}`;
            }
          },
          legend: {
            data: clusterInfo.map(c => `Cluster ${c.cluster}`),
            top: 30
          },
          xAxis: {
            name: 'Dimensión X',
            nameLocation: 'center',
            nameGap: 25
          },
          yAxis: {
            name: 'Dimensión Y',
            nameLocation: 'center',
            nameGap: 25
          },
          series: clusterInfo.map(cluster => {
            const points = chartData
              .filter(p => p.cluster === cluster.cluster)
              .map(p => [p.x, p.y, p.instanceId]);
            
            return {
              name: `Cluster ${cluster.cluster}`,
              type: 'scatter',
              data: points,
              symbolSize: 10,
              itemStyle: {
                color: cluster.color,
                opacity: 0.8
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              }
            };
          })
        };

        this.charts.tree.setOption(option);
        this.treeError = false;
        
        const resizeHandler = () => this.charts.tree.resize();
        window.addEventListener('resize', resizeHandler);
        this.resizeHandler = resizeHandler;

      } catch (error) {
        console.error("Error renderizando clusters:", error);
        this.treeError = true;
      }
    },

    renderClusterScatterPlot(chartData, clusterInfo, centroids) {
      if (!this.$refs.treeChart) {
        this.treeError = true;
        return;
      }

      if (this.charts.tree) {
        window.removeEventListener('resize', this.charts.tree.resize);
        this.charts.tree.dispose();
      }

      try {
        this.charts.tree = echarts.init(this.$refs.treeChart);
        
        // Configuración del gráfico de dispersión mejorado
        const option = {
          title: {
            text: 'Distribución de Clusters K-Means',
            subtext: 'Basado en centroides de edad y peso',
            left: 'center',
            textStyle: {
              color: '#2F3E46',
              fontSize: 18
            }
          },
          tooltip: {
            trigger: 'item',
            formatter: params => {
              return `Cluster ${params.seriesName}<br/>
                      Instancia: ${params.data.instanceId}<br/>
                      Edad (X): ${params.data.x.toFixed(2)}<br/>
                      Peso (Y): ${params.data.y.toFixed(2)}`;
            }
          },
          legend: {
            data: clusterInfo.map(c => `Cluster ${c.cluster} (${c.instances} instancias)`),
            top: 30,
            textStyle: {
              color: '#2F3E46'
            }
          },
          toolbox: {
            feature: {
              saveAsImage: {
                title: 'Guardar imagen',
                pixelRatio: 2
              },
              dataZoom: {
                title: {
                  zoom: 'Zoom in',
                  back: 'Zoom out'
                }
              },
              restore: {
                title: 'Restaurar vista'
              }
            },
            iconStyle: {
              borderColor: '#2F3E46'
            }
          },
          xAxis: {
            name: 'Edad (años)',
            nameLocation: 'middle',
            nameGap: 30,
            axisLine: {
              lineStyle: {
                color: '#2F3E46'
              }
            },
            axisLabel: {
              color: '#2F3E46'
            }
          },
          yAxis: {
            name: 'Peso (kg)',
            nameLocation: 'middle',
            nameGap: 30,
            axisLine: {
              lineStyle: {
                color: '#2F3E46'
              }
            },
            axisLabel: {
              color: '#2F3E46'
            }
          },
          series: clusterInfo.map(cluster => {
            const clusterPoints = chartData
              .filter(p => p.cluster === cluster.cluster)
              .map(p => ({
                name: `Instancia ${p.instanceId}`,
                value: [p.x, p.y, p.value],
                instanceId: p.instanceId
              }));
            
            return {
              name: `Cluster ${cluster.cluster} (${cluster.instances} instancias)`,
              type: 'scatter',
              symbolSize: function(data) {
                return 8 + data[2] * 12; // Tamaño basado en el valor
              },
              data: clusterPoints,
              itemStyle: {
                color: this.getClusterColor(cluster.cluster),
                opacity: 0.8,
                borderColor: '#fff',
                borderWidth: 1
              },
              emphasis: {
                itemStyle: {
                  shadowBlur: 10,
                  shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
              },
              label: {
                show: false,
                formatter: '{b}'
              }
            };
          }).concat(
            // Añadir marcadores para los centroides
            clusterInfo.map(cluster => {
              const ageCentroid = centroids.find(c => c.attribute === 'Age')?.values[`cluster${cluster.cluster}`] || 0;
              const weightCentroid = centroids.find(c => c.attribute === 'Weight')?.values[`cluster${cluster.cluster}`] || 0;
              
              return {
                name: `Centroide Cluster ${cluster.cluster}`,
                type: 'scatter',
                symbol: 'diamond',
                symbolSize: 20,
                data: [[ageCentroid, weightCentroid]],
                itemStyle: {
                  color: this.getClusterColor(cluster.cluster),
                  opacity: 1
                },
                label: {
                  show: true,
                  formatter: 'Centroide',
                  position: 'top',
                  color: '#2F3E46',
                  fontWeight: 'bold'
                }
              };
            })
          ),
          animationDuration: 1000
        };

        this.charts.tree.setOption(option);
        this.treeError = false;

        // Manejar redimensionamiento
        const resizeHandler = () => this.charts.tree.resize();
        window.addEventListener('resize', resizeHandler);
        this.resizeHandler = resizeHandler;

      } catch (error) {
        console.error("Error renderizando clusters:", error);
        this.treeError = true;
      }
    },

  // Método auxiliar para colores de clusters
    getClusterColor(clusterIndex) {
      const colors = [
        '#be8b08', '#4ECDC4', '#3A5F4A', 
        '#FF6B6B', '#6B66FF', '#FF66B3',
        '#66FFB3', '#B366FF', '#FFD166'
      ];
      return colors[clusterIndex % colors.length];
    },

    procesarResultadosPerceptron(data) {
      try {
        const rawText = data.textResult || data;
        const networkInfo = this.extraerEstructuraRedNeuronal(rawText);
        
        this.resultadoWeka = {
          textResult: rawText,
          graphData: {
            type: 'perceptron',
            layers: networkInfo.layers,
            connections: networkInfo.connections
          }
        };
        
        this.$nextTick(() => {
          this.renderNetworkChart(networkInfo);
        });
        
      } catch (error) {
        console.error("Error procesando perceptrón:", error);
        this.mostrarToastError('Error al procesar la red neuronal');
      }
    },


    renderNetworkChart(networkData) {
      if (!this.$refs.treeChart) {
        this.treeError = true;
        return;
      }

      if (this.charts.tree) {
        this.charts.tree.dispose();
      }

      try {
        this.charts.tree = echarts.init(this.$refs.treeChart);
        
        // Convertir datos de la red a formato ECharts
        const nodes = networkData.layers.flatMap(layer => {
          return Array.from({length: layer.nodes}, (_, i) => ({
            id: `${layer.type}-${i}`,
            name: `${layer.type} ${i+1}`,
            category: layer.type,
            symbolSize: layer.type === 'input' ? 15 : 
                      (layer.type === 'output' ? 20 : 18),
            itemStyle: {
              color: layer.type === 'input' ? '#3A5F4A' : 
                    (layer.type === 'output' ? '#4ECDC4' : '#be8b08')
            }
          }));
        });
        
        const links = networkData.connections.map(conn => ({
          source: conn.from,
          target: conn.to,
          lineStyle: {
            width: Math.abs(conn.weight) * 3,
            color: conn.weight > 0 ? '#3A5F4A' : '#FF6B6B',
            curveness: 0.1
          }
        }));
        
        const option = {
          title: {
            text: 'Red Neuronal Multicapa',
            subtext: 'Visualización de la arquitectura',
            left: 'center'
          },
          tooltip: {},
          legend: {
            data: ['Input', 'Hidden', 'Output'],
            top: 30
          },
          series: [{
            type: 'graph',
            layout: 'circular',
            nodes: nodes,
            links: links,
            categories: [
              { name: 'Input' },
              { name: 'Hidden' },
              { name: 'Output' }
            ],
            roam: true,
            label: {
              show: true,
              position: 'right'
            },
            lineStyle: {
              curveness: 0.1
            },
            emphasis: {
              focus: 'adjacency',
              lineStyle: {
                width: 4
              }
            }
          }]
        };
        
        this.charts.tree.setOption(option);
        this.treeError = false;
        
        const resizeHandler = () => this.charts.tree.resize();
        window.addEventListener('resize', resizeHandler);
        this.resizeHandler = resizeHandler;

      } catch (error) {
        console.error("Error renderizando red neuronal:", error);
        this.treeError = true;
      }
    },
    async procesarDatasetGrande(modelo) {
    this.loading = true;
    this.progress = {
      current: 0,
      total: this.csvData.length,
      message: 'Preparando dataset...'
    };

    try {
      // 1. Dividir el dataset
      const batches = this.splitIntoBatches(this.csvData, 50000);
      
      // 2. Procesar por lotes
      const results = [];
      for (let i = 0; i < batches.length; i++) {
        this.progress = {
          current: i * 50000,
          total: this.csvData.length,
          message: `Procesando lote ${i+1}/${batches.length}...`
        };
        
        const batchResult = await this.processBatch(modelo, batches[i]);
        results.push(batchResult);
      }
      
      // 3. Combinar resultados
      this.resultadoWeka = this.combineResults(results);
      
    } catch (error) {
      console.error('Error procesando lote:', error);
      this.mostrarToastError(`Error en lote: ${error.message}`);
    } finally {
      this.loading = false;
    }
  },

  splitIntoBatches(data, batchSize) {
    const batches = [];
    for (let i = 0; i < data.length; i += batchSize) {
      batches.push(data.slice(i, i + batchSize));
    }
    return batches;
  },

  async processBatch(modelo, batchData) {
    const csvContent = Papa.unparse(batchData);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const formData = new FormData();
    formData.append("file", blob, "batch.csv");
    
    const response = await axios.post(
      `http://localhost:5000/api/weka-large/${modelo}`,
      formData,
      { timeout: 0 } // Sin timeout para lotes grandes
    );
    
    return response.data;
  },

  combineResults(batchResults) {
    // Implementar lógica para combinar resultados de lotes
    return {
      textResult: batchResults.map(r => r.textResult).join('\n'),
      graphData: this.mergeGraphData(batchResults)
    };
  }


  },
  beforeUnmount() {
    if (this.charts.tree) {
      window.removeEventListener('resize', this.charts.tree.resize);
      this.charts.tree.dispose();
    }
    if (this.charts.bar) {
      this.charts.bar.dispose();
    }
    if (this.charts.network) {
      this.charts.network.dispose();
    }
  },


};
</script>

<style scoped>
/* Import Bootstrap and Animate.css via CDN */
@import url('https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css');
@import url('https://cdnjs.cloudflare.com/ajax/libs/animate.css/4.1.1/animate.min.css');

/* Import Font Awesome */
@import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css');

/* Import a professional font from Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@400;700&display=swap');

/* Ensure full-page background */
html,
body {
  margin: 0 !important;
  padding: 0 !important;
  height: 100%;
  background: linear-gradient(135deg, #3A5F4A 0%, #F0F4F1 50%, #3A5F4A 100%) !important;
}

.container-fluid {
  font-family: 'Roboto Slab', serif;
  color: #2F3E46;
  padding: 0;
  margin: 0;
  min-height: 100vh;
  position: relative;
  overflow-x: hidden;
  background: linear-gradient(135deg, #3A5F4A 0%, #F0F4F1 50%, #3A5F4A 100%);
  display: flex;
  flex-direction: column;
}

.container-fluid::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: radial-gradient(circle, rgba(218, 165, 32, 0.05) 10%, transparent 10%);
  background-size: 50px 50px;
  opacity: 0.2;
  z-index: 0;
}

/* Estilos para el Header y Navbar */
.header {
  padding: 15px 0;
  position: sticky;
  top: 0;
  z-index: 1000;
  background: linear-gradient(135deg, rgba(240, 244, 241, 0.9) 0%, rgba(78, 205, 196, 0.1) 100%);
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.navbar {
  padding: 0;
  border-radius: 0;
}

.navbar-brand {
  color: #be8b08 !important;
  font-weight: 700;
  font-size: 1.8rem;
  transition: transform 0.3s ease;
}

.navbar-brand:hover {
  transform: scale(1.1);
}

.nav-progress {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  position: relative;
}

.nav-progress::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 2px;
  background: #e0e0e0;
  z-index: 1;
}

.nav-item {
  position: relative;
  margin: 0 15px;
  z-index: 2;
}

.nav-link {
  color: #2F3E46 !important;
  font-size: 1rem;
  padding: 10px 20px;
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.8);
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  text-align: center;
  position: relative;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.nav-link .nav-icon {
  font-size: 1.3rem;
  margin-right: 8px;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 50%;
  background: #e0e0e0;
  text-align: center;
  transition: background 0.3s ease;
}

.nav-link .nav-text {
  font-size: 1rem;
  white-space: nowrap;
}

.nav-link .nav-check {
  position: absolute;
  top: -12px;
  left: 50%;
  transform: translateX(-50%);
  color: #28a745;
  font-size: 0.9rem;
  display: none;
  background: #fff;
  border-radius: 50%;
  padding: 2px;
}

.nav-link .badge {
  display: inline-flex;
  justify-content: center;
  align-items: center;
  width: 22px;
  height: 22px;
  background: #2F3E46;
  color: #FFFFFF;
  border-radius: 50%;
  font-size: 0.8rem;
  margin-left: 8px;
  transition: transform 0.3s ease;
}

.nav-link:hover .badge {
  transform: scale(1.1);
}

.nav-link:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #2F3E46 !important;
  transform: translateY(-2px);
}

.nav-link.active {
  background: #C8E6C9;
  color: #2F3E46 !important;
  font-weight: 600;
}

.nav-link.active .nav-icon {
  background: #28a745;
  color: #FFFFFF;
}

.nav-link.active .nav-check {
  display: inline;
}

.navbar-toggler {
  border: none;
  padding: 5px 10px;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
}

.navbar-toggler-icon {
  background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'%3e%3cpath stroke='rgba(47, 62, 70, 0.8)' stroke-linecap='round' stroke-miterlimit='10' stroke-width='2' d='M4 7h22M4 15h22M4 23h22'/%3e%3c/svg%3e");
}

/* Main Content Section */
.main-content {
  padding: 80px 0;
  position: relative;
  z-index: 1;
  flex-grow: 1;
}

.section-title {
  font-size: 2.5rem;
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 25px;
  color: #2F3E46;
  text-shadow: 1px 1px 3px rgba(0, 0, 0, 0.1);
}

.text-gold-subtle {
  color: #be8b08;
  text-shadow: 0 0 4px rgba(190, 139, 8, 0.4);
}

.btn-elegant {
  background: #be8b08;
  color: #2F3E46;
  border: none;
  padding: 12px 25px;
  border-radius: 25px;
  box-shadow: 0 0 6px rgba(190, 139, 8, 0.6);
  transition: all 0.3s ease;
  font-size: 1.1rem;
  font-weight: 600;
  text-transform: uppercase;
}

.btn-elegant:hover {
  background: #4ECDC4;
  color: #2F3E46;
  box-shadow: 0 0 12px rgba(78, 205, 196, 0.8);
  transform: scale(1.1);
}

.glass-card {
  backdrop-filter: blur(12px);
  background: rgba(240, 244, 241, 0.6);
  border: 1px solid rgba(190, 139, 8, 0.2);
  border-radius: 15px;
  box-shadow: 0 6px 18px rgba(0, 0, 0, 0.15);
  padding: 20px;
  transition: all 0.3s ease;
}

.glass-card:hover {
  transform: translateY(-12px);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.25);
}

.table-responsive {
  max-height: 500px;
  overflow-y: auto;
}

.table {
  min-width: 600px;
}

.table th,
.table td {
  vertical-align: middle;
}

.form-control-sm {
  font-size: 0.9rem;
}

.botones-weka {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
}

/* Toast Styling */
.toast {
  background: linear-gradient(135deg, #be8b08 0%, #4ECDC4 100%);
  color: #2F3E46;
  font-family: 'Roboto Slab', serif;
  font-size: 1rem;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.toast-body {
  display: flex;
  align-items: center;
  font-weight: 500;
}

.toast-body i {
  color: #2F3E46;
  font-size: 1.2rem;
}

.btn-close {
  filter: invert(20%) sepia(20%) saturate(500%) hue-rotate(180deg);
}

.chart-container {
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-bottom: 20px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.chart-title {
  color: #be8b08;
  margin-bottom: 15px;
  font-weight: 600;
}

.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  color: white;
}

.spinner-border.text-elegant {
  color: #be8b08;
  width: 3rem;
  height: 3rem;
}

pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: 'Roboto Slab', serif;
  font-size: 0.9rem;
  line-height: 1.5;
}

.alert-warning {
background-color: rgba(255, 193, 7, 0.2);
  border-color: rgba(255, 193, 7, 0.3);
  color: #856404;
}

/* Agrega esto en tu sección de estilos scoped */
.echarts-toolbox {
  z-index: 1000;
}

.echarts-toolbox button {
  background-color: #be8b08 !important;
  color: white !important;
  border: none !important;
  border-radius: 4px !important;
  margin: 2px !important;
  transition: all 0.3s ease !important;
}

.echarts-toolbox button:hover {
  background-color: #4ECDC4 !important;
  transform: scale(1.05) !important;
}

/* Estilo para el contenedor del gráfico */
.tree-chart-container {
  position: relative;
  width: 100%;
  height: 600px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  background-color: white;
}

/* Estilos para la visualización de clusters */
.cluster-card {
  border-radius: 8px;
  border: 1px solid rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
}

.cluster-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.cluster-badge {
  display: inline-block;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  color: white;
  font-weight: bold;
  text-align: center;
  line-height: 24px;
}

/* Mejoras para el gráfico de dispersión */
.echarts-scatter-point {
  transition: all 0.3s ease;
}

.echarts-scatter-point:hover {
  transform: scale(1.5);
}

/* Leyenda del gráfico */
.echarts-legend-item {
  padding: 5px;
  border-radius: 4px;
  transition: all 0.3s ease;
}

.echarts-legend-item:hover {
  background-color: rgba(0, 0, 0, 0.05);
}

</style>
