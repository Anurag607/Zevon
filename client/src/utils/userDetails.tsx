export type userDetails = {
    email: string,
    name: string,
    password: string,
    user_type: string,
    token: string,
    user_id: number,
    phone_number: string | null,
    address: {
        addr_id: number,
        user_id: number,
        address_line1: string,
        address_line2: string | null,
        city: string,
        pincode: number,
        country: string
    },
    payment_id?: string
}