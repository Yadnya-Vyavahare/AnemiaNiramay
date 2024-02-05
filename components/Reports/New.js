import React, { useState, useEffect } from 'react';
import { View ,StyleSheet,ScrollView,Text} from 'react-native';
import { VictoryChart, VictoryBar, VictoryAxis } from 'victory-native';
import { VictoryLabel } from 'victory-core';
import axios from 'axios';


const New = () => {
    const [recoveryData, setRecoveryData] = useState([]);
    const [firstNames, setFirstNames] = useState([]);
    const [loading, setLoading] = useState(true);
  //    const yearOpts = [
  //     { label: "2022", value: "2022" },
  //     { label: "2023", value: "2023" },
  //     { label: "2024", value: "2024" },
  //   ];
  //   const KvarOpts = [
  //     { label: "Yerwada", value: "Yerwada" },
  //     { label: "Ramtekdi", value: "Ramtekdi" },
  //     { label: "Kelewadi", value: "Kelewadi" },
  //     { label: "Bibewadi", value: "Bibewadi" },
  // ];
  
  
   useEffect(() => {
     const fetchData = async () => {
       try {
         const response = await axios.get('http://192.168.96.184:8080/api/recovery');
         setRecoveryData(response.data);
  
  
          // Extracting only the first names from the childFullName field
         //  const trimmedNames = response.data.map((item) => {
         //     const fullNameParts = item.childFullName.split(' ');
         //     return fullNameParts.length > 0 ? fullNameParts[0] : ''; // Extracting the first word (first name) or setting an empty string if undefined
         //   });
         //   setFirstNames(trimmedNames);
        
       } catch (error) {
         console.error('Error fetching data:', error);
       }
     };
  
  
     fetchData();
   }, []);
  
  
  
   return (
    
     <ScrollView contentContainerStyle={styles.container}>
            <ScrollView
            horizontal
            style={styles.scrollView}>
            
  
  
     <View style={styles.table1}>
       <VictoryChart
        
         domainPadding={40}
         width={350}
         height={300}
         padding={{ top: 60, bottom: 50, left: 60, right: 60 }}
       >
         <VictoryBar
           data={recoveryData}
           style={{ data: { fill: '#3B7095' }}}
           labelComponent={<VictoryLabel dy={-10} />}
          //labels={({ datum }) => `${datum.y}\nkg/m²`}
           x="FirstName"
           y="RecoveryVisits"
           labels={({ datum }) => `${datum.RecoveryVisits}`}
         //  barWidth={22}
           barRatio={0.38}
         //  style={{ labels: { fontSize: 12 } }}
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
             tickLabels: { fontSize: 12, angle: -10, textAnchor: 'end', padding: 10 },
             axisLabel: { padding: 30  },
           }}
         />
         <VictoryLabel
           text="Recovery Visits"
           x={175}
           y={50}
           textAnchor="middle"
           style={{ fontSize: 16, fontWeight: 'bold' }}
         />
       </VictoryChart>
      
     </View>
     </ScrollView>
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
}

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
      menuIcon: {
        width: 28,
        height: 30,
      }
  });
export default New