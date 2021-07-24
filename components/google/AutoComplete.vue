<template>
  <client-only>
    <gmap-autocomplete
      class="introInput ant-input"
      :options="autocompleteOptions"
      :value="addrs"
      @place_changed="getAddressData"
    >
      <template #input="slotProps">
        <a-input
          ref="input"
          outlined
          prepend-inner-icon="place"
          @listeners="slotProps.listeners"
          @attrs="slotProps.attrs"
        ></a-input>
      </template>
    </gmap-autocomplete>
  </client-only>
</template>

<script>
// import { mapGetters } from 'vuex'
import { isEmpty } from '~/services/Helpers'
export default {
  components: {},
  props: {
    provider: {
      type: Object,
      default() {
        return {}
      },
    },
    allowCurrentLocation: {
      type: Boolean,
      default: false,
    },
    autoLoad: {
      type: Boolean,
      default: false,
    },
    location: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      addrs: null,
      autocompleteOptions: {
        componentRestrictions: {
          country: ['usa'],
        },
      },
    }
  },
  computed: {},
  mounted() {
    // this.setAddress()
    this.addrs = this.location
  },
  methods: {
    getAddressData(addressData) {
      //   console.log({
      //     latitude: addressData.geometry.location.lat(),
      //     longitude: addressData.geometry.location.lng(),
      //   })
      this.addrs = addressData.formatted_address
      this.$emit('currentLocation', addressData)
    },

    setAddress() {
      if (!isEmpty(this.provider.adr_address)) {
        this.addrs = this.provider.adr_address.replace(/<[^>]*>?/gm, '')
      }
    },
  },
}
</script>
