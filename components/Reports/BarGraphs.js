import React, { useEffect, useState, useRef } from 'react';
import { View, Text, Dimensions, ScrollView, Button, Image } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';
import ViewShot from 'react-native-view-shot';  // Import ViewShot
import config from '../config';
import logo from '../../assests/images/logo1.jpg';


const BarGraphs = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [{ data: [] }],
  });


  const chartWidth = Dimensions.get('window').width * 1.5;
  const viewShot = useRef(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiUrl = `${config.API_BASE_URL}/avg`;
        console.log('API URL:', apiUrl);


        const response = await fetch(apiUrl);


        if (!response.ok) {
          throw new Error('Network request failed');
        }


        const data = await response.json();


        data.sort((a, b) => a['KSP Varg'].localeCompare(b['KSP Varg']));


        const chartLabels = data.map((item) => item['KSP Varg']);
        const chartDataValues = data.map((item) => item['average_height']);


        setChartData({
          labels: chartLabels,
          datasets: [
            {
              data: chartDataValues,
            },
          ],
        });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };


    fetchData();
  }, []);


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
                ${chartData.labels.length > 0 ? `
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
    <ScrollView
      horizontal
      contentContainerStyle={{ width: chartWidth }}
      style={{ flex: 1 }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', marginRight: 5 }}>
        <ViewShot ref={viewShot} style={{ width: chartWidth, height: 400 }}>
          {chartData.labels.length > 0 ? (
            <BarChart
              data={chartData}
              contentInset={{ top: 205, bottom: 206 }}
              width={chartWidth}
              height={400}
              yAxisLabel=""
              chartConfig={{
                backgroundGradientFrom: '#ffffff',
                backgroundGradientTo: '#ffffff',
                decimalPlaces: 2,
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                style: {
                  borderRadius: 1,
                },
                barPercentage: 0.2,
                propsForVerticalLabels: {
                  fontSize: 12,
                  rotation: -25,
                  transform: [{ translateY: 20 }],
                },
                yAxisSuffix: ' cm',
                min: 0,
                max: 300,
                fromZero: true,
              }}
              withCustomBarColorFromData
              getBarColor={(dataset, index) =>
                `rgba(0, 0, 0, ${dataset[index] / 300})`
              }
            />
          ) : (
            <Text>Loading chart...</Text>
          )}
        </ViewShot>


        <Button title="CAPTURE" onPress={captureScreen} />
      </View>
    </ScrollView>
  );
};


export default BarGraphs;
