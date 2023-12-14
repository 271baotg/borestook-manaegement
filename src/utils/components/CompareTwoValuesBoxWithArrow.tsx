import { Card, Stat, StatArrow, StatGroup, StatHelpText, StatLabel, StatNumber } from "@chakra-ui/react"



export const CompareTwoValuesBoxWithArrow: React.FC<{ lable: String, currentValue: number | undefined, oldValue: number | undefined }> = (props) => {

    const curVal: number | undefined = props.currentValue;
    const oldVal: number | undefined = props.oldValue;
    let precentageChange: number = 0;

    if (curVal != undefined && oldVal != undefined) {
        precentageChange = Math.round((Math.abs(curVal - oldVal) * 100 / oldVal) * 100) / 100; //Lấy 2 chữ số thập phân
    }

    return (
        <>
            <Card className="p-2" variant='filled' style={{minHeight: 140}}>
                <StatGroup>
                    <Stat>
                        <StatLabel>{props.lable}</StatLabel>
                        <StatNumber>{curVal !== undefined ? curVal : 'Data missing'}</StatNumber>
                        <StatHelpText>
                            <StatArrow type={(curVal ?? 0) - (oldVal ?? 0) >= 0 ? 'increase' : 'decrease'} />
                            {(curVal ?? 0) - (oldVal ?? 0) >= 0 ? '+' : '-'}{precentageChange + '%'}
                        </StatHelpText>
                    </Stat>
                </StatGroup>
            </Card>
        </>
    )
}