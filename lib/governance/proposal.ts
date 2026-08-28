export function createProposal({ title, description, actions }) {
  return {
    title,
    description,
    actions,
    createdAt: new Date().toISOString(),
    version: "1.0.0",
  };
}
