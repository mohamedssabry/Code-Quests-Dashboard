import { useState } from "react";
import { toast } from "react-hot-toast";
import { Table } from "../../../shared/components/molecules";
import {
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} from "../../../../app/api/apiSlice";
import DeleteConfirmModal from "../DeleteModal";
import UserFormModal from "../FormModal";
import { Loader2 } from "lucide-react";
import { Button } from "../../../shared/components/atoms";

export default function UsersTable() {
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [name, setName] = useState("");

  const pageSize = 5;

  const {
    data: users = [],
    isLoading,
    isError,
    refetch,
  } = useGetUsersQuery({ page, limit: pageSize, name });

  const [createUser] = useCreateUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const [deleteUser] = useDeleteUserMutation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <Loader2 className="w-10 h-10 animate-spin text-blue-500" />
      </div>
    );
  }

  const columns = ["ID", "Name", "Email", "Company", "Actions"];

  type User = {
    id: number;
    name: string;
    email: string;
    company: string;
  };

  const handleDelete = async () => {
    if (!userToDelete) return;
    try {
      setIsDeleting(true);
      await deleteUser(userToDelete.id).unwrap();
      toast.success("User deleted successfully");
      refetch();
      setDeleteModalOpen(false);
    } catch {
      toast.error("Failed to delete user");
    } finally {
      setIsDeleting(false);
    }
  };

  const data =
    users.length > 0
      ? users.map((u: User) => ({
          id: u.id,
          name: u.name,
          email: u.email,
          company: u.company,
          actions: (
            <div className="flex gap-2">
              <Button
                variant="secondary"
                onClick={() => {
                  setEditingUser(u);
                  setModalOpen(true);
                }}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                onClick={() => {
                  setUserToDelete(u);
                  setDeleteModalOpen(true);
                }}
              >
                Delete
              </Button>
            </div>
          ),
        }))
      : [
          {
            id: "-",
            name: "No users found",
            email: "-",
            company: "-",
            actions: "-",
          },
        ];

  return (
    <div className="p-6 bg-white shadow rounded-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Users</h2>
        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Search by name..."
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setPage(1);
            }}
            className="border rounded px-3 py-1"
          />
          <Button
            variant="primary"
            onClick={() => {
              setEditingUser(null);
              setModalOpen(true);
            }}
          >
            Create User
          </Button>
        </div>
      </div>

      {isError && (
        <p className="text-red-500 text-center mb-4">
          No users found. 
        </p>
      )}

      <Table columns={columns} data={data} />

      <div className="flex justify-between items-center mt-4">
        <Button
          variant="secondary"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </Button>
        <span>Page {page}</span>
        <Button
          variant="secondary"
          disabled={users.length < pageSize}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </Button>
      </div>

      <UserFormModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        title={editingUser ? "Edit User" : "Create User"}
        submitText={editingUser ? "Update" : "Create"}
        initialValues={{
          name: editingUser?.name || "",
          email: editingUser?.email || "",
          company: editingUser?.company || "",
        }}
        onSubmit={async (values) => {
          if (editingUser) {
            await updateUser({ id: editingUser.id, ...values });
            toast.success("User updated");
          } else {
            await createUser(values);
            toast.success("User created");
          }
          setModalOpen(false);
          refetch();
        }}
      />

      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        onConfirm={handleDelete}
        loading={isDeleting}
      />
    </div>
  );
}
