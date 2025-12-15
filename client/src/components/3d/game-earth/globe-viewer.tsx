import { useEffect, useState } from "react"
import { GeoJSONLoader, type Feature } from "three-geojson"
import Country from "./country"
import Atmosphere from "./atmosphere"

// Color palette for countries
const COUNTRY_COLORS = [
	0x4ecdc4, // Teal
	0xff6b6b, // Coral
	0x95e1d3, // Mint
	0xf38181, // Salmon
	0xfce38a, // Yellow
	0xdff9fb, // Light blue
	0xf9ca24, // Gold
	0x6ab04c, // Green
	0xbadc58, // Lime
	0x22a6b3, // Cyan
	0xbe2edd, // Purple
	0xf0932b, // Orange
]

// Get a consistent color based on country name
function getCountryColor(name: string): number {
	let hash = 0
	for (let i = 0; i < name.length; i++) {
		hash = name.charCodeAt(i) + ((hash << 5) - hash)
	}
	return COUNTRY_COLORS[Math.abs(hash) % COUNTRY_COLORS.length]
}

export default function GlobeViewer() {
	const [features, setFeatures] = useState<Feature[]>([])
	const [loading, setLoading] = useState(true)
	const [hoveredCountry, setHoveredCountry] = useState<string | null>(null)

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

	const handleCountryClick = (name: string) => {
		console.log("Clicked:", name)
	}

	const handlePointerEnter = (name: string) => {
		setHoveredCountry(name)
		document.body.style.cursor = "pointer"
	}

	const handlePointerLeave = () => {
		setHoveredCountry(null)
		document.body.style.cursor = "auto"
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
				const isHovered = hoveredCountry === name
				const baseColor = getCountryColor(name)

				return (
					<Country
						key={name}
						name={name}
						polygons={feature.polygons}
						color={isHovered ? 0xffffff : 0xf5ee9e}
						offset={isHovered ? 0.12 : 0.1}
						onClick={handleCountryClick}
						onPointerEnter={handlePointerEnter}
						onPointerLeave={handlePointerLeave}
					/>
				)
			})}
		</group>
	)
}
