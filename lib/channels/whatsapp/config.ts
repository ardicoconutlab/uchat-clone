export function whatsappWebhookConfigured() {
  return Boolean(process.env.META_WEBHOOK_VERIFY_TOKEN && process.env.META_APP_SECRET);
}

export function whatsappSendingConfigured() {
  return Boolean(process.env.META_WABA_ACCESS_TOKEN && process.env.META_PHONE_NUMBER_ID && process.env.META_GRAPH_API_VERSION);
}
