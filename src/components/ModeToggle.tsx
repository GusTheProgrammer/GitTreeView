"use client"

import * as React from "react"
import { MoonIcon, SunIcon } from "lucide-react"
import { useTheme } from "next-themes"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"

export function ModeToggle() {
  const { theme, setTheme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark")
  }

  return (
    <div className="flex items-center space-x-2">
      <SunIcon className="h-[1.2rem] w-[1.2rem]" />
      <Switch
        id="dark-mode"
        checked={theme === "dark"}
        onCheckedChange={toggleTheme}
      />
      <MoonIcon className="h-[1.2rem] w-[1.2rem]" />
      <Label htmlFor="dark-mode" className="sr-only">
        Toggle dark mode
      </Label>
    </div>
  )
}