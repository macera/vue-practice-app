<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            名称
          </th>
          <th class="text-left">
            金額
          </th>
          <th class="text-left">
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(form, index) in forms" :key="index">
          <td>
            <input v-model="form.title" class="form-control" @input="$emit('update:forms[{{ index }].title', $event)" />
          </td>
          <td>
            <input v-model.number="form.amount" class="form-control" @input="$emit('update:forms[{{ index }}].amount', $event)" />
          </td>
          <td align="right">
            <button @click="deleteForm(index)"class="btn btn-danger">削除</button>
          </td>
        </tr>
        <tr>
          <td colspan="3"　align="right">
            <button @click="addForm()" class="btn btn-primary">追加</button>
          </td>
        </tr>
        <tr>
          <td colspan="2" align="right">合計金額</td>
          <td align="right">
            {{ totalAmount.toLocaleString() }}
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>
<script>
export default {
  props: [
    'forms'
  ],
  methods: {
    addForm () {
      this.forms.push({title: '', amount: ''})
    },
    deleteForm (index) {
      this.forms.splice(index, 1)
    }
  },
  computed: {
    totalAmount: function () {
      let total = 0
      const length = this.forms.length
      for (let i = 0; i < length; i++) {
        total += this.forms[i].amount
      }
      this.$emit("calcTotal", total);
      return total
    }
  }
}
</script>