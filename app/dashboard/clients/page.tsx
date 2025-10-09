// app/dashboard/clients/page.tsx
import { prisma } from "@/lib/prisma";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Mail, Calendar, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const dynamic = "force-dynamic";

const PAGE_SIZE = 10;

export default async function ClientsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const [clients, totalCount] = await Promise.all([
    prisma.user.findMany({
      include: { bookings: true },
      orderBy: { createdAt: "desc" },
      skip: (page - 1) * PAGE_SIZE,
      take: PAGE_SIZE,
    }),
    prisma.user.count(),
  ]);

  const totalPages = Math.ceil(totalCount / PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white p-6 md:p-10">
      <div className=" mx-auto space-y-8">
        <header>
          <h2 className="text-2xl font-bold tracking-tight">All Clients</h2>
          <p className="text-muted-foreground">
            View and manage all users who have made bookings.
          </p>
        </header>

        <Card className="shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Client Details</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Client</TableHead>

                  <TableHead>Anonymous</TableHead>
                  <TableHead>Bookings</TableHead>
                  <TableHead>Last Booking</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clients.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className="text-center text-muted-foreground py-6"
                    >
                      No clients found
                    </TableCell>
                  </TableRow>
                ) : (
                  clients.map((client) => {
                    const latestBooking = client.bookings?.[0];
                    return (
                      <TableRow key={client.id}>
                        <TableCell className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          {client.name || "Anonymous User"}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          {client.email}
                        </TableCell>
                        <TableCell>
                          {client.anonymous ? (
                            <Badge
                              variant="secondary"
                              className="bg-gray-200 text-gray-700"
                            >
                              Yes
                            </Badge>
                          ) : (
                            <Badge
                              variant="outline"
                              className="text-green-700 border-green-300"
                            >
                              No
                            </Badge>
                          )}
                        </TableCell>
                        <TableCell>{client.bookings.length}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          {latestBooking ? (
                            <>
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              {new Date(
                                latestBooking.createdAt
                              ).toLocaleDateString()}
                            </>
                          ) : (
                            "—"
                          )}
                        </TableCell>
                      </TableRow>
                    );
                  })
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        {totalPages > 1 && (
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/dashboard/clients?page=${Math.max(page - 1, 1)}`}
                />
              </PaginationItem>

              {[...Array(totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                if (pageNumber > 3 && pageNumber < totalPages) {
                  return null;
                }
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/dashboard/clients?page=${pageNumber}`}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {totalPages > 3 && <PaginationEllipsis />}

              <PaginationItem>
                <PaginationNext
                  href={`/dashboard/clients?page=${Math.min(
                    page + 1,
                    totalPages
                  )}`}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        )}
      </div>
    </div>
  );
}
