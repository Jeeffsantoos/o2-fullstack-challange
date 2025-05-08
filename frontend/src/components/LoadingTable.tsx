import { Skeleton, TableBody, TableCell, TableRow, Box, Table } from '@mui/material';

const LoadingTable: React.FC<{
	numeroColunas: number;
	numeroLinhas: number;
	tamanhoLinha?: 'large' | 'medium' | 'small';
}> = (props) => {
	const arrayColunas = Array(props.numeroColunas - 1).fill(null);
	const arrayLinhas = Array(props.numeroLinhas).fill(null);

	let tamanho = 53;

	tamanho = props.tamanhoLinha === 'large' ? 73 : tamanho;

	return (
		<Box>
			<Box>
				<Skeleton
					variant="rounded"
					width={'100%'}
					height={tamanho}
					sx={{ borderRadius: 3 }}
				/>
			</Box>
			<Table>
				<TableBody>
					{arrayLinhas.map((_linha, index) => (
						<TableRow key={index}>
							{arrayColunas.map((_coluna, index) => (
								<TableCell key={index} width={500} height={tamanho}>
									<Skeleton variant="rounded" height={20} width={'100%'} />
								</TableCell>
							))}
							<TableCell height={tamanho}>
								<Skeleton variant="circular" width={10} height={10} />
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</Box>
	);
};

export default LoadingTable;
