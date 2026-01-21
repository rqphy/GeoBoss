import { useEffect, useState, useRef } from "react"
import { GeoJSONLoader, type Feature } from "three-geojson"
import Country from "./country"
import Atmosphere from "./atmosphere"
import * as THREE from "three"
import { useSocket } from "@/contexts/socket-context"
import gsap from "gsap"

export default function GlobeViewer() {
	const [features, setFeatures] = useState<Feature[]>([])
	const [loading, setLoading] = useState(true)
	const globeRef = useRef<THREE.Group>(null)
	const { currentCountry } = useSocket()

	useEffect(() => {
		const loader = new GeoJSONLoader()

		loader
			.loadAsync("/world.geojson")
			.then((result) => {
				setFeatures(result.features)
				setLoading(false)
			})
			.catch((error) => {
				console.error("Failed to load GeoJSON:", error)
				setLoading(false)
			})
	}, [])

	// Animate globe rotation when currentCountry changes
	useEffect(() => {
		if (!currentCountry || !globeRef.current || features.length === 0)
			return

		// Find the feature for the current country
		const feature = features.find(
			(f) => f.properties?.name_fr === currentCountry
		)
		if (!feature) return

		// Get country centroid from GeoJSON properties
		const lng = feature.properties?.label_x as number
		const lat = feature.properties?.label_y as number
		if (lng === undefined || lat === undefined) return

		// Convert lat/lng to rotation angles
		// The globe has base rotation of [-Math.PI / 2, 0, -Math.PI / 2]
		// We need to rotate it so the country faces the camera
		const targetRotationY = -THREE.MathUtils.degToRad(lng)
		const targetRotationX = -Math.PI / 2 + THREE.MathUtils.degToRad(lat)

		// Animate the globe rotation with GSAP
		gsap.to(globeRef.current.rotation, {
			x: targetRotationX,
			z: targetRotationY - Math.PI / 2,
			duration: 1.5,
			ease: "power2.inOut",
		})
	}, [currentCountry, features])

	// Determine country color based on state
	const getColor = (name: string) => {
		if (currentCountry === name) return 0xff6b35 // Orange for target country
		return 0xf5ee9e // Default yellow
	}

	// Determine country offset based on state
	const getOffset = (name: string) => {
		if (currentCountry === name) return 0.11 // Slight pop for target
		return 0.1
	}

	if (loading) {
		return (
			<mesh>
				<sphereGeometry args={[45, 32, 32]} />
				<meshStandardMaterial color={0x468faf} wireframe />
			</mesh>
		)
	}

	return (
		<group
			rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
			scale={[0.45, 0.45, 0.45]}
			ref={globeRef}
		>
			<Atmosphere radius={105} color="#2a6f97" />

			<mesh>
				<sphereGeometry args={[100, 100, 50]} />
				<meshStandardMaterial color={0x2a6f97} />
			</mesh>

			{/* Countries */}
			{features.map((feature, index) => {
				const name =
					(feature.properties?.name as string) || `country-${index}`
				const nameFr = (feature.properties?.name_fr as string) || name
				// TODO: use iso code instead of names

				return (
					<Country
						key={name}
						name={name}
						polygons={feature.polygons}
						color={getColor(nameFr)}
						offset={getOffset(nameFr)}
					/>
				)
			})}
		</group>
	)
}
