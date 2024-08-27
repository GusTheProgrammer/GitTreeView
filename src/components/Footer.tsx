import React from 'react'
import { Github } from 'lucide-react'
import { Separator } from "@/components/ui/separator"

const githubUsers = [
  { username: 'GusTheProgrammer', url: 'https://github.com/GusTheProgrammer' },
  { username: 'JasonFung03', url: 'https://github.com/JasonFung03' },
]

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="w-full border-t bg-background">
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row justify-between items-center space-y-4 sm:space-y-0">
          <div className="flex flex-wrap justify-center sm:justify-start items-center gap-4">
            {githubUsers.map((user, index) => (
              <React.Fragment key={user.username}>
                <a
                  href={user.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  <Github className="h-4 w-4" />
                  <span>{user.username}</span>
                </a>
                {index < githubUsers.length - 1 && (
                  <Separator orientation="vertical" className="h-4" />
                )}
              </React.Fragment>
            ))}
          </div>
          <p className="text-sm text-muted-foreground">
            © {currentYear} Git Tree View. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}