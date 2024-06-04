import { useState, useEffect } from "react";
import { PortfolioTable } from "./portfolio-table";
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
  useGetPortfoliosQuery,
  useCreatePortfolioMutation,
  useUpdatePortfolioMutation,
} from "../../services/portfolio";
import type { TPortfolio } from "../../services/types";

const Portfolio = () => {
  const [name, setName] = useState<string>();
  const [owner, setOwner] = useState<string>();
  const [region, setRegion] = useState<string>();
  const [open, setOpen] = useState<boolean>();
  const [portfolio, setPortfolio] = useState<TPortfolio | null>();
  const [createPortfolio] = useCreatePortfolioMutation();

  const [updatePortfolio] = useUpdatePortfolioMutation();

  const addPortfolio = () => {
    portfolio
      ? updatePortfolio({
          name,
          geographic_region: region,
          owner,
          id: portfolio.id,
        })
      : createPortfolio({
          name,
          geographic_region: region,
          owner,
        });
    setName("");
    setOwner("");
    setRegion("");
    setPortfolio(null);
    setOpen(false);
  };
  const { data } = useGetPortfoliosQuery();

  useEffect(() => {
    if (portfolio) {
      setName(portfolio.name);
      setOwner(portfolio.owner);
      setRegion(portfolio.geographic_region);
    } else {
      setName("");
      setOwner("");
      setRegion("");
    }
  }, [portfolio]);

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <Card>
        <CardHeader>
          <CardTitle>Portfolio</CardTitle>
          <CardDescription>
            Manage your portfolio and view their properties.
          </CardDescription>
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="outline">Add Portfolio</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>
                  {portfolio ? "Update Portfolio" : "Add portfolio"}
                </DialogTitle>
                <DialogDescription>
                  {portfolio
                    ? "Update Existing Portfolio"
                    : "Add New Portfolio"}
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="name" className="text-right">
                    Name
                  </Label>
                  <Input
                    id="name"
                    className="col-span-3"
                    onChange={(ev) => setName(ev.target.value)}
                    value={name}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Owner
                  </Label>
                  <Input
                    id="owner"
                    className="col-span-3"
                    onChange={(ev) => setOwner(ev.target.value)}
                    value={owner}
                  />
                </div>
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="username" className="text-right">
                    Region
                  </Label>
                  <Input
                    id="geographic_region"
                    className="col-span-3"
                    onChange={(ev) => setRegion(ev.target.value)}
                    value={region}
                  />
                </div>
              </div>
              <DialogFooter>
                <Button type="submit" onClick={addPortfolio}>
                  Save changes
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </CardHeader>
        <CardContent>
          <PortfolioTable
            data={data}
            setOpen={setOpen}
            setPortfolio={setPortfolio}
          />
        </CardContent>
        <CardFooter>
          <div className="text-xs text-muted-foreground">
            Showing <strong>{data?.length}</strong> of{" "}
            <strong>{data?.length}</strong> portfolios
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export { Portfolio };
