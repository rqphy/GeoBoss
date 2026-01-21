import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import * as THREE from "three"

interface CountryMarkerProps {
	radius?: number
	color?: THREE.Color | string | number
	globeRadius?: number
}

export default function CountryMarker({
	radius = 0.5,
	color = 0xff6b35,
	globeRadius = 100,
}: CountryMarkerProps) {
	const meshRef = useRef<THREE.Mesh>(null)
	const ringMaterialRef = useRef<THREE.MeshBasicMaterial>(null)

	// Since the globe rotates to face the country toward the camera,
	// the marker is always at a fixed position on the front of the globe
	const position = new THREE.Vector3(0, 0, globeRadius + 2)

	// Pulsing animation
	useFrame(({ clock }) => {
		if (meshRef.current) {
			const scale = 1 + Math.sin(clock.elapsedTime * 3) * 0.2
			meshRef.current.scale.setScalar(scale)
		}
		if (ringMaterialRef.current) {
			ringMaterialRef.current.opacity =
				0.5 - Math.sin(clock.elapsedTime * 2) * 0.3
		}
	})

	return (
		<group position={position}>
			{/* Main marker sphere */}
			<mesh ref={meshRef}>
				<sphereGeometry args={[radius, 16, 16]} />
				<meshStandardMaterial
					color={color}
					emissive={color}
					emissiveIntensity={0.5}
				/>
			</mesh>

			{/* Pulsing ring around marker */}
			<mesh rotation={[Math.PI / 2, 0, 0]}>
				<ringGeometry args={[radius * 1.5, radius * 2, 32]} />
				<meshBasicMaterial
					ref={ringMaterialRef}
					color={color}
					transparent
					opacity={0.5}
					side={THREE.DoubleSide}
				/>
			</mesh>
		</group>
	)
}
