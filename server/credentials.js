export const HEDERA_TEST_ACCOUNT = process.env.HEDERA_TEST_ACCOUNT;
export const HEDERA_PRIVATE_KEY = process.env.HEDERA_PRIVATE_KEY;
export const HEDERA_PUBLIC_KEY = process.env.HEDERA_PUBLIC_KEY;

// Remove for production, replace with main net credentials.
console.log(
  "operator",
  HEDERA_PRIVATE_KEY,
  HEDERA_PUBLIC_KEY,
  HEDERA_TEST_ACCOUNT
);
