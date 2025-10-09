import { getBookings } from "@/lib/queries/getBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarDays, Eye, Mail, RefreshCw, User, Video } from "lucide-react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export const revalidate = 30; // ISR refresh every 30s

export default async function BookingsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const { bookings, pagination } = await getBookings({ page, limit: 10 });

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50/30 to-white p-6 md:p-10">
      <div className=" mx-auto space-y-8">
        {/* Header */}
        <header>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            All Bookings
          </h1>
          <p className="text-muted-foreground">
            View and manage all session bookings made by clients
          </p>
        </header>
        {/* Booking Table */}
        <Card className="bg-white border border-border/50 shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-lg font-semibold">
              Booking Details
            </CardTitle>
            <form
              action="/dashboard/bookings"
              className="flex items-center gap-2"
            >
              <Button variant="outline" size="sm">
                <RefreshCw className="w-4 h-4 mr-1" /> Refresh
              </Button>
            </form>
          </CardHeader>
          <CardContent>
            {bookings.length === 0 ? (
              <p className="text-center text-muted-foreground py-8">
                No bookings found.
              </p>
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Client</TableHead>
                      <TableHead>Type</TableHead> <TableHead>Mood</TableHead>
                      <TableHead>Date & Time</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {bookings.map((b: any) => (
                      <TableRow key={b.id}>
                        <TableCell className="flex items-center gap-2">
                          <User className="w-4 h-4 text-muted-foreground" />
                          {b?.user.name || "Unknown"}
                        </TableCell>
                        <TableCell className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-muted-foreground" />
                          {b?.user.email || "-"}
                        </TableCell>
                        <TableCell>{b.type || "-"}</TableCell>
                        <TableCell>{b.mood || "-"}</TableCell>
                        <TableCell className="flex items-center gap-2">
                          <CalendarDays className="w-4 h-4 text-muted-foreground" />
                          {b.time
                            ? new Date(b.time).toLocaleString("en-US", {
                                weekday: "short",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })
                            : "-"}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              b.status === "confirmed"
                                ? "bg-green-600 text-white"
                                : b.status === "pending"
                                ? "bg-yellow-100 text-yellow-800"
                                : "bg-red-600 text-white"
                            }
                          >
                            {b.status || "pending"}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right space-x-2">
                          {b.status === "confirmed" && (
                            <Button
                              size="sm"
                              className="bg-emerald-600 hover:bg-emerald-700 text-white"
                              asChild
                            >
                              <a href={b.meetingLink || "#"} target="_blank">
                                <Video className="w-4 h-4 mr-1" /> Join
                              </a>
                            </Button>
                          )}
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-1" /> View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Pagination */}
        {pagination.totalPages > 1 && (
          <Pagination className="justify-end">
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href={`/dashboard/bookings?page=${Math.max(page - 1, 1)}`}
                />
              </PaginationItem>

              {[...Array(pagination.totalPages)].map((_, i) => {
                const pageNumber = i + 1;
                if (pageNumber > 3 && pageNumber < pagination.totalPages) {
                  return null;
                }
                return (
                  <PaginationItem key={pageNumber}>
                    <PaginationLink
                      href={`/dashboard/bookings?page=${pageNumber}`}
                      isActive={pageNumber === page}
                    >
                      {pageNumber}
                    </PaginationLink>
                  </PaginationItem>
                );
              })}

              {pagination.totalPages > 3 && <PaginationEllipsis />}

              <PaginationItem>
                <PaginationNext
                  href={`/dashboard/bookings?page=${Math.min(
                    page + 1,
                    pagination.totalPages
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
