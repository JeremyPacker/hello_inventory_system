<template>
  <div id="app">
    <div id="header">
      <p><b-img src="https://cdn.shopify.com/s/files/1/0252/6733/9310/files/Asset_1_70x@2x.png?v=1573943369" alt="Responsive image"></b-img>
      <select class="form-control" @change="changeCategory($event)">
      <option id="test" value="" selected disabled>Show Category</option>
      <option v-for="category in categories" :filter="selectedCategory" :value="category" :key="category.id">{{ category }}</option>
    </select></p>
  <!--  <p><span id="i"><i>Showing all {{ selectedCategory  }} products</i></span></p> -->
    </div>
    <vue-airtable :base="base" :titles="titles" :filter="filter" :selectedCategory="selectedCategory"></vue-airtable>
    <div id="footer">Developed by <a href="https://www.linkedin.com/in/jeremy-packer-b8411848">Jeremy Packer</a> of <a href="https://www.packerlabs.com">Packer Labs, LLC</a></div>
  </div>
</template>
<script>
import VueAirtable from './components/VueAirtable'

export default {
  name: 'app',
  components: {
    VueAirtable
  },
  methods: {
    changeCategory (event) {
      this.selectedCategory = event.target.options[event.target.options.selectedIndex].text
      this.filter = 'AND({category}="' + this.selectedCategory + '")'
      if (this.selectedCategory === 'all') {
        this.filter = ''
      }
      // this.filter = this.filter + this.selectedCategory + ')'
      this.records = []
    }
  },
  data: function () {
    return {
      base: process.env.AIRTABLE_BASE,
      selectedCategory: '',
      filter: '',
      titles: [
        {
          key: 'item',
          sortable: false,
          label: 'Item'
        },
        {
          key: 'quantity',
          sortable: false,
          label: 'Expected'
        },
        {
          key: 'actions',
          sortable: false,
          label: 'Needed'
        }
      ],
      categories: [
        'all',
        'frozen-food',
        'fruit',
        'veggie',
        'powder',
        'spice',
        'seed',
        'bread',
        'milk',
        'granola',
        'grains',
        'oils',
        'canned',
        'sweeteners',
        'mixes',
        'coffee',
        'tea',
        'oats',
        'broth',
        'kombucha',
        'egg',
        'misc',
        'extract',
        'perfect-bar',
        'bliss-ball',
        'water',
        'spread',
        'nut',
        'cleaner',
        'feminine',
        'gloves',
        'disposables'
      ]
    };
  }
}
</script>
<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-image: url();
}
#body {
  background-color: #000;
}
#header {
  background-color:#000;
  max-height: 100%;
  padding: 33px;
}
#send_order {
  align-self: flex-end;
  margin-right: 30px;
}
select.form-control {
    background-color: black;
    border-color: black;
    text-align: center;
    align-content: center;
    color: white;
}
#i {
  color:white;
  style:bold;
}
select { width: 100px; text-align-last:center; margin-top:33px;}
#footer {
  padding:33px;
  background-color: black;
  color:white;
  text-align: center;
}
</style>
