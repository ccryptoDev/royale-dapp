import { useSelector } from "react-redux";
import Chart from "react-apexcharts";
import {
	renderTokenAmountText,
	renderArrow,
	renderGraphColor,
} from "../../../../utils";
import {
	RoyaContainer,
	RoyaGraphContainer,
	RoyaInfoContainer,
	RoyaInfoValue,
	RoyaInfoValueBox,
	RoyaInfoGraph,
	RoyaInfoHeader,
	RoyaInfoValueWrapper,
	RoyaGraphHeader,
	RoyaPrice,
	RoyaGraph,
	RoyaPriceContainer,
	RoyaChangeBox,
	RoyaInfoGraphChange,
	GraphPlaceHolder,
	Border
} from "./style";

const RoyaStats = () => {
	const {
		currentPrice,
		royaPriceHistory,
		stakingLotsTotalRoyaValue,
		globalRoyaStaked,
		dailyVolume,
		dailyMarketCap,
		priceChange,
		deltaVolume,
		deltaRelativeLiquidity,
	} = useSelector((state: any) => state.royaAnalytics);

	const series = [
		{
			name: "ROYA",
			data: royaPriceHistory,
		},
	];

	const calculateTotalRoyaLocked = (): string => {
		const result =
			parseFloat(stakingLotsTotalRoyaValue) + parseFloat(globalRoyaStaked);

		if (isFinite(result)) return result.toFixed(2);

		return "0";
	};

	const calculateRelativeLiquidity = (): string => {
		const result = (parseFloat(dailyVolume) / parseFloat(dailyMarketCap)) * 100;

		if (isFinite(result)) return result.toFixed(2);

		return "0";
	};

	return (
		<RoyaContainer>
			<Border>
				<RoyaGraphContainer>
					<RoyaGraphHeader>ROYA</RoyaGraphHeader>
					<RoyaPriceContainer>
						<RoyaPrice>$ {currentPrice.toFixed(2)}</RoyaPrice>
						<RoyaChangeBox change={priceChange}>
							<img src={renderArrow(priceChange)} alt="change" />
							{`${priceChange.toFixed(2)} %`}
						</RoyaChangeBox>
					</RoyaPriceContainer>

					<RoyaGraph>
						<Chart
							options={{
								chart: {
									type: "area",
									height: 140,
									toolbar: {
										show: false,
									},
									sparkline: {
										enabled: true,
									},
								},
								fill: {
									colors: ["#00D2FF"],
									type: "gradient",
									opacity: 0.7,
									gradient: {
										shadeIntensity: 0,
										opacityFrom: 0.7,
										opacityTo: 0.27,
									},
								},
								stroke: { curve: "smooth", width: 2, colors: ["#1EA6C6"] },
								dataLabels: {
									enabled: false,
								},
								yaxis: {
									show: false,
									showAlways: false,
								},
								xaxis: {
									labels: { show: false },
									axisBorder: { show: false },
									axisTicks: { show: false },
								},
								grid: {
									show: false,
									padding: { left: 0, right: 0, bottom: 0, top: 0 },
								},
								tooltip: {
									custom: ({ series, seriesIndex, dataPointIndex }) => {
										const point = `${series[seriesIndex][dataPointIndex].toFixed(
											6
										)} USD`;

										return "<div>" + point + "</div>";
									},
								},
							}}
							series={series}
							type={"area"}
							height={300}
						/>
					</RoyaGraph>
				</RoyaGraphContainer>
			</Border>
			<RoyaInfoContainer>
				<RoyaInfoValueBox>
					<RoyaInfoValueWrapper>
						<RoyaInfoHeader>
							{`$ ${renderTokenAmountText(dailyVolume)}`}
						</RoyaInfoHeader>
						<RoyaInfoValue>24 HR USD Volume</RoyaInfoValue>
					</RoyaInfoValueWrapper>
					<RoyaInfoGraph>
						<img src={renderGraphColor(deltaVolume)} alt="graph" />
						<RoyaInfoGraphChange change={deltaVolume}>
							<img src={renderArrow(deltaVolume)} alt="change" />
							{`${deltaVolume.toFixed(2)} %`}
						</RoyaInfoGraphChange>
					</RoyaInfoGraph>
				</RoyaInfoValueBox>
				<RoyaInfoValueBox>
					<RoyaInfoValueWrapper>
						<RoyaInfoHeader>
							{`${renderTokenAmountText(calculateRelativeLiquidity())} %`}
						</RoyaInfoHeader>
						<RoyaInfoValue>Reelative Liquidity Ratio</RoyaInfoValue>
					</RoyaInfoValueWrapper>
					<RoyaInfoGraph>
						<img src={renderGraphColor(deltaRelativeLiquidity)} alt="graph" />
						<RoyaInfoGraphChange change={deltaRelativeLiquidity}>
							<img src={renderArrow(deltaRelativeLiquidity)} alt="change" />
							{`${deltaRelativeLiquidity.toFixed(2)} %`}
						</RoyaInfoGraphChange>
					</RoyaInfoGraph>
				</RoyaInfoValueBox>
				<RoyaInfoValueBox>
					<RoyaInfoValueWrapper>
						<RoyaInfoHeader>
							{`${renderTokenAmountText(calculateTotalRoyaLocked())} ROYA`}
						</RoyaInfoHeader>
						<RoyaInfoValue>ROYA Locked</RoyaInfoValue>
					</RoyaInfoValueWrapper>
					<GraphPlaceHolder />
				</RoyaInfoValueBox>
			</RoyaInfoContainer>
		</RoyaContainer>
	);
};

export default RoyaStats;
