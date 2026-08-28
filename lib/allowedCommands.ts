export const ALLOWED_COMMANDS = {
  ETH: {
    // Core commands
    "geth-status": "systemctl status geth",
    "geth-restart": "sudo systemctl restart geth",
    "validator-status": "curl -X POST http://localhost:5052/eth/v1/node/health",
    "validator-sync": "curl -X GET http://localhost:5052/eth/v1/node/syncing",

    // Snapshot commands
    "snapshot-backup": "geth snapshot prune-state --datadir /var/lib/geth",
    "snapshot-restore": "geth db restore --datadir /var/lib/geth /backups/latest",
    "snapshot-prune": "geth snapshot prune-state --datadir /var/lib/geth",
  },

  TON: {
    // Core commands
    "ton-status": "systemctl status tonos",
    "ton-restart": "sudo systemctl restart tonos",
    "ton-peers": "tonos-cli getstats",

    // Snapshot commands
    "snapshot-backup": "tonos-cli backup /var/lib/ton",
    "snapshot-restore": "tonos-cli restore /var/lib/ton /backups/latest",
    "snapshot-prune": "tonos-cli prune",
  },

  TRON: {
    // Core commands
    "tron-status": "systemctl status java-tron",
    "tron-restart": "sudo systemctl restart java-tron",
    "tron-peers": "curl http://localhost:8090/wallet/getpeers",

    // Snapshot commands
    "snapshot-backup": "java -jar FullNode.jar --saveSnapshot",
    "snapshot-restore": "java -jar FullNode.jar --loadSnapshot /backups/latest",
    "snapshot-prune": "java -jar FullNode.jar --prune",
  },
};
