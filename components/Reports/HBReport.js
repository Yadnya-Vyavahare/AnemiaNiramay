import React, { useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet,Dimensions,Button ,TextInput,TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { lab } from 'd3';
import config from '../config';
import { useRoute } from '@react-navigation/native';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import { ScrollView } from 'react-native-gesture-handler';


const WeightDifferenceGraph = () => {
  const route = useRoute();
  const childFullName = route.params.childFullName;
  const [data, setData] = useState([]);
  const [clickedXValue, setClickedXValue] = useState(null);
  const [childName, setChildName] = useState('');




  const handleChildNameChange = (text) => {
    setChildName(text);
  };


  useEffect(() => {
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/hemoGraph?ID=${childFullName}`);
      const responseData = response.data.data;


      console.log('Fetched data from API:', responseData);


      setData(responseData);
    } catch (error) {
      //console.error('API request error:', error.message);
    }
  };


  const prepareChartData = () => {
    if (data.length > 0) {
        const labels = data.map((value, index) => `Visit ${index + 1}`);
          console.log(labels);
      const firstHeightData = data.map(item => item.HB);


     


      return {
        labels,
        datasets: [
          {
            data: firstHeightData,
            color: () => 'green',
          },
        ],
        legend: ['HB'],
      };
    }
    return {};
  };
  const handleDataPointClick = ( index) => {
   
    setClickedXValue(index);


  };

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

<ScrollView>
    <View style={styles.container}>
       
       <Text
          style={styles.title}
          >

           {childFullName}
          </Text>
      <Text style={styles.title}>Hemo Graph</Text>
      <ViewShot ref={viewShot} style={{ width: chartWidth, height: 400 }}>
      
      {data.length > 0 ? (
        <LineChart
          data={prepareChartData()}
          width={350}
          height={220}
          yAxisLabel=""
          yAxisSuffix=" g/dL"
          chartConfig={{
            backgroundGradientFrom: '#ffffff',
            backgroundGradientTo: '#ffffff',
            yAxisInterval: 0,
            decimalPlaces: 1,
            color: () => 'black',
            barPercentage: 0.6,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
            },
            propsForDots: {
              r: '6',
              strokeWidth: '3',
              stroke: 'black',
            },
            withVerticalLabels: true,
            withHorizontalLabels: true,
          }}
          style={{ borderColor: 'black', borderWidth: 1 }}
          withInnerLines={false}
          withShadow={false}
          bezier
          onDataPointClick={({ x, y, index }) => handleDataPointClick(index)
        }
        />
      ) : (
        <Text>No data available</Text>
      )}
 </ViewShot>

<View style={styles.table}>
                        <Text style={styles.tableTitle}>Summary Table</Text>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Visit Date   </Text>
                               
                                <Text style={styles.tableHeaderText}>    HB</Text>
                            </View>
                            {data.map((item, index) => (
                                <View style={styles.tableRow} key={index}>
                                    <Text style={styles.tableCell}>{item.formatted_date}</Text>
                                    <Text style={styles.tableCell}>{item.HB}</Text>
                                   
                                </View>
                            ))}
                        </View>
                    </View>
                   
                    <Button title="CAPTURE" onPress={captureScreen} />
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
        width:'50',
        marginBottom:75,
        marginTop:-100,
        
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
        color:'black',
      },
      input: {
        flex: 1,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginRight: 10,
        color:'black',
      },
      title: {
        fontSize: 20,
        alignSelf:'center',
        color:'black',
        fontWeight: 'bold',
        marginBottom: 10,
        marginLeft:40,
      },
      menuIcon: {
        width: 28,
        height: 30,
      },
});


export default WeightDifferenceGraph;
