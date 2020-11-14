<template>
  <div>

    <div class='md-layout md-alignment-center-space-between'>
      <h1 class='md-title'> Launches </h1>
      <router-link to='/launches/new'>
        <md-button class='md-primary md-raised'>Create launch</md-button>
      </router-link>
    </div>

    <md-empty-state
      v-if='launches.length <= 0'
      md-rounded
      md-icon='devices_other'
      md-label='Create your first launch'
    >
      <router-link to='/launches/new'>
        <md-button class='md-primary md-raised'>Create first launch</md-button>
      </router-link>
    </md-empty-state>

    <md-progress-bar md-mode="indeterminate" v-if="isLoadingLaunch" />
    <md-table
      v-if='launches.length > 0'
      v-model='launches'
      md-sort='_id'
      md-sort-order='asc'
      md-fixed-header
      md-card
      style='margin: 0; overflow: auto'
    >

      <md-table-row
        slot='md-table-row'
        slot-scope='{ item }'
      >

        <md-table-cell
          md-label='Type'
          md-sort-by='type'
        >
          {{ item.type ? 'deposit' : 'withdrawal' }}
        </md-table-cell>

        <md-table-cell
          md-label='Description'
          md-sort-by='description'
        >
          {{ item.description }}
        </md-table-cell>

        <md-table-cell
          md-label='Value'
          md-sort-by='value'
        >
          {{ item.value }}
        </md-table-cell>

        <md-table-cell
          md-label='Category'
          md-sort-by='category_id'
        >
          {{ getCategories.filter(category => category._id === item.category_id)[0].name || '' }}
        </md-table-cell>

        <md-table-cell
          md-label='ID'
          md-sort-by='_id'
          md-numeric
        >
          {{ item._id }}
        </md-table-cell>

        <md-table-cell
          style='width: 10px'
        >
          <router-link
            :to='`launches/edit/${item._id}`'
          >
            <md-button class="md-icon-button md-dense md-raised">
              <md-icon>edit</md-icon>
            </md-button>
          </router-link>
        </md-table-cell>

        <md-table-cell
          style='width: 10px'
        >
          <md-button @click="confirmDelete(item._id)" class="md-icon-button md-dense md-raised">
            <md-icon>delete</md-icon>
          </md-button>
        </md-table-cell>

      </md-table-row>
    </md-table>

    <md-dialog-confirm
      :md-active.sync="dialogDelete"
      md-title="Delete launch?"
      md-confirm-text="Confirm"
      md-cancel-text="Cancel"
      @md-cancel='dialogDelete = false'
      @md-confirm="destroyLaunches(id)" />

  </div>
</template>

<script>
import launchesMixin from '@/mixins/launchesMixin'
import categoriesMixin from '@/mixins/categoriesMixin'

export default {
  name: 'Launches',
  mixins: [launchesMixin, categoriesMixin],
  data () {
    return {
      dialogDelete: false,
      dialogEdit: false,
      id: null
    }
  },
  computed: {
    launches: {
      get () {
        return this.getLaunches
      },
      set () {
      }
    }
  },
  methods: {
    confirmDelete (_id) {
      this.id = _id
      this.dialogDelete = true
    }
  },
  mounted () {
    this.indexCategories()
    this.indexLaunches()
  }
}
</script>
