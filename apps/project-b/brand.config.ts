import { BRAND_CONFIGS } from "@acme/constants";

export const brandConfig = {
  ...BRAND_CONFIGS.projectB,
  customMessage: "Hello from Project B brand config!",

  featureFlags: {
    showClickMeButton: false,
  },

  markets: [
    {
      id: "en",
      name: "English (B)",
      brandName: "Project B – English",
      buttonColor: "#d9534f",
      alertMessage: "Welcome from Project B, English user!",
    },
    {
      id: "ca",
      name: "Canada (B)",
      brandName: "Project B – Canada",
      buttonColor: "#5bc0de",
      alertMessage: "Bienvenue à Project B, utilisateur canadien!",
    },
  ],
};
