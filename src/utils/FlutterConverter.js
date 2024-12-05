import React from 'react';

const FlutterConverter = ({ filteredItems, setFlutterCode }) => {
  const convertToFlutter = () => {
    const widgetCode = filteredItems.map((item) => {
      return `Positioned(
  left: ${item.position.x},
  top: ${item.position.y},
  child: Container(
    color: Color(0x${item.backgroundColor.replace('#', '')}),
    padding: EdgeInsets.all(8.0),
    child: Text(
      '${item.id}', // Use item ID or label
      style: TextStyle(color: Color(0x${item.color.replace('#', '')})),
    ),
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
        body: Stack(
          children: [
            ${widgetCode}
          ],
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
