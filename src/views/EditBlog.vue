<template>
  <div>
    <h2>Editing Blog</h2>
    <v-form ref="checkForm">
      <Form v-bind.sync="blog" />
      <v-btn class="mr-4" @click="updateBlog">Update</v-btn>
    </v-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import Form from '@/components/Form.vue'
export default {
  components: {
    Form
  },
  computed: {
    ...mapState(['blogs']),
    blog() {
      return this.blogs.find(b => b.id == this.$route.params.id) || {}
    }
  },
  methods: {
    async updateBlog() {
      if (this.$refs.checkForm.validate()) {
        const blog = await this.$store.dispatch('editBlog', this.blog) // ①
        this.$store.commit('setMessage', {
          status: true,
          message: 'Blog was successfully updated.'
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
