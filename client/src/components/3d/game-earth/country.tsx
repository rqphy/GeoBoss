import { useMemo } from "react"
import * as THREE from "three"
import { GeoJSONLoader, type Polygon } from "three-geojson"
import { Ellipsoid } from "3d-tiles-renderer"

// Create an ellipsoid with radius 100 for better geometry resolution
const GLOBE_ELLIPSOID = new Ellipsoid(100, 100, 100)

interface CountryProps {
	name: string
	polygons: Polygon[]
	color?: THREE.Color | string | number
	offset?: number
	onClick?: (name: string) => void
	onPointerEnter?: (name: string) => void
	onPointerLeave?: (name: string) => void
}

export default function Country({
	name,
	polygons,
	color = 0x44aa88,
	offset = 0.001,
	onClick,
	onPointerEnter,
	onPointerLeave,
}: CountryProps) {
	const mesh = useMemo(() => {
		if (polygons.length === 0) return null

		// Get combined mesh from all polygons
		// ellipsoid projects onto a sphere with our custom radius
		// resolution resamples edges for proper curvature (prevents holes)
		const countryMesh = GeoJSONLoader.getMeshObject(polygons, {
			offset,
			ellipsoid: GLOBE_ELLIPSOID,
			resolution: 0.5,
		})

		return countryMesh
	}, [polygons])

	if (!mesh) return null

	return (
		<primitive
			object={mesh}
			onClick={() => onClick?.(name)}
			onPointerEnter={() => onPointerEnter?.(name)}
			onPointerLeave={() => onPointerLeave?.(name)}
		>
			<meshStandardMaterial color={color} side={THREE.DoubleSide} />
		</primitive>
	)
}
