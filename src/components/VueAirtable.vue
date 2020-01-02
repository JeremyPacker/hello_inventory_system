<template>
  <div>
    <b-table striped hover :items="showRecords" :fields="titles">
      <template v-slot:cell(actions)="data">
        <b-form-input type="number" min="0.00" v-model="records.find(x => x.uid == showRecords[data.index].uid).needed"></b-form-input>
      </template>
    </b-table>
    <button v-on:click="sendMail()">Send</button>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'VueAirtable',
  props: [
    'base',
    'titles',
    'filter',
    'selectedCategory',
    'sort'
  ],
  data: function () {
    return {
      apiUrl: 'https://api.airtable.com/v0/',
      apiKey: process.env.AIRTABLE_API_KEY, // Always use a read-only account token
      records: [],
      showRecords: []
    };
  },
  computed: {
  },
  mounted: function () {
    this.getData();
  },
  watch: {
    table: function (newTable, oldTable) {
      this.getData();
    },
    selectedCategory: function (newValue, oldValue) {
      this.showRecords = [];
      this.showRecords = this.records.filter((item) => {
        if (item.category === newValue || newValue === 'all') {
          return true
        } else {
          return false
        }
      })
    }
  },
  methods: {
    getData: function () {
      axios({
        url: this.apiUrl + this.base + '/products',
        headers: {
          'Authorization': `Bearer ${this.apiKey}`
        },
        params: {
          filterByFormula: this.filter || ''
        }
      }).then((res) => {
        res.data.records.forEach((item) => {
          var temp = ''
          if (item.fields.par_quantity > 1) {
            temp = item.fields.par_quantity;
            if (item.fields.par_sizing === 'box') {
              temp = temp + ' ' + item.fields.par_sizing + 'es'
            } else {
              temp = temp + ' ' + item.fields.par_sizing + 's'
            }
          } else {
            temp = item.fields.par_quantity + ' ' + item.fields.par_sizing
          }
          this.records.push({'uid': item.id, 'item': item.fields.item, 'quantity': temp, 'category': item.fields.category, 'needed': 0})
        })
        this.showRecords = this.records
        // this.records = res.data.records;
        console.log(this.records);
      });
    },
    sendMail () {
      const itemsToSend = this.records.filter((item) => {
        if (item.needed !== 0 && item.needed !== '0' && item.needed !== '') {
          return true
        } else {
          return false
        }
      })

      var mailBody = 'List:%0D%0A'
      for (var i = 0; i < itemsToSend.length; i++) {
        const item = itemsToSend[i]
        mailBody += `%0D%0AItem: ${item.item}%0D%0ACategory: ${item.category}%0D%0AQuantity: ${item.quantity}%0D%0ANeeded: ${item.needed}%0D%0A%0D%0A`
        //mailBody += `%0D%0AItem: ${item.item}%0D%0ANeeded: ${item.needed}%0D%0A%0D%0A`
      }
      mailBody += `Notes:%0D%0A`

      var r = confirm(mailBody);
      if (r == true) {
        window.open(`mailto:jadermelt@gmail.com?subject=Hello_Inventory_Needs&body=${mailBody}`);
      }
    }
  }
}
</script>
