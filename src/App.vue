<script setup lang="ts">
import Page from './components/Page.vue'
</script>

<template>
  <Page></Page>
</template>

<style>
:root {
  --font-body: 'Clash Display', sans-serif;

  --font-size-body: clamp(1.2rem, 1.5vw, 1.5rem);
  --font-size-h2: clamp(1rem, 1.2vw, 1.2rem);

  --color-text: #ffffff;
}

@font-face {
  font-family: 'Cheque-Black';
  src: url('@/assets/fonts/Cheque-Black.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('@/assets/fonts/ClashDisplay-Light.otf') format('opentype');
  font-weight: 300;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('@/assets/fonts/ClashDisplay-Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('@/assets/fonts/ClashDisplay-Medium.otf') format('opentype');
  font-weight: 500;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('@/assets/fonts/ClashDisplay-Semibold.otf') format('opentype');
  font-weight: 600;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('@/assets/fonts/ClashDisplay-Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
  font-display: swap;
}

@font-face {
  font-family: 'Clash Display';
  src: url('@/assets/fonts/ClashDisplay-Extralight.otf') format('opentype');
  font-weight: 200;
  font-style: normal;
  font-display: swap;
}

body {
  margin: 0;
  background-color: var(--color-background);
  color: var(--color-text);
  font-size: var(--font-size-body);
  font-family: var(--font-body);
  font-weight: 400;
  font-style: normal;
}

h1 {
  font-size: clamp(1.5rem, 2.5vw, 3rem);
  margin: 0;
  padding: 0;
  top: 20px;
  font-weight: 600;
}

h2 {
  font-size: var(--font-size-h2);
  font-family: var(--font-body);
  font-weight: 350;
  margin: 0.83em 0 0 0.83em;
}

p,
h3 {
  padding: 0.5em 0;
  margin: 0;
}

hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #ccc;
  margin: 0;
  padding: 0;
}

@media (min-width: 768px) {
  h2 {
    margin: 0.83em 0 0 0;
  }
}
</style>
