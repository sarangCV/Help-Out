/* eslint-disable prettier/prettier */
import config from '../config';

/*---------------------------------------------------------------*
 *                        Fetch posts                            *
 *---------------------------------------------------------------*/
export const fetchInterests = async () => {
  const response = await fetch(`${config.baseUrl}interest-list`, {
    method: 'GET',
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*---------------------------------------------------------------*
 *                        Image Upload                            *
 *---------------------------------------------------------------*/
export const imageUpload = async (token, data) => {
  console.log(data)
  const response = await fetch(`${config.baseUrl}post/image-upload`, {
    method: 'POST',
    // 'Content-Type': 'multipart/form-data',
    headers: {
      token: `${token}`,
    },
    body: data,
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*---------------------------------------------------------------*
 *                        Create Post                            *
 *---------------------------------------------------------------*/
export const createPost = async (token, data) => {
  console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}post/create`, {
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
 *                        Fetch Users                            *
 *---------------------------------------------------------------*/
export const fetchUsers = async (token, data) => {
  console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}chat/users`, {
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
 *                 Fetch Current User posts                      *
 *---------------------------------------------------------------*/
export const fetchCurrentPosts = async (token, data) => {
  console.log('Insert Data: ', token, data)
  const response = await fetch(`${config.baseUrl}posts/my-post`, {
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
 *                 Delete Current User posts                     *
 *---------------------------------------------------------------*/
export const deleteCurrentPost = async (token, data) => {
  console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}post/delete`, {
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


/*------------------------------------------------*
 *                 Block user                     *
 *------------------------------------------------*/

export const blockUser = async (token, data) => {
  // console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}manage-users/block`, {
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


/*------------------------------------------------*
 *                 Unblock user                     *
 *------------------------------------------------*/

export const unBlockUser = async (token, data) => {
  // console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}manage-users/un-block`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};



/*---------------------------------------------------------*
 *                 Get Blocked user list                   *
 *---------------------------------------------------------*/

export const getBlockedList = async (token) => {
  // console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}manage-users/blocked-list`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*------------------------------------------------*
 *                 Spam user                     *
 *------------------------------------------------*/

export const reportSpam = async (token, data) => {
  // console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}post/report-spam`, {
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


/*------------------------------------------------*
 *               Update User Photo                *
 *------------------------------------------------*/

export const updateUserPhoto = async (token, data) => {
  // console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}profile/upload-avatar`, {
    method: 'POST',
    headers: {
      token: `${token}`,
    },
    body: data,
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*------------------------------------------------*
 *               Update Username                  *
 *------------------------------------------------*/

export const updateUserName = async (token, data) => {
  // console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}profile/update-name`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};



/*------------------------------------------------*
 *               Update User Phone                *
 *------------------------------------------------*/

export const updateUserPhone = async (token, data) => {
  console.log(data)
  const response = await fetch(`${config.baseUrl}profile/update-number`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*------------------------------------------------*
 *               Update User Email                *
 *------------------------------------------------*/

export const updateUserEmail = async (token, data) => {
  // console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}profile/update-email`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      token: `${token}`,
    },
    body: JSON.stringify(data),
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*------------------------------------------------*
 *               Get User Details                 *
 *------------------------------------------------*/

export const getUserDetails = async (token) => {
  // console.log('Insert Data: ', data)
  const response = await fetch(`${config.baseUrl}profile/details`, {
    method: 'GET',
    headers: {
      token: `${token}`,
    },
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*------------------------------------------------*
 *               Submit issue                 *
 *------------------------------------------------*/

export const reportIssue = async (token, data) => {
  console.log('call Image upload: ', data)
  console.log()
  const response = await fetch(`${config.baseUrl}support/new`, {
    method: 'POST',
    headers: {
      token: `${token}`,
    },
    body: data,
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*------------------------------------------------*
 *                  Feedback                      *
 *------------------------------------------------*/

export const feedBackUser = async (token, data) => {
  console.log('call Image upload: ', data)
  const response = await fetch(`${config.baseUrl}feedback`, {
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

/*------------------------------------------------*
 *                  Feedback                      *
 *------------------------------------------------*/

export const getOrganisations = async (token, data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}organisation`, {
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

/*---------------------------------------------------------*
 *                  Get Organisation Details               *
 *---------------------------------------------------------*/

export const getOrganisationDetails = async (token, id) => {
  console.log('call getOrganisationDetails: ', token, id);
  const response = await fetch(`${config.baseUrl}organisation/details/${id}`, {
    method: 'GET',
    headers: {
      // 'Content-Type': 'application/json',
      token: `${token}`,
    },
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};



/*---------------------------------------------------------*
 *                      Get Cities List                        *
 *---------------------------------------------------------*/

export const getCitiesList = async () => {
  const response = await fetch(`${config.baseUrl}autocomplete/address/cities`, {
    method: 'GET',
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*---------------------------------------------------------*
 *                      Get Cities                         *
 *---------------------------------------------------------*/

export const getCities = async (data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}autocomplete/address/city/${data}`, {
    method: 'GET',
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};



/*---------------------------------------------------------*
 *                      Bookmark organisation              *
 *---------------------------------------------------------*/

export const bookMarkOrg = async (token, data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}organisation/bookmark/save/${data}`, {
    method: 'GET',
    headers: {
      token: `${token}`
    }
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

/*---------------------------------------------------------*
 *                   Get Saved organisations               *
 *---------------------------------------------------------*/

export const getSavedOrgs = async (token) => {
  // console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}organisation/bookmark/get-all`, {
    method: 'GET',
    headers: {
      token: `${token}`
    }
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*---------------------------------------------------------*
 *                   Get Support Issues                    *
 *---------------------------------------------------------*/

export const getSupportIssues = async (token) => {
  // console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}support/list`, {
    method: 'POST',
    headers: {
      token: `${token}`
    }
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};



/*---------------------------------------------------------*
 *                   Get Events                            *
 *---------------------------------------------------------*/

export const getEvents = async (token, data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}posts/my-post`, {
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


/*---------------------------------------------------------*
 *                   Delete Post                           *
 *---------------------------------------------------------*/

export const deleteEvent = async (token, data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}post/delete`, {
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


/*---------------------------------------------------------*
 *                   Report Organisation                   *
 *---------------------------------------------------------*/

export const reportOrg = async (token, data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}organisation/report`, {
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


/*---------------------------------------------------------*
 *                   Contact Viewed                        *
 *---------------------------------------------------------*/

export const contViewed = async (token, data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}post/statics/contact-viewed`, {
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

/*---------------------------------------------------------*
 *                   Event Request                         *
 *---------------------------------------------------------*/

export const eventRequest = async (token, data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}post/request-by-user`, {
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

/*---------------------------------------------------------*
 *                   Organisation Request                  *
 *---------------------------------------------------------*/

export const orgRequest = async (token, data) => {
  console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}organisation/request-for-organisation`, {
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

/*---------------------------------------------------------*
 *                    Delete organisations                 *
 *---------------------------------------------------------*/

export const deleteOrg = async (token, id) => {
  // console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}organisation/bookmark/delete/${id}`, {
    method: 'GET',
    headers: {
      token: `${token}`
    }
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};


/*---------------------------------------------------------*
 *                    Get Event Types                      *
 *---------------------------------------------------------*/

export const getEventTypes = async (token) => {
  // console.log('call Image upload: ', data);
  const response = await fetch(`${config.baseUrl}event-types`, {
    method: 'GET',
    headers: {
      token: `${token}`
    }
  });
  // eslint-disable-next-line no-return-assign
  return (responseData = await response.json());
};

