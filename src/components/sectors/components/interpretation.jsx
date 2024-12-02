"use client"

import { TrendingUp } from "lucide-react"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card"


export function InterpretationsCard({
    title, description, content, footer
}) {
    return (
        <Card className="max-w-sm">
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                <CardDescription>
                    {description}
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div>
                    {content}
                </div>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                {footer}
            </CardFooter>
        </Card>
    )
}
