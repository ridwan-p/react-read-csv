const PHONE_COUNTRY = {
    'id': 62
}

/**
 * it make phone number stardart country
 * @param  {String} phone
 * @param  {String} country
 * @return {String}
 */
export const makePhoneContry = (phone, country = 'id') => {
    let newPhone = phone.replace(/\D/g, "")
    return PHONE_COUNTRY[country] + ( (newPhone.substr(0,1) === "0" )? newPhone.substr(1) : newPhone )
}