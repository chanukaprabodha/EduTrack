import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendPasswordResetEmail } from "firebase/auth"
import { auth} from '@/firebase'

export const login = (email: string, password: string) => {
    return signInWithEmailAndPassword(auth, email, password)
}

export const logout = () => {
    return signOut(auth)
}

export const register = (email: string, password: string) => {
    return createUserWithEmailAndPassword(auth,email,password)
}

export const resetPassword = async (email: string) => { 
    try {
        await sendPasswordResetEmail(auth, email)
        return true
    } catch (error: any) {
        throw new Error("Can't reset your password. Error is :" + error.message);
        
    }
}