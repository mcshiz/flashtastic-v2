import firebase from 'firebase'
let config = {
	apiKey: 'AIzaSyBbmz3LsifoGK4Zznz7r37KTh_lml0-N5c',
	authDomain: 'flashtastic-6697b.firebaseapp.com',
	databaseURL: 'https://flashtastic-6697b.firebaseio.com',
	projectId: 'flashtastic-6697b',
	storageBucket: 'flashtastic-6697b.appspot.com',
	messagingSenderId: '900974961236'
}
const fire = firebase.initializeApp(config)
export default fire
