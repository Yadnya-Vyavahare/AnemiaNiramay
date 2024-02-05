import React, { useState, useEffect,useRef } from 'react';
import { View, StyleSheet,Dimensions,Button, ScrollView, ActivityIndicator, Text } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import axios from 'axios';
import config from '../config';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const BarGraph = () => {
  const [recoveryData, setRecoveryData] = useState([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/recovery`);
        setRecoveryData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, []);

  const chartWidth = Dimensions.get('window').width * 1.5;
  const viewShot = useRef(null);
  const captureScreen = () => {
    viewShot.current.capture().then((uri) => {
      console.log('Captured URI:', uri);
      // Generate PDF and share code here
      generatePdf(uri);
    });
  };


  const generatePdf = async (capturedUri) => {
    try {
      const options = {
        html: `
          <html>
           
            <body>
              <!-- College Name -->
              <div style="flex-grow: 1; text-align: center;">
                <h2>Cummins College</h2>
              </div>
 
              <!-- Graph Heading -->
              <h1>Bar Graph PDF</h1>
 
              <!-- Graph -->
              <div style="width: ${chartWidth}px; height: 400px;">
                ${data.length > 0 ? `
                  <img src="${capturedUri}" style="width: 100%; height: 100%;" />
                ` : 'Loading chart...'}
              </div>
            </body>
          </html>
        `,
        fileName: 'bar_graph_pdf',
        directory: 'Documents',
      };
 
      const file = await RNHTMLtoPDF.convert(options);
 
      const shareOptions = {
        title: 'Share PDF',
        message: 'Check out this PDF!',
        url: `file://${file.filePath}`,
        type: 'application/pdf',
      };
 
      await Share.open(shareOptions);
    } catch (error) {
      //console.error('Error generating PDF:', error);
    }
  };
 



  return (
    <ScrollView contentContainerStyle={styles.container}>
        <Button title="CAPTURE" onPress={captureScreen} />
      <ViewShot ref={viewShot} style={{ width: chartWidth, height: 400 }}>
      <View style={styles.chart}>
        {!loading ? (
          <BarChart
            data={{
              labels: recoveryData.map(item => item.FirstName),
              datasets: [
                {
                  data: recoveryData.map(item => item.RecoveryVisits),
                },
              ],
            }}
            width={350}
            height={200}
             yAxisLabel="Visits"
            // xAxisLabel="Names"
            chartConfig={{
              backgroundColor: '#f4f4f4',
              backgroundGradientFrom: '#f4f4f4',
              backgroundGradientTo: '#f4f4f4',
              decimalPlaces: 0,
             
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              style: {
                borderRadius: 16,
              },
            }}
            style={styles.barChart}
          />
        ) : (
          <ActivityIndicator size="large" color="#0000ff" />
        )}

<View style={styles.table}>
                        <Text style={styles.tableTitle}>Summary Table</Text>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Recovery Visits </Text>
                               
                                <Text style={styles.tableHeaderText}>    Count</Text>
                            </View>
                            {recoveryData.map((item, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{item.FirstName}</Text>
                                    <Text style={styles.tableCell}>{item.RecoveryVisits}</Text>
                                   
                                </View>
                            ))}
                        </View>
                    </View>



      </View>
      
      </ViewShot>
    </ScrollView>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingVertical: 10,
   
  },
  chart: {
    alignItems: 'center',
    marginTop: 20,
  },
  barChart: {
    marginVertical: 8,
    borderRadius: 16,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#555',
},
chartStyle: {
    marginVertical: 8,
},
table: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    margin: 40,
    width :'95%',
    marginBottom:75,
},
table1: {
    backgroundColor: 'white',
    borderRadius: 10,
    height:1000,

    elevation: 4,
    margin: 16,
    marginTop:60,
},
tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    margin: 16,
    alignSelf:'center',
    color: '#555',
},
tableContainer: {
    backgroundColor: 'white',
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: {
        width: 0,
        height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
},
tableHeader: {
    backgroundColor: 'coral',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingVertical: 8,
    paddingHorizontal: 16,
},
tableHeaderText: {
    fontSize: 16,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
},
tableRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
},
tableCell: {
    flex: 1,
    textAlign: 'center',
    color: 'black',
},
childInfo: {
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    margin: 16,
    padding: 16,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black'
  },
  scrollView: {
    flex: 1,
    width: '100%',
   


  },
  menuButton: {
    position: 'absolute',
    bottom: -20,
    right: 1,
    zIndex: 1,


    // Add any additional styles you need for positioning and appearance
  },
  button: {
    backgroundColor: 'black',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 5,
  },
  btnnext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  inputSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  menuIcon: {
    width: 28,
    height: 30,
  },
});


export default BarGraph;
