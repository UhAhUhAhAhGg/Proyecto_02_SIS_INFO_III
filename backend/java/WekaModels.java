import weka.classifiers.trees.J48;
import weka.classifiers.functions.MultilayerPerceptron;
import weka.clusterers.SimpleKMeans;
import weka.core.Instances;
import weka.core.converters.CSVLoader;

import java.io.*;

public class WekaModels {

    public static void main(String[] args) throws Exception {
        if (args.length < 2) {
            System.out.println("Uso: java -cp weka.jar;. WekaModels <modelo> <ruta_csv>");
            return;
        }

        String modelo = args[0];
        String rutaCSV = args[1];

        CSVLoader loader = new CSVLoader();
        loader.setSource(new File(rutaCSV));
        Instances data = loader.getDataSet();

        if (modelo.equalsIgnoreCase("j48") || modelo.equalsIgnoreCase("perceptron")) {
            data.setClassIndex(data.numAttributes() - 1);
        }

        switch (modelo.toLowerCase()) {
            case "j48":
                J48 tree = new J48();
                tree.buildClassifier(data);
                System.out.println(tree.toString());
                break;
            case "cluster":
                SimpleKMeans kmeans = new SimpleKMeans();
                kmeans.setNumClusters(3);
                kmeans.buildClusterer(data);
                System.out.println(kmeans.toString());
                break;
            case "perceptron":
                MultilayerPerceptron mlp = new MultilayerPerceptron();
                mlp.buildClassifier(data);
                System.out.println(mlp.toString());
                break;
            default:
                System.out.println("Modelo no reconocido.");
        }
    }
}
