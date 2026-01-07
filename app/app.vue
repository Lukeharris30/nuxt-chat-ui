<script lang="ts" setup>
const history = ref([
        { role: 'user', text: 'Hey, how are you today?' },
        { role: 'ai', text: 'I am doing very well!' },
        {"html": "<button class='custom-button'>Button</button>", "role": "user"},
        {'html': "<div class='deep-chat-temporary-message'><button class='deep-chat-button deep-chat-suggestion-button'>Pre Fill something</button></div>"}
      ])
const hoverOn = function(event) {
event.target.innerText = 'Hovering'
}
const buttonStyles = {background: 'black', border: 'none', color: 'white'}

const chatRef = useTemplateRef('chatRef');

const messages = ref([])
const syncMessages = (message) => {
  messages.value = message
}
</script>

<template>

    <client-only>
  <div class="container">
      <deep-chat  
          ref="chatRef"
          :onMessage="(message) => syncMessages(message) "
          :demo="true"
          :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
          :history="history"
          :htmlClassUtilities ="{
            ['custom-button']: {
              events: {
                mouseenter: (event) => hoverOn(event) ,
                mouseleave: (event) => event.target.innerText = 'Hovered'
              },
              styles: {
                default: buttonStyles,
                hover: {background: 'gray'}
              }
            }
          }"
          :messageStyles="{
            html: {shared: {bubble: {backgroundColor: 'unset', padding: '0px', width: '100%', textAlign: 'right'}}},
          }"
          :chatStyle="{width: '60vw', height: '60vh', background: 'aliceblue'}">
      </deep-chat>
      <pre>{{ history }}</pre>
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