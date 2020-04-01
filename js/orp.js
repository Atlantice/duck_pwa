/**
 * Shows the ORP Configuration dialog
 */
async function orp_config() {
    var modal = document.querySelector(".orp_config_modal");
    var html = document.querySelector("html");
    modal.classList.add("is-active");
    html.classList.add("is-clipped");

    modal
      .querySelector(".orp_modal_close")
      .addEventListener("click", function(e) {
        e.preventDefault();
        modal.classList.remove("is-active");
        html.classList.remove("is-clipped");
      });
      await characteristic.writeValue(encoder.encode("oo"));
      await new Promise(resolve => setTimeout(resolve, 10));
      await characteristic.writeValue(encoder.encode("op"));
  }

/**
 * Performs a single-point calibration and updates the value.
 */
async function orp_set_offset() {
    var response = prompt("Calibration solution in mV?", "400");
    if (response != null) {
        await characteristic.writeValue(encoder.encode("oo " + response));
    }
}

/**
 * Sets the probe potential.
 */
async function orp_set_potential() {
    var response = prompt("Probe potential?", "245");
    if (response != null) {
        await characteristic.writeValue(encoder.encode("op " + response));
    }
}

/**
 * Resets all the ORP calibration data to defaults.
 * Requests new information to display.
 */
async function orp_reset() {
    var response = confirm("Delete all configuration data?");
    if (response == true) {
        await characteristic.writeValue(encoder.encode("op 0"));
        await characteristic.writeValue(encoder.encode("or"));
        await characteristic.writeValue(encoder.encode("oo"));
        await characteristic.writeValue(encoder.encode("op"));
    }
}