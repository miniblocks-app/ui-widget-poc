// src/components/FlutterConverter.js
import React from 'react';

const FlutterConverter = ({ filteredItems, setFlutterCode }) => {
  const convertToFlutter = () => {
    const widgetCode = filteredItems.map(item => {
      return `Container(
  color: Color(0x${item.backgroundColor.replace('#', '')}),
  child: Text(
    'Button',
    style: TextStyle(color: Color(0x${item.color.replace('#', '')})),
  ),
),`;
    }).join("\n");

    const code = `import 'package:flutter/material.dart';

void main() {
  runApp(MyApp());
}

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      home: Scaffold(
        appBar: AppBar(title: Text('Drag and Drop Items')),
        body: Center(
          child: Column(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              ${widgetCode}
            ],
          ),
        ),
      ),
    );
  }
}`;

    setFlutterCode(code);
  };

  return (
    <button onClick={convertToFlutter} style={{ marginTop: "10px", padding: "10px" }}>
      Convert to Dart
    </button>
  );
};

export default FlutterConverter;
