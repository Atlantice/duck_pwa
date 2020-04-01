let decoder = new TextDecoder("utf-8");
let encoder = new TextEncoder("utf-8");

var app = new Vue({
  el: "#app",
  data: {
    device: 0,
    service: 0,
    characteristic: 0,
    connected: false,
    ec: "-",
    ec_unit: "mS",
    temp: "-",
    temp_unit: "Papa",
    device_name: "",
    ec_connected: false,
    ph_connected: false,
    orp_connected: false,
    ec_low_ref: "-",
    ec_low_read: "-",
    ec_high_ref: "-",
    ec_high_read: "-",
    ec_offset: "-",
    ec_temp_constant: "-",
    ec_temp_coefficient: "-",
    ph: "-",
    ph_unit: "pH",
    ph_low_ref: "-",
    ph_low_read: "-",
    ph_high_ref: "-",
    ph_high_read: "-",
    ph_offset: "-",
    orp_offset: "-",
    orp: "-",
    orp_unit: "mV",
    orp_potential: "-",
    switchConnected: false, 
    serviceUuid: "7549e55b-b314-4923-aa27-1403720b9cf4",
    txUuid: "b6ab8bdf-c704-49ec-83b1-bfca810c35f6",
    rxUuid: "b6ab8bdf-c704-49ec-83b1-bfca810c35f6"
  },
  mounted: function () {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('service-worker.js');
    }
  },
  methods: {
    connect,
    measure: async function(event){
      characteristic = await service.getCharacteristic(this.rxUuid);
      if (this.ec_connected){
        await characteristic.writeValue(encoder.encode("ect"));
        await characteristic.writeValue(encoder.encode("ec " + this.temp));
      }

      if (this.ph_connected)
      {
        await characteristic.writeValue(encoder.encode("ph " + this.temp));
      }

      if (this.orp_connected)
      {
        await characteristic.writeValue(encoder.encode("o"));
      }

    },
    value_update: async function(event) {
      let value = event.target.value;
      value = decoder.decode(value);
      let obj = JSON.parse(value);

      if (obj.hasOwnProperty("ecc")) {
        this.ec_connected = obj.ecc;
      }
      if (obj.hasOwnProperty("pc")) {
        this.ph_connected = obj.pc;
      }
      if (obj.hasOwnProperty("oc")) {
        this.orp_connected = obj.oc;
      }
      if (obj.hasOwnProperty("ec")) {
        this.ec = obj.ec;
      }
      // ec unit
      if (obj.hasOwnProperty("eu")) {
        this.ec_unit = obj.eu;
      }
      // temperature
      if (obj.hasOwnProperty("ect")) {
        this.temp = obj.ect;
      }
      // temperature unit
      if (obj.hasOwnProperty("tu")) {
        this.temp_unit = obj.tu;
      }
      // ec temp. constant
      if (obj.hasOwnProperty("etc")) {
        this.ec_temp_constant = obj.etc;
      }
      // ec temp coefficient
      if (obj.hasOwnProperty("eco")) {
        this.ec_temp_coefficient = obj.eco;
      }
      // ec high reference 
      if (obj.hasOwnProperty("ehrf")) {
        this.ec_high_ref = obj.ehrf;
      }
      // ec high reading
      if (obj.hasOwnProperty("ehr")) {
        this.ec_high_read = obj.ehr;
      }
      // ec low reference
      if (obj.hasOwnProperty("elrf")) {
        this.ec_low_ref = obj.elrf;
      }
      // ec low reading
      if (obj.hasOwnProperty("elr")) {
        this.ec_low_read = obj.elr;
      }
      // ec offset
      if (obj.hasOwnProperty("eo")) {
        this.ec_offset = obj.eo;
      }
      // ph
      if (obj.hasOwnProperty("ph")) {
        this.ph = obj.ph;
      }
      // ph low ref
      if (obj.hasOwnProperty("plrf")) {
        this.ph_low_ref = obj.plrf;
      }
      // ph low read
      if (obj.hasOwnProperty("plr")) {
        this.ph_low_read = obj.plr;
      }
      // ph high ref
      if (obj.hasOwnProperty("phrf")) {
        this.ph_high_ref = obj.phrf;
      }
      // ph high read
      if (obj.hasOwnProperty("phr")) {
        this.ph_high_read = obj.phr;
      }
      // ph offset
      if (obj.hasOwnProperty("ps")) {
        this.ph_offset = obj.ps;
      }
      // orp offset
      if (obj.hasOwnProperty("oo")) {
        this.orp_offset = obj.oo;
      }
      // orp 
      if (obj.hasOwnProperty("o")) {
        this.orp = obj.o;
      }
      // orp potential
      if (obj.hasOwnProperty("op")) {
        this.orp_potential = obj.op;
      }
    },
    ec_config,
    ec_set_offset,
    ec_low,
    ec_high,
    ec_set_temp_constant,
    ec_set_temp_coefficient,
    ec_reset,
    ph_config,
    ph_reset,
    ph_set_offset,
    ph_low,
    ph_high,
    orp_config,
    orp_set_offset,
    orp_set_potential,
    orp_reset,
    disconnect
  }
});
