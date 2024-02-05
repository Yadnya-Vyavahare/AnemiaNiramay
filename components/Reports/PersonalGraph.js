import React, { useEffect, useState,useRef } from 'react';
import { View, Text, StyleSheet,Button,Dimensions ,TextInput,TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import config from '../config';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const PersonalGraph = () => {
  const [data, setData] = useState([]);
  const [clickedXValue, setClickedXValue] = useState(null);
  const [childName, setChildName] = useState('');


  const handleChildNameChange = (text) => {
    setChildName(text);
  };



  useEffect(() => {
    fetchData();
  }, []);

  console.log(childName);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/personalGraph?ID=${childName}`);
      const responseData = response.data.data;

      console.log('Fetched data from API:', responseData);

      setData(responseData);
    } catch (error) {
      console.error('API request error:', error.message);
    }
  };

  const prepareChartData = () => {
    if (data.length > 0) {
      const labels = data.map(item => item.formatted_date);    
      const firstHeightData = data.map(item => item.Weight);
  
      return {
        labels,
        datasets: [
          {
            data: firstHeightData,
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`, // Set color with opacity
          },
        ],
        legend: ['Weight'],
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

    <View style={styles.container}>
       <Button title="CAPTURE" onPress={captureScreen} />
      <ViewShot ref={viewShot} style={{ width: chartWidth, height: 'auto' ,width:350}}>
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter Child's Full Name"
          placeholderTextColor="gray"
          value={childName}
          onChangeText={handleChildNameChange}
        />
        <TouchableOpacity style={styles.button} onPress={fetchData}>
          <Text style={styles.btnnext}>Fetch Data</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.title}>Anemia Graph</Text>
      
      {data.length > 0 ? (
        <LineChart
          data={prepareChartData()}
          width={350}
          height={220}
          yAxisLabel=""
          yAxisSuffix="cm"
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
        <Text style={{color: 'black'}}>No data available</Text>
      )}

       {clickedXValue !== null && (
        <>

<Text style={styles.tableHeader}>Name : {data[clickedXValue].childFullName}</Text>
  <Text style={styles.tableHeader}>Anemic</Text>

  {data.map((item, index) => (
    <View key={index} style={styles.tableRow}>
      {/* <Text style={styles.tableCell}>{item.childFullName}</Text> */}
      <Text style={[styles.tableCell, { color: item.Anemic === 0 ? 'black' : 'red', fontSize: 16 }]}>
        {item.Anemic === 0 ? 'Not Anemic' : 'Anemic'}
      </Text>
    </View>
  ))}
        </>
      )}</ViewShot>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
    color: 'black',
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  tableHeader: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black', // Adjust this color as needed
  },
  tableRow: {
    flexDirection: 'row',
    alignSelf:'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 10,
  },
  tableCell: {
    alignSelf:'center',
    flex: 1,
    fontSize: 16,
  },
});

export default PersonalGraph;