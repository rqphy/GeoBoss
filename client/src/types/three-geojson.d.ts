declare module "three-geojson" {
	import * as THREE from "three"
	import { Ellipsoid } from "3d-tiles-renderer"

	interface Polygon {
		type: string
		feature: Feature
		getLineObject(options?: MeshOptions): THREE.LineSegments
		getMeshObject(options?: MeshOptions): THREE.Mesh
	}

	interface LineString {
		type: string
		feature: Feature
		getLineObject(options?: MeshOptions): THREE.LineSegments
	}

	interface Points {
		type: string
		feature: Feature
		data: THREE.Vector3 | THREE.Vector3[]
	}

	interface Feature {
		type: "Feature"
		id: string | null
		properties: Record<string, unknown>
		geometries: (Polygon | LineString | Points)[]
		polygons: Polygon[]
		lines: LineString[]
		points: Points[]
	}

	interface GeoJSONResult {
		features: Feature[]
		geometries: (Polygon | LineString)[]
		polygons: Polygon[]
		lines: LineString[]
	}

	interface MeshOptions {
		offset?: number
		altitudeScale?: number
		flat?: boolean
		ellipsoid?: Ellipsoid
		resolution?: number | null
		thickness?: number
		useEarcut?: boolean
		detectSelfIntersection?: boolean
	}

	export class GeoJSONLoader {
		fetchOptions: object
		loadAsync(url: string): Promise<GeoJSONResult>
		parse(content: string | object): GeoJSONResult
		static getMeshObject(
			objects: Polygon[],
			options?: MeshOptions
		): THREE.Mesh
		static getLineObject(
			objects: (Polygon | LineString)[],
			options?: MeshOptions
		): THREE.LineSegments
	}
}
