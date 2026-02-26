export default function ChainSelector({ chains, value, onChange }) {
  return (
    <select
      value={value}
      onChange={e => onChange(e.target.value)}
      style={{
        padding: '10px 12px',
        borderRadius: 8,
        border: '1px solid #374151',
        background: '#020617',
        color: '#e5e7eb'
      }}
    >
      {chains.map(c => (
        <option key={c.id} value={c.id}>
          {c.label}
        </option>
      ))}
    </select>
  );
}
