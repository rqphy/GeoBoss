import { useMemo, useEffect } from "react"
import * as THREE from "three"
import { GeoJSONLoader, type Polygon } from "three-geojson"
import { Ellipsoid } from "3d-tiles-renderer"

// Create an ellipsoid with radius 100 for better geometry resolution
const GLOBE_ELLIPSOID = new Ellipsoid(100, 100, 100)

interface CountryProps {
	polygons: Polygon[]
	color?: THREE.Color | string | number
	offset?: number
}

export default function Country({
	polygons,
	color = 0x44aa88,
	offset = 0.1,
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

	useEffect(() => {
		return () => {
			if (mesh) {
				mesh.traverse((child) => {
					if (child instanceof THREE.Mesh) {
						child.geometry?.dispose()
						if (child.material) {
							if (Array.isArray(child.material)) {
								child.material.forEach((mat) => mat.dispose())
							} else {
								child.material.dispose()
							}
						}
					}
				})
			}
		}
	}, [mesh])

	if (!mesh) return null

	return (
		<primitive object={mesh}>
			<meshStandardMaterial
				color={color}
				side={THREE.FrontSide}
				polygonOffset={true}
				polygonOffsetFactor={-1}
				polygonOffsetUnits={-1}
			/>
		</primitive>
	)
}
