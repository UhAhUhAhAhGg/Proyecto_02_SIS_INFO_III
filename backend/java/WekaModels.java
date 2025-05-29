package com.example.weka;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import weka.classifiers.functions.MultilayerPerceptron;
import weka.classifiers.trees.J48;
import weka.clusterers.SimpleKMeans;
import weka.core.Instances;
import weka.core.converters.CSVLoader;

import java.io.File;
import java.util.ArrayList;
import java.util.List;
import java.util.Random;

@RestController
@RequestMapping("/api/weka")
public class WekaModels {

    @PostMapping("/j48")
    public WekaResponse processJ48(@RequestParam("file") MultipartFile file) throws Exception {
        Instances data = loadCsv(file);
        data.setClassIndex(data.numAttributes() - 1);
        J48 tree = new J48();
        tree.buildClassifier(data);
        return new WekaResponse(tree.toString(), "tree", null, null);
    }

    @PostMapping("/cluster")
    public WekaResponse processCluster(@RequestParam("file") MultipartFile file) throws Exception {
        Instances data = loadCsv(file);
        SimpleKMeans kmeans = new SimpleKMeans();
        kmeans.setNumClusters(3);
        kmeans.buildClusterer(data);
        return new WekaResponse(kmeans.toString(), "cluster", null, null);
    }

    @PostMapping("/perceptron")
    public WekaResponse processPerceptron(@RequestParam("file") MultipartFile file) throws Exception {
        // Cargar datos desde el CSV
        Instances data = loadCsv(file);
        data.setClassIndex(data.numAttributes() - 1);

        // Configurar y entrenar el perceptrón
        MultilayerPerceptron mlp = new MultilayerPerceptron();
        String hiddenLayersConfig = calculateHiddenLayers(data); // Dinámico basado en datos
        mlp.setHiddenLayers(hiddenLayersConfig);
        mlp.setLearningRate(0.3);
        mlp.setMomentum(0.2);
        mlp.setTrainingTime(500);
        mlp.buildClassifier(data);

        // Generar estructura de la red
        List<LayerNode> layers = new ArrayList<>();
        List<Connection> connections = new ArrayList<>();
        Random random = new Random();

        // Nodos de entrada (uno por atributo, más sesgo)
        int inputCount = data.numAttributes() - 1;
        for (int i = 0; i < inputCount; i++) {
            String attributeName = data.attribute(i).name();
            layers.add(new LayerNode("input_" + attributeName, "Input"));
        }
        layers.add(new LayerNode("bias", "Input"));

        // Nodos ocultos (basado en hiddenLayersConfig)
        int[] hiddenLayers = parseHiddenLayers(hiddenLayersConfig, inputCount, data.numClasses());
        int hiddenNodeCounter = 1;
        for (int layerIndex = 0; layerIndex < hiddenLayers.length; layerIndex++) {
            int nodesInLayer = hiddenLayers[layerIndex];
            for (int i = 0; i < nodesInLayer; i++) {
                layers.add(new LayerNode("hidden_" + (hiddenNodeCounter++), "Hidden"));
            }
        }

        // Nodos de salida (uno por clase)
        int outputCount = data.numClasses();
        for (int i = 0; i < outputCount; i++) {
            String classValue = data.classAttribute().value(i);
            layers.add(new LayerNode("output_" + classValue, "Output"));
        }

        // Generar conexiones con pesos simulados (distribución normal)
        // Entrada a primera capa oculta
        int prevLayerStart = 0;
        int prevLayerCount = inputCount + 1; // Incluye sesgo
        for (int layerIndex = 0; layerIndex < hiddenLayers.length; layerIndex++) {
            int currentLayerCount = hiddenLayers[layerIndex];
            for (int i = 0; i < prevLayerCount; i++) {
                String fromNode = layers.get(prevLayerStart + i).getId();
                for (int j = 0; j < currentLayerCount; j++) {
                    String toNode = layers.get(prevLayerStart + prevLayerCount + j).getId();
                    double weight = random.nextGaussian() * 0.5; // Media 0, desviación 0.5
                    connections.add(new Connection(fromNode, toNode, Math.max(-1, Math.min(1, weight))));
                }
            }
            prevLayerStart += prevLayerCount;
            prevLayerCount = currentLayerCount;
        }

        // Última capa oculta a salida
        for (int i = 0; i < prevLayerCount; i++) {
            String fromNode = layers.get(prevLayerStart + i).getId();
            for (int j = 0; j < outputCount; j++) {
                String toNode = layers.get(prevLayerStart + prevLayerCount + j).getId();
                double weight = random.nextGaussian() * 0.5;
                connections.add(new Connection(fromNode, toNode, Math.max(-1, Math.min(1, weight))));
            }
        }

        return new WekaResponse(mlp.toString(), "perceptron", layers, connections);
    }

    private Instances loadCsv(MultipartFile file) throws Exception {
        File tempFile = File.createTempFile("weka", ".csv");
        file.transferTo(tempFile);
        CSVLoader loader = new CSVLoader();
        loader.setSource(tempFile);
        Instances data = loader.getDataSet();
        tempFile.delete();
        return data;
    }

    private String calculateHiddenLayers(Instances data) {
        int inputCount = data.numAttributes() - 1;
        int outputCount = data.numClasses();
        // Heurística: (entradas + salidas) / 2, redondeado hacia arriba
        int hiddenNodes = (int) Math.ceil((inputCount + outputCount) / 2.0);
        return String.valueOf(hiddenNodes);
    }

    private int[] parseHiddenLayers(String hiddenLayersConfig, int inputCount, int outputCount) {
        if (hiddenLayersConfig.equals("a")) {
            // Automático: (entradas + salidas) / 2
            int nodes = (int) Math.ceil((inputCount + outputCount) / 2.0);
            return new int[]{nodes};
        }
        try {
            String[] layers = hiddenLayersConfig.split(",");
            int[] result = new int[layers.length];
            for (int i = 0; i < layers.length; i++) {
                result[i] = Integer.parseInt(layers[i].trim());
            }
            return result;
        } catch (NumberFormatException e) {
            // Fallback: 10 nodos en una capa
            return new int[]{10};
        }
    }

    static class WekaResponse {
        private String textResult;
        private String type;
        private List<LayerNode> layers;
        private List<Connection> connections;

        public WekaResponse(String textResult, String type, List<LayerNode> layers, List<Connection> connections) {
            this.textResult = textResult;
            this.type = type;
            this.layers = layers;
            this.connections = connections;
        }

        public String getTextResult() {
            return textResult;
        }

        public String getType() {
            return type;
        }

        public List<LayerNode> getLayers() {
            return layers;
        }

        public List<Connection> getConnections() {
            return connections;
        }
    }

    static class LayerNode {
        private String id;
        private String type;

        public LayerNode(String id, String type) {
            this.id = id;
            this.type = type;
        }

        public String getId() {
            return id;
        }

        public String getType() {
            return type;
        }
    }

    static class Connection {
        private String from;
        private String to;
        private double weight;

        public Connection(String from, String to, double weight) {
            this.from = from;
            this.to = to;
            this.weight = weight;
        }

        public String getFrom() {
            return from;
        }

        public String getTo() {
            return to;
        }

        public double getWeight() {
            return weight;
        }
    }
}