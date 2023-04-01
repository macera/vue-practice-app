<template>
  <div>
    <v-text-field
      label="Title"
      :rules="[required('Title')]"
      :value="title"
      @input="$emit('update:title', $event)"
    ></v-text-field>
    <v-textarea
      label="Body"
      :rules="[required('Body')]"
      :value="body"
      @input="$emit('update:body', $event)"
    ></v-textarea>
  </div>
</template>
<script>
export default {
  props: [
    'title',
    'body'
  ],
  data() {
    return {
      required(propertyType) {
        return v => v && v.length > 0 || `You must input a ${propertyType}`
      }
    }
  }
}
</script>