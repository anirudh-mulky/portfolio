import { useRef, useMemo } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'

const AlchemyParticles = () => {
    const pointsRef = useRef<THREE.Points>(null)
    const count = 5000 // Number of particles

    // Generate random positions and attributes
    const [positions, randomness, colors] = useMemo(() => {
        const pos = new Float32Array(count * 3)
        const rnd = new Float32Array(count)
        const col = new Float32Array(count * 3)

        const goldOne = new THREE.Color('#fbbf24')
        const goldTwo = new THREE.Color('#f59e0b')
        const blue = new THREE.Color('#3b82f6') // Electric Blue
        const purple = new THREE.Color('#a855f7') // Bright Purple

        for (let i = 0; i < count; i++) {
            // Spread particles in a wide area
            pos[i * 3] = (Math.random() - 0.5) * 12
            pos[i * 3 + 1] = (Math.random() - 0.5) * 12
            pos[i * 3 + 2] = (Math.random() - 0.5) * 6

            rnd[i] = Math.random()

            // Color Mixing
            const choice = Math.random()
            let c = goldOne

            // 8% chance for a special spark text
            if (choice > 0.92) {
                c = Math.random() > 0.5 ? blue : purple
            } else if (choice > 0.6) {
                c = goldTwo
            }

            col[i * 3] = c.r
            col[i * 3 + 1] = c.g
            col[i * 3 + 2] = c.b
        }
        return [pos, rnd, col]
    }, [])

    const vertexShader = `
        uniform float uTime;
        attribute float aRandom;
        attribute vec3 aColor;
        
        varying float vAlpha;
        varying float vRandom;
        varying vec3 vColor;

        void main() {
            vRandom = aRandom;
            vColor = aColor;
            vec3 pos = position;
            
            // Gentle floating motion
            float time = uTime * 0.15;
            
            // Curl-like noise/wave motion
            pos.x += sin(time + pos.y * 1.5) * 0.2;
            pos.y += cos(time + pos.x * 1.5) * 0.2;
            pos.z += sin(time + pos.z * 1.5) * 0.1;
            
            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Size attenuation
            float sizeBase = (12.0 * aRandom + 4.0);
            
            // Make blue/purple sparks occasionally pop larger
            bool isRare = (vColor.b > 0.7); // Check if blue component is high
            if (isRare) {
                // Fast blinking for sparks
                float blink = sin(uTime * 4.0 + aRandom * 20.0);
                if (blink > 0.5) sizeBase *= 1.8; 
            }

            gl_PointSize = sizeBase * (1.0 / -mvPosition.z);
            
            // Fade particles based on depth/movement
            vAlpha = 0.6 + 0.4 * sin(time * 2.0 + aRandom * 10.0);
        }
    `

    const fragmentShader = `
        varying float vAlpha;
        varying float vRandom;
        varying vec3 vColor;
        
        void main() {
            // Circular particle
            float r = distance(gl_PointCoord, vec2(0.5));
            if (r > 0.5) discard;
            
            // Glow center
            float glow = 1.0 - (r * 2.0);
            glow = pow(glow, 2.0);
            
            // Add extra sparkle intensity to center
            vec3 finalColor = vColor;
            
            // White hot center for all, but more intense for sparks
            finalColor += vec3(glow * 0.8); 

            gl_FragColor = vec4(finalColor, vAlpha * glow);
        }
    `

    const uniforms = useMemo(() => ({
        uTime: { value: 0 }
    }), [])

    useFrame((state) => {
        if (pointsRef.current) {
            const material = pointsRef.current.material as THREE.ShaderMaterial
            material.uniforms.uTime.value = state.clock.getElapsedTime()

            // Subtle rotation of the whole cloud
            pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.03
        }
    })

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute
                    attach="attributes-position"
                    count={count}
                    array={positions}
                    itemSize={3}
                />
                <bufferAttribute
                    attach="attributes-aRandom"
                    count={count}
                    array={randomness}
                    itemSize={1}
                />
                <bufferAttribute
                    attach="attributes-aColor"
                    count={count}
                    array={colors}
                    itemSize={3}
                />
            </bufferGeometry>
            <shaderMaterial
                vertexShader={vertexShader}
                fragmentShader={fragmentShader}
                uniforms={uniforms}
                transparent
                depthWrite={false}
                blending={THREE.AdditiveBlending}
            />
        </points>
    )
}

export default AlchemyParticles
