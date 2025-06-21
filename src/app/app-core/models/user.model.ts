export interface User {
  id?: string; // optional, if it's used after submission

  // Personal Information
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  country: string;

  // Professional Information
  education: string;
  currentPosition: string;
  currentCompany: string;

  // Application Details
  coverLetter: string;
  cv?: File | null;

}

