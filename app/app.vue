<script lang="ts" setup>
const history = [
        { role: 'user', text: 'Hey, how are you today?' },
        { role: 'ai', text: 'I am doing very well!' },
        {"html": "<button class='custom-button'>Button</button>", "role": "user"}
      ]
const hoverOn = function(event) {
event.target.innerText = 'Hovering'
}
</script>

<template>
  <div>
    <client-only>
      <deep-chat  
          :demo="true"
          :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
          :history="history"
          :htmlClassUtilities ="{
            ['custom-button']: {
              events: {
                mouseenter: (event) => hoverOn(event) ,
                mouseleave: (event) => event.target.innerText = 'Hovered'
              }
            }
          }">
      </deep-chat>
    </client-only>
  </div>
</template>
