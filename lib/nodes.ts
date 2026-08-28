export const NODE_ENDPOINTS = {
  ETH: [
    { id: "main", url: "http://localhost:8545" },
    { id: "backup", url: "http://192.168.1.22:8545" },
    { id: "remote", url: "https://eth.llamarpc.com" }
  ],

  TON: [
    { id: "main", url: "http://localhost:8081" },
    { id: "backup", url: "http://192.168.1.22:8081" }
  ],

  TRON: [
    { id: "main", url: "http://localhost:8090" },
    { id: "backup", url: "http://192.168.1.22:8090" }
  ]
};