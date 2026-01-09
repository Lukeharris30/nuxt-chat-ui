<script lang="ts" setup>
import type { MessageContent } from 'deep-chat/dist/types/messages'
import type { Bike } from '~~/shared/types/bikes'

import {
 SramCard 
} from '@sramplm/sram-ui';
const history = ref([
  { role: 'ai', text: `## Hi \n\nHow are you today? **${new Date()}**` },
  {"html": "<button class='custom-button'>Button</button>", "role": "user"},
  {'html': "<div class='deep-chat-temporary-message'><button class='deep-chat-button deep-chat-suggestion-button'>I'm Great</button><button class='deep-chat-button deep-chat-suggestion-button'>Just Okay</button></div>"},
])

const hoverOn = function(event) {
  event.target.innerText = 'Hovering'
}
const bikes = ref<Bike[]>([])
const isLoading = ref(false)
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
    isLoading.value = true
    try {
      const res = await $fetch<{ message?: string }>('/api/getChat', {
        method: 'POST',
        body
      })
      console.log(res)
      bikes.value = res?.ownedBikes
      signals.onResponse({
        text: res?.message?.message ?? 'Handler response',
        role: 'ai'
      })
    } catch (err: any) {
      if (err?.name === 'AbortError') return

      signals.onResponse({
        error: err?.data?.message ?? err?.message ?? 'Error'
      })
    } finally {
      isLoading.value = false
    }
  }
}
</script>

<template>
  <client-only>
    <div class="container">
      <div class="bike-container" v-if="bikes">
        <h2>What I know about your setup</h2>
      <SramCard
        v-for="bike in bikes"
        :heading="bike.maker"
        heading-level="h3"
        image-url="https://picsum.photos/200"
        :isLoading="isLoading"
        >
          <div class="bike-card-details">
            <div>
              {{bike.category}}
            </div>
            <div>
              {{ bike.family }}
            </div>
            <div>
              <ul>
                <li>Threaded: {{ bike.bottom_bracket_threaded}}</li>
                <li>Shell Width: {{ bike.bottom_bracket_shell_width_mm}}</li>
                <li>Bottom Bracket standard: {{ bike.bottom_bracket_standard }}</li>
                <li>Frame Hanger: {{ bike.frame_hanger_standard || 'unknown'}}</li>
              </ul>         
            </div>
          </div>
        </SramCard>`
      </div>
      <deep-chat
        class="deep-chat"
        :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
        :history="history"
        :htmlClassUtilities ="htmlClassUtilities"
        :messageStyles="{
          html: {shared: {bubble: {backgroundColor: 'unset', padding: '0px', width: '100%', textAlign: 'right'}}},
        }"
        :chatStyle="{width: '60vw', height: '90vh' }"
        :connect = "connect"
      />
    </div>
  </client-only>
</template>

<style>
@import '../node_modules/@sramplm/sram-ui/dist/style.css';

  .container {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    height: 90vh;
    margin-top: 5vh;
  }
  .deep-chat {
    align-self: center;
    justify-self: end;
  }
  .sram-card {
    padding-top: 0;
    ul {
      font-size: small;
      text-align: left;
      padding-left: 0;
    } li {
     list-style-type: none; 
    }
  }
  .bike-container {
     h2 {
      margin-bottom: 20px;
     }
  }
  
</style>