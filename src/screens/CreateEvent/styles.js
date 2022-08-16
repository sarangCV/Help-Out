import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  fullView:{
    flex: 1,
    backgroundColor: '#fff'
  },
  container: {
    flex: 1,
    marginVertical: 15,
    paddingHorizontal: 20,
  },
  formGroup:{
    width: '100%',
    marginTop: 10,
    paddingVertical: 0,
    // paddingHorizontal: 20,
    // marginBottom: 15,
    // paddingHorizontal: 15,
  },
  input:{
    width: '100%',
    height: 50,
    // marginBottom: 15,
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    fontSize: 16
    // borderBottomWidth: 1,
    // borderBottomColor: '#fff'
  },
  errLabel: {
    fontFamily: 'Montserrat-Regular',
    color: '#ffeded',
    fontSize: 14,
    // marginRight: 5,
  },
  textArea: {
    width: '100%',
    height: 50,
    textAlignVertical: 'top',
    fontFamily: 'Montserrat-Regular',
    color: '#fff',
    fontSize: 16
    // borderBottomWidth: 1,
  },
  selectBtn: {
    width: '93%',
    marginBottom: 15,
    marginLeft: 15,
    marginRight: 15,
    // paddingHorizontal: 10,
    flexDirection: 'row',
    paddingVertical: 10,
    // borderBottomWidth: 1,
  },
  icon:{
    marginLeft: 10,
  },
  selectBtnText: {
    color: '#3d51d6',
    marginLeft: 15,
    marginTop: 5,
  },
  catContainer:{
    width: '100%',
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  cardRow:{
    minWidth: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  btnContainer:{
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
    // marginVertical: 15,
    paddingHorizontal: 15,
    position: 'absolute',
    bottom: 20,
    backgroundColor: 'rgba(255,255,255,0)',
  },
  btnLarge:{
    width: '100%',
    // padding: 15,
    height: 50,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#526af3',
  },
  btnLargeText:{
    color: '#fff',
    fontWeight: '600',
    fontFamily: 'Montserrat-Bold',
    fontSize: 16,
  },
  datePickRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
    marginTop: 15,
  },
  inputM:{
    width: '50%',
    height: 45,
  },
  inputXs:{
    width: '20%',
    height: 45,
  },
  label: {
    fontFamily: 'Montserrat-Regular',
    color:'#fff',
    fontSize: 16,
    marginBottom: 5
  },
  dateText: {
    fontFamily: 'Montserrat-Regular',
    color:'#fff',
    fontSize: 14,
    // marginBottom: 5
  },
  folrmLeft: {
    width: '60%'
  },
  folrmRight: {
    width: '40%'
  },
  buttonXs: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'flex-start',
    // justifyContent: 'center',
    padding: 8,
    borderWidth: 0.5,
    borderColor: '#838383',
    borderRadius: 4,
    marginTop: 15,
  },
  iconXs: {
    marginRight: 15,
  },
  textXsTxt: {
    fontFamily: 'Montserrat-Regular',
    color:'#838383',
    fontSize: 14,
    marginTop: 3
  },
  btnCatRow:{
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  btnTag: {
    alignItems:'center',
    justifyContent:'center',
    borderColor: '#eee',
    marginRight: 15,
    marginBottom: 10,
    borderWidth: 1,
    padding: 10,
    borderRadius: 4,
  },
  selectedBg: {
    backgroundColor: '#eee'
  },
  btnTagText: {
    fontFamily: 'Montserrat-Regular',
    color:'#fff',
    fontSize: 14,
  },
  selectedText: {
    color:'#5f74e9',
  },
  circleBtn: {
    width: 60,
    height: 60,
    borderRadius: 50,
    marginTop: 20,
    backgroundColor: '#bdbeee',
    justifyContent: 'center',
    alignItems: 'center'
  },
  circleImg: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 100,
    marginRight: 15,
    // alignItems: 'center'
  },
  modalOverlay:{
    flex: 1,
    zIndex: 1100,
    justifyContent: 'center',
    alignItems:'center',
    position: 'absolute',
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    backgroundColor:'#00000040',
  },
  modal:{
    zIndex: 1400,
    width: '90%',
    backgroundColor: '#fff',
  },
  modalFull:{
    ...StyleSheet.absoluteFillObject,
    zIndex: 1400,
    width: '100%',
    backgroundColor: '#fff',
  },
  btnDefault:{
    paddingVertical: 20,
    paddingHorizontal: 10,
    borderColor:'#eee',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderWidth: 1,
  },
  btnDefaultText:{
    fontFamily: 'Montserrat-Regular',
    color: '#333',
    fontSize: 16,
    marginRight: 5,
  },
  noBorder:{
    borderBottomColor: '#ffffff00',
  },

  imagesRow:{
    flex:1,
    flexDirection:'row',
    justifyContent:'flex-start',
    alignItems:'flex-start',
  },

  btnTimes:{
    position:'absolute',
    justifyContent:'center',
    alignItems:'center',
    height:20,
    width:20,
    borderRadius:100,
    top:0,
    right:0,
    backgroundColor:'#fff',
  },

  formBtn: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#7185f4',
    borderRadius: 4,
    marginTop: 10
  },
  map: {
    ...StyleSheet.absoluteFillObject,
    // top: 80,
  },
  confirmLocation:{
    bottom: '40%',
    left: '45%',
    height: '10%',
    width: '10%',
    alignItems: 'center',
    paddingTop: '1%'
  },
  posBtmBtn: {
    width: '100%',
    flexDirection: 'row',
    justifyContent:'flex-start',
    position: 'absolute',
    bottom: 0,
    zIndex: 100,
    // backgroundColor: '#fff',
  },
  // cancelBtn: {
  //   flex: 0.5,
  //   padding: 15,
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   backgroundColor:'#fff',
  // },
  navBtn: {
    flex: 1,
    // padding: 15,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#5f74e9'
  }
})

  export default styles;
  