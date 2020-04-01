/**
 * Shows the pH Configuration dialog
 */
async function ph_config() {
    var modal = document.querySelector(".ph_config_modal");
    var html = document.querySelector("html");
    modal.classList.add("is-active");
    html.classList.add("is-clipped");

    modal
      .querySelector(".ph_modal_close")
      .addEventListener("click", function(e) {
        e.preventDefault();
        modal.classList.remove("is-active");
        html.classList.remove("is-clipped");
      });
      await characteristic.writeValue(encoder.encode("ps"));
      await new Promise(resolve => setTimeout(resolve, 10));
      await characteristic.writeValue(encoder.encode("phrf"));
      await new Promise(resolve => setTimeout(resolve, 10));
      await characteristic.writeValue(encoder.encode("phr"));
      await new Promise(resolve => setTimeout(resolve, 10));
      await characteristic.writeValue(encoder.encode("plrf"));
      await new Promise(resolve => setTimeout(resolve, 10));
      await characteristic.writeValue(encoder.encode("plr"));
}

/**
 * Resets all the pH calibration data to defaults.
 */
async function ph_reset() {
    var response = confirm("Delete all configuration data?");
    if (response == true) {
        await characteristic.writeValue(encoder.encode("pr"));
        await new Promise(resolve => setTimeout(resolve, 10));
        await characteristic.writeValue(encoder.encode("ps"));
        await new Promise(resolve => setTimeout(resolve, 10));
        await characteristic.writeValue(encoder.encode("phrf"));
        await new Promise(resolve => setTimeout(resolve, 10));
        await characteristic.writeValue(encoder.encode("phr"));
        await new Promise(resolve => setTimeout(resolve, 10));
        await characteristic.writeValue(encoder.encode("plrf"));
        await new Promise(resolve => setTimeout(resolve, 10));
        await characteristic.writeValue(encoder.encode("plr"));
    }
}

/**
 * Performs a single-point calibration and updates the value.
 */
async function ph_set_offset() {
    var response = prompt("Calibration solution pH?", "7.0");
    if (response != null) {
        await characteristic.writeValue(encoder.encode("ps " + response));
    }
}

/**
 * Performs a low-point calibration and updates the value.
 */
async function ph_low() {
    var response = prompt("Low-point calibration solution pH?", "4.0");
    if (response != null) {
        await characteristic.writeValue(encoder.encode("plrf " + response));
    }
    await characteristic.writeValue(encoder.encode("plr"));
}

/**
 * Performs a high-point calibration and updates the value.
 */
async function ph_high() {
    var response = prompt("High-point calibration solution pH?", "7.0");
    if (response != null) {
        await characteristic.writeValue(encoder.encode("phrf " + response));
    }
    await characteristic.writeValue(encoder.encode("phr"));
}