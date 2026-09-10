import { useState, useRef, useEffect } from "react";
import { ChevronDown, Search, X } from "lucide-react";

interface Option {
  id: number | string;
  label: string;
}

interface SearchableSelectProps {
  options: Option[];
  value: string | number | null;
  onChange: (value: string | number) => void;
  placeholder?: string;
  label?: string;
}

export default function SearchableSelect({ options, value, onChange, placeholder = "Buscar...", label }: SearchableSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find(opt => opt.id === value);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const filteredOptions = options.filter(opt =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="searchable-select" ref={containerRef} style={{ position: "relative", flex: 1, display: "flex", flexDirection: "column", gap: 6 }}>
      {label && <label style={{ fontSize: "12px", color: "#9c9cb0", fontWeight: 600 }}>{label}</label>}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "#16161f",
          border: "1px solid #292937",
          borderRadius: "8px",
          padding: "9px 11px",
          cursor: "pointer",
          fontSize: "13.5px",
          color: selectedOption ? "#e9e9f2" : "#6d6d82",
          minHeight: "38px"
        }}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown size={14} style={{ opacity: 0.5 }} />
      </div>

      {isOpen && (
        <div style={{
          position: "absolute",
          top: "100%",
          left: 0,
          right: 0,
          zIndex: 100,
          background: "#121219",
          border: "1px solid #262633",
          borderRadius: "8px",
          marginTop: "4px",
          boxShadow: "0 8px 24px rgba(0,0,0,0.5)",
          maxHeight: "250px",
          overflowY: "auto"
        }}>
          <div style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            padding: "8px",
            borderBottom: "1px solid #22222d",
            position: "sticky",
            top: 0,
            background: "#121219"
          }}>
            <Search size={14} color="#7f7f95" />
            <input
              autoFocus
              placeholder="Buscar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                background: "none",
                border: "none",
                outline: "none",
                color: "#e9e9f2",
                fontSize: "13px",
                width: "100%",
                padding: "4px 0"
              }}
            />
            {searchTerm && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setSearchTerm("");
                }}
                style={{ background: "none", border: "none", cursor: "pointer", color: "#7f7f95" }}
              >
                <X size={14} />
              </button>
            )}
          </div>
          {filteredOptions.length > 0 ? (
            filteredOptions.map(opt => (
              <div
                key={opt.id}
                onClick={() => {
                  onChange(opt.id);
                  setIsOpen(false);
                  setSearchTerm("");
                }}
                style={{
                  padding: "9px 11px",
                  fontSize: "13px",
                  cursor: "pointer",
                  color: opt.id === value ? "#b45cf0" : "#cfcfe0",
                  background: opt.id === value ? "rgba(180, 92, 240, 0.1)" : "transparent",
                  borderBottom: "1px solid rgba(255,255,255,0.02)"
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}
                onMouseLeave={(e) => e.currentTarget.style.background = opt.id === value ? "rgba(180, 92, 240, 0.1)" : "transparent"}
              >
                {opt.label}
              </div>
            ))
          ) : (
            <div style={{ padding: "12px", fontSize: "12px", color: "#6d6d82", textAlign: "center" }}>
              No se encontraron resultados.
            </div>
          )}
        </div>
      )}
    </div>
  );
}
