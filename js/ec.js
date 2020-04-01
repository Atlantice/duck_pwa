/**
 * Resets all the EC calibration data to defaults.
 * Requests new information to display.
 * Between each writeValue, wait 10 ms to prevent the BLE
 * stack from backing up.
 */
async function ec_reset() {
  var response = confirm("Delete all configuration data?");
  if (response == true) {
    await characteristic.writeValue(encoder.encode("ecr"));
    await new Promise(resolve => setTimeout(resolve, 10));
    await characteristic.writeValue(encoder.encode("etc"));
    await new Promise(resolve => setTimeout(resolve, 10));
    await characteristic.writeValue(encoder.encode("eco"));
    await new Promise(resolve => setTimeout(resolve, 10));
    await characteristic.writeValue(encoder.encode("ehrf"));
    await new Promise(resolve => setTimeout(resolve, 10));
    await characteristic.writeValue(encoder.encode("ehr"));
    await new Promise(resolve => setTimeout(resolve, 10));
    await characteristic.writeValue(encoder.encode("elrf"));
    await new Promise(resolve => setTimeout(resolve, 10));
    await characteristic.writeValue(encoder.encode("elr"));
    await new Promise(resolve => setTimeout(resolve, 10));
    await characteristic.writeValue(encoder.encode("eo"));
  }
}

/**
 * Changes the temperature coefficient of the EC device
 * 0.019 is default.
 */
async function ec_set_temp_coefficient() {
  var ec = prompt("New temperature coefficient?", "0.019");
  if (ec != null) {
    await characteristic.writeValue(encoder.encode("eco " + ec));
  }
}

/**
 * Changes the temperature constant of the EC device
 * 25 is default.
 */
async function ec_set_temp_constant() {
  var ec = prompt("New temperature constant to adjust readings to in C?", "25");
  if (ec != null) {
    await characteristic.writeValue(encoder.encode("etc " + ec));
  }
}

/**
 * Performs a high-point calibration and updates the value.
 */
async function ec_high() {
  var ec = prompt("High-point calibration solution in mS?", "12.88");
  if (ec != null) {
    await characteristic.writeValue(encoder.encode("ehrf " + ec));
  }
  await characteristic.writeValue(encoder.encode("ehr"));
}

/**
 * Performs a low-point calibration and updates the value.
 */
async function ec_low() {
  var ec = prompt("Low-point calibration solution in mS?", "1.413");
  if (ec != null) {
    await characteristic.writeValue(encoder.encode("elrf " + ec));
  }
  await characteristic.writeValue(encoder.encode("elr"));
}

/**
 * Performs a single-point calibration and updates the value.
 */
async function ec_set_offset() {
  var ec = prompt("Calibration solution in mS?", "1.413");
  if (ec != null) {
    await characteristic.writeValue(encoder.encode("eo " + ec));
  }
}

/**
 * Shows the EC Configuration dialog
 */
async function ec_config() {
  var modal = document.querySelector(".ec_config_modal");
  var html = document.querySelector("html");
  modal.classList.add("is-active");
  html.classList.add("is-clipped");

  modal
    .querySelector(".ec_modal_close")
    .addEventListener("click", function(e) {
      e.preventDefault();
      modal.classList.remove("is-active");
      html.classList.remove("is-clipped");
    });
  await characteristic.writeValue(encoder.encode("etc"));
  await new Promise(resolve => setTimeout(resolve, 10));
  await characteristic.writeValue(encoder.encode("eco"));
  await new Promise(resolve => setTimeout(resolve, 10));
  await characteristic.writeValue(encoder.encode("ehrf"));
  await new Promise(resolve => setTimeout(resolve, 10));
  await characteristic.writeValue(encoder.encode("ehr"));
  await new Promise(resolve => setTimeout(resolve, 10));
  await characteristic.writeValue(encoder.encode("elrf"));
  await new Promise(resolve => setTimeout(resolve, 10));
  await characteristic.writeValue(encoder.encode("elr"));
  await new Promise(resolve => setTimeout(resolve, 10));
  await characteristic.writeValue(encoder.encode("eo"));
}