uniform float uTime;
uniform vec2 uResolution;
uniform vec2 uMouse;
uniform float uScroll;
uniform float uInvert;
uniform vec2 uHoverPosition;
uniform vec2 uHoverSize;

#define iTime uTime
#define iResolution uResolution


float hash(float p)
{
    p = fract(p * 0.011);
    p *= p + 7.5;
    p *= p + p;

    return fract(p);
}


float hash(vec2 p)
{
    vec3 p3 = fract(vec3(p.xyx) * 0.13);

    p3 += dot(
        p3,
        p3.yzx + 3.333
    );

    return fract(
        (p3.x + p3.y) * p3.z
    );
}


float noise(vec2 x)
{
    vec2 i = floor(x);
    vec2 f = fract(x);

    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(a, b, u.x)
        + (c - a) * u.y * (1.0 - u.x)
        + (d - b) * u.x * u.y;
}


float stacknoiselayer(
    vec2 fragCoord,
    float size,
    int layers
)
{
    float ret = 0.0;
    float layersize = size;

    for (int i = 0; i < layers; i++)
    {
        vec2 coord =
            fragCoord.xy * layersize
            - vec2(
                iResolution.y / 4.0,
                iTime * (float(i) - 1.0)
            );

        ret += noise(coord);

        layersize = layersize + layersize;
    }

    return ret / float(layers);
}


float band(
    float x,
    float minx,
    float maxx
)
{
    return (x > minx && x < maxx)
        ? 1.0
        : 0.0;
}


void main()
{
    vec2 fragCoord = gl_FragCoord.xy;

    fragCoord.y -= uScroll * iResolution.y;

    vec3 screen = vec3(0.0);

    float v = 0.0;

    vec2 mouse = uMouse;

    float dist = distance(
        fragCoord,
        mouse
    );

    float influence = smoothstep(
        500.0,
        0.0,
        dist
    );

    vec2 direction = normalize(
        mouse - fragCoord
    );

    vec2 distortedCoord =
        fragCoord + direction * influence * 50.0;

    v = stacknoiselayer(
        distortedCoord,
        0.0007,
        3
    );

    for (float i = 0.0; i < 27.0; i++)
    {
        float b = band(
            v,
            0.02 * i,
            0.0204 * i
        );

        screen = max(
            screen,
            vec3(b)
        );
    }

        float darkness = 0.4;

        vec3 c1 = vec3(0.3, 0.3, 0.3);
        vec3 c2 = vec3(0.8, 0.1, 0.3) * darkness;
        vec3 c3 = vec3(1.0, 0.5, 0.1) * darkness;
        vec3 c4 = vec3(0.1, 0.7, 0.6) * darkness;
        vec3 c5 = vec3(0.2, 0.3, 1.0) * darkness;

    vec3 color;

    if (uScroll < 0.25) {
        color = mix(c1, c2, uScroll * 4.0);
    }
    else if (uScroll < 0.5) {
        color = mix(c2, c3, (uScroll - 0.25) * 4.0);
    }
    else if (uScroll < 0.75) {
        color = mix(c3, c4, (uScroll - 0.5) * 4.0);
    }
    else {
        color = mix(c4, c5, (uScroll - 0.75) * 4.0);
    }

    screen *= color;

    // Invertierung
    vec2 pixel = gl_FragCoord.xy;

    vec2 minPos = uHoverPosition;
    vec2 maxPos = uHoverPosition + uHoverSize;

    float insideX =
        step(minPos.x, pixel.x) *
        step(pixel.x, maxPos.x);

    float insideY =
        step(minPos.y, pixel.y) *
        step(pixel.y, maxPos.y);

    float mask = insideX * insideY;

    vec3 original = screen;

    vec3 hoverColor = vec3(1.0);

    if (length(original) > 0.001) {
        hoverColor = original;
    }

    screen = mix(
        original,
        hoverColor,
        mask * uInvert
    );

    gl_FragColor = vec4(screen, 1.0);
}