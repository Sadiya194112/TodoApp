<!-- Child Component will receive color and text and emit a click event -->
<template>
  <div>
    <v-col cols="auto">
      <v-btn v-bind="$attrs" :class="[dark ? 'dark' : 'light', 'baseButton']">
        {{ text }}
      </v-btn>
    </v-col>
  </div>

</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: "Click Me"
      },
      dark: {
        type: Boolean,
        default: false
      }
    },
    methods: {


    }
  }
</script>

<style scoped>
.baseButton{
  padding: 7px;
  border: none;
  border-radius: 5px;
  cursor: pointer
}

.dark{
  background: rgb(2, 36, 59);
  color: white;
}
.light{
  background: rgb(7, 122, 122);
  color: white;
  border: 1px solid gray;
}
</style>
