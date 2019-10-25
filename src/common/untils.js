import phoneCountry from '../data/phone-country'
/**
 * it make phone number stardart country
 * @param  {String} phone
 * @param  {String} country
 * @return {String}
 */
export const makePhoneCountry = (phone, country = 'ID') => {
    let newPhone = phone.replace(/\D/g, "")
    
    return phoneCountry(country).international_dialing + ( (newPhone.substr(0,1) === "0" )? newPhone.substr(1) : newPhone )
}