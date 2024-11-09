import { StyleSheet } from 'react-native';

export const globalSty = StyleSheet.create({
  container: {
    flex: 1,
  },
  pad: {
    paddingHorizontal: '5%',
  },
  image: {
    flex: 1,
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    alignSelf: 'center',
    padding: 50,
  },
  space: {
    padding: 3,
    backgroundColor: 'black',
  },
  texth1: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 32,
    marginBottom: 16,
    color: '#fff',
  },
  texth2: {
    color: 'white',
    fontSize: 40,
    lineHeight: 60,
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'transparent',
  },
  Button: {
    backgroundColor: 'rgba(85,197,223,255)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 20,
    paddingHorizontal: 32,
    borderRadius: 4,
    elevation: 3,
    maxWidth: '60%',
    marginLeft: '20%',
    marginTop: 25,
  },
  btnText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
  },
  Btxt: {
    fontSize: 82,
    lineHeight: 21,
    fontWeight: 'bold',
    letterSpacing: 0.25,
    color: 'white',
  },
  input: {
    height: 50,
    marginVertical: 12,
    paddingHorizontal: 15,
    paddingBottom: 5,
    borderRadius: 25,
    backgroundColor: '#f2f2f2',
    fontSize: 16,
    lineHeight: 24,
  },
  DropdownMenu: {
    flex: 0.5,
  },

  CheckBoxForm: {
    top: 10,
    marginHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: 20,
  },
  textQuestion: {
    color: 'white',
  },
  inputSurvey: {
    height: 80,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  info: {
    position: 'absolute',
    bottom: 485,
    maxHeight: 24,
    marginLeft: 295,
  },
  pinName: {
    backgroundColor: 'silver',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});
