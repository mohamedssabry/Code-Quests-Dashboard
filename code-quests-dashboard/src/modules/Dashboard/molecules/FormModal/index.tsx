import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Modal } from "../../../shared/components/molecules";
import { Button } from "../../../shared/components/atoms";

interface UserFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialValues: { name: string; email: string; company: string };
  onSubmit: (values: {
    name: string;
    email: string;
    company: string;
  }) => Promise<void>;
  title: string;
  submitText: string;
}

export default function UserFormModal({
  isOpen,
  onClose,
  initialValues,
  onSubmit,
  title,
  submitText,
}: UserFormModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.object({
          name: Yup.string().required("Name is required"),
          email: Yup.string()
            .email("Invalid email")
            .required("Email is required"),
          company: Yup.string().required("Company is required"),
        })}
        onSubmit={async (values, { resetForm }) => {
          await onSubmit({
            ...values,
            company: values.company,
          });
          resetForm();
          onClose();
        }}
      >
        {({ isSubmitting }) => (
          <Form className="space-y-4">
            <div>
              <label className="block text-sm">Name</label>
              <Field name="name" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="name"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm">Email</label>
              <Field
                name="email"
                type="email"
                className="border p-2 rounded w-full"
              />
              <ErrorMessage
                name="email"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <div>
              <label className="block text-sm">Company</label>
              <Field name="company" className="border p-2 rounded w-full" />
              <ErrorMessage
                name="company"
                component="div"
                className="text-red-500 text-sm"
              />
            </div>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitText}
            </Button>
          </Form>
        )}
      </Formik>
    </Modal>
  );
}
