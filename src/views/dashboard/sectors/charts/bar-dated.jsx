"use client"

import { SelectComponent } from "@components/Form/Select";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card";
import {
    ChartContainer,
    ChartLegend,
    ChartLegendContent,
    ChartTooltip,
    ChartTooltipContent,
} from "@components/ui/chart";

export const description = "A stacked bar chart with a legend"

const chartData = [
    { type: "A", target: 186, accomplished: 80 },
    { type: "B", target: 305, accomplished: 200 },
    { type: "C", target: 237, accomplished: 120 },
    { type: "D", target: 73, accomplished: 190 },
    { type: "E", target: 209, accomplished: 130 },
    { type: "F", target: 214, accomplished: 140 },
]
const years = [
    {
        value: "2024",
        label: "2024",
    },
    {
        value: "2023",
        label: "2023",
    },
    {
        value: "2022",
        label: "2022",
    },
    {
        value: "2021",
        label: "2021",
    },
]

const chartConfig = {
    target: {
        label: "Target",
        color: "hsl(var(--chart-1))",
    },
    accomplished: {
        label: "Accomplished",
        color: "hsl(var(--chart-2))",
    },
}

export function DatedBarChart({
    title = "Higher Education",
    description = "Report on licensure examination performance"
}) {
    return (
        <div className="container max-w-xl">
            <Card>
                <CardHeader className="flex-row items-start space-y-0 pb-0">
                    <div className="grid gap-1">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>{description}</CardDescription>
                    </div>
                    <SelectComponent
                        title="Year"
                        selectTitle="Select year"
                        options={years} />

                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <BarChart accessibilityLayer data={chartData}>
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="type"
                                tickLine={false}
                                tickMargin={10}
                                axisLine={false}
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <ChartTooltip content={<ChartTooltipContent hideLabel />} />
                            <ChartLegend content={<ChartLegendContent />} />
                            <Bar
                                dataKey="target"
                                stackId="a"
                                fill="var(--color-target)"
                                radius={[0, 0, 4, 4]}
                            />
                            <Bar
                                dataKey="accomplished"
                                stackId="a"
                                fill="var(--color-accomplished)"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    )
}
