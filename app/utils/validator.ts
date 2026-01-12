export type ValidationResult =
  | { ok: true }
  | { ok: false; message: string };

const ok = (): ValidationResult => ({ ok: true });
const fail = (message: string): ValidationResult => ({ ok: false, message });

export function collapseSpaces(value: string) {
  return value.replace(/\s+/g, " ");
}

type SanitizeOptions = {
  allowComma?: boolean;
  allowSpace?: boolean;
  maxLen?: number;
  toUpperCase?: boolean;
};

export function sanitizeText(value: string, opts: SanitizeOptions = {}) {
  const {
    allowComma = true,
    allowSpace = true,
    maxLen = 80,
    toUpperCase = false,
  } = opts;

  let allowed = "a-zA-Z0-9";
  if (allowSpace) allowed += " ";
  if (allowComma) allowed += ",";

  const re = new RegExp(`[^${allowed}]`, "g");
  let v = value.replace(re, "");
  v = collapseSpaces(v);

  if (maxLen) v = v.slice(0, maxLen);
  if (toUpperCase) v = v.toUpperCase();

  return v;
}

export function validateRequired(value: string): ValidationResult {
  if (!value.trim()) return fail("This field is required.");
  return ok();
}

export function validateLettersNumbers(
  value: string,
  opts: { allowComma?: boolean; allowSpace?: boolean } = {}
): ValidationResult {
  const { allowComma = true, allowSpace = true } = opts;

  const v = value.trim();
  if (!v) return ok();

  let pattern = "A-Za-z0-9";
  if (allowSpace) pattern += " ";
  if (allowComma) pattern += ",";

  const re = new RegExp(`^[${pattern}]+$`);
  if (!re.test(v)) return fail("This field can only contain letters and numbers.");
  return ok();
}

export function validatePostcodeLength(value: string): ValidationResult {
  const v = value.trim();

  if ((v.match(/ /g) ?? []).length > 1) {
    return fail("Postcode must be 5–7 characters.");
  }

  const compact = v.replace(" ", "");
  return /^[A-Za-z0-9]{5,7}$/.test(compact)
    ? ok()
    : fail("Postcode must be 5–7 characters.");
}

export function validateLettersOnly(value: string): ValidationResult {
  const r1 = validateRequired(value);
  if (!r1.ok) return r1;

  const v = value.trim();
  if (!/^[A-Za-z ]+$/.test(v)) {
    return fail("This field can only contain letters and numbers.");
  }

  return ok();
}

export function validateDOB(dd: string, mm: string, yyyy: string): ValidationResult {

  const r1 = validateRequired(dd);
  if (!r1.ok) return r1;
  const r2 = validateRequired(mm);
  if (!r2.ok) return r2;
  const r3 = validateRequired(yyyy);
  if (!r3.ok) return r3;


  if (!/^\d{1,2}$/.test(dd.trim()) || !/^\d{1,2}$/.test(mm.trim()) || !/^\d{4}$/.test(yyyy.trim())) {
    return fail("Enter a valid date of birth.");
  }

  const d = Number(dd);
  const m = Number(mm);
  const y = Number(yyyy);
  const currentYear = new Date().getFullYear();

  if (y < 1900 || y > currentYear) return fail("Enter a valid date of birth.");
  if (m < 1 || m > 12) return fail("Enter a valid date of birth.");
  if (d < 1 || d > 31) return fail("Enter a valid date of birth.");

  const dt = new Date(y, m - 1, d);
  const isReal =
    dt.getFullYear() === y && dt.getMonth() === m - 1 && dt.getDate() === d;

  return isReal ? ok() : fail("Enter a valid date of birth.");
}

export function validateUKMobile(value: string): ValidationResult {
  const r = validateRequired(value);
  if (!r.ok) return r;

  return /^0\d{9,14}$/.test(value.trim())
    ? ok()
    : fail("Enter a valid mobile number.");
}

export function validateEmailSimple(value: string): ValidationResult {
  const r = validateRequired(value); 
  if (!r.ok) return r;

  const v = value.trim();
  return /^[A-Za-z0-9@.]+$/.test(v) && !/\s/.test(v) && v.includes("@") && v.includes(".")
    ? ok()
    : fail("Enter a valid email address.");
}


export function sanitizeEmail(value: string): string {
  return value.replace(/[^A-Za-z0-9@._+-]/g, "").trim();
}