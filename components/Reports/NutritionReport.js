import React, { useEffect, useState,useRef } from 'react';
import { View, Text, Button,Dimensions ,StyleSheet,ScrollView,TouchableOpacity} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import config from '../config';

import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';
// ... (existing imports)
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';


const AgeAnalysisComponent =  () => {
  const [data, setData] = useState([]);
  const [KID,setID] = useState("");
  const [selectedYear, setSelectedYear] = useState(null); // Initialize with a default year
  const [selectedKVarg, setSelectedKVarg] = useState(null); // Initialize with a default year
  const [countUnder,setcountUnder] = useState("");
  const [count,setcount] = useState("");
  const [countOver,setcountOver] = useState("");
 
  const chartConfig = {
    backgroundGradientFrom: 'white',
    backgroundGradientTo: 'white',
    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
  };
  const yearOpts = [
    { label: "2022", value: "2022" },
    { label: "2023", value: "2023" },
    { label: "2024", value: "2024" },
  ];
  const KvarOpts = [
    { label: "Yerwada", value: "Yerwada" },
    { label: "Ramtekadi", value: "Ramtekadi" },
    { label: "Chavhannagar", value: "Chavhannagar" },
    { label: "Bibewadi", value: "Bibewadi" },
  ];


 
  useEffect(() => {
    fetchAgeData();


  }, [selectedYear, selectedKVarg]);




    const fetchAgeData = async () => {
      try {
       
        //setSelectedKVarg('Ramtekadi');


        let response;
         if (selectedKVarg !== null && selectedYear !== null) {
        response = await axios.get(`${config.API_BASE_URL}/nutriAnalysis?year=${selectedYear}&KVarg=${selectedKVarg}`);
      } else if (selectedKVarg !== null) {
        console.log('lolol')
        response = await axios.get(`${config.API_BASE_URL}/nutriAnalysis?KVarg=${selectedKVarg}`);
      } else if (selectedYear !== null) {
        response = await axios.get(`${config.API_BASE_URL}/nutriAnalysis?year=${selectedYear}`);
      } else {
        response = await axios.get(`${config.API_BASE_URL}/nutriAnalysis`);
      }


      if (!response || !response.data) {
        alert('Data not available for the selected year or KVarg');
      } else {
        setData(response.data);
       // console.log(data[0].count_overWeight);
        setcountUnder(response.data[0].count_under);
        setcount(response.data[0].count_normal);
        setcountOver(response.data[0].count_overWeight);
        
      }


      } catch (error) {
        console.error('Error fetching data:', error); // Log the specific error
        setData([]); // Set empty data if there's an error
      }
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
      <Button title="CAPTURE" onPress={captureScreen} />
      <ViewShot ref={viewShot} style={{ width: chartWidth, height: 'auto' ,width:350}}>
      <View style={{marginLeft:60}}>
      <Text style={styles.chartTitle}>Select the year and KVarg</Text>
     
      </View>
       
      <RNPickerSelect
     
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
    />

<View style={{ marginTop:10,alignSelf:'center',}}>
      <Text style={styles.chartTitle}>Nutrition Status</Text>
     
      </View>

      {data.length > 0 ? (
        <PieChart
          data={[
            {
              name: 'normal',
              count: parseInt(data[0].count_normal),
              color: '#3342FF', // Color for SAM
              legendFontColor: '#3342FF',
              legendFontSize: 15,
            },
            {
              name: 'underweight',
              count: parseInt(data[0].count_under),
              color: '#ff0000', // Color for MAM
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
                name: 'overweight',
                count: parseInt(data[0].count_overWeight),
                color: '#180411', // Color for MAM
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
           
          ]}
          width={350}
          height={200}
          chartConfig={chartConfig}
          accessor="count" 
          backgroundColor="transparent"
          paddingLeft="15"
          center={[10, 10]}
         
          absolute
        />
       
      ) : (
        <Text>Error fetching or no data available</Text>
      )
      }

</ViewShot>


<View style={styles.table}>
                        <Text style={styles.tableTitle}>Summary Table</Text>
                        <View style={styles.tableContainer}>
                            <View style={styles.tableHeader}>
                                <Text style={styles.tableHeaderText}>Nutrition Status   </Text>
                               
                                <Text style={styles.tableHeaderText}>Count</Text>
                            </View>
                           
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>Normal</Text>
                                    <Text style={styles.tableCell} >{count}</Text>
                                   
                                </View>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>Underweight</Text>
                                    <Text style={styles.tableCell} >{countUnder}</Text>
                                   
                                </View>

                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>Overweight</Text>
                                    <Text style={styles.tableCell} >{countOver}</Text>
                                   
                                </View>
                           
                        </View>
                    </View>
                


      </View>
      </ScrollView>


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




export default AgeAnalysisComponent;
