/* eslint-disable prettier/prettier */
import config from '../config';

/*---------------------------------------------------------------*
 *               Check Phone Authentication                      *
 *---------------------------------------------------------------*/
export const onLaunchAuth = async (token, data) => {
  console.log(data)
  const response = await fetch(`${config.baseUrl}launch`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: token,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*---------------------------------------------------------------*
 *               Check Phone Authentication                      *
 *---------------------------------------------------------------*/
export const checkMobileAuth = async (data) => {
  console.log(data);
  const response = await fetch(`${config.baseUrl}auth/contact`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};



/*---------------------------------------------------*
 *               Reset Password                      *
 *---------------------------------------------------*/

export const resetPassword = async (data) => {
  console.log(data);
  const response = await fetch(`${config.baseUrl}auth/password/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*---------------------------------------------------------------*
 *                       Validate OTP                             *
 *---------------------------------------------------------------*/
export const validateOtp = async data => {
  console.log(data);
  const response = await fetch(`${config.baseUrl}auth/validate-otp`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*---------------------------------------------------------------*
 *                  Store user Fullname                          *
 *---------------------------------------------------------------*/
export const storeName = async data => {
    console.log(data);
  const response = await fetch(`${config.baseUrl}auth/accept/name`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*---------------------------------------------------------------*
 *                  Store user Email                          *
 *---------------------------------------------------------------*/
export const storeEmail = async data => {
  console.log(data);
  const response = await fetch(`${config.baseUrl}auth/accept/email`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*---------------------------------------------------------------*
 *                  Store User Password                          *
 *---------------------------------------------------------------*/
export const validatePassword = async data => {
  const response = await fetch(`${config.baseUrl}auth/validate-password`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*---------------------------------------------------------------*
 *                  Store User device details                    *
 *---------------------------------------------------------------*/
export const storeDevice = async (token, data) => {
  console.log('Inserting-data' + data);
  const response = await fetch(`${config.baseUrl}device-details`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*---------------------------------------------------------------*
 *                  Store Account Type                           *
 *---------------------------------------------------------------*/
export const storeAccType = async data => {
  const response = await fetch(`${config.baseUrl}auth/accept/account-type`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*-------------------------------------------------------*
 *                  Register User                        *
 *-------------------------------------------------------*/

export const registerUser  = async (data) => {
  // console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // token: `${token}`,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*-------------------------------------------------------*
 *                Register Organisation                  *
 *-------------------------------------------------------*/

export const createOrg  = async (data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}organisation/create`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      // token: `${token}`,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*-------------------------------------------------------*
 *                  Get Countries                        *
 *-------------------------------------------------------*/

export const getCountries  = async () => {
  // console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}autocomplete/address/country`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*-------------------------------------------------------*
 *                  Get States                           *
 *-------------------------------------------------------*/

export const getStates  = async (data) => {
  // console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}autocomplete/address/state/${data}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*-------------------------------------------------------*
 *                  Get City                             *
 *-------------------------------------------------------*/

export const getCities  = async (data) => {
  // console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}autocomplete/address/city/${data}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*-------------------------------------------------------*
 *              Add Organisation Address                 *
 *-------------------------------------------------------*/

export const addOrgAddr  = async (token, data) => {
  console.log(token, data);
  const response = await fetch(`${config.baseUrl}organisation/add-address`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*-------------------------------------------------------*
 *             Add Organisation Logo                     *
 *-------------------------------------------------------*/

export const addOrgLogo  = async (id, token, data) => {
  console.log(id, token, data);
  const response = await fetch(`http://15.206.170.201:3003/v1/organisation/update/org-icon/${id}`, {
    method: 'POST',
    headers: {
      // 'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: data,
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};
