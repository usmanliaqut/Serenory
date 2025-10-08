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
import { Video } from "lucide-react";
import Link from "next/link";

export const revalidate = 30; // ISR refresh every 30s

export default async function BookingsPage({
  searchParams,
}: {
  searchParams?: { page?: string };
}) {
  const page = Number(searchParams?.page) || 1;
  const { bookings, pagination } = await getBookings({ page, limit: 10 });

  return (
    <div className="p-8 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Bookings</h1>
        <p className="text-muted-foreground">
          Manage and review all client session bookings
        </p>
      </div>

      {/* Bookings Table */}
      <Card className="shadow-sm border-border/50">
        <CardHeader>
          <CardTitle>All Bookings</CardTitle>
        </CardHeader>
        <CardContent>
          {bookings.length === 0 ? (
            <div className="py-10 text-center text-muted-foreground">
              No bookings found.
            </div>
          ) : (
            <div className="overflow-x-auto rounded-md border">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Client</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Mood</TableHead>
                    <TableHead>Time</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {bookings.map((b) => (
                    <TableRow key={b.id}>
                      <TableCell className="font-medium">
                        {b.user?.name || "Anonymous"}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {b.user?.email}
                      </TableCell>
                      <TableCell>{b.type}</TableCell>
                      <TableCell>{b.mood}</TableCell>
                      <TableCell>
                        {new Date(b.time).toLocaleString("en-US", {
                          weekday: "short",
                          month: "short",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            b.status === "completed"
                              ? "default"
                              : b.status === "in_progress"
                              ? "secondary"
                              : "outline"
                          }
                        >
                          {b.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        {b.meetingLink && (
                          <Button
                            asChild
                            size="sm"
                            variant="outline"
                            className="gap-2"
                          >
                            <a
                              href={b.meetingLink}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <Video className="w-4 h-4" />
                              Join
                            </a>
                          </Button>
                        )}
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
      <div className="flex justify-between items-center pt-4 text-sm text-muted-foreground">
        <span>
          Page {pagination.page} of {pagination.totalPages}
        </span>
        <div className="flex gap-2">
          {pagination.page > 1 && (
            <Button asChild size="sm" variant="outline">
              <Link href={`?page=${pagination.page - 1}`}>Previous</Link>
            </Button>
          )}
          {pagination.page < pagination.totalPages && (
            <Button asChild size="sm" variant="outline">
              <Link href={`?page=${pagination.page + 1}`}>Next</Link>
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
