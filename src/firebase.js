import firebase from 'firebase'
import { ref, onUnmounted } from 'vue'

const config = {
  apiKey: "AIzaSyAceOAlz6QbDWvrpfNQBBsMrd_HQEq13pA",
  authDomain: "firebasics-89a63.firebaseapp.com",
  projectId: "firebasics-89a63",
  storageBucket: "firebasics-89a63.appspot.com",
  messagingSenderId: "789800109540",
  appId: "1:789800109540:web:6b074b35a24e18b20d73f1",
  measurementId: "G-TXQRDP8NZX"
}

const firebaseApp = firebase.initializeApp(config)

const db = firebaseApp.firestore()
const usersCollection = db.collection('users')

export const createUser = user => {
  return usersCollection.add(user)
}

export const getUser = async id => {
  const user = await usersCollection.doc(id).get()
  return user.exists ? user.data() : null
}

export const updateUser = (id, user) => {
  return usersCollection.doc(id).update(user)
}

export const deleteUser = id => {
  return usersCollection.doc(id).delete()
}

export const useLoadUsers = () => {
  const users = ref([])
  const close = usersCollection.onSnapshot(snapshot => {
    users.value = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  })
  onUnmounted(close)
  return users
}
