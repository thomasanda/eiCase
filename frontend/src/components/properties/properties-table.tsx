import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useDeletePropertyMutation } from "@/services/properties";

const PropertiesTable = ({ data, setOpen, setProperty }) => {
  const [deleteProperty] = useDeletePropertyMutation();
  const deleteItem = (item) => {
    deleteProperty(item.id);
  };
  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Address</TableHead>
            <TableHead>Estimated Value</TableHead>
            <TableHead>Construction Year</TableHead>
            <TableHead>Square Footage</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.address}</TableCell>
              <TableCell>
                {new Intl.NumberFormat("nb-NO", {
                  style: "currency",
                  currency: "NOK",
                }).format(item.estimated_value)}
              </TableCell>
              <TableCell>{item.construction_year}</TableCell>
              <TableCell>{item.square_footage}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                      onClick={() => {
                        setOpen(true);
                        setProperty(item);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => deleteItem(item)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export { PropertiesTable };
