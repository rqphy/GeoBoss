import { useEffect, useState, useRef } from "react"
import { GeoJSONLoader, type Feature } from "three-geojson"
import Country from "./country"
import CountryMarker from "./country-marker"
import Atmosphere from "./atmosphere"
import * as THREE from "three"
import { useSocket } from "@/contexts/socket-context"
import { TINY_COUNTRIES } from "@/constants/countries"
import gsap from "gsap"

export default function GlobeViewer() {
	const [features, setFeatures] = useState<Feature[]>([])
	const [loading, setLoading] = useState(true)
	const [showMarker, setShowMarker] = useState(false)
	const globeRef = useRef<THREE.Group>(null)
	const { currentCountryCode } = useSocket()

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

	// Animate globe rotation when currentCountryCode changes
	useEffect(() => {
		setShowMarker(false) // Hide marker when animation starts

		if (!currentCountryCode || !globeRef.current || features.length === 0)
			return

		// Find the feature for the current country by ISO code
		const feature = features.find(
			(f) => f.properties?.iso_a2 === currentCountryCode
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
			onComplete: () => setShowMarker(true),
		})
	}, [currentCountryCode, features])

	// Determine country color based on ISO code
	const getColor = (isoCode: string | undefined) => {
		if (currentCountryCode === isoCode) return 0xff6b35 // Orange for target country
		return 0xf5ee9e // Default yellow
	}

	// Determine country offset based on ISO code
	const getOffset = (isoCode: string | undefined) => {
		if (currentCountryCode === isoCode) return 0.11 // Slight pop for target
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
		<>
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
						(feature.properties?.name as string) ||
						`country-${index}`
					const isoCode = feature.properties?.iso_a2 as
						| string
						| undefined

					return (
						<Country
							key={name}
							name={name}
							polygons={feature.polygons}
							color={getColor(isoCode)}
							offset={getOffset(isoCode)}
						/>
					)
				})}
			</group>

			{/* Marker for tiny countries - outside the rotating group */}
			{currentCountryCode &&
				showMarker &&
				TINY_COUNTRIES.has(currentCountryCode) && (
					<CountryMarker color={0xff6b35} globeRadius={47} />
				)}
		</>
	)
}
