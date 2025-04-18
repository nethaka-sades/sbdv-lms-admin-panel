"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UserProfile } from "@/app/actions";
  

  interface ColumnActions {
    onEdit?: (data: UserProfile) => void;
    onDelete?: (id: string) => void;
  }

  export const createNColumns = (): ColumnDef<UserProfile>[] => {
    const columns: ColumnDef<UserProfile>[] = [
      {
        accessorKey: "full_name",
        header: "Full Name",
      },
      {
        accessorKey: "email",
        header: "Email",
      },
      {
        accessorKey: "admin_no",
        header: "Admin No",
      },
      {
        accessorKey: "admin_year",
        header: "Admin Year",
      },
      {
        accessorKey: "created_at",
        header: "Created At",
      }
    ];

    return columns;
  };