(function (window) {
  window.env = window.env || {};

  // Environment variables
  window["env"]["TRAVEL_API"] = "${TRAVEL_API}";
  window["env"]["DEBUG_FR"] = "${DEBUG_FR}";
  window["env"]["CHECKOUT_URL"] = "${CHECKOUT_URL}";
  window["env"]["LOGIN_URL"] = "${LOGIN_URL}";
  window["env"]["MONITOR_URL"] = "${MONITOR_URL}";
  window["env"]["CHECKOUT_API"] = "${CHECKOUT_API}";
})(this);
