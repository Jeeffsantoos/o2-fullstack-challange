import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import Notistack from './plugins/Notistack.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/Theme.tsx';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { ptBR } from '@mui/x-date-pickers/locales';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import 'dayjs/locale/pt-br';
import { BrowserRouter } from 'react-router';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
			<Notistack />
			<ThemeProvider theme={theme}>
				<LocalizationProvider
					dateAdapter={AdapterDayjs}
					adapterLocale="pt-br"
					localeText={ptBR.components.MuiLocalizationProvider.defaultProps.localeText}
				>
					<CssBaseline />
					<BrowserRouter>
						<App />
					</BrowserRouter>
				</LocalizationProvider>
			</ThemeProvider>
	</React.StrictMode>
);
