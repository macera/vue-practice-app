<template>
  <v-form ref="checkForm">
    <Form
      v-bind.sync="blog"
    />
    <v-btn class="mr-4" @click="onSubmit">Create</v-btn>
  </v-form>
</template>

<script>
import Form from '@/components/Form.vue'
export default {
  components: {
    Form
  },
  data() {
    return {
      blog: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      if (this.$refs.checkForm.validate()) {
        const blog = await this.$store.dispatch('addBlog', this.blog)
        this.$store.commit('setMessage', {
          status: true,
          message: 'Blog was successfully created.'
        })
        setTimeout(() => {
          this.$store.commit('setMessage', {})
        }, 2000)
        this.$router.push({ name: 'show-blog', params: { id: blog.id }})
      }
    }
  }
}
</script>