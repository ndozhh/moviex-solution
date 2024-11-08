import { Input } from "@/components/ui/input";
import { Popcorn } from "lucide-react";
import { Link, Outlet, useSearchParams } from "react-router-dom";
import { useDebouncedCallback } from "use-debounce";

export function Layout() {
  const [searchParams, setSearchParams] = useSearchParams();
  const debounced = useDebouncedCallback((value) => {
    setSearchParams((previousParams) => {
      if (value) {
        previousParams.set("query", value);
      } else {
        previousParams.delete("query");
      }

      return previousParams;
    });
  }, 600);

  return (
    <div className="w-full h-full bg-white grid grid-rows-[auto_1fr]">
      <header className="h-20 flex items-center justify-between px-8 bg-cyan-950">
        <Link to="/" className="flex items-center gap-2 text-slate-200">
          <Popcorn />
          <span className="font-bold text-2xl">Moviex</span>
        </Link>
        <Input
          onChange={(event) => debounced(event.currentTarget.value)}
          className="max-w-64"
          placeholder="Buscar película"
          type="search"
          defaultValue={searchParams.get("query") ?? undefined}
        />
      </header>
      <Outlet />
    </div>
  );
}
