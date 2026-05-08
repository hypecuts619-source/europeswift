import { Globe } from "lucide-react"
import { buttonVariants } from "./ui/button"
import { cn } from "@/lib/utils"
import { useLanguage } from "../contexts/LanguageContext"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"

const languages = [
  { code: "EN", name: "English" },
  { code: "DE", name: "Deutsch" },
  { code: "FR", name: "Français" },
  { code: "ES", name: "Español" },
  { code: "IT", name: "Italiano" },
  { code: "PL", name: "Polski" },
]

export function LanguageSelector() {
  const { lang, setLang } = useLanguage()

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className={cn(buttonVariants({ variant: "outline", size: "sm" }), "h-9 gap-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 text-slate-800 dark:text-slate-200")}>
        <Globe className="w-4 h-4" />
        <span>{lang}</span>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {languages.map((l) => (
          <DropdownMenuItem 
            key={l.code} 
            onClick={() => setLang(l.code as any)}
            className={lang === l.code ? "bg-slate-100 dark:bg-slate-800 font-bold" : ""}
          >
            {l.name} ({l.code})
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
