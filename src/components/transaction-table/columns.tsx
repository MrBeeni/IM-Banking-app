"use client";

import { transactionCategoryStyles } from "@/constants";
import {
  cn,
  formatAmount,
  formatDateTime,
  getTransactionStatus,
  removeSpecialCharacters,
} from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
export const transactionTableColumns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "name",
    header: "Transaction",
    cell: ({ row }) => (
      <div className="flex items-center gap-3">
        <h1 className="text-14 truncate font-semibold text-[#344054]">
          {removeSpecialCharacters(row.getValue("name"))}
        </h1>
      </div>
    ),
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount = formatAmount(row.getValue("amount"));

      const isDebit = row.original.type === "debit";
      const isCredit = row.original.type === "credit";
      return (
        <div
          className={`pl-2 pr-10 font-semibold ${
            isDebit || amount[0] === "-" ? "text-[#f04438]" : "text-[#039855]"
          }`}
        >
          {isDebit ? `-${amount}` : isCredit ? amount : amount}
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Status",
    cell: ({ row }) => {
      const status = getTransactionStatus(new Date(row.getValue("date")));
      return (
        <div className="pl-2 pr-10">
          <CategoryBadge category={status} />
        </div>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => (
      <div className="min-w-32 pl-2 pr-10">
        {formatDateTime(new Date(row.getValue("date"))).dateTime}
      </div>
    ),
  },
  {
    accessorKey: "paymentChannel",
    header: "Channel",
    cell: ({ row }) => (
      <div className="pl-2 pr-10 capitalize min-w-24">
        {row.getValue("paymentChannel")}
      </div>
    ),
  },
  {
    accessorKey: "category",
    header: "Category",
    cell: ({ row }) => (
      <div className="pl-2 pr-10 max-md:hidden">
        <CategoryBadge category={row.getValue("category")} />
      </div>
    ),
  },
];

const CategoryBadge = ({ category }: CategoryBadgeProps) => {
  const { borderColor, backgroundColor, textColor, chipBackgroundColor } =
    transactionCategoryStyles[
      category as keyof typeof transactionCategoryStyles
    ] || transactionCategoryStyles.default;

  return (
    <div className={cn("category-badge", borderColor, chipBackgroundColor)}>
      <div className={cn("size-2 rounded-full", backgroundColor)} />
      <p className={cn("text-[12px] font-medium", textColor)}>{category}</p>
    </div>
  );
};
