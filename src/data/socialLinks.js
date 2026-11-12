/**
 * =====================================================================
 * SOCIAL & COLLABORATIVE CHANNELS
 * =====================================================================
 * Centralized contact information and verified social profiles.
 * Edit this file to update your handles and profile links anytime.
 */

export const socialLinks = {
  // Verified Primary Contact Points
  github: "https://github.com/Ghost-apt",
  linkedin: "https://www.linkedin.com/in/anurag-singh-33897226a/",
  email: "mailto:gm956582@gmail.com",
  rawEmail: "gm956582@gmail.com",
  githubUsername: "Ghost-apt",
  linkedinName: "Anurag Singh",
  location: "India",

  // Structured list for UI loops, contact cards and footer components
  items: [
    {
      id: "email",
      label: "Email",
      displayValue: "gm956582@gmail.com",
      description: "Direct Correspondence",
      url: "mailto:gm956582@gmail.com",
      icon: "Mail",
      isExternal: false,
    },
    {
      id: "github",
      label: "GitHub",
      displayValue: "Ghost-apt",
      description: "View Repositories & Architecture",
      url: "https://github.com/Ghost-apt",
      icon: "Github",
      isExternal: true,
    },
    {
      id: "linkedin",
      label: "LinkedIn",
      displayValue: "Anurag Singh",
      description: "Professional Network & Inquiries",
      url: "https://www.linkedin.com/in/anurag-singh-33897226a/",
      icon: "Linkedin",
      isExternal: true,
    },
  ],
};

export default socialLinks;
