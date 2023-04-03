<template>
  <div>
    <h2>お小遣い計算</h2>
    お小遣い: {{pocketMoney.toLocaleString()}}
    <v-row>
      <v-col cols="6">
        <h2>支出</h2>
        <Form
          :forms.sync="expenses"
          @addForm = "expenses.push($event)"
          @deleteForm="expenses.splice($event, 1)"
          @calcTotal='totalExpenseAmount = $event'
        />
      </v-col>
      <v-col cols="6">
        <h2>収入</h2>
        <Form
          :forms.sync="incomes"
          @addForm = "incomes.push($event)"
          @deleteForm="incomes.splice($event, 1)"
          @calcTotal='totalIncomeAmount = $event'
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
import Form from '@/components/TableForm.vue'
export default {
  components: {
    Form
  },
  methods: {
    deleteForm (index) {
      this.forms.splice(index, 1)
    },
  },
  data() {
    return {
      expenses: [],
      incomes: [],
      totalExpenseAmount: 0,
      totalIncomeAmount: 0
    }
  },
  computed: {
    pocketMoney: function () {
      return this.totalIncomeAmount - this.totalExpenseAmount
    }
  }
}
</script>
