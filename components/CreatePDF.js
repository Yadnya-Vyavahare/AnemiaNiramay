import React, { useState } from 'react';
import { View, Button, TextInput } from 'react-native';
import RNHTMLtoPDF from 'react-native-html-to-pdf';
import Share from 'react-native-share';

const CreatePDF = () => {
  const [name, setName] = useState("");

  const html = `
    <html>
      <body>
        <h1>Hi ${name}</h1>
        <p style="color: red;">Hello. Bonjour. Hola.</p>
      </body>
    </html>
  `;

  const generatePdf = async () => {
    try {
      const options = {
        html: html,
        fileName: 'generated_pdf',
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
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TextInput
        value={name}
        placeholder="Name"
        style={{ padding: 8, margin: 8, borderWidth: 1, borderColor: 'gray', borderRadius: 4 }}
        onChangeText={(value) => setName(value)}
      />
      <Button title="Generate PDF" onPress={generatePdf} />
    </View>
  );
};

export default CreatePDF;