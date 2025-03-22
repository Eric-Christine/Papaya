import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const HuggingfaceExample = () => {
  const [input, setInput] = useState('');
  const [result, setResult] = useState(null);
  const API_URL = 'https://api-inference.huggingface.co/models/google/flan-t5-large';
  const API_TOKEN = 'TOKEN'; // Replace with your token

  const generateResponse = async () => {
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          inputs: input, // Send the raw prompt text
          parameters: {
            max_new_tokens: 250,
            min_length: 10,
            temperature: 0.7,
            top_p: 1,
            top_k: 40,
            // You can add or adjust additional generation parameters here
          }
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`HTTP error ${response.status}: ${errorText}`);
        return;
      }

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error fetching from Hugging Face API:', error);
    }
  };

  // Helper to extract the generated text from the returned data
  const getGeneratedText = () => {
    if (Array.isArray(result) && result.length > 0 && result[0].generated_text) {
      return result[0].generated_text;
    }
    return '';
  };

  return (
    <View style={{ padding: 20 }}>
      <TextInput
        style={{
          borderWidth: 1,
          padding: 10,
          marginBottom: 10,
          borderRadius: 4,
        }}
        placeholder="Enter your prompt"
        value={input}
        onChangeText={setInput}
      />
      <Button title="Generate Response" onPress={generateResponse} />
      {result && (
        <View style={{ marginTop: 20 }}>
          <Text style={{ fontWeight: 'bold' }}>Response:</Text>
          <Text>{getGeneratedText()}</Text>
        </View>
      )}
    </View>
  );
};

export default HuggingfaceExample;
