<script lang="ts" setup>
const history = [
        { role: 'user', text: 'Hey, how are you today?' },
        { role: 'ai', text: 'I am doing very well!' },
      ]
</script>

<template>
  <div>
    <client-only>
      <deep-chat  
          :demo="true"
          :textInput="{ placeholder: { text: 'Welcome to the demo!' } }"
          :history="history">
      </deep-chat>
    </client-only>
  </div>
</template>
