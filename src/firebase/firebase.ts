import app from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./config";

class Firebase {
  auth: any;

  constructor() {
    app.initializeApp(firebaseConfig);
    this.auth = app.auth();
  }

  async register(name: string, email: string, password: string) {
    const newUser = await this.auth.createUserWithEmailAndPassword(
      email,
      password
    );
    return await newUser.user.updateProfile({
      displayName: name
    });
  }

  async login(email: string, password: string) {
    return await this.auth.signInWithEmailAndPassword(email, password);
  }
}

const firebase = new Firebase();

export default firebase;
