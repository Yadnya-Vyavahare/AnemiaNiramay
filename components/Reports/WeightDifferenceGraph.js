import React, { useEffect, useState ,useRef} from 'react';
import { View, Text, StyleSheet,Dimensions,Button,TouchableOpacity } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';
import config from '../config';
import RNPickerSelect from "react-native-picker-select";
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const WeightDifferenceGraph = () => {
  const [data, setData] = useState([]);
  const [data1, setData1] = useState([]);
  const [showChart, setShowChart] = useState(false);
  const [fetchedData, setFetchedData] = useState({});
  const [weightDiff, setWeightDiff] = useState(null);
  const [firstWeight, setFirstWeight] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null); // Initialize with a default year
  const [selectedKVarg, setSelectedKVarg] = useState(null); // Initialize with a default year

  const [clickedXValue, setClickedXValue] = useState(null);
  const [clickedValues, setClickedValues] = useState({});
  const navigation = useNavigation();
  const yearOpts = [
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
  ];
  const KvarOpts = [
    { label: "Yerwada", value: "Yerwada" },
    { label: "Ramtekdi", value: "Ramtekdi" },
    { label: "Kelewadi", value: "Kelewadi" },
  ];


  
  

  useEffect(() => {
    fetchData();
  }, [selectedYear, selectedKVarg]);
  const onHeight = () => {
    navigation.navigate('HeightDifferenceGraph');
  

};

 
  const fetchData = async () => {
    try {
      let response;
      if(selectedKVarg!=null && selectedYear!=null){
        console.log(selectedKVarg+"12345"+selectedYear);
         response = await axios.get(`${config.API_BASE_URL}/wtDifferenceNew?year=${selectedYear}&KVarg=${selectedKVarg}`);
   
      }
      else if(selectedKVarg!=null){
        console.log("helo");
         response = await axios.get(`${config.API_BASE_URL}/wtDifferenceNew?KVarg=${selectedKVarg}`);
   
      }
      else if(selectedYear!=null){
         response = await axios.get(`${config.API_BASE_URL}/wtDifferenceNew?year=${selectedYear}`);
   
      }
      else{
         response = await axios.get(`${config.API_BASE_URL}/wtDifferenceNew`);
   
      }
      // const fetchedData = response.data[0];
     // console.log(fetchedData);

   
      console.log(selectedKVarg+"*"+selectedYear);
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
      const firstWeightData = data.map(item => item.FirstWt);
      const secondWeightData = data.map(item => item.SecondWt);
      


      return {
        labels,
        datasets: [
          {
            data: firstWeightData,
            color: () => 'red',
            
          },
          {
            data: secondWeightData,
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
        //console.error('Error generating PDF:', error);
      }
    };
   
  
  

  return (
    <View style={styles.container}>  
    <Button title="CAPTURE" onPress={captureScreen} />
        <ViewShot ref={viewShot} style={{ width: chartWidth, height: 400 }}>
      <Text style={styles.title}>Weight Difference Graph</Text>
      
      { data.length > 0 ? (
        <>
          {/* <Text style={styles.differenceText}>Difference: {data[0].WeightDifference}</Text> */}
          {/* <RNPickerSelect
      
      placeholder={{ label: "Select Year", value: null }}
      items={yearOpts}
      onValueChange={(value) => setSelectedYear(value)}
      value={selectedYear}
      style={pickerSelectStyles}
    />
    <RNPickerSelect
      
      placeholder={{ label: "Select KVarg", value: null }}
      items={KvarOpts}
      onValueChange={(value) => setSelectedKVarg(value)}
      value={selectedKVarg}
      style={pickerSelectStyles}
    /> */}
  
  
          <LineChart
            
            data={prepareChartData()}
           
            width={350}
            height={220}
            yAxisLabel=""
            yAxisSuffix="kg"
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
          <Text style = {{color:'black'}}>First Weight: {data[clickedXValue].FirstWt}</Text>
          <Text style = {{color:'black'}}>Second Weight: {data[clickedXValue].SecondWt}</Text>
          <Text style = {{color:'black'}}>Weight Difference: {data[clickedXValue].WeightDifference}</Text>
        </>
      )}
       <TouchableOpacity style = {styles.button} onPress={onHeight}>
                <Text style = {styles.btnnext}>Height</Text>
            </TouchableOpacity>
      
     
            </ViewShot>
    </View>
  );
};
const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    fontSize: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10, // Increased spacing between fields
  },
  inputAndroid: {
    fontSize: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    color: "black",
    paddingRight: 30, // to ensure the text is never behind the icon
    marginBottom: 10, // Increased spacing between fields
  },
});
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
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
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black'
  },
  differenceText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default WeightDifferenceGraph;