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
    flex: 1,
    flexDirection: 'row',
    marginTop: 33,
    marginLeft: 9,
    marginRight: 9,
    shadowColor: 'black',
    shadowOpacity: 0.8,
    shadowRadius: 8,
    backgroundColor: 'white'
  },
  menu: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '15%'
  },
  textInputContainer: {
    backgroundColor: 'rgba(0,0,0,0)',
    borderTopWidth: 0,
    borderBottomWidth:0,
    borderRadius: 0,
    flex: 1
  },
  textInput: {
    color: '#a8a8a8',
    fontSize: 15,
    paddingLeft: 0,
    paddingRight: 0,
    paddingTop: 0,
    paddingBottom: 0,
    marginTop: 9,
    marginLeft: 11,
    marginBottom: 10,
    padding: 15,
    alignSelf: 'center'
  },
  listView: {
    position: 'absolute',
    top: 45,
    left: 1,
    right: 1,
    backgroundColor: 'white',
    opacity: 0.8
  },
  icon: {
    paddingLeft: 22,
    paddingRight:12,
    paddingBottom: 7,
    paddingTop: 7
  },
  leftTop: {
    backgroundColor: 'white'
  },
  drawerProfileView: {
    width: '100%',
    backgroundColor: 'white',
    borderBottomWidth: 1,
    marginBottom: 10
  },
  drawerLogo: {
    marginTop: 25,
    alignSelf: 'center'
  },
  drawerLogoText: {
    fontSize: 25,
    fontWeight: 'bold'
  },
  drawerPicView: {
    alignSelf: 'center',
    marginTop: 10,
    width: 120,
    height: 120
  },
  drawerPic: {
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
    fontWeight: 'bold',
    paddingLeft: 15
  },
  drawerLines: {
    alignSelf: 'center',
    backgroundColor: '#a8a8a8',
    height: 1,
    width: '85%',
    marginTop: 10
  },
  drawerMenuCont: {
    height: 100,
    width: '100%',
    backgroundColor: 'white'
  },
  drawerMenuView: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'flex-start'
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
  }
})

export default styles
