import { BRAND_CONFIGS } from "@acme/constants";

export const brandConfig = {
  ...BRAND_CONFIGS.projectA,
  customMessage: "Hello from Project A brand config!",

  featureFlags: {
    showClickMeButton: true,
  },

  markets: [
    {
      id: "en",
      name: "English",
      brandName: "Project A – English",
      buttonColor: "#FFFFFF",
      alertMessage: "Welcome, English user!",
    },
    {
      id: "ca",
      name: "Canada",
      brandName: "Project A – Canada",
      buttonColor: "#800080",
      alertMessage: "Bienvenue, utilisateur canadien!",
    },
  ],
};
