// app/utils/firebaseUpload.ts
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../firebase/config";

export const uploadFileToFirebase = async (file: File, folder: string) => {
    const fileRef = ref(storage, `${folder}/${file.name}`);
    const snapshot = await uploadBytes(fileRef, file);
    const url = await getDownloadURL(snapshot.ref);
    return url;
};