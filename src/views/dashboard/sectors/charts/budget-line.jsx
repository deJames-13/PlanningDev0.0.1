"use client"
import { CartesianGrid, LabelList, Line, LineChart, ResponsiveContainer, XAxis } from "recharts"

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@components/ui/card"
import {
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
} from "@components/ui/chart"
import BudgetTable from "./budget-table"

export const description = "A line chart with a label"



const chartConfig = {
    allotment: {
        label: "Allotment",
        color: "hsl(var(--chart-1))",
    },
    obligated: {
        label: "Obligated",
        color: "hsl(var(--chart-2))",
    },
    rate: {
        label: "Utilization Rate",
        color: "hsl(var(--chart-3))",
    }
}

export function BudgetLineChart({ chartData = [], label, description }) {
    return (
        <Card className="aspect-video w-full ">
            <CardHeader>
                <CardTitle>{label}</CardTitle>
                <CardDescription>{description}</CardDescription>
            </CardHeader>
            <CardContent className="h-[50%]">
                <ChartContainer config={chartConfig} className="w-full h-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart
                            accessibilityLayer
                            data={chartData}
                        >
                            <CartesianGrid opacity={0.5} />
                            <XAxis
                                dataKey="year"
                                tickLine={true}
                                axisLine={true}
                                tickMargin={8}
                                tickFormatter={(value) => value.slice(0, 4)}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent indicator="line" />}
                            />
                            <Line
                                dataKey="allotment"
                                type="natural"
                                stroke="var(--color-allotment)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-allotment)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            >
                                <LabelList
                                    position="bottom"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Line>
                            <Line
                                dataKey="obligated"
                                type="natural"
                                stroke="var(--color-obligated)"
                                strokeWidth={2}
                                dot={{
                                    fill: "var(--color-obligated)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                            >
                                <LabelList
                                    position="bottom"
                                    offset={12}
                                    className="fill-foreground"
                                    fontSize={12}
                                />
                            </Line>
                            <Line
                                dataKey="rate"
                                type="natural"
                                stroke="var(--color-rate)"
                                strokeWidth={0}
                                dot={{
                                    fill: "var(--color-rate)",
                                }}
                                activeDot={{
                                    r: 6,
                                }}
                                className="opacity-0"
                            >

                            </Line>
                        </LineChart>
                    </ResponsiveContainer>
                </ChartContainer>
            </CardContent>
            <CardFooter className="flex-col items-start gap-2 text-sm">
                <BudgetTable data={chartData} horizontal={true} />
            </CardFooter>
        </Card>
    )
}