const axios = require('axios');
const Vue = require('vue');

new Vue({
  el: '#app',
  data: {
    deviceId: '',
    deviceLocation: '',
    authToken: '',
    devices: [],
    entries: [],
    showDeviceModal: false,
  },
  mounted () {
    this.getDevices();
  },
  // our methods
  methods: {
    processForm: function() {
      axios({
        method: 'POST',
        url: '/devices',
        data: { device_id: this.deviceId, location: this.deviceLocation, auth_token: this.authToken }
      }).then(response => {
        this.deviceId = '';
        this.deviceLocation = '';
        this.authToken = '';
        this.showDeviceModal = !this.showDeviceModal;
        this.getDevices();
      }).catch(error => {
        console.log(error);
      })
    },
    onCancel: function () {
      this.showDeviceModal = !this.showDeviceModal;
    },
    onAddDevice: function () {
      this.showDeviceModal = !this.showDeviceModal;
    },
    getDevices: function() {
      axios({
        method: 'GET',
        url: '/devices',
      }).then(response => {
        this.devices = response.data;
      }).catch(error => {
        console.log(error);
      })
    },
    togglePolling: function (device) {
      axios({
        method: 'PUT',
        url: '/devices',
        data: {
          _id: device._id,
          polling_enabled: !device.polling_enabled 
        }
      }).then(response => {
        this.getDevices();
      }).catch(error => {
        console.log(error);
      })
    },
    getEntries: function (deviceId) {
      console.log('Device clicked',deviceId);
      axios({
        method: 'GET',
        url: `/entries/${deviceId}`,
      }).then(response => {
        this.entries = response.data;
      }).catch(error => {
        console.log(error);
      })
    }
  }
})
