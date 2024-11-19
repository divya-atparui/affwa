import { z } from 'zod';

export const personalInfoSchema = z.object({
  gender: z.enum(['Mr', 'Mrs', 'Miss']), 
  USER_FIRST_NAME: z.string().min(1, 'First name is required'),
  USER_MIDDLE_NAME: z.string().optional(),
  USER_LAST_NAME: z.string().min(1, 'Last name is required'),
  CUSTOMER_EMAIL: z.string().email('Invalid email format'),
  CUSTOMER_EMAIL_ALLOW_SOL: z.boolean(),
});

export const addressInfoSchema = z.object({
  CUSTOMER_ADDRESS1: z.string().min(1, 'Address Line 1 is required'),
  CUSTOMER_ADDRESS2: z.string().optional(),
  CUSTOMER_CITY: z.string().min(1, 'City is required'),
  CUSTOMER_POSTAL_CODE: z.string().min(1, 'Postal Code is required'),
  CUSTOMER_STATE: z.string().min(1, 'State is required'),
  CUSTOMER_COUNTRY: z.string().min(1, 'Country is required'),
  CUSTOMER_ADDRESS_ALLOW_SOL: z.boolean(),
});

export const contactDetailsSchema = z.object({
  CUSTOMER_HOME_COUNTRY: z.string().optional(),
  CUSTOMER_HOME_AREA: z.string().optional(),
  CUSTOMER_HOME_CONTACT: z.string().min(10, 'Contact number must be at least 10 digits'),
  CUSTOMER_HOME_ALLOW_SOL: z.boolean(),
  CUSTOMER_WORK_COUNTRY: z.string().optional(),
  CUSTOMER_WORK_AREA: z.string().optional(),
  CUSTOMER_WORK_CONTACT: z.string().optional(),
  CUSTOMER_WORK_ALLOW_SOL: z.boolean(),
  CUSTOMER_FAX_COUNTRY: z.string().optional(),
  CUSTOMER_FAX_AREA: z.string().optional(),
  CUSTOMER_FAX_CONTACT: z.string().optional(),
  CUSTOMER_FAX_ALLOW_SOL: z.boolean(),
  CUSTOMER_MOBILE_COUNTRY: z.string().optional(),
  CUSTOMER_MOBILE_AREA: z.string().optional(),
  CUSTOMER_MOBILE_CONTACT: z.string().min(10, 'Contact number must be at least 10 digits'),
  CUSTOMER_MOBILE_ALLOW_SOL: z.boolean(),
});

export const accountDetailsSchema = z.object({
  CUSTOMER_USERNAME: z.string().min(1, 'Username is required'),
  CUSTOMER_PASSWORD: z.string().min(6, 'Password must be at least 6 characters'),
  CUSTOMER_CONFIRM_PASSWORD: z.string().min(6, 'Password must be at least 6 characters'),
  PASSWORD_HINT: z.string().optional(),
});