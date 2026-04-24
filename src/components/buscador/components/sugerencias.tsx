import { useEffect, useMemo, useState } from "react";
import { ProductoService } from "../../../service/productoService";
import type { ProductoPresentacion } from "../../../service/interfaces/ProductoPresentacion";
import "./sugerencias.css";

interface SugerenciasProps {
	query: string;
	onSelect: (nombre: string) => void;
}

const Sugerencias = ({ query, onSelect }: SugerenciasProps) => {
	const [productos, setProductos] = useState<ProductoPresentacion[]>([]);
	const service = new ProductoService();

	useEffect(() => {
		let active = true;

		service
			.getProductosPresentacion()
			.then((data) => {
				if (active) setProductos(data);
			})
			.catch(() => {
				if (active) setProductos([]);
			});

		return () => {
			active = false;
		};
	}, []);

	const sugerencias = useMemo(() => {
		const texto = query.trim().toLowerCase();
		if (!texto) return [];

		return productos
			.filter((p) => p.nombre.toLowerCase().includes(texto))
			.slice(0, 4);
	}, [productos, query]);

	if (!query.trim() || sugerencias.length === 0) return null;

	return (
		<div className="header-search-suggestions" role="listbox" aria-label="Sugerencias de productos">
			{sugerencias.map((item) => (
				<button
					key={item.id}
					type="button"
					className="header-search-suggestion"
					onClick={() => onSelect(item.nombre)}
				>
					{item.nombre}
				</button>
			))}
		</div>
	);
};

export default Sugerencias;
