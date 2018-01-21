import firebase from 'firebase'
const config = {
	apiKey: 'AIzaSyBbmz3LsifoGK4Zznz7r37KTh_lml0-N5c',
	authDomain: 'flashtastic-6697b.firebaseio.com/',
	databaseURL: 'https://flashtastic-6697b.firebaseio.com/',
	storageBucket: 'flashtastic-6697b.appspot.com',
	messagingSenderId: '900974961236'
}
const fire = firebase.initializeApp(config)
export default fire
