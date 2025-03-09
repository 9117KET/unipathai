import {
  collection,
  doc,
  addDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  onSnapshot,
  Timestamp,
  serverTimestamp,
} from "firebase/firestore";
import { firestore } from "./firebase-config";

/**
 * Create a document in a collection
 * @param collectionName - Name of the collection
 * @param data - Document data
 * @returns Created document ID
 */
export async function createDocument(
  collectionName: string,
  data: any
): Promise<string> {
  try {
    const docRef = await addDoc(collection(firestore, collectionName), {
      ...data,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  } catch (error) {
    console.error(`Error creating document in ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Get a document by ID
 * @param collectionName - Name of the collection
 * @param documentId - Document ID
 * @returns Document data
 */
export async function getDocument(
  collectionName: string,
  documentId: string
): Promise<any> {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() };
    } else {
      return null;
    }
  } catch (error) {
    console.error(
      `Error getting document ${documentId} from ${collectionName}:`,
      error
    );
    throw error;
  }
}

/**
 * Update a document
 * @param collectionName - Name of the collection
 * @param documentId - Document ID
 * @param data - Updated data
 */
export async function updateDocument(
  collectionName: string,
  documentId: string,
  data: any
): Promise<void> {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await updateDoc(docRef, {
      ...data,
      updatedAt: serverTimestamp(),
    });
  } catch (error) {
    console.error(
      `Error updating document ${documentId} in ${collectionName}:`,
      error
    );
    throw error;
  }
}

/**
 * Delete a document
 * @param collectionName - Name of the collection
 * @param documentId - Document ID
 */
export async function deleteDocument(
  collectionName: string,
  documentId: string
): Promise<void> {
  try {
    const docRef = doc(firestore, collectionName, documentId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error(
      `Error deleting document ${documentId} from ${collectionName}:`,
      error
    );
    throw error;
  }
}

/**
 * Query documents from a collection
 * @param collectionName - Name of the collection
 * @param conditions - Array of query conditions [field, operator, value]
 * @param sortField - Field to sort by (optional)
 * @param sortDirection - Sort direction (optional)
 * @param limitCount - Limit the number of returned documents (optional)
 * @returns Array of documents
 */
export async function queryDocuments(
  collectionName: string,
  conditions: [string, string, any][],
  sortField?: string,
  sortDirection?: "asc" | "desc",
  limitCount?: number
): Promise<any[]> {
  try {
    let q = collection(firestore, collectionName);

    // Apply query conditions
    if (conditions.length > 0) {
      const queryConstraints = conditions.map(([field, operator, value]) =>
        where(field, operator as any, value)
      );
      q = query(q, ...queryConstraints);
    }

    // Apply sorting
    if (sortField) {
      q = query(q, orderBy(sortField, sortDirection || "asc"));
    }

    // Apply limit
    if (limitCount) {
      q = query(q, limit(limitCount));
    }

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
  } catch (error) {
    console.error(`Error querying documents from ${collectionName}:`, error);
    throw error;
  }
}

/**
 * Subscribe to realtime updates on a document
 * @param collectionName - Name of the collection
 * @param documentId - Document ID
 * @param callback - Callback function to handle updates
 * @returns Unsubscribe function
 */
export function subscribeToDocument(
  collectionName: string,
  documentId: string,
  callback: (data: any) => void
): () => void {
  const docRef = doc(firestore, collectionName, documentId);
  return onSnapshot(
    docRef,
    (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() });
      } else {
        callback(null);
      }
    },
    (error) => {
      console.error(
        `Error subscribing to document ${documentId} in ${collectionName}:`,
        error
      );
    }
  );
}

/**
 * Subscribe to realtime updates on a query
 * @param collectionName - Name of the collection
 * @param conditions - Array of query conditions [field, operator, value]
 * @param callback - Callback function to handle updates
 * @param sortField - Field to sort by (optional)
 * @param sortDirection - Sort direction (optional)
 * @param limitCount - Limit the number of returned documents (optional)
 * @returns Unsubscribe function
 */
export function subscribeToQuery(
  collectionName: string,
  conditions: [string, string, any][],
  callback: (data: any[]) => void,
  sortField?: string,
  sortDirection?: "asc" | "desc",
  limitCount?: number
): () => void {
  let q = collection(firestore, collectionName);

  // Apply query conditions
  if (conditions.length > 0) {
    const queryConstraints = conditions.map(([field, operator, value]) =>
      where(field, operator as any, value)
    );
    q = query(q, ...queryConstraints);
  }

  // Apply sorting
  if (sortField) {
    q = query(q, orderBy(sortField, sortDirection || "asc"));
  }

  // Apply limit
  if (limitCount) {
    q = query(q, limit(limitCount));
  }

  return onSnapshot(
    q,
    (querySnapshot) => {
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      callback(documents);
    },
    (error) => {
      console.error(`Error subscribing to query in ${collectionName}:`, error);
    }
  );
}

// Helper function to convert Firestore Timestamp to Date
export function timestampToDate(timestamp: Timestamp): Date {
  return timestamp.toDate();
}
