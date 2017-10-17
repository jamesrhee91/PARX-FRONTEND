import { StyleSheet, Dimensions } from 'react-native'

const dims = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0
  },
  map: {
    position: 'absolute',
    width: dims.width,
    height: dims.height,
    zIndex: -1
  },
  overlay: {
    backgroundColor: '#2f3030',
    justifyContent: 'flex-end',
    alignSelf: 'center',
    opacity: 0.5,
    marginTop: 37
  },
  text: {
    alignSelf: 'center',
    color: 'white'
  },
  overlaySize: {
    width: dims.width/2
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center'
  },
  searchBar: {
    height: 60,
    width: '95%',
    alignSelf: 'center',
    marginTop: 33,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    backgroundColor: 'white'
  },
  actionButton: {
    position: 'relative',
    bottom: -355,
    right: -20
  },
  actionButtonIcon: {
    fontSize: 20,
    height: 22,
    color: 'white'
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%'
  },
  textInputContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth:0,
    borderRadius: 0
  },
  textInput: {
    color: '#a8a8a8',
    height: '100%',
    fontSize: 15,
    paddingLeft: 10,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 0,
    marginLeft: 0,
    marginBottom: 0,
    marginRight: 0,
    fontFamily: 'Exo-Medium'
  },
  currentButton: {
    position: 'relative',
    bottom: -508,
    right: -309,
    height: 56,
    width: 56,
    backgroundColor: '#f7f7f7',
    borderRadius: 28,
    shadowOpacity: 0.35,
    shadowOffset: { "width": 0, "height": 5 },
    shadowColor: '#000',
    shadowRadius: 3,
    alignItems: 'center',
    justifyContent: 'center'
  },
  listView: {
    position: 'absolute',
    top: 61,
    left: 1,
    right: 1,
    backgroundColor: 'white',
    opacity: 0.8
  },
  menuIcon: {
    paddingLeft: 22,
    paddingRight:12,
    paddingBottom: 14,
    paddingTop: 14
  },
  leftTop: {
    backgroundColor: 'white'
  },
  drawer: {
    shadowColor: '#000',
    shadowOpacity: 0.4,
    shadowRadius: 10
  },
  drawerProfileView: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 5
  },
  drawerLogo: {
    marginTop: 25,
    alignSelf: 'center'
  },
  drawerLogoText: {
    fontSize: 25,
    fontFamily: 'ArchivoBlack-Regular'
  },
  drawerPicView: {
    alignSelf: 'center',
    marginTop: 10,
    width: 120,
    height: 120
  },
  drawerPic: {
    alignSelf: 'center',
    width: '100%',
    height: '100%',
    borderRadius: 60
  },
  drawerEmailView: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 10
  },
  drawerEmailText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 13
  },
  drawerOptionCont: {
    height: 60,
    width: '100%',
    paddingLeft: 23,
    justifyContent: 'flex-start',
    alignItems: 'center',
    flexDirection: 'row'
  },
  drawerOptionView: {
    height: 30,
    width: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  drawerOptionText: {
    fontSize: 22,
    paddingLeft: 15,
    fontWeight: 'bold'
  },
  drawerLines: {
    alignSelf: 'center',
    backgroundColor: '#a8a8a8',
    height: 1,
    width: '85%',
    marginTop: 5,
    marginBottom: 5
  },
  drawerMenuCont: {
    height: 100,
    width: '100%',
    backgroundColor: 'white'
  },
  drawerMenuView: {
    flex: 1,
    flexDirection: 'column'
  },
  drawerMenuTouch: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'flex-start',
    width: '100%',
    paddingLeft: 30
  },
  drawerMenuText: {
    color: 'black',
    fontSize: 17
  },
  drawerTierView: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginTop: 25,
    width: '100%',
    paddingLeft: 20
  },
  drawerTierTitle: {
    fontWeight: 'bold',
    fontSize: 16
  },
  drawerTierDesc: {
    fontSize: 16
  },
  deleteView: {
    backgroundColor: '#c1090d',
    height: 70,
    width: '100%',
    alignItems: 'flex-end',
    justifyContent: 'center',
    shadowOpacity: 0.35,
    shadowOffset: { "width": 0, "height": 5 },
    shadowColor: '#000',
    shadowRadius: 3
  },
  deleteTrash: {
    marginRight: 26
  },
  listContent: {
    height: 70,
    width: '100%',
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 4,
    shadowOpacity: 0.35,
    shadowOffset: { "width": 0, "height": 5 },
    shadowColor: '#000',
    shadowRadius: 3
  },
  loginButton: {
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'black',
    height: 50,
    width: '90%',
    shadowOpacity: 0.25,
    shadowOffset: { "width": 0, "height": 5 },
    shadowColor: '#000',
    shadowRadius: 3
  }
})

export default styles
