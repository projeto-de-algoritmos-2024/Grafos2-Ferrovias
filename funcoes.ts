type Graph = { [key: string]: { [neighbor: string]: number } };

function dijkstra(graph: Graph, startNode: string): { [key: string]: number } {
    const distances: { [key: string]: number } = {};
    const visited: Set<string> = new Set();
    const priorityQueue: { node: string; distance: number }[] = [];

    // Inicializa todas as distâncias como infinito
    for (const node in graph) {
        distances[node] = Infinity;
    }
    distances[startNode] = 0;

    priorityQueue.push({ node: startNode, distance: 0 });

    while (priorityQueue.length > 0) {
        // Ordena a fila de prioridade pelo menor valor de distância
        priorityQueue.sort((a, b) => a.distance - b.distance);
        const { node: currentNode } = priorityQueue.shift()!;

        // Marca o nó como visitado
        if (visited.has(currentNode)) continue;
        visited.add(currentNode);

        // Atualiza as distâncias dos vizinhos
        for (const neighbor in graph[currentNode]) {
            const weight = graph[currentNode][neighbor];
            const newDistance = distances[currentNode] + weight;

            if (newDistance < distances[neighbor]) {
                distances[neighbor] = newDistance;
                priorityQueue.push({ node: neighbor, distance: newDistance });
            }
        }
    }

    return distances;
}

function haversine(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  const toRadians = (degree: number) => (degree * Math.PI) / 180;

  const R = 6371; // Raio da Terra em quilômetros
  const φ1 = toRadians(lat1);
  const φ2 = toRadians(lat2);
  const Δφ = toRadians(lat2 - lat1);
  const Δλ = toRadians(lon2 - lon1);

  const a =
    Math.sin(Δφ / 2) * Math.sin(Δφ / 2) +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) * Math.sin(Δλ / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // Distância em quilômetros
}


function calcularHipotenusa(catetoOposto: number, catetoAdjacente: number): number {
    return Math.sqrt(catetoOposto ** 2 + catetoAdjacente ** 2);
}

function diferencaAbsoluta(num1: number, num2: number): number {
    return Math.abs(num1 - num2);
}
