import { app } from "@/app/firebase/config";
import { getDownloadURL, getStorage, ref, uploadBytes } from "firebase/storage";

const storage = getStorage(app);

const uploadFileToFirebase = async (file: File) => {
    const storageRef = ref(storage, `uploads/${Date.now()}-${file.name}`);
    await uploadBytes(storageRef, file);
    const downloadURL = await getDownloadURL(storageRef);
    return downloadURL;
};

export default uploadFileToFirebase;
