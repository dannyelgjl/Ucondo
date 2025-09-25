type Account = { code: string; name: string };

import AsyncStorage from '@react-native-async-storage/async-storage';

export const EXPENSES_STORAGE_KEY = '@ucondo:expenses';

export type ExpenseItem = {
  id: string;
  code: string;
  name: string;
  type: 'receita' | 'despesa';
  acceptsReleases: 'sim' | 'nao';
  createdAt: string;
};

export async function getExpenses(): Promise<ExpenseItem[]> {
  const raw = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
  return raw ? JSON.parse(raw) : [];
}

export async function addExpense(item: ExpenseItem): Promise<void> {
  const list = await getExpenses();
  const duplicate = list.some(e => e.code === item.code);
  if (duplicate) {
    throw new Error('Este código já existe. Escolha outro.');
  }
  list.push(item);
  await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(list));
}

export async function clearExpenses(): Promise<void> {
  await AsyncStorage.removeItem(EXPENSES_STORAGE_KEY);
}

export async function deleteExpenseById(id: string): Promise<void> {
  const raw = await AsyncStorage.getItem(EXPENSES_STORAGE_KEY);
  const list: ExpenseItem[] = raw ? JSON.parse(raw) : [];
  const filtered = list.filter(item => item.id !== id);
  await AsyncStorage.setItem(EXPENSES_STORAGE_KEY, JSON.stringify(filtered));
}

export const ACCOUNTS: Account[] = [
  { code: '1', name: 'Receitas' },
  { code: '1.1', name: 'Taxa condominial' },
  { code: '1.2', name: 'Reserva de dependência' },
  { code: '1.3', name: 'Multas' },
  { code: '1.4', name: 'Juros' },
  { code: '1.5', name: 'Multa condominial' },
  { code: '1.6', name: 'Água' },
  { code: '1.7', name: 'Gás' },
  { code: '1.8', name: 'Luz e energia' },
  { code: '1.9', name: 'Fundo de reserva' },
  { code: '1.10', name: 'Fundo de obras' },
  { code: '1.11', name: 'Correção monetária' },
  { code: '1.12', name: 'Transferência entre contas' },
  { code: '1.13', name: 'Pagamento duplicado' },
  { code: '1.14', name: 'Cobrança' },
  { code: '1.15', name: 'Crédito' },
  { code: '1.16', name: 'Água mineral' },
  { code: '1.17', name: 'Estorno taxa de resgate' },
  { code: '1.18', name: 'Acordo' },
  { code: '1.19', name: 'Honorários' },

  { code: '2', name: 'Despesas' },
  { code: '2.1', name: 'Com pessoal' },
  { code: '2.1.1', name: 'Salário' },
  { code: '2.1.2', name: 'Adiantamento salarial' },
  { code: '2.1.3', name: 'Hora extra' },
  { code: '2.1.4', name: 'Férias' },
  { code: '2.1.5', name: '13º salário' },
  { code: '2.1.6', name: 'Adiantamento 13º salário' },
  { code: '2.1.7', name: 'Adicional de função' },
  { code: '2.1.8', name: 'Aviso prévio' },
  { code: '2.1.9', name: 'INSS' },
  { code: '2.1.10', name: 'FGTS' },
  { code: '2.1.11', name: 'PIS' },
  { code: '2.1.12', name: 'Vale refeição' },
  { code: '2.1.13', name: 'Vale transporte' },
  { code: '2.1.14', name: 'Cesta básica' },
  { code: '2.1.15', name: 'Acordo trabalhista' },

  { code: '2.2', name: 'Mensais' },
  { code: '2.2.1', name: 'Energia elétrica' },
  { code: '2.2.2', name: 'Água e esgoto' },
  { code: '2.2.3', name: 'Taxa de administração' },
  { code: '2.2.4', name: 'Gás' },
  { code: '2.2.5', name: 'Seguro obrigatório' },
  { code: '2.2.6', name: 'Telefone' },
  { code: '2.2.7', name: 'Softwares e aplicativos' },

  { code: '2.3', name: 'Manutenção' },
  { code: '2.3.1', name: 'Elevador' },
  { code: '2.3.2', name: 'Limpeza e conservação' },
  { code: '2.3.3', name: 'Jardinagem' },

  { code: '2.4', name: 'Diversas' },
  { code: '2.4.1', name: 'Honorários de advogado' },
  { code: '2.4.2', name: 'Xerox' },
  { code: '2.4.3', name: 'Correios' },
  { code: '2.4.4', name: 'Despesas judiciais' },
  { code: '2.4.5', name: 'Multas' },
  { code: '2.4.6', name: 'Juros' },
  { code: '2.4.7', name: 'Transferência entre contas' },

  { code: '3', name: 'Despesas bancárias' },
  { code: '3.1', name: 'Registro de boletos' },
  { code: '3.2', name: 'Processamento de boletos' },
  { code: '3.3', name: 'Registro e processamento de boletos' },
  { code: '3.4', name: 'Resgates' },

  { code: '4', name: 'Outras receitas' },
  { code: '4.1', name: 'Rendimento de poupança' },
  { code: '4.2', name: 'Rendimento de investimentos' },
];
