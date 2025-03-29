"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createUsersColumns } from "@/components/usersTab/users-columns";
import { UsersTable } from "@/components/usersTab/users-table";

import { getUsersProfiles, updateUserData } from "@/app/actions";
import { UserProfile } from "@/app/actions";
import MyForm from "./user-form";

export default function UsersTab() {
  const [usersData, setUsersData] = useState<UserProfile[]>([]);
  const [user, setUser] = useState<UserProfile>();
  const [isUsersDialogOpen, setIsUserDialogOpen] = useState(false);
  const userColumns = createUsersColumns();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getUsersProfiles();
      if (error) {
        throw new Error("Error fetching data: " + error.message);
      } else if (data) {
        setUsersData(data);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (updatedUser: UserProfile) => {
    try {
      const updatedData = (await updateUserData(updatedUser)) as UserProfile[];
      if (updatedData) {
        setUsersData(
          usersData.map((record) =>
            record.id === updatedUser.id ? updatedData[0] : record
          )
        );
      }
      setIsUserDialogOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  const handleEdit = (record: UserProfile) => {
    setUser(record);
    setIsUserDialogOpen(true);
  };

  const handleVerifyClick = (record: UserProfile) => {
    setUser(record);
    setIsUserDialogOpen(true);
  };

  return (
    <div className="w-full">
      <div className="font-semibold text-2xl py-5">Users of the System</div>
      <Dialog open={isUsersDialogOpen} onOpenChange={setIsUserDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">User Info</DialogTitle>
          </DialogHeader>
          <MyForm onSubmit={handleUpdate} initialData={user} />
        </DialogContent>
      </Dialog>
      <UsersTable
        columns={userColumns}
        data={usersData}
        onEdit={handleEdit}
        onClick={handleVerifyClick}
      />
    </div>
  );
}
