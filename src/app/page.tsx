import Image from "next/image";
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"
import { ModeToggle } from "@/components/mode-toggle";
import Branch  from "@/components/Branch"
export default function Home() {
  return (
    <main>

      <Branch />

      <ModeToggle />

    </main>
  );
}
