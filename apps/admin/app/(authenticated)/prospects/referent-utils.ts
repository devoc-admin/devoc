const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function isValidEmailFormat(value: string): boolean {
  return EMAIL_REGEX.test(value.trim());
}

type ReferentFormValues = {
  referentName: string;
  referentEmail: string;
  referentPhone: string;
  referentLinkedin: string;
};

type NormalizedReferent = {
  referentName: string | null;
  referentEmail: string | null;
  referentPhone: string | null;
  referentLinkedin: string | null;
};

// Contacts are only kept when a referent name is provided.
export function normalizeReferent(
  value: ReferentFormValues
): NormalizedReferent {
  const referentName = value.referentName.trim() || null;
  if (!referentName) {
    return {
      referentEmail: null,
      referentLinkedin: null,
      referentName: null,
      referentPhone: null,
    };
  }
  return {
    referentEmail: value.referentEmail.trim() || null,
    referentLinkedin: value.referentLinkedin.trim() || null,
    referentName,
    referentPhone: value.referentPhone.trim() || null,
  };
}
