export default function Validator() {
  return (
    <div style={{ padding: 20 }}>
      <h1 style={{ fontSize: "28px", marginBottom: "20px" }}>
        Validator Module
      </h1>

      <p style={{ color: "#ccc", marginBottom: "20px" }}>
        This page will display your validator status, performance, uptime,
        balance, and chain health metrics.
      </p>

      <div
        style={{
          background: "#1a1a1a",
          padding: "20px",
          borderRadius: "12px",
          border: "1px solid #333",
        }}
      >
        <h2 style={{ marginBottom: "10px" }}>Validator Status</h2>
        <p>Loading validator data...</p>
      </div>
    </div>
  );
}