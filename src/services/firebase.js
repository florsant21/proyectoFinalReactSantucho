import { collection, getDocs, query, where, doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/config";

export const fetchProducts = async () => {
  const snapshot = await getDocs(collection(db, "item"));
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return items;
};

export const fetchProductsByCategory = async (category) => {
  const q = query(collection(db, "item"), where("category", "==", category));
  const snapshot = await getDocs(q);
  const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  return items;
};

export const fetchProductById = async (id) => {
  const docRef = doc(db, "item", id);
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return { id: docSnap.id, ...docSnap.data() };
  }
  throw new Error("Producto no encontrado");
};
