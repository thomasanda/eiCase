import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { PropertiesTable } from "./properties-table";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  useGetPropertiesQuery,
  useCreatePropertyMutation,
  useUpdatePropertyMutation,
} from "@/services/properties";
import { useGetPortfoliosQuery } from "@/services/portfolio";
import type { TProperty } from "../../services/types";
import { useNavigate } from "react-router-dom";

const Properties = () => {
  const { id } = useParams();
  const [address, setAddress] = useState<string>();
  const [estimatedValue, setEstimatedValue] = useState<number>();
  const [constructionYear, setConstructionYear] = useState<number>();
  const [squareFootage, setSquareFootage] = useState<number>();
  const [portfolioId, setPortfolioId] = useState<number>();
  const [open, setOpen] = useState<boolean>();
  const [property, setProperty] = useState<TProperty | null>();
  const [createProperty] = useCreatePropertyMutation();
  const { data: portfolio } = useGetPortfoliosQuery();
  const { data } = useGetPropertiesQuery(Number(id));
  const [updateProperty] = useUpdatePropertyMutation();
  const navigate = useNavigate();

  const addProperty = () => {
    property
      ? updateProperty({
          id: property?.id,
          address,
          estimated_value: estimatedValue,
          construction_year: constructionYear,
          square_footage: squareFootage,
          portfolio: portfolioId,
        })
      : createProperty({
          address,
          estimated_value: estimatedValue,
          construction_year: constructionYear,
          square_footage: squareFootage,
          portfolio: portfolioId,
        });
    setAddress("");
    setEstimatedValue(0);
    setConstructionYear(0);
    setSquareFootage(0);
    setPortfolioId(0);
    setProperty(null);
    setOpen(false);
  };

  useEffect(() => {
    if (property) {
      setAddress(property.address);
      setEstimatedValue(property.estimated_value);
      setConstructionYear(property.construction_year);
      setSquareFootage(property.square_footage);
      setPortfolioId(property.portfolio);
    } else {
      setAddress("");
      setEstimatedValue(0);
      setConstructionYear(0);
      setSquareFootage(0);
      setPortfolioId(0);
    }
  }, [property]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader>
          <CardTitle>Properties</CardTitle>
          <CardDescription>Overview of your properties.</CardDescription>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add Properties</Button>
            </DialogTrigger>
            <Button onClick={() => navigate("/")}>Back To Portfolios</Button>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {property ? "Update Properties" : "Add Properties"}
                </DialogTitle>
                <DialogDescription>
                  {property ? "Update Existing Property" : "Add New Property"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="address" className="text-right">
                    Address
                  </Label>
                  <Input
                    id="address"
                    className="col-span-3"
                    onChange={(ev) => setAddress(ev.target.value)}
                    value={address}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="estimatedValue" className="text-right">
                    Estimated Value
                  </Label>
                  <Input
                    id="estimatedValue"
                    className="col-span-3"
                    onChange={(ev) => setEstimatedValue(+ev.target.value)}
                    type="number"
                    value={estimatedValue}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="constructionYear" className="text-right">
                    Construction Year
                  </Label>
                  <Input
                    id="constructionYear"
                    className="col-span-3"
                    onChange={(ev) => setConstructionYear(+ev.target.value)}
                    type="number"
                    value={constructionYear}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="squareFootage" className="text-right">
                    Square Footage
                  </Label>
                  <Input
                    id="squareFootage"
                    className="col-span-3"
                    onChange={(ev) => setSquareFootage(+ev.target.value)}
                    type="number"
                    value={squareFootage}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="portfolio" className="text-right">
                    Portfolio
                  </Label>
                  <Select onValueChange={(ev) => setPortfolioId(+ev)}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select a Portfolio" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Portfolios</SelectLabel>
                        {portfolio?.map((item) => (
                          <SelectItem value={String(item.id)}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addProperty}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <PropertiesTable
            data={data}
            setOpen={setOpen}
            setProperty={setProperty}
          />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{data?.length}</strong> of{" "}
            <strong>{data?.length}</strong> properties
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export { Properties };
