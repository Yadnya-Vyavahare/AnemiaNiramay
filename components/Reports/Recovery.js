import React, { useState, useEffect ,useRef} from 'react';
import { View, StyleSheet,Button,Dimensions, Text } from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis, VictoryLabel } from 'victory-native';
import axios from 'axios';

import config from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
const Recovery =  () => {
  const [recoveryData, setRecoveryData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${config.API_BASE_URL}/recovery`);
        setRecoveryData(response.data);
        console.log(recoveryData);
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
                ${recoveryData.length > 0 ? `
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
    <ScrollView > 
    <Button title="CAPTURE" onPress={captureScreen} />
    <ViewShot ref={viewShot} style={{ width: chartWidth, height: 400 }}>
    <ScrollView horizontal style={styles.scrollView}>
     
        <View style={styles.chartContainer}>
          {recoveryData.length > 0 && (
            <VictoryChart
              domainPadding={-50}
              width={350}
              height={300}
              padding={{ top: 60, bottom: 50, left: 60, right: 60 }}
            >
              <VictoryBar
                data={recoveryData}
                style={{ data: { fill: '#3B7095' } }}
                labelComponent={<VictoryLabel dy={-10} />}
                x="FirstName"
                y="RecoveryVisits"
                labels={({ datum }) => `${datum.RecoveryVisits}`}
                barRatio={0.38}
              />
              <VictoryAxis
                label="No of Visits"
                dependentAxis
                tickFormat={(t) => `${t}`}
                style={{
                  tickLabels: { fontSize: 10, padding: 5 },
                  axisLabel: { padding: 30 },
                }}
              />
              <VictoryAxis
                label="Child Names"
                tickFormat={recoveryData.map((item) => item.FirstName)}
                style={{
                  tickLabels: { fontSize: 12, angle: -22, textAnchor: 'end', padding: 10 },
                  axisLabel: { padding: 38 },
                }}
              />
              <VictoryLabel
                text="Recovery Visits"
                x={175}
                y={40}
                textAnchor="middle"
                style={{ fontSize: 20, fontWeight: 'bold' }}
              />
            </VictoryChart>
          )}
        </View>
      </ScrollView>   
      </ViewShot>
      <View style={styles.table}>
                        <Text style={styles.tableTitle}>Summary Table</Text>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>First Name</Text>
                               
                                <Text style={styles.tableHeaderText}>  Number of Visits</Text>
                            </View>
                            {recoveryData.map((item, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{item.FirstName}</Text>
                                    <Text style={styles.tableCell}>{item.RecoveryVisits}</Text>
                                   
                                </View>
                            ))}
                        </View>
                    </View>
                
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
    margin: 16,
    backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
    padding: 16,
    marginLeft: 20,
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
    margin: 16,
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
    backgroundColor: '#E38B29',
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
    color: '#333',
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
  menuIcon: {
    width: 28,
    height: 30,
  }
});


export default Recovery;
