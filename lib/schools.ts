// Ported directly from the reference mockup (cfb_trivia_unified_app.jsx).
export type School = {
  id: string;
  name: string;
  color: string;
};

export const SCHOOLS: School[] = [
  { id: "alabama", name: "Alabama", color: "#9E1B32" },
  { id: "michigan", name: "Michigan", color: "#00274C" },
  { id: "georgia", name: "Georgia", color: "#BA0C2F" },
  { id: "ohio-state", name: "Ohio State", color: "#BB0000" },
  { id: "texas", name: "Texas", color: "#BF5700" },
  { id: "oklahoma", name: "Oklahoma", color: "#841617" },
  { id: "usc", name: "USC", color: "#990000" },
  { id: "notre-dame", name: "Notre Dame", color: "#0C2340" },
  { id: "clemson", name: "Clemson", color: "#F56600" },
  { id: "lsu", name: "LSU", color: "#461D7C" },
  { id: "penn-state", name: "Penn State", color: "#041E42" },
  { id: "texas-am", name: "Texas A&M", color: "#500000" },
  { id: "florida-state", name: "Florida State", color: "#782F40" },
  { id: "utsa", name: "UTSA", color: "#0C2340" },
];

export function schoolById(id: string | null | undefined): School | undefined {
  if (!id) return undefined;
  return SCHOOLS.find((s) => s.id === id);
}
