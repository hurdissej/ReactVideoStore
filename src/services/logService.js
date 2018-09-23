import * as Sentry from "@sentry/browser";

function init() {
  Sentry.init({
    dsn: "https://b54c9dc694f94fc0a62410e277486268@sentry.io/1286576"
  });
}

function log(error) {
  Sentry.captureException(error);
}

export default {
  init,
  log
};
