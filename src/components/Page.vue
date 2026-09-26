<script setup lang="ts">
import { onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollSmoother } from 'gsap/ScrollSmoother'
import { SplitText } from 'gsap/SplitText'
import ShaderBackground from './ShaderBackground.vue'

const projects = [
  {
    title: "Project: Naomi's Homepage - not done",
    year: '2026',
    description:
      'Created a website for my sister. Because she gave no input. I used this opportunity to try out different technologies like THREE.js, Shader/GLSL and GSAP. The design can see a lot of improvement, but it was useful for seeing the capabilities of web development.',
  },
]

const abouts = [
  {
    title: '⇝ education & employment',
    content: `I studied Business Informatics in Karlsruhe, mostly because I wasn't quite sure what I wanted to do.<br /><br />

  Somewhere along the way, I found myself enjoying software development and eventually ended up working at a consulting company.<br /><br />

  It was there that I started to realize what I actually wanted to do — creating things that combine technology with creativity.`,
  },
  {
    title: '⇝ currently learning',
    content: `Looked into:<br/>
              Shaders/GLSL<br />
              THREE.js<br />
              GSAP<br /><br />

              Plan to look into:<br />
              Kinetic Typography<br />
              Accessability<br />
              3D Modelling<br />
              More transitions`,
  },
  {
    title: '⇝ personal',
    content: `I did Inline freestyle for about 8 years.<br />
              Changed into breakdancing.<br />
              I love sports, especially when you need body control.<br />
              It also made me a passionate and disciplined person.<br />`,
  },
  {
    title: '⇝ about me',
    content: `Usually listening to: Hiphop/breakdance beats <br />
              Can spend to much time with: finding the right font <br />
              Sometimes I like to: knit (still a beginner)<br />
              I have redone this website a couple of times
              `,
  },
]

const shaderBackground = ref<InstanceType<typeof ShaderBackground> | null>(null)
const hoveredAbout = ref<HTMLElement | null>(null)

const activeProject = ref<number | null>(null)
const activeAbout = ref<number | null>(null)
const projectElements = ref<HTMLElement[]>([])

const setProjectRef = (el: Element | null, index: number) => {
  if (el) {
    projectElements.value[index] = el as HTMLElement
  }
}
const aboutElements = ref<HTMLElement[]>([])

const setAboutRef = (el: Element | null, index: number) => {
  if (el) {
    aboutElements.value[index] = el as HTMLElement
  }
}

const toggleProject = (index: number) => {
  const element = projectElements.value[index]

  if (!element) return

  const isActive = activeProject.value === index

  // Aktives Projekt schließen
  if (isActive) {
    activeProject.value = null

    gsap.to(element, {
      height: 50,
      duration: 0.8,
      ease: 'expo.out',
    })

    return
  }

  // Vorheriges Projekt schließen
  if (activeProject.value !== null) {
    const previous = projectElements.value[activeProject.value]

    if (previous) {
      gsap.to(previous, {
        height: 50,
        duration: 0.8,
        ease: 'expo.out',
      })
    }
  }

  activeProject.value = index

  // Tatsächliche benötigte Höhe ermitteln
  const targetHeight = element.scrollHeight

  gsap.to(element, {
    height: targetHeight,
    duration: 0.8,
    ease: 'expo.out',
  })
}

const toggleAbout = (index: number) => {
  const element = aboutElements.value[index]

  if (!element) return

  const isActive = activeAbout.value === index

  // Aktives Projekt schließen
  if (isActive) {
    activeAbout.value = null

    gsap.to(element, {
      height: 50,
      duration: 0.8,
      ease: 'expo.out',
    })

    return
  }

  // Falls ein anderes Projekt offen ist → schließen
  if (activeAbout.value !== null) {
    const previous = aboutElements.value[activeAbout.value]

    if (previous) {
      gsap.to(previous, {
        height: 50,
        duration: 0.8,
        ease: 'expo.out',
      })
    }
  }

  activeAbout.value = index

  // Aktuelles About öffnen/schließen
  const targetHeight = element.scrollHeight

  gsap.to(element, {
    height: targetHeight,
    duration: 0.8,
    ease: 'expo.out',
  })
}

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, SplitText)

function startAnimations() {
  gsap.set(['h1', '.subtitle', '.location', '.info'], { visibility: 'visible' })

  const texts = [
    new SplitText('h1', { type: 'chars' }),
    new SplitText('.subtitle', { type: 'chars' }),
    new SplitText('.location', { type: 'chars' }),
    new SplitText('.info', { type: 'chars' }),
  ]

  texts.forEach((split) => {
    gsap.from(split.chars, {
      opacity: 0,
      y: 40,
      duration: 3,
      stagger: 0.03,
      ease: 'expo.out',
    })
  })

  const mm = gsap.matchMedia()

  mm.add('(min-width: 769px)', () => {
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 1.5,
      smoothTouch: 0.1,
    })
  })
}

onMounted(() => {
  startAnimations()
})
</script>

<template>
  <ShaderBackground ref="shaderBackground" class="shader-background" />
  <aside class="left">
    <div class="metadata">
      <h1>KAI JONES</h1>
      <p class="subtitle">Frontend Developer</p>
      <p class="location">Currently in Germany/Karlsruhe</p>
    </div>
  </aside>
  <div id="smooth-wrapper">
    <div id="smooth-content">
      <main class="right">
        <div class="starting-view"></div>
        <div>
          <div class="projects">
            <h2>Projects/Post</h2>

            <div
              v-for="(project, index) in projects"
              :key="index"
              :ref="(el) => setProjectRef(el as Element | null, index)"
              class="project"
              :class="{ active: activeProject === index }"
            >
              <hr />
              <div
                class="project-header"
                @click="toggleProject(index)"
                @mouseenter="shaderBackground?.setHoverElement($event.currentTarget as HTMLElement)"
                @mouseleave="shaderBackground?.clearHover()"
              >
                <span>{{ project.title }}</span>
                <span>{{ project.year }}</span>
              </div>

              <div class="project-content">
                <p>{{ project.description }}</p>
              </div>
            </div>
            <hr />

            <p class="mob-leftspace">Hopefully a lot more coming soon..</p>
            <div class="space"></div>
          </div>
          <div>
            <h2>About</h2>
            <hr />
            <p class="mob-leftspace">
              A software developer finding my way into creative coding ... Find out more about me ↓
            </p>
            <div
              v-for="(about, index) in abouts"
              :key="index"
              :ref="(el) => setAboutRef(el as Element | null, index)"
              class="about"
              :class="{ active: activeAbout === index }"
            >
              <div
                class="about-header"
                @click="toggleAbout(index)"
                @mouseenter="shaderBackground?.setHoverElement($event.currentTarget as HTMLElement)"
                @mouseleave="shaderBackground?.clearHover()"
              >
                <span>{{ about.title }}</span>
              </div>
              <div class="about-content">
                <span v-html="about.content"></span>
              </div>
            </div>
            <div class="space"></div>
          </div>
          <div class="last-scroll-container mob-leftspace">
            <h3>Kai Jones</h3>
            <a class="info" href="mailto:kaioliverjk@gmail.com">Contact</a>
            <a class="info" href="www.linkedin.com/in/kai-jones-244384204">LinkedIn</a>
          </div>
          <div class="space"></div>
        </div>
      </main>
    </div>
  </div>
  <div class="info-container">
    <a class="info">> Blog <</a>
    <a href="mailto:kaioliverjk@gmail.com" class="info">> Contact <</a>
    <a href="www.linkedin.com/in/kai-jones-244384204" target="_blank" class="info">> LinkedIn <</a>
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Stack+Sans+Headline:wght@200..700&display=swap');

.shader-background {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
}

.left {
  top: 30px;
  left: 30px;
  width: 350px;
  height: calc(100vh - 60px);
  position: absolute;
}

.info {
  position: relative;
  text-decoration: none;
  color: var(--color-text);
  padding: 3px;
}

.info::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: -2px;
  width: 100%;
  height: 1px;
  background: currentColor;

  transform: scaleX(0);
  transform-origin: right;

  transition: transform 0.6s linear(0, 0.01, 0.05, 0.15, 0.35, 0.7, 1.1, 0.95, 1);
}

.info:hover::after {
  transform: scaleX(1);
  transform-origin: left;
}

.info-container {
  bottom: 20px;
  left: 20px;
  color: white;
  font-size: clamp(1rem, 1.25vw, 1rem);
  z-index: 1;
  display: none;
}

.metadata {
  display: flex;
  flex-direction: column;
  top: 30px;
  left: 30px;
  position: sticky;
}

h1,
.subtitle,
.location {
  mix-blend-mode: difference;
  color: white;
  z-index: 10;
  visibility: hidden;
}

.subtitle,
.location {
  margin: 0;
  padding: 0;
}

#smooth-content {
  position: relative;
}

#smooth-wrapper {
  position: relative;
  box-sizing: border-box;
  z-index: 1;
}

.starting-view {
  height: 100vh;
}

.last-scroll-container {
  display: flex;
  align-items: center;
  gap: 30px;
}

.space {
  height: 50px;
}

.project-header {
  display: flex;
  justify-content: space-between;
  padding: 0.5em 0.5em 0.5em 0.83em;
  margin: 0;
}

.project-content {
  padding: 0 0 0 0.83em;
}

.project {
  height: 50px;
  overflow: hidden;
  cursor: pointer;
}

.project-header:hover {
  color: black;
}

.about {
  height: 50px;
  overflow: hidden;
  cursor: pointer;
}

.about-header {
  display: flex;
  padding: 0.5em 0.5em 0.5em 0.83em;
  color: white;
  margin: 0;
}

.about-content {
  padding: 0 0 0 0.83em;
}

.about-header:hover {
  color: black;
}

.mob-leftspace {
  margin: 0 0 0 0.83em;
}

@media (min-width: 768px) {
  .left {
    position: fixed;
  }

  .info-container {
    position: fixed;
    display: flex;
    flex-direction: column;
  }

  .right {
    margin-left: 390px;
  }

  .space {
    height: 200px;
  }

  .metadata {
    position: fixed;
  }

  .project-header {
    padding: 0.5em 0.5em 0.5em 0;
  }

  .about-header {
    padding: 0.5em 0.5em 0.5em 0;
  }

  .mob-leftspace {
    margin: 0;
  }
}
</style>
