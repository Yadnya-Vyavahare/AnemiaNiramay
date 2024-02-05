import React, { useEffect, useState,useRef } from 'react';
import { View, Text, Button ,StyleSheet,Dimensions,TouchableOpacity} from 'react-native';
import { PieChart } from 'react-native-chart-kit';

import RNPickerSelect from "react-native-picker-select";
import axios from 'axios';

import config from '../config';
import { ScrollView } from 'react-native-gesture-handler';
// ... (existing imports)
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const AgeAnalysisComponent = () => {
  const [data, setData] = useState([]);
  const [KID,setID] = useState("");
  const [count_10,setcount10] = useState("");
  const [count10_12,setcount10_12] = useState("");
  const [count_13_15,setcount_13_15] = useState("");
  const [count16_18,setcount16_18] = useState("");
  const [count_18,setcount_18] = useState("");
  const [selectedYear, setSelectedYear] = useState(null); // Initialize with a default year
  const [selectedKVarg, setSelectedKVarg] = useState(null); // Initialize with a default year
 
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
    { label: "Kelewadi", value: "Kelewadi" },
    { label: "Bibewadi", value: "Bibewadi" },
  ];

 
  useEffect(() => {
    const fetchAgeData = async () => {
      try {
        
        
        let response;
         response = await axios.get(`${config.API_BASE_URL}/ageAnalysis`);
       
       
        if(selectedKVarg!=null && selectedYear!=null){
        //  console.log(selectedKVarg+"12345"+selectedYear);
           response = await axios.get(`${config.API_BASE_URL}/ageAnalysis?year=${selectedYear}&kishoriVarg=${selectedKVarg}`);
           console.log("cocococo");
        }
        else if(selectedKVarg!=null){
          console.log("helo");
           response = await axios.get(`${config.API_BASE_URL}/ageAnalysis?kishoriVarg=${selectedKVarg}`);
     
        }
        else if(selectedYear!=null){
          console.log("dodo");
           response = await axios.get(`${config.API_BASE_URL}/ageAnalysis?year=${selectedYear}`);
     
        }
        else{
           response = await axios.get(`${config.API_BASE_URL}/ageAnalysis`);
     
        }
        if (!response || !response.data) {
          // If there's no response or no data in the response
          alert('Data not available for the selected year or KVarg');
         // setData([]);
        } else {
          setData(response.data);
          setcount10(response.data[0].count_10);
          setcount10_12(response.data[0].count_10_12);
          setcount_13_15(response.data[0].count_13_15);
          setcount16_18(response.data[0].count_16_18);
          setcount_18(response.data[0].count_18);

        }
        console.log(data);
      } catch (error) {
        console.error('Error fetching data:', error); // Log the specific error
        setData([]); // Set empty data if there's an error
      }
    };
  
    fetchAgeData(); // Fetch data on component mount
  }, [selectedYear, selectedKVarg]);

  // const data = ageData.map((item) => ({
  //   name: item.name,
  //   count: parseInt(item.count), // Assuming count values are strings, converting to integers
  //   color: item.color,
  //   legendFontColor: '#7F7F7F',
  //   legendFontSize: 15,
  // }));
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
          <div> <img src="./logo2.jpg" alt="logo" height=100px, width=100px/>
          
        <!-- College Name -->
        <h1 style="margin-left: 500px;">Niramay Bharat</h1>
      </div>

<br>
        <!-- Graph Heading -->
        <h2 style="margin-left: 500px;">Age Analysis</h2>
  
              <!-- Graph -->
              <div style="width: ${chartWidth}px; height: 400px;">
                ${data.length > 0 ? `
                  <img src="${capturedUri}" style="width: 100%; height: 100%;" />
                ` : 'Loading chart...'}
              </div>
  
              <!-- Summary Table -->
              <div>
                <h2>Summary Table</h2>
                <table style="border-collapse: collapse; width: 100%;">
                  <thead>
                    <tr style="border-bottom: 1px solid #000;">
                      <th style="border: 1px solid #000; padding: 8px;">Nutrition Status</th>
                      <th style="border: 1px solid #000; padding: 8px;">Count</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr style="border-bottom: 1px solid #ccc;">
                      <td style="border: 1px solid #000; padding: 8px;">Less than 10</td>
                      <td style="border: 1px solid #000; padding: 8px;">${count_10}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ccc;">
                      <td style="border: 1px solid #000; padding: 8px;">10 - 12</td>
                      <td style="border: 1px solid #000; padding: 8px;">${count10_12}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ccc;">
                      <td style="border: 1px solid #000; padding: 8px;">13 - 15</td>
                      <td style="border: 1px solid #000; padding: 8px;">${count_13_15}</td>
                    </tr>
                    <tr style="border-bottom: 1px solid #ccc;">
                      <td style="border: 1px solid #000; padding: 8px;">16 - 18</td>
                      <td style="border: 1px solid #000; padding: 8px;">${count16_18}</td>
                    </tr>
                    <tr>
                      <td style="border: 1px solid #000; padding: 8px;">18 +</td>
                      <td style="border: 1px solid #000; padding: 8px;">${count_18}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </body>
          </html>
        `,
        fileName: 'age_analysis_pdf',
        directory: 'Documents',
      };
  
      const file = await RNHTMLtoPDF.convert(options);
  
      const shareOptions = {
        title: 'Share PDF',
        message: 'Check out this Age Analysis PDF!',
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
    <ViewShot ref={viewShot} style={{ width: chartWidth, height: 400 }}>
      <Text style={{color:'black'}}>Select the year and KVarg</Text>
      
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
      <Text style={styles.chartTitle}>Age Analysis</Text>
     
      </View>
      
      {data.length > 0 ? (
        <PieChart
          data={[
            {
              name: 'less than 10',
              count:parseInt(data[0].count_10),
              color: '#3342FF', // Color for SAM
              legendFontColor: '#3342FF',
              legendFontSize: 15,
            },
            {
              name: '10 - 12',
              count: parseInt(data[0].count_10_12),
              color: '#180411', // Color for MAM
              legendFontColor: '#7F7F7F',
              legendFontSize: 15,
            },
            {
              name: '13 - 15',
              count: parseInt(data[0].count_13_15),
              color: '#7F7F7F', // Color for NORMAL
              legendFontColor: '#3342FF',
              legendFontSize: 15,
            },
            {
              name: '16 - 18',
              count: parseInt(data[0].count_16_18),
              color: '#FFE933', // Color for NORMAL
              legendFontColor: '#FFE933',
              legendFontSize: 15,
            },
            {
              name: '18 +',
              count: parseInt(data[0].count_18),
              color: '#FF33B8', // Color for NORMAL
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
                                    <Text style={styles.tableCell}>Less than 10</Text>
                                    <Text style={styles.tableCell} >{count_10}</Text>
                                   
                                </View>
                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>10 - 12</Text>
                                    <Text style={styles.tableCell} >{count10_12}</Text>
                                   
                                </View>

                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>13 - 15</Text>
                                    <Text style={styles.tableCell} >{count_13_15}</Text>
                                   
                                </View>

                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>16 - 18</Text>
                                    <Text style={styles.tableCell} >{count16_18}</Text>
                                   
                                </View>

                                <View style={styles.tableRow}>
                                    <Text style={styles.tableCell}>18 +</Text>
                                    <Text style={styles.tableCell} >{count_18}</Text>
                                   
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
    color: 'black',
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
    borderColor: 'black',
    borderWidth: 1,
    paddingHorizontal: 10,
    borderRadius: 5,
    marginRight: 10,
    color:'black',
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
