"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createDRColumns } from "@/components/drTab/dr-columns";
import { DRTable } from "@/components/drTab/dr-table";

import { getDRProfiles, updateDRData } from "@/app/actions";
import { UserProfile } from "@/app/actions";
import MyForm from "./dr-form";

export default function DRTab() {
  const [drsData, setDRsData] = useState<UserProfile[]>([]);
  const [user, setUser] = useState<UserProfile>();
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState(false);
  const drColumns = createDRColumns();

  // Fetch data on component mount
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getDRProfiles();
      if (error) {
        throw new Error("Error fetching data: " + error.message);
      } else if (data) {
        setDRsData(data);
      }
    };

    fetchData();
  }, []);

  const handleUpdate = async (updatedUser: UserProfile) => {
    try {
      const updatedData = (await updateDRData(updatedUser)) as UserProfile[];
      if (updatedData) {
        setDRsData(
          drsData.map((record) =>
            record.id === updatedUser.id ? updatedData[0] : record
          )
        );
      }
      setIsDeletionDialogOpen(false);
    } catch (err) {
      console.error("Error updating profile:", err);
      throw err;
    }
  };

  const handleEdit = (record: UserProfile) => {
    setUser(record);
    setIsDeletionDialogOpen(true);
  };

  const handleDRClick = (record: UserProfile) => {
    setUser(record);
    setIsDeletionDialogOpen(true);
  };

  return (
    <div className="w-full">
      <div className="font-semibold text-2xl py-5">Deletion Requests by Users</div>
      <Dialog open={isDeletionDialogOpen} onOpenChange={setIsDeletionDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-2xl">Confirm the Deletion</DialogTitle>
          </DialogHeader>
          <MyForm onSubmit={handleUpdate} initialData={user} />
        </DialogContent>
      </Dialog>
      <DRTable
        columns={drColumns}
        data={drsData}
        onEdit={handleEdit}
        onClick={handleDRClick}
      />
    </div>
  );
}
