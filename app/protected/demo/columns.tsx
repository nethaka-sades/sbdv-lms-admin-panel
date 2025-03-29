"use client"

import { ColumnDef } from "@tanstack/react-table"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
  id: string
  full_name: string
  verified: true | false
  admin_no: string
}

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "verified",
    header: "Verified",
  },
  {
    accessorKey: "full_name",
    header: "Full Name",
  },
  {
    accessorKey: "admin_no",
    header: "Admin No",
  },
]
