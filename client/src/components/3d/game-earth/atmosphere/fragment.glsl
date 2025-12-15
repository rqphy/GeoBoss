uniform vec3 uAtmosphereColor;

varying vec3 vNormal;
varying vec3 vPosition;

void main() {
    vec3 viewDirection = normalize(vPosition - cameraPosition);
    vec3 normal = normalize(vNormal);
    vec3 color = uAtmosphereColor;

    float edgeAlpha = dot(viewDirection, normal);
    edgeAlpha = smoothstep(0.0, 0.5, edgeAlpha);

    gl_FragColor = vec4(color, edgeAlpha);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
}
