<script setup lang="ts">
import { useStorage } from "@vueuse/core";
import { computed, ref } from "vue";

const url = useStorage("request:url", "");
const method = useStorage("request:method", "GET");
const headers = useStorage("request:headers", "");
const body = useStorage("request:body", "{}");
const response = ref<{ status: number; text: string; headers: string } | null>(
  null
);

async function send() {
  const request = await fetch(url.value, {
    headers: headers.value
      ? Object.fromEntries(
          headers.value
            .split("\n")
            .map((line) => line.split(":"))
            .map((parts) => parts.map((v) => v.trim()))
        )
      : undefined,
    method: method.value,
    body: body.value != "{}" ? body.value : undefined,
  });

  const text = await request.text();
  const headers_response = [...request.headers].join("\n");

  response.value = {
    status: request.status,
    headers: headers_response,
    text: text,
  };
}

const response_text = computed(() => {
  if (!response.value?.text) return "";
  if (response.value.headers.includes("json"))
    return JSON.stringify(JSON.parse(response.value.text), null, "  ");
  return response.value.text;
});
</script>

<template>
  <label>
    <b>method</b>
    <input type="text" v-model="method" />
  </label>

  <label>
    <b>url</b>
    <input type="text" v-model="url" />
  </label>

  <label>
    <b>headers</b>
    <textarea
      v-model="headers"
      placeholder="Authorization: Bearer ...\n"
    ></textarea>
  </label>

  <label>
    <b>body</b>
    <textarea v-model="body" placeholder="body"></textarea>
  </label>

  <button @click="send">send</button>

  <div class="flex-column" v-if="response">
    <label>
      <b>status</b>
      <span>{{ response?.status }}</span>
    </label>
    <label>
      <b>headers</b>
      <code class="scroll">{{ response?.headers }}</code>
    </label>
    <label>
      <b>text</b>
      <code class="scroll">{{ response_text }}</code>
    </label>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

html,
body {
  height: 100%;
  overflow: scroll;
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

input {
  width: 100%;
}

.flex-column {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

label {
  display: block;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.flex-row {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.scroll {
  max-height: 25rem;
}

code {
  white-space: pre;
}
</style>
