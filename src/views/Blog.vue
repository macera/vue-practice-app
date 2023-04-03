<template>
  <div>
    <Flash />
    <p>Title: {{ blog.title }}</p>
    <p>Body: {{ blog.body }}</p>
    <router-link :to="{ name: 'edit-blog', params: { id: blog.id }}">Edit</router-link> | <router-link to="/blogs">Back</router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex' // ①
import Flash from '@/components/Flash.vue'

export default {
  components: {
    Flash
  },
  computed: {
    ...mapState(['blogs']),
    blog() {
      return this.blogs.find(blogId => blogId.id === this.$route.params.id) || {}
    }
  }
}
</script>
