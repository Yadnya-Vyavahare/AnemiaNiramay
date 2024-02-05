import React, { useEffect,useRef, useState } from 'react';
import { View, Text, Dimensions,Button,StyleSheet ,TouchableOpacity} from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import config from '../config';
import { ScrollView } from 'react-native-gesture-handler';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const HeightDifferenceGraph = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  const [weightDiff, setWeightDiff] = useState(null);
  const [firstHeight, setFirstWeight] = useState(null);
  const [secondHeight, setsecondWeight] = useState(null);
  const [clickedXValue, setClickedXValue] = useState(null);
  const [clickedValues, setClickedValues] = useState({});
  const navigation = useNavigation();

  
  console.log("HEightDiff")
  

  useEffect(() => {
    fetchData();
  }, []);

  const onWeight = () => {
    navigation.navigate('WeightDifferenceGraph');
  

};
 
  const fetchData = async () => {
    try {
      const response = await axios.get(`${config.API_BASE_URL}/htDifference`);
     // const fetchedData = response.data[0];
     // console.log(fetchedData);

   
      
      setData(response.data);
      console.log('Fetched data:', response.data);
      
     

    } catch (error) {
      console.error('API request error:', error.message);
    }
  };

  


 
  // Prepare the data and configurations for the LineChart
  const prepareChartData = () => {
    if (data.length > 0) {
      
      const labels = data.map(item => item.FirstName);
      const firstHeightData = data.map(item => item.FirstHt);
      const secondHeightData = data.map(item => item.SecondHt);
      


      return {
        labels,
        datasets: [
          {
            data: firstHeightData,
            color: () => 'red',
            
          },
          {
            data: secondHeightData,
            color: () => 'green',
          },
          // {
          //   data: differenceData,
          //   color: () => 'blue',
          // },
          
        ],
        legend: ['First', 'Second'],
      };
    }
   
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
        console.error('Error generating PDF:', error);
      }
    };
   
  
  
  

  return (
  

    <View style={styles.container}>
         <Button title="CAPTURE" onPress={captureScreen} />
      <ViewShot ref={viewShot} style={{ width: chartWidth, height: 'auto' ,width:350}}>
      <Text style={styles.title}>Height Difference Graph</Text>
      { data.length > 0 ? (
        <>
       
          {/* <Text style={styles.differenceText}>Difference: {data[0].WeightDifference}</Text> */}
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
           // getDotColor={() => 'yellow'}
           // hidePointsAtIndex={[3]}
            bezier
            onDataPointClick={({ x, y, index }) => handleDataPointClick(index)
            
          }
              // You can access the data point information here
            //   console.log(`Clicked on value: ${value}`);
            //   console.log(`Clicked on dataset: ${x}`);
            //   console.log(`Color of dataset: ${y}`);
            //   handleDataPointPress(value);
            // }}
          />
        </>
      ) : (
        <Text>No data available</Text>
      )}
          
          {clickedXValue !== null && (
        <>
          <Text style = {{color:'black'}}>Clicked Data:</Text>
          <Text style = {{color:'black'}}>First Name: {data[clickedXValue].FirstName}</Text>
          <Text style = {{color:'black'}}>First Height: {data[clickedXValue].FirstHt}</Text>
          <Text style = {{color:'black'}}>Second Height: {data[clickedXValue].SecondHt}</Text>
          <Text style = {{color:'black'}}>Height Difference: {data[clickedXValue].HeightDifference}</Text>
         
        </>
        
        
      )}
        <TouchableOpacity style = {styles.button} onPress={onWeight}>
                <Text style = {styles.btnnext}>Weight</Text>
            </TouchableOpacity>

            </ViewShot>
     
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  button: {
    marginTop: 80, // Adjust this value for vertical spacing
    backgroundColor: 'black',
    paddingHorizontal: 50,
    paddingVertical: 8,
    borderRadius: 5,
    
  },
btnnext: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
},
  differenceText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default HeightDifferenceGraph;