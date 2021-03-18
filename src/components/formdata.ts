export interface FormData {
  donationType: "individual" | "organization" | null
  contactPerson: {
    firstName: string
    lastName: string
    email: string
    address: string
    zipCode: string
    city: string
    country: string
  }
  organization: {
    organizationName: string
    organizationFoNumber: string
    organizationAddress: string
    organizationZipCode: string
    organizationCity: string
    organizationCountry: string
  }
  paymentDate: string
  donationSum: string
  donationVisibility: "visible" | "pseudonym" | "anonymous" | ""
  pseudonym: string
  groupName: string
  greeting: string
}
