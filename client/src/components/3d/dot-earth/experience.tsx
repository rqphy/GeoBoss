import { useRef } from "react"
import * as THREE from "three"
import earthVertexShader from "./earth/vertex.glsl"
import earthFragmentShader from "./earth/fragment.glsl"
import { useLoader, useFrame } from "@react-three/fiber"

// d62828 rose
// ffd60a jaune
// 023e8a bleu
// d00000 rouge
// 008000 vert
// 3c096c violet
const colors = [
	"#d62828",
	"#ffd60a",
	"#023e8a",
	"#d00000",
	"#008000",
	"#3c096c",
]

function hexToRgb(hex: string) {
	const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
	return result
		? [
				parseInt(result[1], 16) / 255,
				parseInt(result[2], 16) / 255,
				parseInt(result[3], 16) / 255,
		  ]
		: null
}

const dotColor = hexToRgb(colors[Math.floor(Math.random() * colors.length)])
const backgroundColor = [0, 0, 0]
const dotSize = 10.0

export default function Experience() {
	const earthDayTexture = useLoader(THREE.TextureLoader, "/earth/day.jpg")
	earthDayTexture.colorSpace = THREE.SRGBColorSpace
	earthDayTexture.anisotropy = 8

	const earthRef = useRef<THREE.Mesh | null>(null)

	useFrame(() => {
		if (earthRef.current) {
			// earthRef.current.rotation.y += 0.0001
			earthRef.current.rotation.x += 0.00007
		}
	})

	return (
		<>
			<mesh ref={earthRef} position={[0, -2.3, 0]} rotation={[0, 0, 0]}>
				<sphereGeometry args={[4, 64, 64]} />
				<shaderMaterial
					uniforms={{
						uDayTexture: new THREE.Uniform(earthDayTexture),
						uDotSize: new THREE.Uniform(dotSize),
						uDotColor: new THREE.Uniform(dotColor),
						uBackgroundColor: new THREE.Uniform(backgroundColor),
					}}
					vertexShader={earthVertexShader}
					fragmentShader={earthFragmentShader}
				/>
			</mesh>
		</>
	)
}
