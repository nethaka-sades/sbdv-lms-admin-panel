"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createVerifyColumns } from "@/components/verifyUsersTab/verify-columns";
import { VerifyTable } from "@/components/verifyUsersTab/verify-table";

import { getVerifiedProfiles, updateVerifyUserData } from "@/app/actions";
import { UserProfile } from "@/app/actions";
import MyForm from "./verify-form";

export default function VerifyingUsersTab() {
  const [verifyUsersData, setverifyUsersData] = useState<UserProfile[]>([]);
  const [verifyingUser, setVerifyingUser] = useState<UserProfile>();
  const [isVerifyingDialogOpen, setIsVerifyingDialogOpen] = useState(false);
  const verifyColumns = createVerifyColumns();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getVerifiedProfiles();
      if (error) {
        throw new Error("Error fetching data: " + error.message);
      } else if (data) {
        setverifyUsersData(data);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (updatedUser: UserProfile) => {
    try {
      const updatedData = (await updateVerifyUserData(updatedUser)) as UserProfile[];
      if (updatedData) {
        setverifyUsersData(
          verifyUsersData.map((record) =>
            record.id === updatedUser.id ? updatedData[0] : record
          )
        );
      }
      setIsVerifyingDialogOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  const handleEdit = (record: UserProfile) => {
    setVerifyingUser(record);
    setIsVerifyingDialogOpen(true);
  };

  const handleVerifyClick = (record: UserProfile) => {
    setVerifyingUser(record);
    setIsVerifyingDialogOpen(true);
  };

  return (
    <div className="w-full">
      <div className="font-semibold text-2xl py-5">These Users awaits Verification</div>
      <Dialog open={isVerifyingDialogOpen} onOpenChange={setIsVerifyingDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Verify This User</DialogTitle>
          </DialogHeader>
          <MyForm onSubmit={handleUpdate} initialData={verifyingUser} />
        </DialogContent>
      </Dialog>
      <VerifyTable
        columns={verifyColumns}
        data={verifyUsersData}
        onEdit={handleEdit}
        onClick={handleVerifyClick}
      />
    </div>
  );
}
