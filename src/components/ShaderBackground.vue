<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

import vertexShader from './shaders/gradient.vert'
import fragmentShader from './shaders/gradient.frag'

gsap.registerPlugin(ScrollTrigger)

const canvasContainer = ref<HTMLDivElement | null>(null)

let renderer: THREE.WebGLRenderer
let animationFrame: number
let scrollTrigger: ScrollTrigger | undefined
let hoverElement: HTMLElement | null = null
let isMobile = false

let uniforms: {
  uTime: { value: number }
  uResolution: { value: THREE.Vector2 }
  uMouse: { value: THREE.Vector2 }
  uScroll: { value: number }
  uInvert: { value: number }
  uHoverPosition: { value: THREE.Vector2 }
  uHoverSize: { value: THREE.Vector2 }
} | null = null

const setHoverElement = (element: HTMLElement) => {
  hoverElement = element

  if (!uniforms) return

  gsap.to(uniforms.uInvert, {
    value: 1,
    duration: 0.4,
    ease: 'power2.out',
  })
}

const clearHover = () => {
  hoverElement = null

  if (!uniforms) return

  gsap.to(uniforms.uInvert, {
    value: 0,
    duration: 0.4,
    ease: 'power2.out',
  })
}

defineExpose({
  setHoverElement,
  clearHover,
})

onMounted(() => {
  if (!canvasContainer.value) return

  const scene = new THREE.Scene()
  const camera = new THREE.Camera()

  renderer = new THREE.WebGLRenderer({
    antialias: true,
  })

  renderer.setSize(window.innerWidth, window.innerHeight)

  canvasContainer.value.appendChild(renderer.domElement)

  uniforms = {
    uTime: {
      value: 0,
    },

    uResolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },

    uMouse: {
      value: new THREE.Vector2(0, 0),
    },

    uScroll: {
      value: 0,
    },

    uInvert: {
      value: 0,
    },
    uHoverPosition: { value: new THREE.Vector2(0, 0) },
    uHoverSize: { value: new THREE.Vector2(0, 0) },
  }

  const material = new THREE.ShaderMaterial({
    vertexShader,
    fragmentShader,
    uniforms,
  })

  const geometry = new THREE.PlaneGeometry(2, 2)
  const mesh = new THREE.Mesh(geometry, material)

  scene.add(mesh)

  let targetScroll = 0

  const mm = gsap.matchMedia()

  mm.add('(min-width: 768px)', () => {
    scrollTrigger = ScrollTrigger.create({
      trigger: '.right',
      start: 'top top',
      end: 'bottom bottom',

      onUpdate: (self) => {
        targetScroll = self.progress
      },
    })
  })

  mm.add('(max-width: 767px)', () => {
    isMobile = true

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight

      const progress = maxScroll > 0 ? Math.min(Math.max(window.scrollY / maxScroll, 0), 1) : 0

      uniforms!.uScroll.value = progress
    }

    window.addEventListener('scroll', updateScroll, { passive: true })

    updateScroll()

    return () => {
      window.removeEventListener('scroll', updateScroll)
    }
  })

  const clock = new THREE.Clock()

  function animate() {
    animationFrame = requestAnimationFrame(animate)

    // Nur Desktop smoothen
    if (!isMobile) {
      uniforms!.uScroll.value += (targetScroll - uniforms!.uScroll.value) * 0.02
    }

    uniforms!.uTime.value = clock.getElapsedTime() * 0.2

    renderer.render(scene, camera)

    if (hoverElement && uniforms) {
      const rect = hoverElement.getBoundingClientRect()

      uniforms.uHoverPosition.value.set(rect.left, window.innerHeight - rect.bottom)

      uniforms.uHoverSize.value.set(rect.width, rect.height)
    }
  }

  animate()

  function handleResize() {
    renderer.setSize(window.innerWidth, window.innerHeight)

    uniforms!.uResolution.value.set(window.innerWidth, window.innerHeight)
  }

  window.addEventListener('resize', handleResize)

  function handleMouseMove(event: MouseEvent) {
    uniforms!.uMouse.value.set(event.clientX, window.innerHeight - event.clientY)
  }

  window.addEventListener('mousemove', handleMouseMove)

  onUnmounted(() => {
    cancelAnimationFrame(animationFrame)

    scrollTrigger?.kill()

    window.removeEventListener('resize', handleResize)

    window.removeEventListener('mousemove', handleMouseMove)

    geometry.dispose()
    material.dispose()
    renderer.dispose()

    uniforms = null
  })
})
</script>

<template>
  <div ref="canvasContainer" class="shader-background"></div>
</template>

<style scoped>
.shader-background {
  position: fixed;
  inset: 0;
  width: 100vw;
  height: 100vh;
  z-index: 0;
  pointer-events: none;
}

.shader-background canvas {
  display: block;
}
</style>
