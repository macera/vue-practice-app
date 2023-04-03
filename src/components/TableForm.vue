<template>
  <v-simple-table>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            グループ
          </th>
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
            <input v-model="form.group" class="form-control" @input="$emit('update:forms[{{ index }].group', $event)" />
          </td>
          <td>
            <input v-model="form.title" class="form-control" @input="$emit('update:forms[{{ index }].title', $event)" />
          </td>
          <td>
            <input v-model.number="form.amount" class="form-control" @input="$emit('update:forms[{{ index }}].amount', $event)" />
          </td>
          <td align="right">
            <button @click="deleteForm(index)" class="btn btn-danger">×</button>
          </td>
        </tr>
        <tr>
          <td colspan="4" align="right">
            <button @click="addForm()" class="btn btn-primary">追加</button>
          </td>
        </tr>
        <tr>
          <td colspan="3" align="right">合計金額</td>
          <td align="right">
            {{ totalAmount.toLocaleString() }}
          </td>
        </tr>
        <tr v-for="(group, key) in calcGroups" :key="key">
          <td colspan="3" align="right" v-if="key">{{ key }}</td>
          <td align="right" v-if="key">
            {{ group.reduce(function(a, x) { return a + x; }).toLocaleString() }}
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
      this.$emit("addForm", {group: '', title: '', amount: ''});
    },
    deleteForm (index) {
      this.$emit("deleteForm", index);
    },
  },
  computed: {
    totalAmount: function () {
      let total = 0
      const length = this.forms.length
      for (let i = 0; i < length; i++) {
        total += this.forms[i].amount || 0
      }
      this.$emit("calcTotal", total);
      return total
    },
    calcGroups() {
      //var groups = this.forms.map(form => form.group);
      return this.forms.reduce((result, form) => {
        const { group } = form;
        result[group] = result[group] ?? [];
        result[group].push(form.amount);
        return result;
      }, {});
    }
  }
}
</script>
