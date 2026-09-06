export const LEGAL_LAST_UPDATED = "24 August 2026";
export const PRIVACY_POLICY_VERSION = "2026-08-24";
export const TERMS_VERSION = "2026-08-24";
export const COMMUNITY_GUIDELINES_VERSION = "2026-08-24";

// A real operator/legal contact must replace this before public store
// submission. Product support remains available through Profile's Send
// Feedback and Report a Bug flows; no address is invented here.
export const LEGAL_CONTACT: string | null = null;

export interface LegalSection {
  heading: string;
  paragraphs: string[];
}

export const PRIVACY_SECTIONS: LegalSection[] = [
  { heading: "Overview", paragraphs: ["This Privacy Policy is a product draft describing the current BuildSpec beta. BuildSpec helps you document vehicles, share selected build information and participate in an enthusiast community."] },
  { heading: "Account and profile", paragraphs: ["BuildSpec uses Supabase Authentication to operate accounts and sessions. Account information can include your email address and authentication identifiers. Your username, display name, biography, location, avatar and social profile information are intended for your public profile when you provide them."] },
  { heading: "Your Garage", paragraphs: ["Your private Garage can contain vehicles, specifications, modifications, service history, expenses, notes, documents, photos and build history. These records are used to provide BuildSpec's organization, tracking, import and sharing features. Private Garage records are not made public merely because they are stored."] },
  { heading: "Public sharing", paragraphs: ["A build appears in Parking Lot only when you publish it. You choose which supported build fields visitors can see. Gallery photos start private and are public only when you mark them public while their build is published. Public profiles, builds, photos, likes, follows and comments can be viewed by other users according to the current privacy and blocking rules."] },
  { heading: "Photos and sensitive information", paragraphs: ["Photos can unintentionally reveal people, faces, license plates, home addresses, house numbers, documents, reflections, location clues or other identifying information. Review images carefully and avoid publishing sensitive information or people you do not have appropriate permission to share.", "BuildSpec does not currently promise automatic face, plate, address or document detection, automatic blurring, or removal of EXIF or GPS metadata."] },
  { heading: "AI Import", paragraphs: ["When you use AI Import, the notes you submit are sent to a server-side BuildSpec function and an AI service for processing into suggested structured build records. Review results before importing them. Do not submit secrets or information you do not want processed for this purpose."] },
  { heading: "Safety, feedback and diagnostics", paragraphs: ["BuildSpec stores reports, blocks and the information needed to investigate community-safety issues. Report Bug and Send Feedback store the content you submit; bug reports can include an optional screenshot and app/device diagnostic fields shown by the feature. BuildSpec does not currently advertise an analytics or advertising system."] },
  { heading: "Service providers", paragraphs: ["Supabase provides authentication, database, storage and server functions. Expo provides application delivery and compatible over-the-air updates. OpenAI processes text submitted to AI Import and vehicle-spec identification, and images submitted for public sharing for automated safety classification, through BuildSpec's server-side functions. These services process information as needed to operate their parts of BuildSpec."] },
  { heading: "Retention, security and deletion", paragraphs: ["Information is generally retained while needed to operate the beta, maintain safety records and meet legitimate operational or legal needs. BuildSpec uses access controls, private storage and row-level database policies, but no system can promise absolute security.", "A complete self-service account-deletion backend is not yet available in this beta. Do not interpret signing out as deletion. This must be completed before public store release."] },
  { heading: "Your choices and updates", paragraphs: ["You can edit supported profile and sharing settings, unpublish builds, make Gallery photos private, delete supported content, manage blocked users and contact the team through Send Feedback or Report a Bug. Material policy changes will use a new policy version and updated date."] },
];

export const TERMS_SECTIONS: LegalSection[] = [
  { heading: "Product draft", paragraphs: ["These Terms are a product draft for the BuildSpec development beta and are not legal advice or a claim of lawyer review. Real operator identity, governing-law terms and a legal contact must be completed before public store release."] },
  { heading: "Eligibility and accounts", paragraphs: ["Use BuildSpec only if you can lawfully agree to these Terms. You are responsible for your account, credentials and activity, and for providing accurate information where accuracy matters."] },
  { heading: "Your content", paragraphs: ["You retain ownership of your photos, build information and other content. You grant BuildSpec only the limited permission needed to store, process, technically reproduce, display and make your content available to the audiences you select, enable sharing you request, operate the service and moderate safety issues.", "You must have the rights and permissions needed to upload and publish content. Do not publish confidential information, another person's private information, or infringing material."] },
  { heading: "Public sharing and community conduct", paragraphs: ["Content you publish can be viewed and interacted with by other users. You must follow the Community Guidelines. Legitimate motorsport, track driving, mechanical work and vehicle modification are welcome; content organizing dangerous illegal conduct or harm is not."] },
  { heading: "Moderation and enforcement", paragraphs: ["BuildSpec may automatically check images submitted for public sharing and may review reports, restrict visibility, remove content, limit features, suspend or terminate accounts when reasonably necessary for safety, legal obligations or service integrity. Images remain private until an automated public-sharing check approves them. Reporting does not guarantee a particular outcome."] },
  { heading: "Intellectual property", paragraphs: ["BuildSpec's application, branding and original product materials remain protected by applicable intellectual-property rights. These Terms do not transfer ownership of your content to BuildSpec or ownership of BuildSpec to you."] },
  { heading: "Service availability", paragraphs: ["BuildSpec is a development beta and may change, experience interruptions or contain defects. Features are provided on a reasonable best-effort basis without a promise of uninterrupted or error-free availability."] },
  { heading: "Disclaimers and responsibility", paragraphs: ["Vehicle records, AI suggestions and community content are informational and may be incomplete or inaccurate. Verify safety-critical mechanical, legal and financial decisions independently. To the extent permitted by applicable law, BuildSpec is not responsible for indirect or consequential losses arising from beta use."] },
  { heading: "Updates and contact", paragraphs: ["These Terms may be updated as BuildSpec changes. A new version will be identified in the app. For current product support, use Send Feedback or Report a Bug in Profile; a formal legal contact is still required before public release."] },
];


