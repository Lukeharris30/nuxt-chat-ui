<script lang="ts" setup>
import type { MessageContent } from 'deep-chat/dist/types/messages'
const history = ref([
  { role: 'ai', text: `## Hi \n\nHow are you today? **${new Date()}**` },
  {"html": "<button class='custom-button'>Button</button>", "role": "user"},
  {'html': "<div class='deep-chat-temporary-message'><button class='deep-chat-button deep-chat-suggestion-button'>I'm Great</button><button class='deep-chat-button deep-chat-suggestion-button'>Just Okay</button></div>"},
])

const hoverOn = function(event) {
  event.target.innerText = 'Hovering'
}

const htmlClassUtilities = {
  ['custom-button']: {
    events: {
      mouseenter: (event) => hoverOn(event) ,
      mouseleave: (event) => event.target.innerText = 'Hovered'
    },
    styles: {
      default: {background: 'pink', border: 'none', color: 'white'},
      hover: {background: 'gray'}
    }
  }
}

const connect = {
  handler: async(body: MessageContent, signals) => {
    try {
      const res = await $fetch<{ message?: string }>('/api/fakeResponse', {
        method: 'POST',
        body
      })
      console.log(res)

      signals.onResponse({
        text: res?.message ?? 'Handler response',
        role: 'ai'
      })
    } catch (err: any) {
      if (err?.name === 'AbortError') return

      signals.onResponse({
        error: err?.data?.message ?? err?.message ?? 'Error'
      })
    }
  }
}
</script>

<template>
  <client-only>
    <div class="container">
      <deep-chat  
        :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
        :history="history"
        :htmlClassUtilities ="htmlClassUtilities"
        :messageStyles="{
          html: {shared: {bubble: {backgroundColor: 'unset', padding: '0px', width: '100%', textAlign: 'right'}}},
        }"
        :chatStyle="{width: '60vw', height: '60vh' }"
        :connect = "connect"
      />
    </div>
  </client-only>
</template>

<style>
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  
</style>