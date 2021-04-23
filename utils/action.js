import { firebaseApp } from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helpers'

const db = firebase.firestore(firebaseApp)

export const isUserLogged = () => {          //this is for know if user is logged
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
        user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}

export const registerUser = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().createUserWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Este correo ya ha sido registrado."
    }
    return result
}

export const closeSession = () => {
    return firebase.auth().signOut()
}

export const LoginWithEmailAndPassword = async(email, password) => {
    const result = { statusResponse: true, error: null}
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password)
    } catch (error) {
        result.statusResponse = false
        result.error = "Usuario o contraseña invalidos"
    }
    return result
}

export const uploadImage = async(image, path, name) => {
    const result = { statusResponse: false, error: null, url: null }

    const ref = firebase.storage().ref(path).child(name)

    const blob = await fileToBlob(image)

    try {
        await ref.put(blob)

        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL()
        result.statusResponse = true
        result.url = url
    } catch (error) {
        result.error = error
    }

    return result
}

export const updateProfile = async(data) => {
    const result = { statusResponse: true, error: null }

    try {
        await firebase.auth().currentUser.updateProfile(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result

}

export const reauthenticate = async(password) => {
    const result = { statusResponse: true, error: null }

    const user = getCurrentUser()
    const credential = firebase.auth.EmailAuthProvider.credential(user.email, password)

    try {
        await user.reauthenticateWithCredential(credential)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result

}

export const updateEmail = async(email) => {
    const result = { statusResponse: true, error: null }
    
    try {
        await firebase.auth().currentUser.updateEmail(email)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result

}

export const updatePassword = async(password) => {
    const result = { statusResponse: true, error: null }
    
    try {
        await firebase.auth().currentUser.updatePassword(password)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result

}

export const addDocumentWithoutId = async(collection, data) => {
    const result = { statusResponse: true, error: null }
    
    try {
        await db.collection(collection).add(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }

    return result

}

export const searchParkings = async (criteria) => {
  const result = { statusResponse: true, error: null, parkings: [] };
  
  try {
    result.parkings = await fireSQL.query(
      `SELECT * FROM parkingLots WHERE name LIKE '${criteria}%'`
    );
  } catch (error) {
    result.statusResponse = false;
    result.error = error;
  }
  return result;
};
 
export const getRealState = async(limitRealState) => {  //this there are change for the collection
    const result = { statusResponse: true, error: null, realStates: [], startRealState: null }
    try {
        const response = await db
            .collection("apartaments")
            .orderBy("createAt", "desc")
            .limit(limitRealState)
            .get()
        if (response.docs.length > 0) {
            result.startRealState = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const realState = doc.data()
            realState.id = doc.id
            result.realStates.push(realState)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result

}


export const getMoreRealState = async(limitRealState, startParking) => {  //this there are change for the collection
    const result = { statusResponse: true, error: null, realStates: [], startRealState: null }
    try {
        const response = await db
            .collection("apartaments")
            .orderBy("createAt", "desc")
            .startAfter(startParking.data().createAt)
            .limit(limitRealState)
            .get()
        if (response.docs.length > 0) {
            result.startRealState = response.docs[response.docs.length - 1]
        }
        response.forEach((doc) => {
            const realState = doc.data()
            realState.id = doc.id
            result.realStates.push(realState)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result

}

export const getDocumentById = async(collection, id) => {
    const result = { statusResponse: true, error: null, document: null }
    try {
        const response = await db.collection(collection).doc(id).get()
        result.document = response.data()
        result.document.id = response.id
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result  

}


export const updateDocument = async(collection, id, data) => {
    const result = { statusResponse: true, error: null }
    try {
        await db.collection(collection).doc(id).update(data)
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result     
}

export const getRealStateReviews = async(id) => {
    const result = { statusResponse: true, error: null, reviews: [] }
    try {
        const response = await db
            .collection("reviews")
            .where("id", "==", id)
            .get()
        response.forEach((doc) => {
            const review = doc.data()
            review.id = doc.id
            result.reviews.push(review)
        })
    } catch (error) {
        result.statusResponse = false
        result.error = error
    }
    return result
}

