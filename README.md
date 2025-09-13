# 🚦 Smart Traffic Management System

A modern web-based implementation of Dijkstra's algorithm for optimal route planning in traffic management systems.

## 🌟 Features

- **Interactive Graph Visualization**: Real-time network visualization using D3.js
- **Dynamic Input System**: Configure junctions, roads, and costs through an intuitive interface
- **Shortest Path Algorithm**: Implementation of Dijkstra's algorithm for finding optimal routes
- **Visual Path Highlighting**: Animated highlighting of shortest paths with different colors
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Results**: Live display of shortest path costs and reachability

## 🚀 Live Demo

The application is designed to run locally. Simply open `index.html` in your web browser or use a local server.

## 📁 Project Structure

```
├── index.html          # Main HTML structure
├── styles.css          # Modern CSS styling and animations
├── script.js           # JavaScript implementation with D3.js visualization
├── README.md           # Project documentation
└── .gitignore          # Git ignore file
```

## 🛠️ Technologies Used

- **HTML5**: Semantic markup structure
- **CSS3**: Modern styling with gradients, animations, and responsive design
- **JavaScript (ES6+)**: Core application logic and interactivity
- **D3.js**: Data visualization and graph rendering
- **Dijkstra's Algorithm**: Shortest path finding algorithm

## 🎯 How to Use

1. **Set Network Parameters**:
   - Enter the number of junctions (nodes) in your traffic network
   - Specify the number of roads (edges) you want to add

2. **Configure Roads**:
   - Add road connections by specifying:
     - **From Junction**: Starting point
     - **To Junction**: Destination point
     - **Cost**: Travel cost (distance × traffic factor)

3. **Find Shortest Paths**:
   - Select a source junction
   - Click "Find Shortest Paths" to run Dijkstra's algorithm
   - View the results and see highlighted paths on the graph

4. **Visual Features**:
   - **Green nodes**: Source junction
   - **Blue nodes**: Visited/reachable junctions
   - **Red nodes**: Unreachable junctions
   - **Animated green lines**: Shortest paths
   - **Gray lines**: Regular connections

## 🔧 Local Development

### Option 1: Direct File Access
Simply open `index.html` in your web browser.

### Option 2: Local Server
```bash
# Using Python
python3 -m http.server 8000

# Using Node.js (if you have it installed)
npx http-server -p 8000

# Using PHP
php -S localhost:8000
```

Then visit `http://localhost:8000` in your browser.

## 🧮 Algorithm Details

The system implements Dijkstra's algorithm for finding the shortest paths from a source node to all other nodes in a weighted, directed graph:

1. **Initialization**: Set distance to source as 0, all others as infinity
2. **Main Loop**: For each iteration:
   - Select the unvisited node with minimum distance
   - Mark it as visited
   - Update distances to its neighbors if a shorter path is found
3. **Result**: Return shortest distances and paths to all reachable nodes

## 🎨 UI/UX Features

- **Modern Design**: Gradient backgrounds and smooth animations
- **Interactive Elements**: Clickable nodes, dynamic forms, and real-time updates
- **Color Coding**: Intuitive color scheme for different node states
- **Responsive Layout**: Adapts to different screen sizes
- **Smooth Animations**: Animated path highlighting and transitions

## 📱 Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge
- Mobile browsers

## 🤝 Contributing

Feel free to contribute to this project by:
- Adding new features
- Improving the UI/UX
- Optimizing the algorithm
- Adding more visualization options
- Creating additional test cases

## 📄 License

This project is open source and available under the MIT License.

## 🚀 Future Enhancements

- [ ] Real-time traffic data integration
- [ ] Multiple algorithm options (A*, Bellman-Ford)
- [ ] Export/import network configurations
- [ ] 3D visualization
- [ ] Mobile app version
- [ ] Backend API integration
- [ ] User authentication and saved networks

---

**Built with ❤️ for efficient traffic management and route optimization**
