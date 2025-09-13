// Smart Traffic Management System - Frontend
class TrafficManagementSystem {
    constructor() {
        this.graph = [];
        this.nodes = [];
        this.links = [];
        this.shortestPaths = {};
        this.sourceNode = 0;
        this.numJunctions = 5;
        this.numRoads = 7;
        this.roadCount = 0;
        
        this.initializeEventListeners();
        this.generateInitialNetwork();
    }

    initializeEventListeners() {
        document.getElementById('generateNetwork').addEventListener('click', () => this.generateNetwork());
        document.getElementById('addRoad').addEventListener('click', () => this.addRoadInput());
        document.getElementById('findPath').addEventListener('click', () => this.findShortestPaths());
        document.getElementById('clearAll').addEventListener('click', () => this.clearAll());
        document.getElementById('resetGraph').addEventListener('click', () => this.resetGraph());
        
        document.getElementById('junctions').addEventListener('change', (e) => {
            this.numJunctions = parseInt(e.target.value);
            this.updateSourceOptions();
        });
    }

    generateInitialNetwork() {
        this.generateNetwork();
        this.addSampleRoads();
    }

    generateNetwork() {
        this.numJunctions = parseInt(document.getElementById('junctions').value);
        this.numRoads = parseInt(document.getElementById('roads').value);
        
        // Initialize graph
        this.graph = Array(this.numJunctions).fill().map(() => Array(this.numJunctions).fill(0));
        this.nodes = [];
        this.links = [];
        this.shortestPaths = {};
        this.roadCount = 0;
        
        // Clear road inputs
        document.getElementById('roadInputs').innerHTML = '';
        
        // Update source options
        this.updateSourceOptions();
        
        // Generate initial road inputs
        for (let i = 0; i < this.numRoads; i++) {
            this.addRoadInput();
        }
        
        this.updateVisualization();
    }

    updateSourceOptions() {
        const sourceSelect = document.getElementById('source');
        sourceSelect.innerHTML = '';
        
        for (let i = 0; i < this.numJunctions; i++) {
            const option = document.createElement('option');
            option.value = i;
            option.textContent = `Junction ${i}`;
            sourceSelect.appendChild(option);
        }
    }

    addRoadInput() {
        const roadInputs = document.getElementById('roadInputs');
        const roadDiv = document.createElement('div');
        roadDiv.className = 'road-input';
        roadDiv.innerHTML = `
            <input type="number" placeholder="From" min="0" max="${this.numJunctions - 1}" class="from-input">
            <input type="number" placeholder="To" min="0" max="${this.numJunctions - 1}" class="to-input">
            <input type="number" placeholder="Cost" min="1" class="cost-input">
            <button class="remove-road" onclick="this.parentElement.remove()">Remove</button>
        `;
        roadInputs.appendChild(roadDiv);
    }

    addSampleRoads() {
        // Add some sample roads for demonstration
        const sampleRoads = [
            [0, 1, 4], [0, 2, 2], [1, 2, 1], [1, 3, 5],
            [2, 3, 8], [2, 4, 10], [3, 4, 2]
        ];
        
        sampleRoads.forEach(([from, to, cost]) => {
            if (from < this.numJunctions && to < this.numJunctions) {
                this.graph[from][to] = cost;
            }
        });
        
        this.updateVisualization();
    }

    findShortestPaths() {
        this.sourceNode = parseInt(document.getElementById('source').value);
        
        // Collect road data from inputs
        this.collectRoadData();
        
        // Run Dijkstra's algorithm
        this.shortestPaths = this.dijkstra(this.graph, this.numJunctions, this.sourceNode);
        
        // Update visualization
        this.updateVisualization();
        
        // Display results
        this.displayResults();
    }

    collectRoadData() {
        // Reset graph
        this.graph = Array(this.numJunctions).fill().map(() => Array(this.numJunctions).fill(0));
        
        // Collect data from road inputs
        const roadInputs = document.querySelectorAll('.road-input');
        roadInputs.forEach(roadInput => {
            const from = parseInt(roadInput.querySelector('.from-input').value);
            const to = parseInt(roadInput.querySelector('.to-input').value);
            const cost = parseInt(roadInput.querySelector('.cost-input').value);
            
            if (!isNaN(from) && !isNaN(to) && !isNaN(cost) && 
                from >= 0 && from < this.numJunctions && 
                to >= 0 && to < this.numJunctions && cost > 0) {
                this.graph[from][to] = cost;
            }
        });
    }

    // Dijkstra's Algorithm Implementation
    dijkstra(graph, n, src) {
        const INF = 999999;
        const dist = new Array(n).fill(INF);
        const visited = new Array(n).fill(false);
        const parent = new Array(n).fill(-1);
        
        dist[src] = 0;
        
        for (let count = 0; count < n - 1; count++) {
            const u = this.minDistance(dist, visited, n);
            if (u === -1) break;
            
            visited[u] = true;
            
            for (let v = 0; v < n; v++) {
                if (!visited[v] && graph[u][v] && dist[u] + graph[u][v] < dist[v]) {
                    dist[v] = dist[u] + graph[u][v];
                    parent[v] = u;
                }
            }
        }
        
        return { dist, parent, visited };
    }

    minDistance(dist, visited, n) {
        const INF = 999999;
        let min = INF;
        let minIndex = -1;
        
        for (let v = 0; v < n; v++) {
            if (!visited[v] && dist[v] <= min) {
                min = dist[v];
                minIndex = v;
            }
        }
        return minIndex;
    }

    updateVisualization() {
        const svg = d3.select('#graph');
        svg.selectAll('*').remove();
        
        const width = 600;
        const height = 400;
        const margin = 50;
        
        svg.attr('width', width).attr('height', height);
        
        // Create nodes
        this.nodes = [];
        for (let i = 0; i < this.numJunctions; i++) {
            const angle = (2 * Math.PI * i) / this.numJunctions;
            const x = width / 2 + (width / 2 - margin) * Math.cos(angle - Math.PI / 2);
            const y = height / 2 + (height / 2 - margin) * Math.sin(angle - Math.PI / 2);
            
            this.nodes.push({
                id: i,
                x: x,
                y: y,
                label: `J${i}`
            });
        }
        
        // Create links
        this.links = [];
        for (let i = 0; i < this.numJunctions; i++) {
            for (let j = 0; j < this.numJunctions; j++) {
                if (this.graph[i][j] > 0) {
                    this.links.push({
                        source: this.nodes[i],
                        target: this.nodes[j],
                        weight: this.graph[i][j]
                    });
                }
            }
        }
        
        // Draw links
        const linkGroup = svg.append('g').attr('class', 'links');
        
        linkGroup.selectAll('line')
            .data(this.links)
            .enter()
            .append('line')
            .attr('x1', d => d.source.x)
            .attr('y1', d => d.source.y)
            .attr('x2', d => d.target.x)
            .attr('y2', d => d.target.y)
            .attr('class', d => {
                const isShortestPath = this.isShortestPathLink(d.source.id, d.target.id);
                return isShortestPath ? 'link shortest-path' : 'link';
            })
            .attr('stroke-width', d => this.isShortestPathLink(d.source.id, d.target.id) ? 4 : 2);
        
        // Draw link labels (weights)
        linkGroup.selectAll('text')
            .data(this.links)
            .enter()
            .append('text')
            .attr('x', d => (d.source.x + d.target.x) / 2)
            .attr('y', d => (d.source.y + d.target.y) / 2)
            .attr('class', 'link-label')
            .text(d => d.weight);
        
        // Draw nodes
        const nodeGroup = svg.append('g').attr('class', 'nodes');
        
        nodeGroup.selectAll('circle')
            .data(this.nodes)
            .enter()
            .append('circle')
            .attr('cx', d => d.x)
            .attr('cy', d => d.y)
            .attr('r', 20)
            .attr('class', d => {
                if (d.id === this.sourceNode) return 'node source';
                if (this.shortestPaths.visited && this.shortestPaths.visited[d.id]) return 'node visited';
                if (this.shortestPaths.dist && this.shortestPaths.dist[d.id] === 999999) return 'node unreachable';
                return 'node';
            })
            .on('click', (event, d) => {
                document.getElementById('source').value = d.id;
                this.sourceNode = d.id;
            });
        
        // Draw node labels
        nodeGroup.selectAll('text')
            .data(this.nodes)
            .enter()
            .append('text')
            .attr('x', d => d.x)
            .attr('y', d => d.y)
            .attr('class', 'node-label')
            .text(d => d.label);
    }

    isShortestPathLink(sourceId, targetId) {
        if (!this.shortestPaths.parent) return false;
        
        // Check if this link is part of any shortest path
        for (let i = 0; i < this.numJunctions; i++) {
            if (this.shortestPaths.dist && this.shortestPaths.dist[i] !== 999999) {
                let current = i;
                while (current !== this.sourceNode && this.shortestPaths.parent[current] !== -1) {
                    if (this.shortestPaths.parent[current] === sourceId && current === targetId) {
                        return true;
                    }
                    current = this.shortestPaths.parent[current];
                }
            }
        }
        return false;
    }

    displayResults() {
        const resultsDiv = document.getElementById('results');
        resultsDiv.innerHTML = '';
        
        if (!this.shortestPaths.dist) return;
        
        const INF = 999999;
        
        for (let i = 0; i < this.numJunctions; i++) {
            const resultItem = document.createElement('div');
            resultItem.className = 'result-item';
            
            if (i === this.sourceNode) {
                resultItem.className += ' source';
                resultItem.textContent = `Junction ${i}: Source (Cost: 0)`;
            } else if (this.shortestPaths.dist[i] === INF) {
                resultItem.className += ' unreachable';
                resultItem.textContent = `Junction ${i}: Not reachable`;
            } else {
                resultItem.textContent = `Junction ${i}: ${this.shortestPaths.dist[i]}`;
            }
            
            resultsDiv.appendChild(resultItem);
        }
    }

    clearAll() {
        this.graph = [];
        this.nodes = [];
        this.links = [];
        this.shortestPaths = {};
        this.roadCount = 0;
        
        document.getElementById('roadInputs').innerHTML = '';
        document.getElementById('results').innerHTML = '';
        document.getElementById('junctions').value = 5;
        document.getElementById('roads').value = 7;
        
        this.generateNetwork();
    }

    resetGraph() {
        this.shortestPaths = {};
        document.getElementById('results').innerHTML = '';
        this.updateVisualization();
    }
}

// Initialize the application when the page loads
document.addEventListener('DOMContentLoaded', () => {
    new TrafficManagementSystem();
});
