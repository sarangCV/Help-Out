import React from 'react';
import {
    Text,
    View,
    TouchableOpacity,
    TextInput,
    Animated,
    Dimensions,
    ScrollView,
    Image,
    Easing,
    DatePickerAndroid
} from 'react-native';
import styles from './styles';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import DateTimePicker from '@react-native-community/datetimepicker';
import ImagePicker from 'react-native-image-crop-picker';
import ImageResizer from 'react-native-image-resizer';

import {fetchInterests} from '../../api/utils';
import LinearGradient from 'react-native-linear-gradient';

const height = Dimensions.get('window').height;
import moment from 'moment'
import Header from './components/Header';
import InternetConnection from "../../components/Info/InternetConnection";

// import {useCurrentLocation} from "../../hooks"


export default CreateEvent = ({navigation}) => {

    const [title, setTitle] = React.useState()
    const [postImages, setPostImages] = React.useState([])
    const [categoryId, setCategoryId] = React.useState()
    const [categories, setCategories] = React.useState()
    const [scheduleDate, setScheduleDate] = React.useState(new Date())
    const [scheduleTime, setScheduleTime] = React.useState(new Date())
    const [show, setShow] = React.useState(false);
    const [modal, setModal] = React.useState(new Animated.Value(height+50))
    const [errors, setErrors] = React.useState({})


    React.useEffect(() => {
        fetchInterests().then(res => {
            if (res.success) {
                setCategories(res.data)
            } else {
                alert(res.message)
            }
        });
    }, [])

    const _selectCategory = id => setCategoryId(id)

    /*---------------------------------------------------------------*
     *                      Date picker                              *
     *---------------------------------------------------------------*/
    const _datePicker = async () => {
        let _date = scheduleDate
        try {
            const {action, year, month, day} = await DatePickerAndroid.open({
                date: _date,
                mode: 'calendar',
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                setScheduleDate(new Date(year, month, day))
            }
        } catch ({code, message}) {
            console.warn('Cannot open date picker', message);
        }
    }

    const _showTimePicker = () => setShow(true)

    const _onChange = (event, date) => {
        setShow(!show)
        if (date !== undefined) {
            setScheduleTime(moment(date).format('HH:mm:ss'))
            setShow(false)
        }
    }


    const _showPickerOptions = (active) => {
        Animated.timing(modal, {
            duration: 300,
            toValue: active ? 0 : height+50,
            easing: Easing.linear,
            useNativeDriver: true
        }).start()
    }


    const _openImageLibrary = () => {
        _showPickerOptions(false)
        ImagePicker.openPicker({
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            multiple: true,
            includeExif: true,
            maxFiles: 7
        }).then(image => {
            image.map((obj) => {
                ImageResizer.createResizedImage(obj.path, 600, 350, 'JPEG', 100)
                    .then(({uri}) => {
                        // console.log({uri: uri, type: obj.mime});
                        setPostImages([...postImages, {uri: uri, type: obj.mime}]);
                    })
                    .catch(err => {
                        console.log(err)
                    });
            });
        }).catch(e => {
            console.log(e)
        });

    };

    const _openDeviceCamera = () => {
        _showPickerOptions(false)
        ImagePicker.openCamera({
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            includeExif: true,
        }).then(image => {
            ImageResizer.createResizedImage(image.path, 600, 350, 'JPEG', 100)
                .then(({uri}) => {
                    const source = {uri: uri, type: image.mime}
                    let images = [...postImages, source]
                    setPostImages(images)
                })
                .catch(err => {
                    console.log(err)
                });
        }).catch(e => {
            console.log(e)
        });
    };


    const _removeItem = (index) => {
        console.log(index)
        let items = [...postImages];
        items.splice(index, 1)
        setPostImages(items)
    };

    const _createPost = () => {
        let errors = {}
        if (!title) {
            errors["title"] = 'Please enter post title';
        } else if (!categoryId) {
            errors["category"] = 'Please select category'
        } else if (postImages.length > 6) {
            alert('You have exceeded more than 7 files please try removing some!')
        } else {
            const data = new FormData();
            const d = new Date();
            postImages.forEach((item, i) => {
                data.append("postImage", {
                    uri: item.uri,
                    type: item.type,
                    name: `postimage${(d.getSeconds() + d.getMilliseconds()).toString()}-${i}.jpeg`,
                });
            });

            let eDate = `${moment(scheduleDate).format('YYYY-MM-DD').toString()} ${scheduleTime.toString()}`;

            navigation.navigate('CreateNext', {
                title: title,
                timing: moment(eDate).format(),
                categoryId: categoryId,
                postImages: data,
            })
        }
        setErrors(errors)
    }

    return (
        <LinearGradient colors={['#7487f5', '#3c52d4']} style={styles.fullView}>
            {/*{console.log()}*/}
            <Header title={'Create Event'} name={'md-close'} showBack={true}
                    navigation={() => navigation.goBack()}/>
            {show && (
                <DateTimePicker
                    testID="dateTimePicker"
                    value={new Date()}
                    mode={'time'}
                    is24Hour={false}
                    display="default"
                    onChange={_onChange}
                />
            )}

            <View style={styles.btnContainer}>
                <TouchableOpacity
                    style={styles.btnLarge}
                    onPress={_createPost}
                    activeOpacity={0.8}>
                    <Text style={styles.btnLargeText}>Next</Text>
                </TouchableOpacity>
            </View>


            <View style={styles.container}>
                <ScrollView
                    showsVerticalScrollIndicator={false}
                    keyboardShouldPersistTaps='handled'>
                    <TextInput
                        placeholder="Untitled Event"
                        placeholderTextColor="#fff"
                        style={styles.input}
                        autoCorrect={false}
                        selectionColor='#fff'
                        onChangeText={title => setTitle(title)}
                    />
                    <Text style={styles.errLabel}>{errors && errors.title}</Text>
                    <View style={styles.datePickRow}>
                        <View style={styles.folrmLeft}>
                            <TouchableOpacity style={styles.dateSection} onPress={_datePicker}>
                                <Text style={styles.label}>WHEN</Text>
                                <Text style={styles.dateText}>{moment(scheduleDate).format('dddd, MMMM DD')}</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.folrmRight}>
                            <TouchableOpacity
                                style={styles.timeSection}
                                onPress={_showTimePicker}>

                                <Text style={styles.label}>STARTS FROM</Text>
                                <Text
                                    style={styles.dateText}>{moment(scheduleTime, ["HH:mm"]).format("hh:mm A")}</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    {/* ------------------------------ Categories ------------------------------ */}
                    <ScrollView style={{flex: 1, height: 200, marginTop: 20}}>
                        <View style={styles.btnCatRow}>
                            {categories && categories.map((item, index) => {
                                return (
                                    <TouchableOpacity
                                        key={item.interestId}
                                        style={[styles.btnTag, categoryId === item.interestId && styles.selectedBg]}
                                        onPress={_selectCategory.bind(null, item.interestId)}>

                                        <Text
                                            style={[styles.btnTagText, categoryId === item.interestId && styles.selectedText]}>{item.interestTitle}</Text>

                                    </TouchableOpacity>
                                )
                            })}
                        </View>
                    </ScrollView>

                    <Text styles={styles.errLabel}>{errors && errors.category}</Text>

                    {/* ------------------------------ Categories ------------------------------ */}

                    {/* ----------------------------- Images -----------------------------------  */}
                    <ScrollView
                        horizontal={true}
                        showHorizontalScrollIndicator={false}>
                        <View style={styles.imagesRow}>
                            {postImages && postImages.map((item, index) => {
                                return (
                                    <View key={index} style={{marginRight: 5, marginTop: 20,}}>
                                        <Image
                                            resizeMode="cover"
                                            source={{uri: item.uri}}
                                            style={{
                                                height: 60,
                                                width: 60,
                                                borderRadius: 100,
                                                borderColor: '#fff',
                                                borderWidth: 3
                                            }}
                                        />
                                        <TouchableOpacity
                                            style={styles.btnTimes}
                                            onPress={() => _removeItem(index)}>
                                            <Icon name="close" size={15} color={'#8a95f8'}/>
                                        </TouchableOpacity>
                                    </View>
                                )
                            })}
                        </View>
                        <View style={styles.circleBtn}>
                            <TouchableOpacity onPress={() => _showPickerOptions(true)}>
                                <Icon name="plus" color={'#fff'} size={25}/>
                            </TouchableOpacity>
                            {/*<Image source={{uri: postImages && postImages[0].uri}}/>*/}
                        </View>
                    </ScrollView>
                    {/* ------------------------------- Images ------------------------------  */}
                </ScrollView>
            </View>


            {/*------ Image Picker Options  ------*/}

            <Animated.View style={[styles.modalOverlay, {transform: [{translateY: modal}]}]}
                           onStartShouldSetResponder={() => _showPickerOptions(false)}>
                <Animated.View style={[styles.modal, {transform: [{translateY: modal}]}]}>
                    <TouchableOpacity style={styles.btnDefault} onPress={_openImageLibrary}>
                        <Text style={styles.btnDefaultText}>Open Pictures</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={[styles.btnDefault, styles.noBorder]}
                                      onPress={_openDeviceCamera}>
                        <Text style={styles.btnDefaultText}>Open Camera</Text>
                    </TouchableOpacity>
                </Animated.View>
            </Animated.View>

            {/*------ Image Picker Options  ------*/}

            <InternetConnection />

        </LinearGradient>
    );
}

