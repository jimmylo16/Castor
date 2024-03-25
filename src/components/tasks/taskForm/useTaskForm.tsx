import { doc, getDoc } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { db } from "../../../../firebase";

export type FormValues = {
  title: string;
  description: string;
  status: string;
};
export const useTaskForm = (taskId: string | undefined) => {
  const [formValues, setFormValues] = useState<FormValues>({
    title: "",
    description: "",
    status: "",
  });

  const fetchTask = useCallback(async () => {
    if (!taskId) {
      return;
    }
    const docRef = doc(db, "tasks", taskId);
    const docSnap = await getDoc(docRef);
    const docData = docSnap.data();
    if (docData) {
      setFormValues({
        title: docData.title,
        description: docData.description,
        status: docData.status,
      });
    }
  }, [taskId]);

  useEffect(() => {
    fetchTask();
  }, [fetchTask]);

  const onFormInputChange = (
    formInputName: keyof FormValues,
    value: string
  ) => {
    setFormValues((prev) => ({ ...prev, [formInputName]: value }));
  };

  return { formValues, onFormInputChange };
};
