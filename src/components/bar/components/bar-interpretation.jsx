"use client"

import { InterpretationsCard } from '@components/Interpretation'
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card"
import { TrendingUp } from "lucide-react"

const Footer = () => {
    return <>
        <div className="flex gap-2 font-medium leading-none">
            Trending up by 5.2% this month <TrendingUp className="h-4 w-4" />
        </div>
        <div className="leading-none text-muted-foreground">
            Showing total visitors for the last 6 months
        </div>
    </>
}

export function BarInterpretation() {
    return <InterpretationsCard
        title="Interpretations Title"
        description="2024"
        content="Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis placeat eius, laborum et hic, vel eligendi voluptatibus error aliquid provident reiciendis harum architecto ad modi incidunt iste numquam dolor deleniti?"
        footer={<Footer />}
    />
}
