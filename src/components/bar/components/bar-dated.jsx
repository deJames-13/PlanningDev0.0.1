import { TrendingUp } from 'lucide-react';
import React from 'react';
import { Bar, BarChart, CartesianGrid, LabelList, XAxis } from "recharts";

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
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger
} from "@components/ui/tabs";

const transformData = (indicator) => {
    const chartData = indicator.values
        .map((value) => ({
            type: String(value.year),
            target: parseInt(value.target) || 0,
            accomplishment: value.accomplishment,
        }));
    return chartData;
};

const chartConfig = {
    target: {
        label: "Target",
        color: "hsl(var(--chart-1))",
    },
    accomplishment: {
        label: "Accomplished",
        color: "hsl(var(--chart-2))",
    },
};

export function DatedBarChart({
    title = "Particular Title",
    data = null,
    description = "",
}) {
    const [indicatorIdx, setIndicatorIdx] = React.useState(0);
    const [chartData, setChartData] = React.useState(null);

    const handleTabChange = (index) => {
        setIndicatorIdx(index);
    };

    React.useEffect(() => {
        if (data) {
            const chartData = transformData(data.indicators[indicatorIdx]);
            setChartData(chartData);
        }
    }, [indicatorIdx]);


    return !data ? '' : (
        <div className="container">
            <Card>
                <CardHeader className="flex-row items-start space-y-0 pb-0">
                    <div className="grid gap-1">
                        <CardTitle>{title}</CardTitle>
                        <CardDescription>
                            {description}
                        </CardDescription>
                    </div>
                </CardHeader>
                <CardContent>
                    <Tabs defaultValue="0" onValueChange={handleTabChange} className="w-full">
                        <TabsList className='bg-red-400'>
                            {data.indicators.map((indicator, index) => (
                                <TabsTrigger key={index} value={String(index)}>
                                    {indicator.name.split(" ")[0] + " " + ": " + indicator.name.split(" ")[2][0]}
                                    {/* {String.fromCharCode(65 + index)} */}
                                </TabsTrigger>
                            ))}
                        </TabsList>
                        {data.indicators.map((indicator, index) => (
                            <TabsContent key={index} value={String(index)}>
                                <h2 className='font-medium'>
                                    {indicator.name}
                                </h2>
                                <ChartContainer config={chartConfig}>
                                    <BarChart
                                        accessibilityLayer
                                        data={chartData}
                                    >
                                        <CartesianGrid vertical={false} />
                                        <XAxis
                                            dataKey="type"
                                            tickLine={false}
                                            tickMargin={10}
                                            axisLine={false}
                                            tickFormatter={(value) => value.slice(0, 4)}
                                        />
                                        <ChartTooltip content={<ChartTooltipContent indicator="line" />} />
                                        <ChartLegend content={<ChartLegendContent />} />
                                        <Bar
                                            dataKey="target"
                                            stackId="a"
                                            fill="var(--color-target)"
                                            radius={[0, 0, 4, 4]}
                                        >
                                            <LabelList
                                                dataKey="target"
                                                position="top"
                                                offset={8}
                                                className="fill-[--color-label]"
                                                fontSize={12}
                                            />
                                        </Bar>
                                        <Bar
                                            dataKey="accomplishment"
                                            stackId="b"
                                            fill="var(--color-accomplishment)"
                                            radius={[4, 4, 0, 0]}
                                        >
                                            <LabelList
                                                dataKey="accomplishment"
                                                position="top"
                                                offset={8}
                                                className="fill-[--color-label]"
                                                fontSize={12}
                                            />
                                        </Bar>
                                    </BarChart>
                                </ChartContainer>
                            </TabsContent>
                        ))}
                    </Tabs>
                </CardContent>

            </Card>
        </div>
    );
}