// import React, { useState, useEffect } from 'react';
// import { View, Text, ActivityIndicator, Alert } from 'react-native';
// import { PieChart } from 'react-native-chart-kit';

//   const readJsonData = () => {
//     try {
//       // Use require to read the JSON file
//       const jsonData = require('./ReportMal.json');
//       return jsonData;
//     } catch (error) {
//       console.error('Error reading JSON data:', error);
//       return null;
//     }
//   };
  
//   const jsonData = readJsonData();

  
// const PieCharts = () => {
//   const [data, setData] = useState(jsonData);
//   const [gradationCounts, setGradationCounts] = useState({
//     SAM: 0,
//     MAM: 0,
//     NORMAL: 0,
//   });

//   useEffect(() => {
//     // Calculate gradation counts
//     const counts = data.reduce((acc, item) => {
//       const gradation = item.GRADATION;
//       if (gradation === 'SAM') {
//         acc.SAM++;
//       } else if (gradation === 'MAM') {
//         acc.MAM++;
//       } else if (gradation === 'NORMAL') {
//         acc.NORMAL++;
//       }
//       return acc;
//     }, {
//       SAM: 0,
//       MAM: 0,
//       NORMAL: 0,
//     });

//     setGradationCounts(counts);
//   }, [data]);

  
//   return (
//     <View>
//       <PieChart
//         data={[
//           {
//             name: 'SAM',
//             count: gradationCounts.SAM,
//             color: '#266AB2', // Color for SAM
//             legendFontColor: '#7F7F7F',
//             legendFontSize: 15,
//           },
//           {
//             name: 'MAM',
//             count: gradationCounts.MAM,
//             color: '#B3BFCC', // Color for MAM
//             legendFontColor: '#7F7F7F',
//             legendFontSize: 15,
//           },
//           {
//             name: 'NORMAL',
//             count: gradationCounts.NORMAL,
//             color: '#273746', // Color for NORMAL
//             legendFontColor: '#7F7F7F',
//             legendFontSize: 15,
//           },
//         ]}
//         width={300}
//         height={200}
//         chartConfig={{
//           backgroundGradientFrom: 'white',
//           backgroundGradientTo: 'white',
//           color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
//         }}
//         accessor="count"
//         backgroundColor="transparent"
//         paddingLeft="15"
//         center={[10, 10]}
//         absolute
//       />
//     </View>
//   );
// };


// export default PieCharts;



import { Platform, Share, ToastAndroid } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import ViewShot from 'react-native-view-shot';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import RNFS from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';


const PieCharts = () => {
  const [data, setData] = useState(null);
  const [gradationCounts, setGradationCounts] = useState({
    SAM: 0,
    MAM: 0,
    NORMAL: 0,
  });
  const [capturedUri, setCapturedUri] = useState(null);
  const pieChartRef = useRef(null);


  useEffect(() => {
    // Fetch or read JSON data here
    const jsonData = readJsonData(); // Assuming readJsonData is available and returns the data
    setData(jsonData);
  }, []);


  useEffect(() => {
    // Calculate gradation counts when data changes
    if (data) {
      const counts = data.reduce((acc, item) => {
        const gradation = item.GRADATION;
        if (gradation === 'SAM') {
          acc.SAM++;
        } else if (gradation === 'MAM') {
          acc.MAM++;
        } else if (gradation === 'NORMAL') {
          acc.NORMAL++;
        }
        return acc;
      }, {
        SAM: 0,
        MAM: 0,
        NORMAL: 0,
      });


      setGradationCounts(counts);
    }
  }, [data]);


  const captureScreen = async () => {
    if (pieChartRef.current) {
      const uri = await pieChartRef.current.capture();
      setCapturedUri(uri);


      const directory = RNFS.DocumentDirectoryPath;
      const fileName = 'captured_chart.pdf';
      const filePath = `${directory}/${fileName}`;


      const options = {
        html: `<img src="${uri}" style="width:100%; height:auto;" />`,
        fileName,
        directory,
      };


      try {
        const pdf = await RNHTMLtoPDF.convert(options);
        await RNFS.moveFile(pdf.filePath, filePath);


        // Share PDF
        const shareOptions = {
          type: 'application/pdf',
          url: `file://${filePath}`,
          title: 'Share PDF',
          message: 'Check out this PDF file!',
        };


        if (Platform.OS === 'android') {
          // On Android, use Intent to share
          const intent = Platform.select({
            android: {
              action: 'android.intent.action.SEND',
              type: 'application/pdf',
              extras: {
                'android.intent.extra.STREAM': `file://${filePath}`,
              },
            },
          });


          if (intent) {
            await RNFetchBlob.android.actionViewIntent(intent);
          }
        } else {
          // On iOS, use Share
          await Share.open(shareOptions);
        }
      } catch (error) {
        console.error('Error generating or sharing PDF:', error);
        if (Platform.OS === 'android') {
          ToastAndroid.show('Error sharing PDF', ToastAndroid.SHORT);
        }
      }
    }
  };
  const readJsonData = () => {
    try {
      // Use require to read the JSON file
      const jsonData = require('./ReportMal.json');
      return jsonData;
    } catch (error) {
      console.error('Error reading JSON data:', error);
      return null;
    }
  };




  return (
    <View>
      <View style={styles.chartContainer}>
        <ViewShot ref={pieChartRef} collapsable={false}>
          <PieChart
            data={[
              {
                name: 'SAM',
                count: gradationCounts.SAM,
                color: '#266AB2', // Color for SAM
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'MAM',
                count: gradationCounts.MAM,
                color: '#B3BFCC', // Color for MAM
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
              {
                name: 'NORMAL',
                count: gradationCounts.NORMAL,
                color: '#273746', // Color for NORMAL
                legendFontColor: '#7F7F7F',
                legendFontSize: 15,
              },
            ]}
            width={300}
            height={200}
            chartConfig={{
              backgroundGradientFrom: 'white',
              backgroundGradientTo: 'white',
              color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            }}
            accessor="count"
            backgroundColor="transparent"
            paddingLeft="15"
            center={[10, 10]}
            absolute
          />
        </ViewShot>
      </View>


      <View style={styles.captureButtonContainer}>
        <TouchableOpacity onPress={captureScreen} style={styles.captureButton}>
          <Text style={styles.captureButtonText}>CAPTURE SCREEN</Text>
        </TouchableOpacity>
      </View>


      {capturedUri && (
        <View style={styles.previewContainer}>
          <Text>Preview</Text>
          <Image
            source={{ uri: capturedUri }}
            style={styles.previewImage}
            resizeMode="contain"
          />
        </View>
      )}
    </View>
  );
};


const styles = StyleSheet.create({
  chartContainer: {
    // Add styling for the chart container if needed
  },
  captureButtonContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  captureButton: {
    padding: 8,
    backgroundColor: '#266AB2', // Use a color that stands out
  },
  captureButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  previewContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#000',
  },
  previewImage: {
    width: 200,
    height: 200,
    backgroundColor: '#fff',
  },
});


export default PieCharts;