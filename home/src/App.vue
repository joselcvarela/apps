<script setup lang="ts"></script>

<template>
  <a href="/apps/ping-urls/dist">
    <p>
      <b>ping-urls</b>
      <br />
      <span>Ping multiple URLs massively</span>
    </p>
  </a>
  <a href="/apps/request/dist">
    <p>
      <b>request</b>
      <br />
      <span>Request an URL with multiple options</span>
    </p>
  </a>
</template>

<style>
html,
body {
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
}

#app {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 60%;
}
</style>
