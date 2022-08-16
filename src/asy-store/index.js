import AsyncStorage from '@react-native-community/async-storage';

/*---------------------------------------------------------------*
 *                  Save User token in Async Storage             *
 *---------------------------------------------------------------*/

export const saveToken = async (key, data) => {
  try {
    const resp = await AsyncStorage.setItem(key, JSON.stringify(data));
    return resp;
  } catch (error) {
    console.error(error);
  }
};

/*---------------------------------------------------------------*
 *                  remove User token in Async Storage           *
 *---------------------------------------------------------------*/

export const removeToken = async key => {
  try {
    const resp = await AsyncStorage.removeItem(key);
    return resp;
  } catch (error) {
    console.error(error);
  }
};

/*---------------------------------------------------------------*
 *                  get User token from Async Storage            *
 *---------------------------------------------------------------*/

export const getToken = async key => {
  try {
    const resp = await AsyncStorage.getItem(key);
    return resp;
  } catch (error) {
    console.error(error);
  }
};

/*---------------------------------------------------------------*
 *                    Clear AsyncStorage                         *
 *---------------------------------------------------------------*/

export const clear = async () => {
  try {
    await AsyncStorage.clear();
  } catch (error) {
    console.error(error);
  }
};