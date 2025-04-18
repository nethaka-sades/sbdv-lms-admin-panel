"use client";

import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { createNColumns } from "@/components/nTab/n-columns";
import { NTable } from "@/components/nTab/n-table";

import { updateDRData } from "@/app/actions";
import { UserProfile } from "@/app/actions";
import MyForm from "./n-form";

export default function NTab() {
  const [nsData, setNsData] = useState<UserProfile[]>([]);
  const [user, setUser] = useState<UserProfile>();
  const [isDeletionDialogOpen, setIsDeletionDialogOpen] = useState(false);
  const nColumns = createNColumns();

  // Fetch data on component mount
  {/*
  useEffect(() => {
    const fetchData = async () => {
      const { data, error } = await getNotices();
      if (error) {
        throw new Error("Error fetching data: " + error.message);
      } else if (data) {
        setNsData(data);
      }
    };

    fetchData();
  }, []);
  */}

  const handleUpdate = async (updatedUser: UserProfile) => {
    try {
      const updatedData = (await updateDRData(updatedUser)) as UserProfile[];
      if (updatedData) {
        setNsData(
          nsData.map((record) =>
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
      <NTable
        columns={nColumns}
        data={nsData}
        onEdit={handleEdit}
        onClick={handleDRClick}
      />
    </div>
  );
}
